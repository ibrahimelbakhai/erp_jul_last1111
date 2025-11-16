'use server';

import { z } from 'zod';
import { getPrismaClient } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

// Zod schema for cost center validation
const costCenterSchema = z.object({
  id: z.string().cuid().optional(),
  code: z.string().min(1, 'Cost center code is required.'),
  name: z.string().min(1, 'Cost center name is required.'),
  parentId: z.string().cuid().optional().nullable(),
});

// Function to get the current user's company ID
async function getCompanyId() {
  const session = await auth();
  if (!session?.user?.companyId) {
    throw new Error('User is not authenticated or does not have a company ID.');
  }
  return session.user.companyId;
}

// Fetch all cost centers
export async function getCostCenters() {
  const companyId = await getCompanyId();
  const prisma = getPrismaClient();
  try {
    const costCenters = await prisma.costCenter.findMany({
      where: { companyId },
      orderBy: { code: 'asc' },
    });
    return { success: true, data: costCenters };
  } catch (error) {
    return { success: false, error: 'Failed to fetch cost centers.' };
  }
}

// Create a new cost center
export async function createCostCenter(formData: FormData) {
  const companyId = await getCompanyId();
  const prisma = getPrismaClient();
  const validatedFields = costCenterSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { code, name, parentId } = validatedFields.data;

  try {
    await prisma.costCenter.create({
      data: {
        companyId,
        code,
        name,
        parentId,
      },
    });
    revalidatePath('/dashboard/gl/cost-centers');
    return { success: true, message: 'Cost center created successfully.' };
  } catch (error) {
    return { success: false, error: 'Failed to create cost center.' };
  }
}

// Update an existing cost center
export async function updateCostCenter(formData: FormData) {
  const companyId = await getCompanyId();
  const prisma = getPrismaClient();
  const validatedFields = costCenterSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id, code, name, parentId } = validatedFields.data;

  if (!id) {
    return { success: false, error: 'Cost center ID is required for updates.' };
  }

  try {
    await prisma.costCenter.update({
      where: { id, companyId },
      data: {
        code,
        name,
        parentId,
      },
    });
    revalidatePath('/dashboard/gl/cost-centers');
    return { success: true, message: 'Cost center updated successfully.' };
  } catch (error) {
    return { success: false, error: 'Failed to update cost center.' };
  }
}

// Delete a cost center
export async function deleteCostCenter(id: string) {
  const companyId = await getCompanyId();
  const prisma = getPrismaClient();
  try {
    await prisma.costCenter.delete({
      where: { id, companyId },
    });
    revalidatePath('/dashboard/gl/cost-centers');
    return { success: true, message: 'Cost center deleted successfully.' };
  } catch (error) {
    // Handle case where cost center has children or is used in transactions
    return { success: false, error: 'Failed to delete cost center. It may be in use or have child cost centers.' };
  }
}
