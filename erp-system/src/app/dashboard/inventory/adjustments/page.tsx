import { getPrismaClient } from "@/lib/prisma";
import { StockAdjustmentForm } from "./_components/stock-adjustment-form";
import { StockTransferForm } from "./_components/stock-transfer-form";

export default async function StockAdjustmentsPage() {
  const prisma = await getPrismaClient();
  const products = await prisma.product.findMany();
  const warehouses = await prisma.warehouse.findMany();
  const stockMovements = await prisma.stockMovement.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Stock Movements</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">New Adjustment</h2>
            <StockAdjustmentForm products={products} warehouses={warehouses} />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">New Transfer</h2>
            <StockTransferForm products={products} warehouses={warehouses} />
          </div>
        </div>
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-2">Movement History</h2>
          <div className="border rounded-lg p-4">
            <ul>
              {stockMovements.map((movement) => (
                <li key={movement.id} className="border-b last:border-b-0 py-2">
                  {movement.type}: {movement.quantity} of {movement.productId} in {movement.warehouseId}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
