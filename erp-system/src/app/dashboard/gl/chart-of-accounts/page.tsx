import { getAccounts } from '@/app/dashboard/gl/chart-of-accounts/actions';
import { ChartOfAccountsTable } from '@/app/dashboard/gl/chart-of-accounts/definitions';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import Search from '@/app/ui/search';
import { CreateAccount } from '@/app/dashboard/gl/chart-of-accounts/buttons';
import Table from '@/app/dashboard/gl/chart-of-accounts/table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chart of Accounts',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const { data: accounts = [] } = await getAccounts();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Chart of Accounts</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search accounts..." />
        <CreateAccount />
      </div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <Table accounts={accounts} />
      </Suspense>
    </div>
  );
}
