'use client';

import {
  LayoutDashboard,
  Building2,
  Users,
  Settings,
  Landmark,
  FilePen,
  ChevronDown,
  Building,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    title: 'Finance',
    icon: Landmark,
    subLinks: [
      {
        title: 'Chart of Accounts',
        icon: FilePen,
        href: '/dashboard/gl/chart-of-accounts',
      },
      {
        title: 'Cost Centers',
        icon: Building,
        href: '/dashboard/gl/cost-centers',
      },
    ],
  },
  {
    title: 'Company',
    icon: Building2,
    href: '/dashboard/company',
  },
  {
    title: 'Users',
    icon: Users,
    href: '/dashboard/users',
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/dashboard/settings',
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <nav className="flex flex-col gap-2 p-4">
      {navLinks.map((link) =>
        link.subLinks ? (
          <div key={link.title}>
            <button
              onClick={() => toggleMenu(link.title)}
              className="flex w-full items-center justify-between rounded-md p-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <div className="flex items-center gap-2">
                <link.icon className="h-5 w-5" />
                <span>{link.title}</span>
              </div>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  openMenus[link.title] ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openMenus[link.title] && (
              <div className="ml-4 mt-2 flex flex-col gap-1 border-l pl-4">
                {link.subLinks.map((subLink) => (
                  <Link
                    key={subLink.title}
                    href={subLink.href}
                    className={`flex items-center gap-2 rounded-md p-2 text-sm font-medium ${
                      pathname === subLink.href
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <subLink.icon className="h-5 w-5" />
                    <span>{subLink.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Link
            key={link.title}
            href={link.href}
            className={`flex items-center gap-2 rounded-md p-2 text-sm font-medium ${
              pathname === link.href
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <link.icon className="h-5 w-5" />
            <span>{link.title}</span>
          </Link>
        )
      )}
    </nav>
  );
}
