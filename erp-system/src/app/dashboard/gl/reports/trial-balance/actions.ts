'use server';

import { getPrismaClient } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { z } from 'zod';
import { State } from '@/app/lib/definitions';

export type TrialBalanceData = {
    accountId: string;
    accountName: string;
    debit: number;
    credit: number;
};

const FormSchema = z.object({
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid start date.',
  }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid end date.',
  }),
});

// Function to get the current user's company ID
async function getCompanyId() {
  const session = await auth();
  if (!session?.user?.companyId) {
    throw new Error('User is not authenticated or does not have a company ID.');
  }
  return session.user.companyId;
}

export async function getTrialBalance(prevState: State<TrialBalanceData>, formData: FormData): Promise<State<TrialBalanceData>> {
  const companyId = await getCompanyId();
  const prisma = getPrismaClient();

  if (!companyId) {
    return {
      message: 'Failed to find company.',
      data: [],
    };
  }

  const validatedFields = FormSchema.safeParse({
    startDate: formData.get('startDate'),
    endDate: formData.get('endDate'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to validate fields.',
      data: [],
    };
  }

  const { startDate, endDate } = validatedFields.data;
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  // Add one day to the end date to include all entries for that day
  endDateObj.setDate(endDateObj.getDate() + 1);

  try {
    const accounts = await prisma.gLAccount.findMany({
      where: { companyId },
      include: {
        journalLines: {
          where: {
            journal: {
              date: {
                gte: startDateObj,
                lt: endDateObj,
              },
            },
          },
        },
      },
      orderBy: {
        name: 'asc',
      }
    });

    const trialBalance: TrialBalanceData[] = accounts.map(account => {
      const totals = account.journalLines.reduce((acc, line) => {
        acc.debit += line.debit;
        acc.credit += line.credit;
        return acc;
      }, { debit: 0, credit: 0 });

      const balance = totals.debit - totals.credit;

      return {
        accountId: account.id,
        accountName: account.name,
        debit: balance > 0 ? balance : 0,
        credit: balance < 0 ? -balance : 0,
      };
    }).filter(item => item.debit > 0 || item.credit > 0); // Only include accounts with activity

    return {
      message: 'Successfully fetched trial balance.',
      data: trialBalance,
    };
  } catch (e) {
    console.error(e);
    return {
      message: 'Database Error: Failed to fetch trial balance.',
      data: [],
    };
  }
}
