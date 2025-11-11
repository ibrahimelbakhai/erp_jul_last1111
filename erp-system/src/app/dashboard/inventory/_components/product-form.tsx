"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createProduct } from "../actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters."),
  sku: z.string().min(1, "SKU is required."),
  barcode: z.string().optional(),
  description: z.string().optional(),
  cost: z.coerce.number().min(0, "Cost must be a positive number."),
  price: z.coerce.number().min(0, "Price must be a positive number."),
  categoryId: z.string().min(1, "Category is required."),
});

interface ProductFormProps {
  categories: Category[];
}

export function ProductForm({ categories }: ProductFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      sku: "",
      barcode: "",
      description: "",
      cost: 0,
      price: 0,
      categoryId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createProduct(values);
    // Here you would typically close the dialog
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Input {...form.register("name")} placeholder="Product Name" />
      <Input {...form.register("sku")} placeholder="SKU" />
      <Input {...form.register("barcode")} placeholder="Barcode" />
      <Input {...form.register("description")} placeholder="Description" />
      <Input {...form.register("cost")} type="number" placeholder="Cost" />
      <Input {...form.register("price")} type="number" placeholder="Price" />
      <select {...form.register("categoryId")}>
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <Button type="submit">Save Product</Button>
    </form>
  );
}
