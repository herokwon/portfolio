import { getCursors } from '@lib';

import { ArticleList } from '@features/article';

import { ContentBox } from '@components';

export const generateStaticParams = async () => {
  return (await getCursors()).result.data.map((_, i) => `${i + 1}`);
};

export default async function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContentBox className="px-4 py-8">
      <h2 className="mx-auto w-fit">전체 글</h2>
      <ArticleList
        totalPageNumber={(await getCursors()).result.data.length}
        className="first:*:gap-x-4 first:*:gap-y-8"
      >
        {children}
      </ArticleList>
    </ContentBox>
  );
}
