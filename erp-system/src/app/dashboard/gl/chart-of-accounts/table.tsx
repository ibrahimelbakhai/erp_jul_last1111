'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/ui/table';
import { Account } from '@prisma/client';
import { UpdateAccount, DeleteAccount } from './buttons';

export default function AccountsTable({ accounts }: { accounts: Account[] }) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {accounts?.map((account) => (
              <div
                key={account.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{account.code}</p>
                    </div>
                    <p className="text-sm text-gray-500">{account.name}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {account.type}
                    </p>
                    <p>{account.currency}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateAccount id={account.id} />
                    <DeleteAccount id={account.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Table className="hidden min-w-full text-gray-900 md:table">
            <TableHeader className="rounded-lg text-left text-sm font-normal">
              <TableRow>
                <TableHead scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Code
                </TableHead>
                <TableHead scope="col" className="px-3 py-5 font-medium">
                  Name
                </TableHead>
                <TableHead scope="col" className="px-3 py-5 font-medium">
                  Type
                </TableHead>
                <TableHead scope="col" className="px-3 py-5 font-medium">
                  Currency
                </TableHead>
                <TableHead scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
              {accounts?.map((account) => (
                <TableRow
                  key={account.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
                    {account.code}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-3">
                    {account.name}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-3">
                    {account.type}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-3">
                    {account.currency}
                  </TableCell>
                  <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateAccount id={account.id} />
                      <DeleteAccount id={account.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
