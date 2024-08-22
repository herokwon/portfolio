import { type NextRequest, NextResponse } from 'next/server';

import { ARTICLE_CATEGORIES } from '@data';

export const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const categories = Object.keys(ARTICLE_CATEGORIES);

  if (pathname.endsWith('posts') || pathname.endsWith('posts/page'))
    return NextResponse.redirect(
      new URL(
        `${pathname.endsWith('page') ? pathname : `${pathname}/page`}/1`,
        request.url,
      ),
    );

  if (
    categories.reduce(
      (acc, value) =>
        acc || pathname.endsWith(value) || pathname.endsWith(`${value}/page`),
      false,
    )
  )
    return NextResponse.redirect(
      new URL(
        `${pathname.endsWith('page') ? pathname : `${pathname}/page`}/1`,
        request.url,
      ),
    );

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
