import type {
  PageObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';

import type { ArticleMetadata } from '@types';

import { ARTICLE_CATEGORIES } from '@data';

type PageProperties = PageObjectResponse['properties'];
type PageMetadata = Omit<ArticleMetadata, 'id' | 'description'>;
type PageMetadataReturnType<T extends keyof PageMetadata> = [
  T,
  PageMetadata[T],
];
export const convertRichToPlain = (
  richText: RichTextItemResponse[],
): string => {
  return richText.map(item => item.plain_text).join(' ');
};

export const getPageMetadata = (properties: PageProperties): PageMetadata => {
  return Object.fromEntries(
    Object.keys(properties).map(value => {
      const property = value as keyof PageMetadata;

      switch (property) {
        case 'heading':
          return [
            property,
            properties.heading.type === 'title'
              ? convertRichToPlain(properties.heading.title)
              : null,
          ] as PageMetadataReturnType<'heading'>;
        case 'date':
          return [
            property,
            properties.date.type === 'date' && properties.date.date
              ? new Date(properties.date.date.start)
              : null,
          ] as PageMetadataReturnType<'date'>;
        case 'category':
          const d = [
            property,
            properties.category.type === 'select'
              ? ((properties.category.select?.name ?? null) as
                  | keyof typeof ARTICLE_CATEGORIES
                  | null)
              : null,
          ];
        case 'tags':
          return [
            property,
            properties.tags.type === 'multi_select'
              ? properties.tags.multi_select.map(item => item.name)
              : [],
          ] as PageMetadataReturnType<'tags'>;
        case 'thumbnail':
          const thumbnailItem =
            properties.thumbnail.type !== 'files'
              ? null
              : properties.thumbnail.files.length === 0
                ? null
                : properties.thumbnail.files[0];

          return [
            property,
            thumbnailItem?.type === 'external'
              ? { url: thumbnailItem.external.url, hasExpiryTime: false }
              : thumbnailItem?.type === 'file'
                ? { url: thumbnailItem.file.url, hasExpiryTime: true }
                : null,
          ] as PageMetadataReturnType<'thumbnail'>;
        default:
          // status
          return [];
      }
    }),
  ) as PageMetadata;
};
