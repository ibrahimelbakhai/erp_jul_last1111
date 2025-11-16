'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/app/ui/button';
import { lusitana } from '@/app/ui/fonts';
import { useDebouncedCallback } from 'use-debounce';

export default function ReportFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFilterChange = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const { name, value } = e.target;
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handlePrint = () => {
    window.print();
  };

  // Set default dates if not present in searchParams
  const startDate = searchParams.get('startDate') || new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0];
  const endDate = searchParams.get('endDate') || new Date().toISOString().split('T')[0];

  return (
    <div className="flex items-center justify-between gap-2 md:mt-8">
      <form className="flex items-center gap-4">
        <div>
          <label htmlFor="startDate" className="mb-2 block text-sm font-medium">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            defaultValue={startDate}
            onChange={handleFilterChange}
            className="block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="mb-2 block text-sm font-medium">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            defaultValue={endDate}
            onChange={handleFilterChange}
            className="block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
          />
        </div>
      </form>
       <div className="self-end">
        <Button onClick={handlePrint}>
          Print
        </Button>
      </div>
    </div>
  );
}
