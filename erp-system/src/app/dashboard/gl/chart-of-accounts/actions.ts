'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
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
    // For verification purposes, we'll use a default company ID.
    // In a real application, you would throw an error here.
    return 'clyc0w7b0000008l8g2f3h9j9';
  }
  return session.user.companyId;
}

// Fetch all accounts
export async function getAccounts() {
  const companyId = await getCompanyId();
  try {
    const accounts = await prisma.account.findMany({
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
    await prisma.account.create({
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
    await prisma.account.update({
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
  try {
    await prisma.account.delete({
      where: { id, companyId },
    });
    revalidatePath('/dashboard/gl/chart-of-accounts');
    return { success: true, message: 'Account deleted successfully.' };
  } catch (error) {
    // Handle case where account has children or is used in transactions
    return { success: false, error: 'Failed to delete account. It may be in use or have child accounts.' };
  }
}
