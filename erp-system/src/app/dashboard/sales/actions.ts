'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getCompanyId } from '@/lib/auth';

const customerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().optional(),
  billingAddress: z.string().optional(),
  shippingAddress: z.string().optional(),
});

export async function createCustomer(formData: FormData) {
  const companyId = await getCompanyId();
  if (!companyId) {
    return { success: false, message: 'Company not found' };
  }

  const validatedFields = customerSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid customer data',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.customer.create({
      data: {
        ...validatedFields.data,
        companyId,
      },
    });

    revalidatePath('/dashboard/sales/customers');
    return { success: true, message: 'Customer created successfully' };
  } catch (error) {
    return { success: false, message: 'Failed to create customer' };
  }
}

export async function updateCustomer(id: string, formData: FormData) {
  const companyId = await getCompanyId();
  if (!companyId) {
    return { success: false, message: 'Company not found' };
  }

  const validatedFields = customerSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid customer data',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.customer.update({
      where: { id, companyId },
      data: validatedFields.data,
    });

    revalidatePath('/dashboard/sales/customers');
    return { success: true, message: 'Customer updated successfully' };
  } catch (error) {
    return { success: false, message: 'Failed to update customer' };
  }
}

export async function deleteCustomer(id: string) {
  const companyId = await getCompanyId();
  if (!companyId) {
    return { success: false, message: 'Company not found' };
  }

  try {
    await prisma.customer.delete({
      where: { id, companyId },
    });

    revalidatePath('/dashboard/sales/customers');
    return { success: true, message: 'Customer deleted successfully' };
  } catch (error) {
    return { success: false, message: 'Failed to delete customer' };
  }
}

const salesOrderSchema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  orderDate: z.coerce.date(),
  status: z.enum(['DRAFT', 'SENT', 'CONFIRMED', 'CANCELLED']),
  items: z.array(z.object({
    productId: z.string().min(1, 'Product is required'),
    quantity: z.coerce.number().min(1, 'Quantity must be at least 1'),
    unitPrice: z.coerce.number().min(0, 'Unit price must be positive'),
  })).min(1, 'At least one item is required'),
});

export async function createSalesOrder(formData: FormData) {
  const companyId = await getCompanyId();
  if (!companyId) {
    return { success: false, message: 'Company not found' };
  }

  const validatedFields = salesOrderSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid sales order data',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const { items, ...orderData } = validatedFields.data;
    const total = items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);

    await prisma.salesOrder.create({
      data: {
        ...orderData,
        companyId,
        total,
        items: {
          create: items.map(item => ({
            ...item,
            total: item.quantity * item.unitPrice,
          })),
        },
      },
    });

    revalidatePath('/dashboard/sales/orders');
    return { success: true, message: 'Sales order created successfully' };
  } catch (error) {
    return { success: false, message: 'Failed to create sales order' };
  }
}

export async function updateSalesOrder(id: string, formData: FormData) {
  const companyId = await getCompanyId();
  if (!companyId) {
    return { success: false, message: 'Company not found' };
  }

  const validatedFields = salesOrderSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid sales order data',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const { items, ...orderData } = validatedFields.data;
    const total = items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);

    await prisma.salesOrder.update({
      where: { id, companyId },
      data: {
        ...orderData,
        total,
        items: {
          deleteMany: {},
          create: items.map(item => ({
            ...item,
            total: item.quantity * item.unitPrice,
          })),
        },
      },
    });

    revalidatePath('/dashboard/sales/orders');
    return { success: true, message: 'Sales order updated successfully' };
  } catch (error) {
    return { success: false, message: 'Failed to update sales order' };
  }
}

export async function deleteSalesOrder(id: string) {
  const companyId = await getCompanyId();
  if (!companyId) {
    return { success: false, message: 'Company not found' };
  }

  try {
    await prisma.salesOrder.delete({
      where: { id, companyId },
    });

    revalidatePath('/dashboard/sales/orders');
    return { success: true, message: 'Sales order deleted successfully' };
  } catch (error) {
    return { success: false, message: 'Failed to delete sales order' };
  }
}

