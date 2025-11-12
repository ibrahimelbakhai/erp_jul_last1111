import Form from '@/app/dashboard/gl/cost-centers/edit-form';
import { getCostCenters } from '@/app/dashboard/gl/cost-centers/actions';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Cost Center',
};

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [costCenter, { data: costCenters = [] }] = await Promise.all([
    prisma.costCenter.findUnique({ where: { id } }),
    getCostCenters(),
  ]);

  if (!costCenter) {
    notFound();
  }

  return (
    <main>
      <Form costCenter={costCenter} costCenters={costCenters} />
    </main>
  );
}
