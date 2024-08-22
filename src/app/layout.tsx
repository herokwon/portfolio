import LocalFont from 'next/font/local';

import type { GetPagesReturnType } from '@types';

import { getPages, getTheme } from '@lib';

import { getPageMetadata } from '@utils';

import { BottomBar, NavBar, SideBar } from '@layouts';

import { ArticleContainer, ArticleList } from '@features/article';

import { ScrollToTopButton } from '@components';

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
  const pageResponse: GetPagesReturnType = await (
    await getPages({
      page_size: 5,
    })
  ).json();

  return (
    <html lang="ko" className={`${pretendard.variable} ${theme ?? 'light'}`}>
      <head></head>
      <body>
        <NavBar theme={theme} />
        <SideBar
          articles={
            <ArticleList
              hasPagination={false}
              totalPageNumber={1}
              errorMessage={'error' in pageResponse ? pageResponse.error : ''}
              className="first:*:gap-y-2"
            >
              {!('error' in pageResponse) &&
                pageResponse.result.data.map(({ id, properties }) => (
                  <ArticleContainer
                    key={id}
                    id={id}
                    variant="secondary"
                    {...getPageMetadata(properties)}
                  />
                ))}
            </ArticleList>
          }
        />
        <main className="content-box w-full">{children}</main>
        <ScrollToTopButton />
        <BottomBar />
      </body>
    </html>
  );
}
