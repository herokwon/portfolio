import Link from 'next/link';

import type { ArticleMetadata } from '@types';

import { getImgMetadata } from '@lib';

import ArticleInfo from './components/ArticleInfo';
import ArticleThumbnail from './components/ArticleThumbnail';

interface ArticleContainerProps extends ArticleMetadata {
  variant?: 'default' | 'secondary';
}

export default async function ArticleContainer({
  variant = 'default',
  ...metadata
}: ArticleContainerProps) {
  const thumbnailMetadata = !metadata.thumbnail
    ? null
    : await getImgMetadata(metadata.thumbnail);

  return (
    <article className="mx-4 block bg-light-primary group dark:bg-dark-primary">
      <Link
        href={!metadata.category ? '/posts' : `/posts/${metadata.category}`}
        className="flex h-full w-full flex-col"
      >
        {variant === 'default' && (
          <ArticleThumbnail metadata={thumbnailMetadata} />
        )}
        <ArticleInfo variant={variant} {...metadata} />
      </Link>
    </article>
  );
}
