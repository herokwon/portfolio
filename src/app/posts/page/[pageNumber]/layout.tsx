import { GetCursorsReturnType } from '@types';

import { getCursors } from '@lib';

import { ArticleList } from '@features/article';

import { ContentBox } from '@components';

export const generateStaticParams = async () => {
  const response: GetCursorsReturnType = await (await getCursors()).json();
  return Array.from(
    { length: 'error' in response ? 1 : response.result.data.length },
    (_, i) => ({
      pageNumber: `${i + 1}`,
    }),
  );
};

export default async function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const response: GetCursorsReturnType = await (await getCursors()).json();
  return (
    <ContentBox className="px-4 py-8">
      <ArticleList
        totalPageNumber={'error' in response ? 0 : response.result.data.length}
      >
        {children}
      </ArticleList>
    </ContentBox>
  );
}
