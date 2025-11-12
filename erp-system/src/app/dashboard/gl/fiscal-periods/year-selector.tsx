'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function YearSelector({ years }: { years: number[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const currentYear = new Date().getFullYear();

  function handleYearChange(year: string) {
    const params = new URLSearchParams(searchParams);
    if (year) {
      params.set('year', year);
    } else {
      params.delete('year');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  // Ensure the current year is in the list if it's not already
  const displayYears = [...years];
  if (!displayYears.includes(currentYear)) {
    displayYears.push(currentYear);
    displayYears.sort((a, b) => b - a);
  }

  return (
    <div className="relative">
      <select
        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-4 pr-10 text-sm outline-2 placeholder:text-gray-500"
        onChange={(e) => handleYearChange(e.target.value)}
        defaultValue={searchParams.get('year')?.toString() || currentYear}
      >
        {displayYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
