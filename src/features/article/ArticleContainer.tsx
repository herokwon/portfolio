import Link from 'next/link';

import type { ArticleMetadata } from '@types';

import { getImgMetadata, getSummary } from '@lib';

import { getPageMetadata } from '@utils';

import ArticleInfo from './components/ArticleInfo';
import ArticleThumbnail from './components/ArticleThumbnail';

interface ArticleContainerProps
  extends Pick<ArticleMetadata, 'id'>,
    ReturnType<typeof getPageMetadata> {
  variant?: 'default' | 'secondary';
}

export default async function ArticleContainer({
  variant = 'default',
  id,
  ...metadata
}: ArticleContainerProps) {
  const summary = await getSummary(id);
  const thumbnailMetadata = !metadata.thumbnail
    ? null
    : await getImgMetadata(metadata.thumbnail.url);

  return (
    <article className="block bg-light-primary group dark:bg-dark-primary">
      <Link
        href={
          !metadata.category ||
          !metadata.heading ||
          metadata.heading.length === 0
            ? '/posts'
            : `/${metadata.category}/${id}`
        }
        className="flex h-full w-full flex-col"
      >
        {variant === 'default' && (
          <ArticleThumbnail metadata={thumbnailMetadata} />
        )}
        <ArticleInfo
          variant={variant}
          id={id}
          description={summary.result.data}
          {...metadata}
        />
      </Link>
    </article>
  );
}
