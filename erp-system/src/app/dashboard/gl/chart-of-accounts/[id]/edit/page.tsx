import Form from '@/app/dashboard/gl/chart-of-accounts/edit-form';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { getAccounts } from '@/app/dashboard/gl/chart-of-accounts/actions';
import { getPrismaClient } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Account',
};

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const prisma = getPrismaClient();
  const [account, { data: accounts = [] }] = await Promise.all([
    prisma.gLAccount.findUnique({ where: { id } }),
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
