import LocalFont from 'next/font/local';

import { getTheme } from '@lib';

import { NavBar } from '@layouts';

import '../styles/globals.css';

const pretendard = LocalFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = await getTheme();

  return (
    <html lang="ko" className={`${pretendard.variable} ${theme ?? 'light'}`}>
      <head></head>
      <body>
        <NavBar theme={theme} />
        {children}
      </body>
    </html>
  );
}
