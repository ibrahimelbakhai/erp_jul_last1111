import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <nav className="w-64 h-screen bg-gray-800 text-white p-4">
        <ul>
          <li>
            <Link href="/dashboard/inventory">Inventory</Link>
          </li>
          <li>
            <Link href="/dashboard/sales">Sales</Link>
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
