"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { performStockTransfer } from "../actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Product, Warehouse } from "@prisma/client";

const formSchema = z.object({
  productId: z.string().min(1, "Product is required."),
  sourceWarehouseId: z.string().min(1, "Source warehouse is required."),
  destinationWarehouseId: z.string().min(1, "Destination warehouse is required."),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1."),
});

interface StockTransferFormProps {
  products: Product[];
  warehouses: Warehouse[];
}

export function StockTransferForm({ products, warehouses }: StockTransferFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      sourceWarehouseId: "",
      destinationWarehouseId: "",
      quantity: 1,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await performStockTransfer(values);
    form.reset();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <select {...form.register("productId")}>
        <option value="">Select a product</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>
      <select {...form.register("sourceWarehouseId")}>
        <option value="">Select source warehouse</option>
        {warehouses.map((warehouse) => (
          <option key={warehouse.id} value={warehouse.id}>
            {warehouse.name}
          </option>
        ))}
      </select>
      <select {...form.register("destinationWarehouseId")}>
        <option value="">Select destination warehouse</option>
        {warehouses.map((warehouse) => (
          <option key={warehouse.id} value={warehouse.id}>
            {warehouse.name}
          </option>
        ))}
      </select>
      <Input {...form.register("quantity")} type="number" placeholder="Quantity" />
      <Button type="submit">Perform Transfer</Button>
    </form>
  );
}
