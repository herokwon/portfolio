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

export interface NotionApiResponse {
  hasMore: boolean;
  nextCursor: string | null;
}

export type GetCursorsReturnType = {
  result: Pick<CursorResponse, 'data'>;
};
export type GetPagesReturnType = {
  result: Pick<PageResponse, 'data' | 'nextCursor'>;
};
export type GetBlocksReturnType = {
  result: Pick<BlockResponse, 'data'> &
    Partial<Pick<BlockResponse, 'nextCursor'>>;
};
export type GetBlockReturnType<T extends BlockObjectResponse> = {
  result: {
    data: T;
  };
};
export type GetTagsReturnType = {
  result: Pick<TagResponse, 'data'>;
};
export type GetSummaryReturnType = {
  result: Pick<SummaryResponse, 'data'>;
};

export class CursorResponse {
  private _data: { nextCursor: string | null }[] = [{ nextCursor: null }];
  private _hasMore: boolean = false;

  constructor(data?: typeof this._data, hasMore?: typeof this._hasMore) {
    this._data = data || [];
    this._hasMore = hasMore || false;
  }

  get data() {
    return this._data;
  }
  addData({ nextCursor }: (typeof this._data)[0]) {
    this._hasMore = !!nextCursor && nextCursor.length > 0;
    this._data = [...this._data, { nextCursor }];
  }

  get hasMore() {
    return this._hasMore;
  }
}
export class PageResponse implements NotionApiResponse {
  private _data: PageObjectResponse[] = [];
  private _nextCursor: string | null = null;
  private _hasMore: boolean = false;

  constructor(data?: PageObjectResponse[], nextCursor?: string | null) {
    this._data = data || [];
    this._nextCursor = nextCursor || null;
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
export class BlockResponse implements NotionApiResponse {
  private _data: BlockObjectResponse[] = [];
  private _nextCursor: string | null = null;
  private _hasMore: boolean = false;

  constructor(data?: BlockObjectResponse[], nextCursor?: string | null) {
    this._data = data || [];
    this._nextCursor = nextCursor || null;
    this._hasMore = !!nextCursor && nextCursor.length > 0;
  }

  get data() {
    return this._data;
  }
  addData(data: BlockObjectResponse[]) {
    this._data = [...this._data, ...data];
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
export class TagResponse implements NotionApiResponse {
  private _data: string[] = [];
  private _nextCursor: string | null = null;
  private _hasMore: boolean = false;

  constructor(data?: string[], nextCursor?: string | null) {
    this._data = data || [];
    this._nextCursor = nextCursor || null;
    this._hasMore = !!nextCursor && nextCursor.length > 0;
  }

  get data() {
    return this._data;
  }
  addData(data: string[]) {
    this._data = [...this._data, ...data];
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

  constructor(data?: string, nextCursor?: string | null) {
    this._data = data || '';
    this._nextCursor = nextCursor || null;
    this._hasMore = !!nextCursor && nextCursor.length > 0;
  }

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
