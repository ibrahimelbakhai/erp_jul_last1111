import { getPrismaClient } from "@/lib/prisma";
import { CategoryForm } from "./category-form";

export async function CategoryManagement() {
  const prisma = await getPrismaClient();
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2">Categories</h3>
      <CategoryForm />
      <ul className="mt-4 space-y-2">
        {categories.map((category) => (
          <li key={category.id} className="border-b last:border-b-0 py-2">
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
