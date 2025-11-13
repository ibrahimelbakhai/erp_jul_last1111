'use server';

import { z } from 'zod';
import { getPrismaClient } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { JournalType, FiscalPeriodStatus } from '@prisma/client';
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


// Function to get the current user's session
async function getUserSession() {
  const session = await auth();
  if (!session?.user) {
    throw new Error('User is not authenticated.');
  }
  if (!session.user.companyId) {
      throw new Error('User is not associated with a company.');
  }
  return session.user as { id: string; companyId: string; };
}

// Fetch all journal entries
export async function getJournalEntries() {
  const user = await getUserSession();
  const prisma = getPrismaClient();
  try {
    const journalEntries = await prisma.journal.findMany({
      where: { companyId: user.companyId },
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
  const user = await getUserSession();
  const prisma = getPrismaClient();

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

  if (Math.abs(totalDebits - totalCredits) > 0.001) { // Use a tolerance for float comparison
    return { message: 'Total debits must equal total credits.' };
  }

  // Locked Period Validation
  const fiscalPeriod = await prisma.fiscalPeriod.findFirst({
      where: {
          companyId: user.companyId,
          startDate: { lte: date },
          endDate: { gte: date },
      },
  });

  if (!fiscalPeriod) {
      return { message: 'The transaction date is not within any open fiscal period.' };
  }

  if (fiscalPeriod.status === FiscalPeriodStatus.CLOSED) {
      return { message: `Cannot post transaction: Fiscal period ${fiscalPeriod.period}/${fiscalPeriod.year} is closed.` };
  }


  try {
    await prisma.$transaction(async (tx) => {
      const journal = await tx.journal.create({
        data: {
          companyId: user.companyId,
          date,
          type,
          reference,
          currency,
          preparedById: user.id,
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
    const user = await getUserSession();
    const prisma = getPrismaClient();
    try {
        const accounts = await prisma.gLAccount.findMany({
            where: { companyId: user.companyId, postingAllowed: true },
            orderBy: { code: 'asc' },
            select: { id: true, name: true, code: true }
        });
        return { success: true, data: accounts };
    } catch (error) {
        return { success: false, error: 'Failed to fetch accounts.' };
    }
}

export async function getCostCentersForDropdown() {
    const user = await getUserSession();
    const prisma = getPrismaClient();
    try {
        const costCenters = await prisma.costCenter.findMany({
            where: { companyId: user.companyId },
            orderBy: { code: 'asc' },
            select: { id: true, name: true, code: true }
        });
        return { success: true, data: costCenters };
    } catch (error) {
        return { success: false, error: 'Failed to fetch cost centers.' };
    }
}
