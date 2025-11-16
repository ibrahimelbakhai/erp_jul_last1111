'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/ui/table';
import { FiscalPeriod } from '@prisma/client';
import { UpdateStatus } from './buttons';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/app/ui/badge';


export default function FiscalPeriodsTable({ fiscalPeriods }: { fiscalPeriods: FiscalPeriod[] }) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <Table className="hidden min-w-full text-gray-900 md:table">
            <TableHeader className="rounded-lg text-left text-sm font-normal">
              <TableRow>
                <TableHead scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Period
                </TableHead>
                <TableHead scope="col" className="px-3 py-5 font-medium">
                  Start Date
                </TableHead>
                <TableHead scope="col" className="px-3 py-5 font-medium">
                  End Date
                </TableHead>
                <TableHead scope="col" className="px-3 py-5 font-medium">
                  Status
                </TableHead>
                <TableHead scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
              {fiscalPeriods?.map((period) => (
                <TableRow
                  key={period.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
                    {period.period}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-3">
                    {formatDate(period.startDate)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-3">
                    {formatDate(period.endDate)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-3">
                  <Badge variant={period.status === 'OPEN' ? 'success' : 'destructive'}>
                    {period.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateStatus id={period.id} currentStatus={period.status} />
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
