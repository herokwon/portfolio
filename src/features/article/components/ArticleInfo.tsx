'use client';

import { Heading, TagGroup } from 'herokwon-ds';

import type { ArticleMetadata } from '@types';

import ArticleContainer from '../ArticleContainer';
import CategoryButton from './CategoryButton';
import DateDisplay from './DateDisplay';
import TagButton from './TagButton';

type ArticleInfoProps = Required<
  Pick<React.ComponentPropsWithoutRef<typeof ArticleContainer>, 'variant'>
> &
  Omit<ArticleMetadata, 'thumbnail'>;
type ArticleFormProps = Omit<ArticleInfoProps, 'variant'>;

export default function ArticleInfo({
  variant,
  ...metadata
}: ArticleInfoProps) {
  return (
    <div
      className={`flex w-full grow flex-col ${
        variant === 'secondary'
          ? 'gap-1 rounded-r-ms bg-gradient-to-r p-2'
          : 'gap-2 rounded-b-ms bg-gradient-to-b p-4'
      } from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary`}
    >
      {variant === 'default' ? (
        <ArticleDefaultForm {...metadata} />
      ) : (
        <ArticleSecondaryForm {...metadata} />
      )}
    </div>
  );
}

const ArticleDefaultForm = ({ ...metadata }: ArticleFormProps) => {
  return (
    <>
      <div className="flex w-full flex-wrap items-start justify-between">
        {metadata.category && <CategoryButton category={metadata.category} />}
        {metadata.date && (
          <DateDisplay
            date={metadata.date}
            className="text-sm"
            data-testid="article-date"
          />
        )}
      </div>
      {metadata.heading && metadata.heading.length > 0 && (
        <Heading as="h2" className="line-clamp-2" data-testid="article-heading">
          <span className="from-light-yellow to-light-yellow group-bg-underline-[3px]">
            {metadata.heading}
          </span>
        </Heading>
      )}
      <p
        className="line-clamp-3 min-h-[calc(1.25rem*3)] text-sm opacity-normal"
        data-testid="article-description"
      >
        {metadata.description}
      </p>
      {metadata.tags.length > 0 && (
        <TagGroup alignment="right" className="mb-0 mt-auto flex-wrap pt-2">
          {metadata.tags.map((tag, index) => (
            <TagButton key={`${tag}-${index}`} tag={tag} />
          ))}
        </TagGroup>
      )}
    </>
  );
};

const ArticleSecondaryForm = ({ ...metadata }: ArticleFormProps) => {
  return (
    <>
      <div className="flex w-full items-center gap-x-2">
        {metadata.category && <CategoryButton category={metadata.category} />}
        {metadata.heading && metadata.heading.length > 0 && (
          <Heading
            as="h3"
            className="line-clamp-1 text-[1.24rem]"
            data-testid="article-heading"
          >
            <span className="from-light-yellow to-light-yellow group-bg-underline-[3px]">
              {metadata.heading}
            </span>
          </Heading>
        )}
      </div>
      {metadata.description && metadata.description.length > 0 && (
        <p
          className="line-clamp-2 text-sm opacity-normal"
          data-testid="article-description"
        >
          {metadata.description}
        </p>
      )}
      <div className="mb-0 mt-auto flex w-full flex-wrap items-end justify-between gap-2 pt-1">
        {metadata.date && (
          <DateDisplay
            date={metadata.date}
            className="text-xs"
            data-testid="article-date"
          />
        )}
        {metadata.tags.length > 0 && (
          <TagGroup className="!w-fit">
            {metadata.tags.map((tag, index) => (
              <TagButton key={`${tag}-${index}`} tag={tag} />
            ))}
          </TagGroup>
        )}
      </div>
    </>
  );
};
