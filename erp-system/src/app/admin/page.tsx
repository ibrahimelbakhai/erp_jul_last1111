import { getPrismaClient } from "@/lib/prisma";
import { CompanyForm } from "./_components/company-form";

export default async function AdminDashboard() {
  const prisma = await getPrismaClient();
  const companies = await prisma.company.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Super Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Create New Company</h2>
          <CompanyForm />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Existing Companies</h2>
          <div className="border rounded-lg p-4">
            <ul>
              {companies.map((company) => (
                <li key={company.id} className="border-b last:border-b-0 py-2">
                  {company.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
