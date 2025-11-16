'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/ui/table';
import { Journal, JournalLine } from '@prisma/client';
import { formatDate } from '@/lib/utils';

type JournalWithLines = Journal & { lines: JournalLine[] };

export default function JournalEntriesTable({ journalEntries }: { journalEntries: JournalWithLines[] }) {

  const calculateTotal = (lines: JournalLine[]) => {
    return lines.reduce((sum, line) => sum + line.debit, 0);
  };

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <Table className="hidden min-w-full text-gray-900 md:table">
            <TableHeader className="rounded-lg text-left text-sm font-normal">
              <TableRow>
                <TableHead scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Date
                </TableHead>
                <TableHead scope="col" className="px-3 py-5 font-medium">
                  Reference
                </TableHead>
                <TableHead scope="col" className="px-3 py-5 font-medium">
                  Type
                </TableHead>
                <TableHead scope="col" className="px-3 py-5 font-medium">
                  Amount
                </TableHead>
                <TableHead scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
              {journalEntries?.map((journal) => (
                <TableRow
                  key={journal.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
                    {formatDate(journal.date)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-3">
                    {journal.reference}
                  </TableCell>
                   <TableCell className="whitespace-nowrap px-3 py-3">
                    {journal.type}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-3">
                    {calculateTotal(journal.lines).toFixed(2)} {journal.currency}
                  </TableCell>
                  <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      {/* Placeholder for future update/delete buttons */}
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
