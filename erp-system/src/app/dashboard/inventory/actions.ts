"use server";

import { getPrismaClient } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import * as z from "zod";

const categoryFormSchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters."),
});

export async function createCategory(values: z.infer<typeof categoryFormSchema>) {
  const prisma = await getPrismaClient();
  const validatedFields = categoryFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  await prisma.category.create({
    data: {
      name: validatedFields.data.name,
    },
  });

  revalidatePath("/dashboard/inventory");
}

const productFormSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters."),
  sku: z.string().min(1, "SKU is required."),
  barcode: z.string().optional(),
  description: z.string().optional(),
  cost: z.coerce.number().min(0, "Cost must be a positive number."),
  price: z.coerce.number().min(0, "Price must be a positive number."),
  categoryId: z.string().min(1, "Category is required."),
});

export async function createProduct(values: z.infer<typeof productFormSchema>) {
  const prisma = await getPrismaClient();
  const validatedFields = productFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  await prisma.product.create({
    data: {
      ...validatedFields.data,
    },
  });

  revalidatePath("/dashboard/inventory");
}

const warehouseFormSchema = z.object({
  name: z.string().min(2, "Warehouse name must be at least 2 characters."),
  location: z.string().optional(),
});

export async function createWarehouse(values: z.infer<typeof warehouseFormSchema>) {
  const prisma = await getPrismaClient();
  const validatedFields = warehouseFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  await prisma.warehouse.create({
    data: {
      ...validatedFields.data,
    },
  });

  revalidatePath("/dashboard/inventory");
}

const stockAdjustmentFormSchema = z.object({
  productId: z.string().min(1, "Product is required."),
  warehouseId: z.string().min(1, "Warehouse is required."),
  quantity: z.coerce.number(),
  reason: z.string().optional(),
});

export async function performStockAdjustment(values: z.infer<typeof stockAdjustmentFormSchema>) {
  const prisma = await getPrismaClient();
  const validatedFields = stockAdjustmentFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { productId, warehouseId, quantity, reason } = validatedFields.data;

  await prisma.$transaction(async (tx) => {
    await tx.stockMovement.create({
      data: {
        productId,
        warehouseId,
        quantity,
        reason,
        type: "ADJUSTMENT",
      },
    });

    await tx.inventoryItem.upsert({
      where: {
        productId_warehouseId: {
          productId,
          warehouseId,
        },
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        productId,
        warehouseId,
        quantity,
      },
    });
  });

  revalidatePath("/dashboard/inventory/adjustments");
  revalidatePath("/dashboard/inventory/stock");
}

const stockTransferFormSchema = z.object({
  productId: z.string().min(1, "Product is required."),
  sourceWarehouseId: z.string().min(1, "Source warehouse is required."),
  destinationWarehouseId: z.string().min(1, "Destination warehouse is required."),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1."),
});

export async function performStockTransfer(values: z.infer<typeof stockTransferFormSchema>) {
  const prisma = await getPrismaClient();
  const validatedFields = stockTransferFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { productId, sourceWarehouseId, destinationWarehouseId, quantity } = validatedFields.data;

  await prisma.$transaction(async (tx) => {
    // 1. Create TRANSFER_OUT movement
    await tx.stockMovement.create({
      data: {
        productId,
        warehouseId: sourceWarehouseId,
        quantity: -quantity,
        type: "TRANSFER_OUT",
      },
    });

    // 2. Create TRANSFER_IN movement
    await tx.stockMovement.create({
      data: {
        productId,
        warehouseId: destinationWarehouseId,
        quantity,
        type: "TRANSFER_IN",
      },
    });

    // 3. Decrement stock from source warehouse
    await tx.inventoryItem.update({
      where: {
        productId_warehouseId: {
          productId,
          warehouseId: sourceWarehouseId,
        },
      },
      data: {
        quantity: {
          decrement: quantity,
        },
      },
    });

    // 4. Increment stock in destination warehouse
    await tx.inventoryItem.upsert({
      where: {
        productId_warehouseId: {
          productId,
          warehouseId: destinationWarehouseId,
        },
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        productId,
        warehouseId: destinationWarehouseId,
        quantity,
      },
    });
  });

  revalidatePath("/dashboard/inventory/adjustments");
  revalidatePath("/dashboard/inventory/stock");
}
