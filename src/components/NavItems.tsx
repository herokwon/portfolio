'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navItems } from '@data';

type NavItemsProps = React.ComponentPropsWithoutRef<'nav'>;

export default function NavItems({ ...props }: NavItemsProps) {
  const pathname = usePathname();

  return (
    <nav
      className={`flex h-full w-full items-center justify-center ${props.className ?? ''}`}
    >
      {navItems.map(navItem => (
        <Link
          key={navItem.path}
          href={navItem.path}
          className={`from-black to-black px-0.5 font-semibold transition-[background-size,_opacity] dark:from-white dark:to-white ${
            navItem.path === pathname
              ? 'bg-underline-active opacity-bold'
              : 'bg-underline opacity-off hover:opacity-bold'
          }`}
        >
          {navItem.heading}
        </Link>
      ))}
    </nav>
  );
}
