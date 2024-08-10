import type {
  BlockObjectResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

import { ARTICLE_CATEGORIES } from '@data/constant';

export interface ArticleMetadata {
  id: string;
  heading: string | null;
  date: Date | null;
  description: string | null;
  category: keyof typeof ARTICLE_CATEGORIES | null;
  tags: string[];
  thumbnail: {
    url: string;
    hasExpiryTime: boolean;
  } | null;
}

export type ArticleCategory =
  (typeof ARTICLE_CATEGORIES)[keyof typeof ARTICLE_CATEGORIES];

interface NotionApiResponse {
  hasMore: boolean;
  nextCursor: string | null;
}
type NotionApiReturnType<Props> =
  | Props
  | {
      error: string;
      status?: number;
    };

export type GetPagesReturnType = NotionApiReturnType<{
  result: Pick<PageResponse, 'data' | 'nextCursor'>;
}>;
export type GetBlocksReturnType = NotionApiReturnType<{
  result: Pick<BlocksResponse, 'data'> &
    Partial<Pick<BlocksResponse, 'nextCursor'>>;
}>;
export type GetBlockReturnType<T extends BlockObjectResponse> =
  NotionApiReturnType<{
    result: {
      data: T;
    };
  }>;
export type GetTagsReturnType = NotionApiReturnType<{
  result: Pick<TagsResponse, 'data'>;
}>;
export type GetSummaryReturnType = NotionApiReturnType<{
  result: Pick<SummaryResponse, 'data'>;
}>;
export class PageResponse implements NotionApiResponse {
  private _data: PageObjectResponse[] = [];
  private _nextCursor: string | null = null;
  private _hasMore: boolean = false;

  constructor(data?: PageObjectResponse[], nextCursor?: string | null) {
    this._data = data ?? [];
    this._nextCursor = nextCursor ?? null;
    this._hasMore = !!nextCursor && nextCursor.length > 0;
  }

  get data() {
    return this._data;
  }
  setData(data: PageObjectResponse[]) {
    this._data = data;
  }

  get nextCursor() {
    return this._nextCursor;
  }
  setNextCursor(nextCursor: string | null) {
    this._hasMore = !!nextCursor && nextCursor.length > 0;
    this._nextCursor = nextCursor;
  }

  get hasMore() {
    return this._hasMore;
  }
}
export class BlocksResponse implements NotionApiResponse {
  private _data: BlockObjectResponse[] = [];
  private _nextCursor: string | null = null;
  private _hasMore: boolean = false;

  constructor(data?: BlockObjectResponse[], nextCursor?: string | null) {
    this._data = data ?? [];
    this._nextCursor = nextCursor ?? null;
    this._hasMore = !!nextCursor && nextCursor.length > 0;
  }

  get data() {
    return this._data;
  }
  setData(data: BlockObjectResponse[]) {
    this._data = data;
  }

  get nextCursor() {
    return this._nextCursor;
  }
  setNextCursor(nextCursor: string | null) {
    this._hasMore = !!nextCursor && nextCursor.length > 0;
    this._nextCursor = nextCursor;
  }

  get hasMore() {
    return this._hasMore;
  }
}
export class TagsResponse implements NotionApiResponse {
  private _data: string[] = [];
  private _nextCursor: string | null = null;
  private _hasMore: boolean = false;

  constructor(data?: string[], nextCursor?: string | null) {
    this._data = data ?? [];
    this._nextCursor = nextCursor ?? null;
    this._hasMore = !!nextCursor && nextCursor.length > 0;
  }

  get data() {
    return this._data;
  }
  setData(data: string[]) {
    this._data = data;
  }

  get nextCursor() {
    return this._nextCursor;
  }
  setNextCursor(nextCursor: string | null) {
    this._hasMore = !!nextCursor && nextCursor.length > 0;
    this._nextCursor = nextCursor;
  }

  get hasMore() {
    return this._hasMore;
  }
}
export class SummaryResponse implements NotionApiResponse {
  private _data: string = '';
  private _nextCursor: string | null = null;
  private _hasMore: boolean = false;

  constructor() {}

  get data() {
    return this._data;
  }
  addData(item: string) {
    const trimmedItem = item.trim().replace(/\s{2,}/gi, ' ');
    if (trimmedItem.length > 0)
      this._data =
        this._data +
        (this._data.length === 0 ? trimmedItem : ` ${trimmedItem}`);
  }

  get nextCursor() {
    return this._nextCursor;
  }
  setNextCursor(nextCursor: string | null) {
    this._hasMore = !!this._nextCursor && this._nextCursor.length > 0;
    this._nextCursor = nextCursor;
  }

  get length() {
    return this._data.length;
  }
  get hasMore() {
    return this._hasMore;
  }
}
