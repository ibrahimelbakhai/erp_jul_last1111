import { getPrismaClient } from "@/lib/prisma";
import { StockDataTable } from "./_components/stock-data-table";
import { columns } from "./_components/stock-columns";

export default async function StockLevelPage() {
  const prisma = await getPrismaClient();
  const stockLevels = await prisma.inventoryItem.findMany({
    include: {
      product: true,
      warehouse: true,
    },
    orderBy: {
      product: {
        name: "asc",
      },
    },
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Stock Levels</h1>
      <StockDataTable columns={columns} data={stockLevels} />
    </div>
  );
}
