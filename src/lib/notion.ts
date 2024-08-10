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
import { NextResponse } from 'next/server';

import {
  BlocksResponse,
  type GetBlockReturnType,
  type GetBlocksReturnType,
  type GetPagesReturnType,
  type GetSummaryReturnType,
  type GetTagsReturnType,
  PageResponse,
  SummaryResponse,
  TagsResponse,
} from '@types';

import { convertRichToPlain, getPageMetadata } from '@utils';

type PageQueryParameters = Omit<
  QueryDatabaseParameters,
  'database_id' | 'page_size'
> &
  Required<Pick<QueryDatabaseParameters, 'page_size'>>;
type BlocksQueryParameters = Omit<ListBlockChildrenParameters, 'block_id'>;
type TagsQueryParameters = Omit<PageQueryParameters, 'page_size'>;

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
  page_size,
  ...queryParameters
}: PageQueryParameters): Promise<NextResponse<GetPagesReturnType>> => {
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
          filter: !queryParameters?.filter
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
                  queryParameters.filter,
                ],
              },
          sorts: queryParameters?.sorts ?? [
            {
              property: 'date',
              direction: 'ascending',
            },
          ],
          start_cursor: pageResponse.nextCursor ?? undefined,
          page_size,
        } as PageQueryParameters,
      })
      .json<QueryDatabaseResponse>();

    pageResponse.setNextCursor(response.next_cursor);
    pageResponse.setData(response.results as PageObjectResponse[]);

    return NextResponse.json({
      result: {
        data: pageResponse.data,
        nextCursor: pageResponse.nextCursor,
      },
    });
  } catch (error: unknown) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getBlocks = async (
  blockId: string,
  queryParameters?: BlocksQueryParameters,
): Promise<NextResponse<GetBlocksReturnType>> => {
  try {
    const blocksResponse = new BlocksResponse();

    do {
      const response = await notionApi
        .extend(options => ({
          ...options,
          searchParams: [
            [
              `${!queryParameters?.start_cursor && !blocksResponse.hasMore ? '' : 'start_cursor'}`,
              queryParameters?.start_cursor ?? blocksResponse.nextCursor ?? '',
            ],
            [
              `${!queryParameters?.page_size ? '' : 'page_size'}`,
              queryParameters?.page_size ?? '',
            ],
          ],
        }))
        .get(`blocks/${blockId}/children`)
        .json<ListBlockChildrenResponse>();

      blocksResponse.setNextCursor(response.next_cursor);
      blocksResponse.setData([
        ...blocksResponse.data,
        ...(response.results as BlockObjectResponse[]),
      ]);
    } while (!queryParameters?.page_size && blocksResponse.hasMore);

    return NextResponse.json({
      result: !queryParameters?.page_size
        ? {
            data: blocksResponse.data,
          }
        : {
            data: blocksResponse.data,
            nextCursor: blocksResponse.nextCursor,
          },
    });
  } catch (error: unknown) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getBlock = async <
  ResponseType extends BlockObjectResponse = BlockObjectResponse,
>(
  blockId: string,
): Promise<NextResponse<GetBlockReturnType<ResponseType>>> => {
  try {
    const response = await notionApi
      .get(`blocks/${blockId}`)
      .json<ResponseType>();

    return NextResponse.json({
      result: {
        data: response,
      },
    });
  } catch (error: unknown) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getTags = async (
  queryParameters?: TagsQueryParameters,
): Promise<NextResponse<GetTagsReturnType>> => {
  try {
    const tagsResponse = new TagsResponse();

    do {
      const response = await getPages({
        ...queryParameters,
        start_cursor: tagsResponse.nextCursor ?? undefined,
        page_size: 3 * 6,
      });
      const responseData: GetPagesReturnType = await response.json();
      if ('error' in responseData) return NextResponse.json(responseData);

      tagsResponse.setNextCursor(responseData.result.nextCursor);
      tagsResponse.setData([
        ...tagsResponse.data,
        ...responseData.result.data.flatMap(page =>
          getPageMetadata(page.properties).tags.flatMap(tag => tag),
        ),
      ]);
    } while (tagsResponse.hasMore);

    return NextResponse.json({
      result: {
        data: tagsResponse.data,
      },
    });
  } catch (error: unknown) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getSummary = async (
  id: string,
): Promise<NextResponse<GetSummaryReturnType>> => {
  try {
    const summaryResponse = new SummaryResponse();

    do {
      const response = await getBlocks(id, {
        page_size: 5,
        start_cursor: summaryResponse.nextCursor ?? undefined,
      });
      const responseData: GetBlocksReturnType = await response.json();
      if ('error' in responseData) return NextResponse.json(responseData);

      summaryResponse.setNextCursor(responseData.result.nextCursor ?? null);

      for (const block of responseData.result.data) {
        switch (block.type) {
          case 'equation':
            block.has_children
              ? await getSummary(block.id)
              : summaryResponse.addData(block.equation.expression);
            break;
          case 'bulleted_list_item':
          case 'callout':
          case 'code':
          case 'numbered_list_item':
          case 'paragraph':
          case 'quote':
            block.has_children
              ? await getSummary(block.id)
              : summaryResponse.addData(
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
            break;
        }
      }
    } while (summaryResponse.hasMore && summaryResponse.length < 200);

    return NextResponse.json({
      result: {
        data: summaryResponse.data,
      },
    });
  } catch (error: unknown) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
