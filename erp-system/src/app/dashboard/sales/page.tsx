import { CustomerManagement } from "./_components/customer-management";
import { SalesOrderManagement } from "./_components/sales-order-management";
import { InvoiceManagement } from "./_components/invoice-management";
import prisma from "@/lib/prisma";
import { getCompanyId } from "@/lib/auth";

export default async function SalesPage() {
  const companyId = await getCompanyId();

  if (!companyId) {
    return <div>Company not found</div>;
  }

  const customers = await prisma.customer.findMany({ where: { companyId } });
  const salesOrders = await prisma.salesOrder.findMany({ where: { companyId } });
  const invoices = await prisma.invoice.findMany({ where: { companyId } });
  const products = await prisma.product.findMany({ where: { companyId } });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sales Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <SalesOrderManagement salesOrders={salesOrders} customers={customers} products={products} />
        </div>
        <div className="space-y-8">
          <CustomerManagement customers={customers} />
          <InvoiceManagement invoices={invoices} customers={customers} products={products} />
        </div>
      </div>
    </div>
  );
}
