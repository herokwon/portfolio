import type { GetCursorsReturnType } from '@types';

import { getCursors } from '@lib';

import { ARTICLE_CATEGORIES } from '@data';

import { ContentBox } from '@components';

export const generateStaticParams = async () => {
  return Object.keys(ARTICLE_CATEGORIES).map(async value => {
    const category = value as keyof typeof ARTICLE_CATEGORIES;
    const response: GetCursorsReturnType = await (
      await getCursors({
        category,
      })
    ).json();

    return Array.from(
      {
        length: 'error' in response ? 1 : response.result.data.length,
      },
      (_, i) => ({
        category,
        pageNumber: `${i + 1}`,
      }),
    );
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
        <sub>{}</sub>
      </h2>
      {children}
    </ContentBox>
  );
}
