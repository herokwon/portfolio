'use client';

import { EmptyData, Pagination, SectionMessage } from 'herokwon-ds';
import { useRouter } from 'next/navigation';

import { ARTICLE_CATEGORIES } from '@data';

interface ArticleListProps extends React.ComponentPropsWithoutRef<'div'> {
  hasPagination?: boolean;
  totalPageNumber?: number;
  category?: keyof typeof ARTICLE_CATEGORIES;
  errorMessage?: string;
}

export default function ArticleList({
  children,
  hasPagination = true,
  totalPageNumber = 0,
  category,
  errorMessage = '',
  ...props
}: ArticleListProps) {
  const { push } = useRouter();

  return errorMessage.length > 0 ? (
    <SectionMessage variant="danger" heading="오류">
      {errorMessage}
    </SectionMessage>
  ) : totalPageNumber === 0 ? (
    <EmptyData
      {...props}
      emptyMessage={`데이터가 없습니다.\n다음 업로드를 기대해 주세요!`}
      className={`leading-7 ${props.className ?? ''}`}
      style={{
        margin: 'auto',
      }}
    />
  ) : (
    hasPagination && (
      <div
        {...props}
        data-testid="article-list"
        className={`mx-auto w-full max-w-screen-xl space-y-8 ${props.className ?? ''}`}
      >
        <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {children}
        </div>
        {totalPageNumber > 0 && (
          <Pagination
            totalPage={totalPageNumber}
            className="justify-center"
            onChangeSelectedPage={pageNumber =>
              push(
                !category
                  ? `/posts/page/${pageNumber}`
                  : `/${category}/page/${pageNumber}`,
              )
            }
          />
        )}
      </div>
    )
  );
}
