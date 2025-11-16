'use client';

import { updateFiscalPeriodStatus, createFiscalYear } from '@/app/dashboard/gl/fiscal-periods/actions';
import { PlusIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useFormState } from 'react-dom';
import { Button } from '@/app/ui/button';
import { FiscalPeriodStatus } from '@prisma/client';

export function CreateFiscalYear() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createFiscalYear, initialState);

  return (
    <form action={dispatch} className="flex items-center gap-2">
      <input
        id="year"
        name="year"
        type="number"
        defaultValue={new Date().getFullYear()}
        className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
        aria-describedby="year-error"
      />
      <Button type="submit">
        <span className="hidden md:block">Create Year</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </Button>
      <div id="year-error" aria-live="polite" aria-atomic="true">
        {state?.errors?.year &&
          state.errors.year.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </form>
  );
}

export function UpdateStatus({ id, currentStatus }: { id: string, currentStatus: FiscalPeriodStatus }) {
  const newStatus = currentStatus === FiscalPeriodStatus.OPEN ? FiscalPeriodStatus.CLOSED : FiscalPeriodStatus.OPEN;
  const updateStatusWithId = updateFiscalPeriodStatus.bind(null, id, newStatus);

  return (
    <form action={updateStatusWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        {newStatus === FiscalPeriodStatus.CLOSED ? (
            <XCircleIcon className="w-5 text-red-500" title="Close Period" />
        ) : (
            <CheckCircleIcon className="w-5 text-green-500" title="Open Period" />
        )}
      </button>
    </form>
  );
}
