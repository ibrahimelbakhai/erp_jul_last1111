import { CategoryManagement } from "./_components/category-management";
import { ProductManagement } from "./_components/product-management";
import { WarehouseManagement } from "./_components/warehouse-management";

export default async function InventoryPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <ProductManagement />
        </div>
        <div className="space-y-8">
          <CategoryManagement />
          <WarehouseManagement />
        </div>
      </div>
    </div>
  );
}
