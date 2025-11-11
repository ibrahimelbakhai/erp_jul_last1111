"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createWarehouse } from "../actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2, "Warehouse name must be at least 2 characters."),
  location: z.string().optional(),
});

export function WarehouseForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createWarehouse(values);
    form.reset();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
      <Input {...form.register("name")} placeholder="New warehouse name" />
      <Input {...form.register("location")} placeholder="Location (optional)" />
      <Button type="submit">Add</Button>
    </form>
  );
}
