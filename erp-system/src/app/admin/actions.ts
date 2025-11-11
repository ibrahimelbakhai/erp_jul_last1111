"use server";

import { getPrismaClient } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters."),
});

export async function createCompany(values: z.infer<typeof formSchema>) {
  const prisma = await getPrismaClient();
  const validatedFields = formSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  await prisma.company.create({
    data: {
      name: validatedFields.data.name,
    },
  });

  revalidatePath("/admin");
}
