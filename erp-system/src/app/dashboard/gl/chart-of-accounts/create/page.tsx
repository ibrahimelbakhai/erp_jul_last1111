import Form from '@/app/dashboard/gl/chart-of-accounts/create-form';
import { getAccounts } from '@/app/dashboard/gl/chart-of-accounts/actions';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account',
};

export default async function Page() {
  const { data: accounts = [] } = await getAccounts();

  return (
    <main>
      <Form accounts={accounts} />
    </main>
  );
}
