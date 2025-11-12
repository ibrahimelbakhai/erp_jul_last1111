import Form from '@/app/dashboard/gl/chart-of-accounts/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { getAccounts } from '@/app/dashboard/gl/chart-of-accounts/actions';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Account',
};

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [account, { data: accounts = [] }] = await Promise.all([
    prisma.account.findUnique({ where: { id } }),
    getAccounts(),
  ]);

  if (!account) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Chart of Accounts', href: '/dashboard/gl/chart-of-accounts' },
          {
            label: 'Edit Account',
            href: `/dashboard/gl/chart-of-accounts/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form account={account} accounts={accounts} />
    </main>
  );
}
