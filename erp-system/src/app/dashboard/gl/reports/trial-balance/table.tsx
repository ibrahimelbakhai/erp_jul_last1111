'use client';

import { TrialBalanceData } from '@/app/dashboard/gl/reports/trial-balance/actions';
import { lusitana } from '@/app/ui/fonts';

interface ReportTableProps {
  initialData: TrialBalanceData[];
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export default function ReportTable({ initialData }: ReportTableProps) {

  const totals = initialData.reduce(
    (acc, item) => {
      acc.debit += item.debit;
      acc.credit += item.credit;
      return acc;
    },
    { debit: 0, credit: 0 },
  );

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="min-w-full text-gray-900">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Account
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-right">
                  Debit
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-right">
                  Credit
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {initialData?.map((item) => (
                <tr
                  key={item.accountId}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <p>{item.accountName}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-right">
                    {formatCurrency(item.debit)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-right">
                    {formatCurrency(item.credit)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t">
                <tr className={`${lusitana.className} font-semibold`}>
                    <td className="px-4 py-3 sm:pl-6">Total</td>
                    <td className="px-3 py-3 text-right">{formatCurrency(totals.debit)}</td>
                    <td className="px-3 py-3 text-right">{formatCurrency(totals.credit)}</td>
                </tr>
                 {Math.abs(totals.debit - totals.credit) > 0.001 && (
                    <tr className="text-red-500 font-bold">
                        <td colSpan={3} className="py-2 text-center">
                            Totals do not match! The books are out of balance.
                        </td>
                    </tr>
                )}
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
