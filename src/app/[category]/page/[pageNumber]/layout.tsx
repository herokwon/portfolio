import { getCursors } from '@lib';

import { ARTICLE_CATEGORIES } from '@data';

import { ArticleList } from '@features/article';

import { ContentBox } from '@components';

export const generateStaticParams = async () => {
  return Object.keys(ARTICLE_CATEGORIES).map(async value => {
    const category = value as keyof typeof ARTICLE_CATEGORIES;

    return (
      await getCursors({
        category,
      })
    ).result.data.map((_, i) => ({
      category,
      pageNumber: `${i + 1}`,
    }));
  });
};

export default async function CategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    category: keyof typeof ARTICLE_CATEGORIES;
  };
}) {
  return (
    <ContentBox className="space-y-8 px-4 py-8">
      <h2 className="mx-auto w-fit">
        {`「 ${ARTICLE_CATEGORIES[params.category]} 」 카테고리`}
      </h2>
      <ArticleList
        category={params.category}
        totalPageNumber={
          (await getCursors({ category: params.category })).result.data.length
        }
        className="first:*:gap-x-4 first:*:gap-y-8"
      >
        {children}
      </ArticleList>
    </ContentBox>
  );
}
