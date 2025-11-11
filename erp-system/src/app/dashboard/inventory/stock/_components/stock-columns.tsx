"use client";

import { ColumnDef } from "@tanstack/react-table";
import { InventoryItem, Product, Warehouse } from "@prisma/client";

type StockLevel = InventoryItem & {
  product: Product;
  warehouse: Warehouse;
};

export const columns: ColumnDef<StockLevel>[] = [
  {
    accessorKey: "product.name",
    header: "Product",
  },
  {
    accessorKey: "warehouse.name",
    header: "Warehouse",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
];
