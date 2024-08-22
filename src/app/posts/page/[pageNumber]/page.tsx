import { notFound } from 'next/navigation';

import type { GetCursorsReturnType, GetPagesReturnType } from '@types';

import { getCursors, getPages } from '@lib';

import { getPageMetadata } from '@utils';

import { ArticleContainer } from '@features/article';

export default async function Posts({
  params,
}: {
  params: { pageNumber: string };
}) {
  if (parseInt(params.pageNumber) < 1) notFound();

  const cursorResponse: GetCursorsReturnType = await (
    await getCursors()
  ).json();
  if ('error' in cursorResponse) throw new Error(cursorResponse.error);

  const pageResponse: GetPagesReturnType = await (
    await getPages({
      start_cursor:
        parseInt(params.pageNumber) === 1
          ? undefined
          : (cursorResponse.result.data.at(parseInt(params.pageNumber) - 2)
              ?.nextCursor ?? undefined),
    })
  ).json();
  if ('error' in pageResponse) throw new Error(pageResponse.error);

  return pageResponse.result.data.map(({ id, properties }) => (
    <ArticleContainer key={id} id={id} {...getPageMetadata(properties)} />
  ));
}
