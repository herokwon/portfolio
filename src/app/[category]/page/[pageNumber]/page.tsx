import { notFound } from 'next/navigation';

import { getCursors, getPages } from '@lib';

import { getPageMetadata } from '@utils';

import { ARTICLE_CATEGORIES } from '@data';

import { ArticleContainer } from '@features/article';

export default async function Category({
  params,
}: {
  params: {
    category: keyof typeof ARTICLE_CATEGORIES;
    pageNumber: string;
  };
}) {
  const pageNumber = parseInt(params.pageNumber);
  if (pageNumber < 1) notFound();

  const pages = await getPages({
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
      pageNumber === 1
        ? undefined
        : ((
            await getCursors({
              category: params.category,
            })
          ).result.data.at(pageNumber - 2)?.nextCursor ?? undefined),
  });

  return pages.result.data.map(({ id, properties }) => (
    <ArticleContainer key={id} id={id} {...getPageMetadata(properties)} />
  ));
}
