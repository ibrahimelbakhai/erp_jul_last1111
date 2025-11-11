import { getPrismaClient } from "@/lib/prisma";
import { WarehouseForm } from "./warehouse-form";

export async function WarehouseManagement() {
  const prisma = await getPrismaClient();
  const warehouses = await prisma.warehouse.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2">Warehouses</h3>
      <WarehouseForm />
      <ul className="mt-4 space-y-2">
        {warehouses.map((warehouse) => (
          <li key={warehouse.id} className="border-b last:border-b-0 py-2">
            {warehouse.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
