"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const products = [
    {
        name: "Eco-Friendly Cleaning Spray",
        sku: "CLEAN-001",
        category: "Cleaning Supplies",
        warehouse: "Main Warehouse",
        stockLevel: 150,
        reorderPoint: 50,
        actions: "View Details",
    },
    {
        name: "Organic Laundry Detergent",
        sku: "LAUN-002",
        category: "Laundry Supplies",
        warehouse: "Main Warehouse",
        stockLevel: 200,
        reorderPoint: 75,
        actions: "View Details",
    },
    {
        name: "Reusable Shopping Bags",
        sku: "BAG-003",
        category: "Accessories",
        warehouse: "Retail Store",
        stockLevel: 500,
        reorderPoint: 200,
        actions: "View Details",
    },
    {
        name: "Bamboo Toothbrushes",
        sku: "TOOTH-004",
        category: "Personal Care",
        warehouse: "Retail Store",
        stockLevel: 300,
        reorderPoint: 100,
        actions: "View Details",
    },
    {
        name: "Stainless Steel Water Bottles",
        sku: "BOTTLE-005",
        category: "Accessories",
        warehouse: "Main Warehouse",
        stockLevel: 400,
        reorderPoint: 150,
        actions: "View Details",
    },
    {
        name: "Recycled Paper Towels",
        sku: "TOWEL-006",
        category: "Cleaning Supplies",
        warehouse: "Main Warehouse",
        stockLevel: 250,
        reorderPoint: 100,
        actions: "View Details",
    },
    {
        name: "Plant-Based Dish Soap",
        sku: "DISH-007",
        category: "Cleaning Supplies",
        warehouse: "Main Warehouse",
        stockLevel: 180,
        reorderPoint: 60,
        actions: "View Details",
    },
    {
        name: "Biodegradable Trash Bags",
        sku: "TRASH-008",
        category: "Cleaning Supplies",
        warehouse: "Main Warehouse",
        stockLevel: 350,
        reorderPoint: 120,
        actions: "View Details",
    },
    {
        name: "Natural Air Fresheners",
        sku: "AIR-009",
        category: "Home Goods",
        warehouse: "Retail Store",
        stockLevel: 220,
        reorderPoint: 80,
        actions: "View Details",
    },
    {
        name: "Compostable Food Containers",
        sku: "FOOD-010",
        category: "Kitchen Supplies",
        warehouse: "Main Warehouse",
        stockLevel: 280,
        reorderPoint: 90,
        actions: "View Details",
    },
];

export function ProductsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[400px]">Product Name</TableHead>
          <TableHead className="w-[400px]">SKU</TableHead>
          <TableHead className="w-[400px]">Category</TableHead>
          <TableHead className="w-[400px]">Warehouse</TableHead>
          <TableHead className="w-[400px]">Stock Level</TableHead>
          <TableHead className="w-[400px]">Reorder Point</TableHead>
          <TableHead className="w-60">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.sku}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{product.sku}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>{product.warehouse}</TableCell>
            <TableCell>{product.stockLevel}</TableCell>
            <TableCell>{product.reorderPoint}</TableCell>
            <TableCell>{product.actions}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
