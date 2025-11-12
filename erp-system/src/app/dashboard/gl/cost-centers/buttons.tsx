'use client';

import { deleteCostCenter } from '@/app/dashboard/gl/cost-centers/actions';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';

export function CreateCostCenter() {
  return (
    <Link
      href="/dashboard/gl/cost-centers/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Cost Center</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateCostCenter({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/gl/cost-centers/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteCostCenter({ id }: { id: string }) {
    const { pending } = useFormStatus();
  const deleteCostCenterWithId = deleteCostCenter.bind(null, id);

  return (
    <form action={deleteCostCenterWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100" disabled={pending}>
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
