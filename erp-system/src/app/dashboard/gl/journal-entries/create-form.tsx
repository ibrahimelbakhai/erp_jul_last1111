'use client';

import { useFormState } from 'react-dom';
import { createJournalEntry } from '@/app/dashboard/gl/journal-entries/actions';
import { GLAccount, CostCenter, JournalType } from '@prisma/client';
import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

type JournalLineState = {
  id: number;
  accountId: string;
  description: string;
  debit: number;
  credit: number;
  costCenterId?: string | null;
};

export default function CreateJournalEntryForm({
  accounts,
  costCenters,
}: {
  accounts: Partial<GLAccount>[];
  costCenters: Partial<CostCenter>[];
}) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createJournalEntry, initialState);

  const [lines, setLines] = useState<JournalLineState[]>([
    { id: 1, accountId: '', description: '', debit: 0, credit: 0 },
    { id: 2, accountId: '', description: '', debit: 0, credit: 0 },
  ]);
  const [totalDebits, setTotalDebits] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const debits = lines.reduce((sum, line) => sum + Number(line.debit || 0), 0);
    const credits = lines.reduce((sum, line) => sum + Number(line.credit || 0), 0);
    setTotalDebits(debits);
    setTotalCredits(credits);
    setBalance(debits - credits);
  }, [lines]);

  const handleLineChange = (index: number, field: keyof JournalLineState, value: any) => {
    const newLines = [...lines];
    (newLines[index] as any)[field] = value;
    setLines(newLines);
  };

  const addLine = () => {
    setLines([...lines, { id: Date.now(), accountId: '', description: '', debit: 0, credit: 0 }]);
  };

  const removeLine = (index: number) => {
    const newLines = lines.filter((_, i) => i !== index);
    setLines(newLines);
  };

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="date" className="mb-2 block text-sm font-medium">Date</label>
            <input type="date" id="date" name="date" required className="input" defaultValue={new Date().toISOString().split('T')[0]} />
          </div>
          <div>
            <label htmlFor="type" className="mb-2 block text-sm font-medium">Type</label>
            <select id="type" name="type" required className="input">
              {Object.values(JournalType).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="reference" className="mb-2 block text-sm font-medium">Reference</label>
            <input type="text" id="reference" name="reference" className="input" />
          </div>
           <div>
            <label htmlFor="currency" className="mb-2 block text-sm font-medium">Currency</label>
            <input type="text" id="currency" name="currency" required className="input" defaultValue="USD" />
          </div>
        </div>

        {/* Lines Section */}
        <div className="overflow-x-auto">
           <table className="min-w-full">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium">Account</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Description</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Debit</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Credit</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Cost Center</th>
                        <th className="px-4 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {lines.map((line, index) => (
                        <tr key={line.id}>
                            <td>
                                <select value={line.accountId} onChange={(e) => handleLineChange(index, 'accountId', e.target.value)} required className="input">
                                    <option value="" disabled>Select Account</option>
                                    {accounts.map(acc => <option key={acc.id} value={acc.id}>{acc.code} - {acc.name}</option>)}
                                </select>
                            </td>
                            <td><input type="text" value={line.description} onChange={(e) => handleLineChange(index, 'description', e.target.value)} className="input" /></td>
                            <td><input type="number" step="0.01" value={line.debit} onChange={(e) => handleLineChange(index, 'debit', parseFloat(e.target.value))} className="input" /></td>
                            <td><input type="number" step="0.01" value={line.credit} onChange={(e) => handleLineChange(index, 'credit', parseFloat(e.target.value))} className="input" /></td>
                            <td>
                                <select value={line.costCenterId || ''} onChange={(e) => handleLineChange(index, 'costCenterId', e.target.value)} className="input">
                                    <option value="">None</option>
                                    {costCenters.map(cc => <option key={cc.id} value={cc.id}>{cc.code} - {cc.name}</option>)}
                                </select>
                            </td>
                            <td>
                                <button type="button" onClick={() => removeLine(index)} className="p-2 text-red-500 hover:text-red-700">
                                    <TrashIcon className="h-5 w-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <button type="button" onClick={addLine} className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800">
            <PlusIcon className="h-5 w-5" /> Add Line
        </button>

        {/* Hidden input to pass lines data */}
        <input type="hidden" name="lines" value={JSON.stringify(lines)} />

        {/* Totals Section */}
        <div className="mt-6 flex justify-end gap-8 border-t pt-4">
            <div className="text-right">
                <p className="font-medium">Total Debits:</p>
                <p>{totalDebits.toFixed(2)}</p>
            </div>
            <div className="text-right">
                <p className="font-medium">Total Credits:</p>
                <p>{totalCredits.toFixed(2)}</p>
            </div>
            <div className="text-right">
                <p className="font-medium">Balance:</p>
                <p className={balance !== 0 ? 'text-red-500' : 'text-green-500'}>{balance.toFixed(2)}</p>
            </div>
        </div>

        {state?.message && <p className="mt-2 text-sm text-red-500">{state.message}</p>}

      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/gl/journal-entries" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600">
          Cancel
        </Link>
        <Button type="submit">Create Journal Entry</Button>
      </div>
    </form>
  );
}