const invoiceSchema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  invoiceDate: z.coerce.date(),
  dueDate: z.coerce.date(),
  status: z.enum(['DRAFT', 'SENT', 'PAID', 'VOID']),
  items: z.array(z.object({
    productId: z.string().min(1, 'Product is required'),
    quantity: z.coerce.number().min(1, 'Quantity must be at least 1'),
    unitPrice: z.coerce.number().min(0, 'Unit price must be positive'),
  })).min(1, 'At least one item is required'),
});

export async function createInvoice(formData: FormData) {
  const companyId = await getCompanyId();
  if (!companyId) {
    return { success: false, message: 'Company not found' };
  }

  const validatedFields = invoiceSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid invoice data',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const { items, ...invoiceData } = validatedFields.data;
    const total = items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);

    await prisma.$transaction(async (tx) => {
      const invoice = await tx.invoice.create({
        data: {
          ...invoiceData,
          companyId,
          total,
          items: {
            create: items.map(item => ({
              ...item,
              total: item.quantity * item.unitPrice,
            })),
          },
        },
      });

      if (invoiceData.status === 'PAID') {
        for (const item of items) {
          await tx.inventoryItem.updateMany({
            where: {
              productId: item.productId,
              warehouse: { companyId: companyId }
            },
            data: {
              quantity: {
                decrement: item.quantity,
              },
            },
          });
        }
      }
    });

    revalidatePath('/dashboard/sales/invoices');
    return { success: true, message: 'Invoice created successfully' };
  } catch (error) {
    return { success: false, message: 'Failed to create invoice' };
  }
}

export async function updateInvoice(id: string, formData: FormData) {
  const companyId = await getCompanyId();
  if (!companyId) {
    return { success: false, message: 'Company not found' };
  }

  const validatedFields = invoiceSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid invoice data',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const { items, ...invoiceData } = validatedFields.data;
    const total = items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);

    await prisma.$transaction(async (tx) => {
      const existingInvoice = await tx.invoice.findUnique({
        where: { id, companyId },
        include: { items: true },
      });

      if (!existingInvoice) {
        throw new Error('Invoice not found');
      }

      if (existingInvoice.status === 'PAID') {
        for (const item of existingInvoice.items) {
          await tx.inventoryItem.updateMany({
            where: { productId: item.productId, warehouse: { companyId } },
            data: { quantity: { increment: item.quantity } },
          });
        }
      }

      await tx.invoice.update({
        where: { id, companyId },
        data: {
          ...invoiceData,
          total,
          items: {
            deleteMany: {},
            create: items.map(item => ({
              ...item,
              total: item.quantity * item.unitPrice,
            })),
          },
        },
      });

      if (invoiceData.status === 'PAID') {
        for (const item of items) {
          await tx.inventoryItem.updateMany({
            where: { productId: item.productId, warehouse: { companyId } },
            data: { quantity: { decrement: item.quantity } },
          });
        }
      }
    });

    revalidatePath('/dashboard/sales/invoices');
    return { success: true, message: 'Invoice updated successfully' };
  } catch (error) {
    return { success: false, message: 'Failed to update invoice' };
  }
}

export async function deleteInvoice(id: string) {
  const companyId = await getCompanyId();
  if (!companyId) {
    return { success: false, message: 'Company not found' };
  }

  try {
    await prisma.$transaction(async (tx) => {
      const invoice = await tx.invoice.findUnique({
        where: { id, companyId },
        include: { items: true },
      });

      if (!invoice) {
        throw new Error('Invoice not found');
      }

      if (invoice.status === 'PAID') {
        for (const item of invoice.items) {
          await tx.inventoryItem.updateMany({
            where: { productId: item.productId, warehouse: { companyId } },
            data: { quantity: { increment: item.quantity } },
          });
        }
      }

      await tx.invoice.delete({ where: { id, companyId } });
    });

    revalidatePath('/dashboard/sales/invoices');
    return { success: true, message: 'Invoice deleted successfully' };
  } catch (error) {
    return { success: false, message: 'Failed to delete invoice' };
  }
}
