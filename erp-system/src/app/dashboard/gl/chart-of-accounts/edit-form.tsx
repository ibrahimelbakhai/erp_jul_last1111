'use client';

import { useFormState } from 'react-dom';
import {
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateAccount } from '@/app/dashboard/gl/chart-of-accounts/actions';
import { GLAccount, AccountType } from '@prisma/client';

export default function EditAccountForm({
  account,
  accounts,
}: {
  account: GLAccount;
  accounts: GLAccount[];
}) {
  const initialState = { message: null, errors: {} };
  const updateAccountWithId = updateAccount.bind(null, account.id);
  const [state, dispatch] = useFormState(updateAccount, initialState);

  return (
    <form action={dispatch}>
      <input type="hidden" name="id" value={account.id} />
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Account Code */}
        <div className="mb-4">
          <label htmlFor="code" className="mb-2 block text-sm font-medium">
            Account Code
          </label>
          <div className="relative">
            <input
              id="code"
              name="code"
              type="text"
              defaultValue={account.code}
              placeholder="Enter account code"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="code-error"
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="code-error" aria-live="polite" aria-atomic="true">
            {state.errors?.code &&
              state.errors.code.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Account Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Account Name
          </label>
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={account.name}
              placeholder="Enter account name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="name-error"
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Account Type */}
        <div className="mb-4">
          <label htmlFor="type" className="mb-2 block text-sm font-medium">
            Account Type
          </label>
          <select
            id="type"
            name="type"
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={account.type}
            aria-describedby="type-error"
          >
            <option value="" disabled>
              Select an account type
            </option>
            {Object.values(AccountType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
        <div id="type-error" aria-live="polite" aria-atomic="true">
          {state.errors?.type &&
            state.errors.type.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>

        {/* Currency */}
        <div className="mb-4">
          <label htmlFor="currency" className="mb-2 block text-sm font-medium">
            Currency
          </label>
          <div className="relative">
            <input
              id="currency"
              name="currency"
              type="text"
              defaultValue={account.currency}
              placeholder="Enter currency"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="currency-error"
            />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="currency-error" aria-live="polite" aria-atomic="true">
            {state.errors?.currency &&
              state.errors.currency.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Parent Account */}
        <div className="mb-4">
          <label htmlFor="parentId" className="mb-2 block text-sm font-medium">
            Parent Account
          </label>
          <select
            id="parentId"
            name="parentId"
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={account.parentId || ''}
          >
            <option value="">
              Select a parent account
            </option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name}
              </option>
            ))}
          </select>
          <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
        <div id="parent-error" aria-live="polite" aria-atomic="true">
          {state.errors?.parentId &&
            state.errors.parentId.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>

        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/gl/chart-of-accounts"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Account</Button>
      </div>
    </form>
  );
}
