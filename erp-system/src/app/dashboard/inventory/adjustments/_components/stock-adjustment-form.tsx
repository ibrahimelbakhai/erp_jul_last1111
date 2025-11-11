"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { performStockAdjustment } from "../actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Product, Warehouse } from "@prisma/client";

const formSchema = z.object({
  productId: z.string().min(1, "Product is required."),
  warehouseId: z.string().min(1, "Warehouse is required."),
  quantity: z.coerce.number(),
  reason: z.string().optional(),
});

interface StockAdjustmentFormProps {
  products: Product[];
  warehouses: Warehouse[];
}

export function StockAdjustmentForm({ products, warehouses }: StockAdjustmentFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      warehouseId: "",
      quantity: 0,
      reason: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await performStockAdjustment(values);
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
      <select {...form.register("warehouseId")}>
        <option value="">Select a warehouse</option>
        {warehouses.map((warehouse) => (
          <option key={warehouse.id} value={warehouse.id}>
            {warehouse.name}
          </option>
        ))}
      </select>
      <Input {...form.register("quantity")} type="number" placeholder="Quantity" />
      <Input {...form.register("reason")} placeholder="Reason (optional)" />
      <Button type="submit">Perform Adjustment</Button>
    </form>
  );
}
