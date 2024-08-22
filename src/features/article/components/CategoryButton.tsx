'use client';

import { TextButton } from 'herokwon-ds';

import { ARTICLE_CATEGORIES } from '@data';

interface CategoryButtonProps {
  category: keyof typeof ARTICLE_CATEGORIES;
}

export default function CategoryButton({ category }: CategoryButtonProps) {
  return (
    <TextButton
      preventDefault
      label={ARTICLE_CATEGORIES[category]}
      variant="primary"
      spacing="compact"
      size="sm"
      href={{
        to: `/${category}`,
      }}
      className="font-semibold"
      title={`${ARTICLE_CATEGORIES[category]} 카테고리 찾아보기`}
      data-testid="article-category"
    />
  );
}
