import Form from '@/app/dashboard/gl/cost-centers/create-form';
import { getCostCenters } from '@/app/dashboard/gl/cost-centers/actions';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Cost Center',
};

export default async function Page() {
  const { data: costCenters = [] } = await getCostCenters();

  return (
    <main>
      <Form costCenters={costCenters} />
    </main>
  );
}
