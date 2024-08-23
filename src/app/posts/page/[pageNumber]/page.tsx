import { notFound } from 'next/navigation';

import { getCursors, getPages } from '@lib';

import { getPageMetadata } from '@utils';

import { ArticleContainer } from '@features/article';

export default async function Posts({
  params,
}: {
  params: { pageNumber: string };
}) {
  const pageNumber = parseInt(params.pageNumber);
  if (pageNumber < 1) notFound();

  const pages = await getPages({
    start_cursor:
      pageNumber === 1
        ? undefined
        : ((await getCursors()).result.data.at(pageNumber - 2)?.nextCursor ??
          undefined),
  });

  return pages.result.data.map(({ id, properties }) => (
    <ArticleContainer key={id} id={id} {...getPageMetadata(properties)} />
  ));
}
