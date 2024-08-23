'use server';

import type {
  BlockObjectResponse,
  ListBlockChildrenParameters,
  ListBlockChildrenResponse,
  PageObjectResponse,
  QueryDatabaseParameters,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';
import ky, { KyInstance } from 'ky';

import {
  BlockResponse,
  CursorResponse,
  type GetBlockReturnType,
  type GetBlocksReturnType,
  type GetCursorsReturnType,
  type GetPagesReturnType,
  type GetSummaryReturnType,
  type GetTagsReturnType,
  PageResponse,
  SummaryResponse,
  TagResponse,
} from '@types';

import { convertRichToPlain, getPageMetadata } from '@utils';

import { ARTICLES_PER_PAGE, ARTICLE_CATEGORIES } from '@data';

type PageQueryParameters = Omit<QueryDatabaseParameters, 'database_id'>;
type BlocksQueryParameters = Omit<ListBlockChildrenParameters, 'block_id'> & {
  id: string;
};

const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const NOTION_BASE_URL = 'https://api.notion.com';
const NOTION_POST_HEADERS = {
  'Content-Type': 'application/json',
};
const notionApi: KyInstance = ky.create({
  headers: {
    'Notion-Version': '2022-06-28',
    Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
  },
  next: {
    revalidate: 0,
  },
  prefixUrl: `${NOTION_BASE_URL}/v1`,
});

export const getPages = async ({
  filter,
  sorts,
  start_cursor,
  page_size,
  ...queryParameters
}: PageQueryParameters = {}): Promise<GetPagesReturnType> => {
  try {
    const pageResponse = new PageResponse();
    const response = await notionApi
      .extend(options => ({
        ...options,
        headers: {
          ...options.headers,
          ...NOTION_POST_HEADERS,
        },
        prefixUrl: `${options.prefixUrl}/databases/${NOTION_DATABASE_ID}`,
      }))
      .post('query', {
        json: {
          ...queryParameters,
          filter: !filter
            ? {
                property: 'status',
                status: {
                  equals: 'Published',
                },
              }
            : {
                and: [
                  {
                    property: 'status',
                    status: {
                      equals: 'Published',
                    },
                  },
                  filter,
                ],
              },
          sorts: sorts ?? [
            {
              property: 'date',
              direction: 'ascending',
            },
          ],
          start_cursor: pageResponse.nextCursor ?? start_cursor ?? undefined,
          page_size: page_size ?? ARTICLES_PER_PAGE,
        } as PageQueryParameters,
      })
      .json<QueryDatabaseResponse>();

    pageResponse.setNextCursor(response.next_cursor);
    pageResponse.setData(response.results as PageObjectResponse[]);

    return {
      result: {
        data: pageResponse.data,
        nextCursor: pageResponse.nextCursor,
      },
    };
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const getBlocks = async ({
  id,
  ...queryParameters
}: BlocksQueryParameters): Promise<GetBlocksReturnType> => {
  try {
    const blockResponse = new BlockResponse();

    do {
      const response = await notionApi
        .extend(options => ({
          ...options,
          searchParams: [
            [
              `${!queryParameters?.start_cursor && !blockResponse.hasMore ? '' : 'start_cursor'}`,
              queryParameters?.start_cursor ?? blockResponse.nextCursor ?? '',
            ],
            [
              `${!queryParameters?.page_size ? '' : 'page_size'}`,
              queryParameters?.page_size ?? '',
            ],
          ],
        }))
        .get(`blocks/${id}/children`)
        .json<ListBlockChildrenResponse>();

      blockResponse.setNextCursor(response.next_cursor);
      blockResponse.addData(response.results as BlockObjectResponse[]);
    } while (!queryParameters?.page_size && blockResponse.hasMore);

    return {
      result: !queryParameters?.page_size
        ? {
            data: blockResponse.data,
          }
        : {
            data: blockResponse.data,
            nextCursor: blockResponse.nextCursor,
          },
    };
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const getBlock = async <
  ResponseType extends BlockObjectResponse = BlockObjectResponse,
>(
  id: string,
): Promise<GetBlockReturnType<ResponseType>> => {
  try {
    const response = await notionApi.get(`blocks/${id}`).json<ResponseType>();

    return {
      result: {
        data: response,
      },
    };
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const getTags = async ({
  category,
}: {
  category?: keyof typeof ARTICLE_CATEGORIES;
} = {}): Promise<GetTagsReturnType> => {
  try {
    const tagResponse = new TagResponse();

    do {
      const pages = await getPages({
        filter: !category
          ? undefined
          : {
              property: 'category',
              select: {
                equals: category,
              },
            },
        start_cursor: tagResponse.nextCursor ?? undefined,
      });

      tagResponse.setNextCursor(pages.result.nextCursor);
      tagResponse.addData(
        pages.result.data.flatMap(page =>
          getPageMetadata(page.properties).tags.flatMap(tag => tag),
        ),
      );
    } while (tagResponse.hasMore);

    return {
      result: {
        data: tagResponse.data,
      },
    };
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const getCursors = async ({
  category,
}: {
  category?: keyof typeof ARTICLE_CATEGORIES;
} = {}): Promise<GetCursorsReturnType> => {
  try {
    const cursorResponse = new CursorResponse();

    do {
      const pages: GetPagesReturnType = await getPages({
        filter: !category
          ? undefined
          : {
              property: 'category',
              select: {
                equals: category,
              },
            },
      });

      pages.result.data.length > 0 &&
        cursorResponse.addData({
          nextCursor: pages.result.nextCursor,
        });
    } while (cursorResponse.hasMore);

    return {
      result: {
        data: cursorResponse.data,
      },
    };
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const getSummary = async (id: string): Promise<GetSummaryReturnType> => {
  try {
    const summaryResponse = new SummaryResponse();

    do {
      const blocks = await getBlocks({
        id,
        page_size: 3,
        start_cursor: summaryResponse.nextCursor ?? undefined,
      });

      summaryResponse.setNextCursor(blocks.result.nextCursor ?? null);

      for (const block of blocks.result.data) {
        switch (block.type) {
          case 'equation':
            if (!block.has_children)
              summaryResponse.addData(block.equation.expression);
            else {
              const summary = await getSummary(block.id);
              summaryResponse.addData(summary.result.data);
            }
            break;
          case 'bulleted_list_item':
          case 'callout':
          case 'code':
          case 'numbered_list_item':
          case 'paragraph':
          case 'quote':
            if (!block.has_children)
              summaryResponse.addData(
                convertRichToPlain(
                  block.type === 'bulleted_list_item'
                    ? block.bulleted_list_item.rich_text
                    : block.type === 'callout'
                      ? block.callout.rich_text
                      : block.type === 'code'
                        ? block.code.rich_text
                        : block.type === 'numbered_list_item'
                          ? block.numbered_list_item.rich_text
                          : block.type === 'paragraph'
                            ? block.paragraph.rich_text
                            : block.quote.rich_text,
                ),
              );
            else {
              const summary = await getSummary(block.id);
              summaryResponse.addData(summary.result.data);
            }
            break;
        }
      }
    } while (summaryResponse.hasMore && summaryResponse.length < 100);

    return {
      result: {
        data: summaryResponse.data,
      },
    };
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
