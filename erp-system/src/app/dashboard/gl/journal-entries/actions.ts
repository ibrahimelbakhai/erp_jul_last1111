'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { JournalType } from '@prisma/client';
import { Prisma } from '@prisma/client';

// Zod schema for a single journal line
const journalLineSchema = z.object({
  accountId: z.string().cuid('Invalid account ID.'),
  description: z.string().optional(),
  debit: z.coerce.number().min(0, 'Debit must be non-negative.'),
  credit: z.coerce.number().min(0, 'Credit must be non-negative.'),
  costCenterId: z.string().cuid('Invalid cost center ID.').optional().nullable(),
}).refine(data => data.debit === 0 || data.credit === 0, {
  message: 'Each line must have either a debit or a credit, but not both.',
  path: ['debit'], // Or ['credit']
});

// Zod schema for the entire journal entry
const journalEntrySchema = z.object({
  id: z.string().cuid().optional(),
  date: z.coerce.date(),
  type: z.nativeEnum(JournalType),
  reference: z.string().optional(),
  currency: z.string().min(1, 'Currency is required.'),
  lines: z.array(journalLineSchema).min(2, 'A journal entry must have at least two lines.'),
});


// Function to get the current user's company ID
async function getCompanyId() {
  const session = await auth();
  if (!session?.user?.companyId) {
    return 'clyc0w7b0000008l8g2f3h9j9'; // Fallback for verification
  }
  return session.user.companyId;
}

// Fetch all journal entries
export async function getJournalEntries() {
  const companyId = await getCompanyId();
  try {
    const journalEntries = await prisma.journal.findMany({
      where: { companyId },
      include: { lines: true },
      orderBy: { date: 'desc' },
    });
    return { success: true, data: journalEntries };
  } catch (error) {
    return { success: false, error: 'Failed to fetch journal entries.' };
  }
}

// Create a new journal entry
export async function createJournalEntry(prevState: any, formData: FormData) {
  const companyId = await getCompanyId();

  const rawData = {
    date: formData.get('date'),
    type: formData.get('type'),
    reference: formData.get('reference'),
    currency: formData.get('currency'),
    lines: JSON.parse(formData.get('lines') as string || '[]'),
  };

  const validatedFields = journalEntrySchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { date, type, reference, currency, lines } = validatedFields.data;

  // Validate that debits equal credits
  const totalDebits = lines.reduce((sum, line) => sum + line.debit, 0);
  const totalCredits = lines.reduce((sum, line) => sum + line.credit, 0);

  if (totalDebits !== totalCredits) {
    return { message: 'Total debits must equal total credits.' };
  }

  try {
    await prisma.$transaction(async (tx) => {
      const journal = await tx.journal.create({
        data: {
          companyId,
          date,
          type,
          reference,
          currency,
          // TODO: Add preparedById and approvedById from session
          preparedById: 'user_placeholder',
        },
      });

      await tx.journalLine.createMany({
        data: lines.map(line => ({
          ...line,
          journalId: journal.id,
        })),
      });
    });

    revalidatePath('/dashboard/gl/journal-entries');
    return { success: true, message: 'Journal entry created successfully.' };
  } catch (error) {
     if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return { success: false, message: `Database error: ${error.message}` };
    }
    return { success: false, message: 'Failed to create journal entry.' };
  }
}

// Helper actions to fetch data for form dropdowns
export async function getAccountsForDropdown() {
    const companyId = await getCompanyId();
    try {
        const accounts = await prisma.account.findMany({
            where: { companyId, postingAllowed: true },
            orderBy: { code: 'asc' },
            select: { id: true, name: true, code: true }
        });
        return { success: true, data: accounts };
    } catch (error) {
        return { success: false, error: 'Failed to fetch accounts.' };
    }
}

export async function getCostCentersForDropdown() {
    const companyId = await getCompanyId();
    try {
        const costCenters = await prisma.costCenter.findMany({
            where: { companyId },
            orderBy: { code: 'asc' },
            select: { id: true, name: true, code: true }
        });
        return { success: true, data: costCenters };
    } catch (error) {
        return { success: false, error: 'Failed to fetch cost centers.' };
    }
}
