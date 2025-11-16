import { getTrialBalance, TrialBalanceData } from '@/app/dashboard/gl/reports/trial-balance/actions';
import { lusitana } from '@/app/ui/fonts';
import ReportFilters from '@/app/dashboard/gl/reports/trial-balance/filters';
import ReportTable from '@/app/dashboard/gl/reports/trial-balance/table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trial Balance Report',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    startDate?: string;
    endDate?: string;
  };
}) {
  const startDate = searchParams?.startDate || new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0];
  const endDate = searchParams?.endDate || new Date().toISOString().split('T')[0];

  // Create a FormData object to pass to the server action
  const formData = new FormData();
  formData.append('startDate', startDate);
  formData.append('endDate', endDate);

  // We call the action directly here to fetch the data on initial load
  const { data: trialBalanceData = [] } = await getTrialBalance({data: []}, formData);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between mb-4">
        <h1 className={`${lusitana.className} text-2xl`}>Trial Balance Report</h1>
      </div>

      <ReportFilters />

      <div className="mt-6">
        <ReportTable initialData={trialBalanceData} />
      </div>
    </div>
  );
}
