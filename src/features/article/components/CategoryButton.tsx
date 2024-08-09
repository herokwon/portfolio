'use client';

import { TextButton } from 'herokwon-ds';

import { ARTICLE_CATEGORIES } from '@data';

interface CategoryButtonProps {
  category: keyof typeof ARTICLE_CATEGORIES;
}

export default function CategoryButton({ category }: CategoryButtonProps) {
  return (
    <TextButton
      stopPropagation
      label={ARTICLE_CATEGORIES[category]}
      variant="primary"
      spacing="compact"
      size="sm"
      href={{
        to: `/posts/${category}`,
      }}
      className="font-semibold"
      data-testid="article-category"
    />
  );
}
