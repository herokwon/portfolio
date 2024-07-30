'use server';

import { cookies } from 'next/headers';

import type { Theme } from '@types';

const THEME = 'theme';
const EXPIRING_TIME_IN_SECONDS = 60 * 60 * 24 * 30;

export const getTheme = async (): Promise<Theme | null> => {
  return (cookies().get(THEME)?.value ?? null) as Theme | null;
};

export const setTheme = async (theme: Theme): Promise<void> => {
  cookies().set(THEME, theme, {
    maxAge: EXPIRING_TIME_IN_SECONDS,
    expires: 1000 * EXPIRING_TIME_IN_SECONDS,
  });
};
