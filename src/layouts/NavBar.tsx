import Link from 'next/link';

import type { Theme } from '@types';

import { Logo, NavItems, SideBarButton, ThemeToggle } from '@components';

interface NavBarProps {
  theme: Theme | null;
}

export default function NavBar({ theme }: NavBarProps) {
  return (
    <header className="sticky left-0 right-0 top-0 z-50 flex h-48 w-full justify-center px-4">
      <section className="flex h-full w-full">
        <div className="flex flex-1 items-center justify-start md:hidden">
          <SideBarButton variant="secondary" />
        </div>
        <div className="flex h-full flex-1 justify-center gap-x-2 md:justify-start">
          <Link
            href="/"
            className="min-w-max transition-transform hover:scale-105"
          >
            <Logo />
          </Link>
        </div>
        <NavItems className="flex-[2] gap-x-4 max-md:hidden" />
        <div className="flex h-full flex-1 items-center justify-end gap-x-2">
          <ThemeToggle theme={theme} />
        </div>
      </section>
    </header>
  );
}
