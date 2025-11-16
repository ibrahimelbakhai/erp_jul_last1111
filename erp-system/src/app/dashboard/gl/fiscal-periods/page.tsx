import { getDistinctFiscalYears, getFiscalPeriods } from '@/app/dashboard/gl/fiscal-periods/actions';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { CreateFiscalYear } from '@/app/dashboard/gl/fiscal-periods/buttons';
import Table from '@/app/dashboard/gl/fiscal-periods/table';
import YearSelector from '@/app/dashboard/gl/fiscal-periods/year-selector';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fiscal Periods',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    year?: string;
  };
}) {
  const currentYear = new Date().getFullYear();
  const selectedYear = Number(searchParams?.year) || currentYear;

  const { data: fiscalYears = [] } = await getDistinctFiscalYears();
  const { data: fiscalPeriods = [] } = await getFiscalPeriods(selectedYear);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Fiscal Periods</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <YearSelector years={fiscalYears} />
        <CreateFiscalYear />
      </div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <Table fiscalPeriods={fiscalPeriods} />
      </Suspense>
    </div>
  );
}
