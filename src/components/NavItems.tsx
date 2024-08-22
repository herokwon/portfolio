'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ARTICLE_CATEGORIES, navItems } from '@data';

type NavItemsProps = React.ComponentPropsWithoutRef<'nav'>;

export default function NavItems({ ...props }: NavItemsProps) {
  const pathname = usePathname();

  return (
    <nav
      className={`flex items-center justify-center ${props.className ?? ''}`}
    >
      {navItems.map(navItem => (
        <Link
          key={navItem.path}
          href={navItem.path}
          className={`from-black to-black px-0.5 font-semibold transition-[background-size,_opacity] bg-underline-[2px] dark:from-white dark:to-white ${
            navItem.path === pathname ||
            (Object.keys(ARTICLE_CATEGORIES).reduce(
              (acc, value) =>
                acc ||
                (navItem.path.includes(value) &&
                  pathname.startsWith(`/${value}/page`)),
              false,
            ) &&
              !isNaN(Number(pathname.substring(pathname.lastIndexOf('/') + 1))))
              ? 'opacity-bold active'
              : 'opacity-off hover:opacity-bold'
          }`}
        >
          {navItem.heading}
        </Link>
      ))}
    </nav>
  );
}
