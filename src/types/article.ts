import { ARTICLE_CATEGORIES } from '@data/constant';

export interface ArticleMetadata {
  heading: string | null;
  date: Date | null;
  description: string | null;
  category: keyof typeof ARTICLE_CATEGORIES | null;
  tags: string[];
  thumbnail: string | null;
}

export type ArticleCategory =
  (typeof ARTICLE_CATEGORIES)[keyof typeof ARTICLE_CATEGORIES];
