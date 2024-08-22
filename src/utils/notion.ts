import type {
  PageObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';

import type { ArticleMetadata } from '@types';

import { ARTICLE_CATEGORIES } from '@data';

type PageProperties = PageObjectResponse['properties'];
type PageMetadata = Omit<ArticleMetadata, 'id' | 'description'>;

export const convertRichToPlain = (
  richText: RichTextItemResponse[],
): string => {
  return richText.map(item => item.plain_text).join(' ');
};

export const getPageMetadata = (properties: PageProperties): PageMetadata => {
  return Object.keys(properties).reduce((acc, property) => {
    switch (property) {
      case 'heading':
        return {
          ...acc,
          heading:
            properties.heading.type === 'title'
              ? convertRichToPlain(properties.heading.title)
              : null,
        };
      case 'date':
        return {
          ...acc,
          date:
            properties.date.type === 'date' && properties.date.date
              ? new Date(properties.date.date.start)
              : null,
        };
      case 'category':
        return {
          ...acc,
          category:
            properties.category.type === 'select'
              ? ((properties.category.select?.name ?? null) as
                  | keyof typeof ARTICLE_CATEGORIES
                  | null)
              : null,
        };
      case 'tags':
        return {
          ...acc,
          tags:
            properties.tags.type === 'multi_select'
              ? properties.tags.multi_select.map(item => item.name)
              : [],
        };
      case 'thumbnail':
        const thumbnailItem =
          properties.thumbnail.type !== 'files'
            ? null
            : properties.thumbnail.files.length === 0
              ? null
              : properties.thumbnail.files[0];

        return {
          ...acc,
          thumbnail:
            thumbnailItem?.type === 'external'
              ? { url: thumbnailItem.external.url, hasExpiryTime: false }
              : thumbnailItem?.type === 'file'
                ? { url: thumbnailItem.file.url, hasExpiryTime: true }
                : null,
        };
      default:
        // status, etc.
        return acc;
    }
  }, {} as PageMetadata);
};
