import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";

const prisma = new PrismaClient();

/**
 * A factory function that returns a security-enhanced Prisma client.
 * This client automatically enforces multi-tenant data isolation for all relevant models.
 *
 * @returns An instrumented Prisma client that is tenant-aware.
 */
export async function getPrismaClient() {
  const session = await auth();
  const user = session?.user;

  if (!user || user.role === "SUPER_ADMIN") {
    // If there's no user or the user is a SUPER_ADMIN, return the base client.
    return prisma;
  }

  // For regular, authenticated users, extend the client with our security rule.
  return prisma.$extends({
    query: {
      $allModels: {
        async $allOperations({ model, operation, args }) {
          const modelsWithCompanyId = [
            'User', 'Department', 'Product', 'Customer', 'SalesOrder', 'PurchaseOrder', 'InventoryItem'
          ];

          if (modelsWithCompanyId.includes(model)) {
            // For 'create' operations, inject the companyId into the data payload.
            if (operation === 'create') {
              args.data = { ...args.data, companyId: user.companyId };
            }
            // For all other operations (reads, updates, deletes), inject the companyId into the where clause.
            else {
              args.where = { ...args.where, companyId: user.companyId };
            }
          }

          // @ts-ignore
          return prisma[model.toLowerCase()][operation](args);
        },
      },
    },
  });
}
