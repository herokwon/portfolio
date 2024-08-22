import { notFound } from 'next/navigation';

import type { GetCursorsReturnType, GetPagesReturnType } from '@types';

import { getCursors, getPages } from '@lib';

import { getPageMetadata } from '@utils';

import { ARTICLE_CATEGORIES } from '@data';

import { ArticleContainer, ArticleList } from '@features/article';

export default async function Category({
  params,
}: {
  params: {
    category: keyof typeof ARTICLE_CATEGORIES;
    pageNumber: string;
  };
}) {
  if (parseInt(params.pageNumber) < 1) notFound();

  const cursorResponse: GetCursorsReturnType = await (
    await getCursors({
      category: params.category,
    })
  ).json();
  if ('error' in cursorResponse) throw new Error(cursorResponse.error);

  const pageResponse: GetPagesReturnType = await (
    await getPages({
      filter: {
        and: [
          {
            property: 'category',
            select: {
              equals: params.category,
            },
          },
        ],
      },
      start_cursor:
        parseInt(params.pageNumber) === 1
          ? undefined
          : (cursorResponse.result.data.at(parseInt(params.pageNumber) - 2)
              ?.nextCursor ?? undefined),
    })
  ).json();
  if ('error' in pageResponse) throw new Error(pageResponse.error);

  return (
    <ArticleList
      category={params.category}
      totalPageNumber={cursorResponse.result.data.length}
    >
      {pageResponse.result.data.map(({ id, properties }) => (
        <ArticleContainer key={id} id={id} {...getPageMetadata(properties)} />
      ))}
    </ArticleList>
  );
}
