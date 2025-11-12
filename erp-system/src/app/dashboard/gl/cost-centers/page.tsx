import { getCostCenters } from '@/app/dashboard/gl/cost-centers/actions';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import Search from '@/app/ui/search';
import { CreateCostCenter } from '@/app/dashboard/gl/cost-centers/buttons';
import Table from '@/app/dashboard/gl/cost-centers/table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cost Centers',
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

  const { data: costCenters = [] } = await getCostCenters();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Cost Centers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search cost centers..." />
        <CreateCostCenter />
      </div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <Table costCenters={costCenters} />
      </Suspense>
    </div>
  );
}
