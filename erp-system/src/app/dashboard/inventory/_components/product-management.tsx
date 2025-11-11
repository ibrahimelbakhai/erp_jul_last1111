import { getPrismaClient } from "@/lib/prisma";
import { ProductDataTable } from "./product-data-table";
import { columns } from "./product-columns";
import { ProductForm } from "./product-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export async function ProductManagement() {
  const prisma = await getPrismaClient();
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  const categories = await prisma.category.findMany();

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Products</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Product</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <ProductForm categories={categories} />
          </DialogContent>
        </Dialog>
      </div>
      <ProductDataTable columns={columns} data={products} />
    </div>
  );
}
