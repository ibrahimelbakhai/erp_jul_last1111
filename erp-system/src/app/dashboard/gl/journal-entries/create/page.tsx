import Form from '@/app/dashboard/gl/journal-entries/create-form';
import { getAccountsForDropdown, getCostCentersForDropdown } from '@/app/dashboard/gl/journal-entries/actions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Journal Entry',
};

export default async function Page() {
  const { data: accounts = [] } = await getAccountsForDropdown();
  const { data: costCenters = [] } = await getCostCentersForDropdown();

  return (
    <main>
      <h1 className="text-2xl font-semibold mb-4">Create Journal Entry</h1>
      <Form accounts={accounts} costCenters={costCenters} />
    </main>
  );
}
