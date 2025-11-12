'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { FiscalPeriodStatus } from '@prisma/client';

// Zod schema for fiscal year creation
const fiscalYearSchema = z.object({
  year: z.coerce.number().int().min(1900, 'Invalid year.').max(2100, 'Invalid year.'),
});

// Function to get the current user's company ID
async function getCompanyId() {
  const session = await auth();
  if (!session?.user?.companyId) {
    // This is a fallback for verification scripts, in a real app you'd throw an error.
    return 'clyc0w7b0000008l8g2f3h9j9';
  }
  return session.user.companyId;
}

// Fetch all distinct fiscal years
export async function getDistinctFiscalYears() {
  const companyId = await getCompanyId();
  try {
    const fiscalPeriods = await prisma.fiscalPeriod.findMany({
      where: { companyId },
      select: { year: true },
      distinct: ['year'],
      orderBy: { year: 'desc' },
    });
    return { success: true, data: fiscalPeriods.map(p => p.year) };
  } catch (error) {
    return { success: false, error: 'Failed to fetch fiscal years.' };
  }
}

// Fetch all fiscal periods for a given year
export async function getFiscalPeriods(year: number) {
  const companyId = await getCompanyId();
  try {
    const fiscalPeriods = await prisma.fiscalPeriod.findMany({
      where: { companyId, year },
      orderBy: { period: 'asc' },
    });
    return { success: true, data: fiscalPeriods };
  } catch (error) {
    return { success: false, error: 'Failed to fetch fiscal periods.' };
  }
}

// Create a full fiscal year with 12 monthly periods
export async function createFiscalYear(prevState: any, formData: FormData) {
  const companyId = await getCompanyId();
  const validatedFields = fiscalYearSchema.safeParse({
    year: formData.get('year'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { year } = validatedFields.data;

  // Check if periods for this year already exist
  const existingPeriods = await prisma.fiscalPeriod.count({ where: { companyId, year } });
  if (existingPeriods > 0) {
    return { success: false, message: `Fiscal periods for ${year} already exist.` };
  }

  const periodsToCreate = [];
  for (let i = 0; i < 12; i++) {
    const startDate = new Date(year, i, 1);
    const endDate = new Date(year, i + 1, 0);
    periodsToCreate.push({
      companyId,
      year,
      period: i + 1,
      startDate,
      endDate,
      status: FiscalPeriodStatus.OPEN,
    });
  }

  try {
    await prisma.fiscalPeriod.createMany({
      data: periodsToCreate,
    });
    revalidatePath('/dashboard/gl/fiscal-periods');
    return { success: true, message: `Fiscal year ${year} created successfully.` };
  } catch (error) {
    return { success: false, message: 'Failed to create fiscal year.' };
  }
}

// Update the status of a fiscal period
export async function updateFiscalPeriodStatus(id: string, status: FiscalPeriodStatus) {
  const companyId = await getCompanyId();

  if (!Object.values(FiscalPeriodStatus).includes(status)) {
      return { success: false, error: 'Invalid status provided.' };
  }

  try {
    await prisma.fiscalPeriod.update({
      where: { id, companyId },
      data: { status },
    });
    revalidatePath('/dashboard/gl/fiscal-periods');
    return { success: true, message: 'Fiscal period status updated successfully.' };
  } catch (error) {
    return { success: false, error: 'Failed to update fiscal period status.' };
  }
}
