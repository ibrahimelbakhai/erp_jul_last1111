import { getJournalEntries } from '@/app/dashboard/gl/journal-entries/actions';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { CreateJournalEntry } from '@/app/dashboard/gl/journal-entries/buttons';
import Table from '@/app/dashboard/gl/journal-entries/table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Journal Entries',
};

export default async function Page() {

  const { data: journalEntries = [] } = await getJournalEntries();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Journal Entries</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* Placeholder for future search/filter */}
        <div />
        <CreateJournalEntry />
      </div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <Table journalEntries={journalEntries} />
      </Suspense>
    </div>
  );
}
