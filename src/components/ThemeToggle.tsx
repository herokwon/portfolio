'use client';

import { Toggle } from 'herokwon-ds';
import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

import { setTheme } from '@lib';

import { NavBar } from '@layouts';

type ThemeToggleProps = Pick<
  React.ComponentPropsWithoutRef<typeof NavBar>,
  'theme'
>;

export default function ThemeToggle({ theme }: ThemeToggleProps) {
  const [isActive, setIsActive] = useState<boolean>(theme === 'dark');

  useEffect(() => {
    const root = document.documentElement;

    if (isActive) {
      root.classList.remove('light');
      root.classList.add('dark');
      setTheme('dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      setTheme('light');
    }
  }, [isActive]);

  useEffect(() => {
    !theme && setTheme('light');
    setIsActive(theme === 'dark');
  }, [theme]);

  return (
    <Toggle
      size="lg"
      isActive={isActive}
      setIsActive={setIsActive}
      activeIcon={FiMoon}
      inactiveIcon={FiSun}
    />
  );
}
