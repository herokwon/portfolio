import LocalFont from 'next/font/local';

import { getTheme } from '@lib';

import { BottomBar, NavBar, SideBar } from '@layouts';

import ScrollToTopButton from '@components/ScrollToTopButton';

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
        <SideBar />
        <main className="h-1000">{children}</main>
        <ScrollToTopButton />
        <BottomBar />
      </body>
    </html>
  );
}
