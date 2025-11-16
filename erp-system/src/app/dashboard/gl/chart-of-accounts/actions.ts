'use server';

import { z } from 'zod';
import { getPrismaClient } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { AccountType } from '@prisma/client';

// Zod schema for account validation
const accountSchema = z.object({
  id: z.string().cuid().optional(),
  code: z.string().min(1, 'Account code is required.'),
  name: z.string().min(1, 'Account name is required.'),
  type: z.nativeEnum(AccountType),
  currency: z.string().min(1, 'Currency is required.'),
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

// Fetch all accounts
export async function getAccounts() {
  const companyId = await getCompanyId();
  const prisma = getPrismaClient();
  try {
    const accounts = await prisma.gLAccount.findMany({
      where: { companyId },
      orderBy: { code: 'asc' },
    });
    return { success: true, data: accounts };
  } catch (error) {
    return { success: false, error: 'Failed to fetch accounts.' };
  }
}

// Create a new account
export async function createAccount(formData: FormData) {
  const companyId = await getCompanyId();
  const prisma = getPrismaClient();
  const validatedFields = accountSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { code, name, type, currency, parentId } = validatedFields.data;

  try {
    await prisma.gLAccount.create({
      data: {
        companyId,
        code,
        name,
        type,
        currency,
        parentId,
      },
    });
    revalidatePath('/dashboard/gl/chart-of-accounts');
    return { success: true, message: 'Account created successfully.' };
  } catch (error) {
    return { success: false, error: 'Failed to create account.' };
  }
}

// Update an existing account
export async function updateAccount(formData: FormData) {
  const companyId = await getCompanyId();
  const prisma = getPrismaClient();
  const validatedFields = accountSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id, code, name, type, currency, parentId } = validatedFields.data;

  if (!id) {
    return { success: false, error: 'Account ID is required for updates.' };
  }

  try {
    await prisma.gLAccount.update({
      where: { id, companyId },
      data: {
        code,
        name,
        type,
        currency,
        parentId,
      },
    });
    revalidatePath('/dashboard/gl/chart-of-accounts');
    return { success: true, message: 'Account updated successfully.' };
  } catch (error) {
    return { success: false, error: 'Failed to update account.' };
  }
}

// Delete an account
export async function deleteAccount(id: string) {
  const companyId = await getCompanyId();
  const prisma = getPrismaClient();
  try {
    await prisma.gLAccount.delete({
      where: { id, companyId },
    });
    revalidatePath('/dashboard/gl/chart-of-accounts');
    return { success: true, message: 'Account deleted successfully.' };
  } catch (error) {
    // Handle case where account has children or is used in transactions
    return { success: false, error: 'Failed to delete account. It may be in use or have child accounts.' };
  }
}
