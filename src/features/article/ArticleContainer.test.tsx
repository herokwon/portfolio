import { render, screen } from '@testing-library/react';

import { type ArticleMetadata } from '@types';

import { getImgMetadata } from '@lib';

import { ARTICLE_CATEGORIES } from '@data';

import ArticleInfo from './components/ArticleInfo';
import ArticleThumbnail from './components/ArticleThumbnail';

const metadata: ArticleMetadata = {
  heading: 'Heading',
  date: new Date(2024, 7, 8),
  description: 'This is a description',
  category: 'dev',
  tags: ['tag1', 'tag2'],
  thumbnail: null,
};

jest.mock('next/headers', () => ({
  cookies: () => ({
    get: jest.fn(),
    set: jest.fn(),
  }),
}));

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue(''),
  useRouter: () => ({
    route: '/',
    pathname: '',
    query: {},
    asPath: '',
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

describe('ArticleContainer - Default', () => {
  it('should render the thumbnail image', async () => {
    const thumbnailMetadata = !metadata.thumbnail
      ? null
      : await getImgMetadata(metadata.thumbnail);

    if (thumbnailMetadata) {
      render(<ArticleThumbnail metadata={thumbnailMetadata} />);

      const thumbnail = screen.getByRole('img');
      expect(thumbnail).toHaveAttribute('src', thumbnailMetadata.src);
    }
  });

  it('should render the article metadata', () => {
    render(<ArticleInfo variant="default" {...metadata} />);

    const heading = screen.getByTestId('article-heading');
    const date = screen.getByTestId('article-date');
    const description = screen.getByTestId('article-description');
    const category = screen.getByTestId('article-category');
    const tags = screen.getAllByTestId('article-tag');

    expect(heading).toHaveTextContent(metadata.heading!);
    expect(date).toHaveTextContent(metadata.date!.toLocaleDateString());
    expect(description).toHaveTextContent(metadata.description!);
    expect(category).toHaveTextContent(ARTICLE_CATEGORIES[metadata.category!]);
    tags.forEach((tag, index) => {
      expect(tag).toHaveTextContent(metadata.tags[index]);
    });
  });
});

describe('ArticleContainer - Secondary', () => {
  it('should render the article metadata', () => {
    render(<ArticleInfo variant="secondary" {...metadata} />);

    const heading = screen.getByTestId('article-heading');
    const date = screen.getByTestId('article-date');
    const description = screen.getByTestId('article-description');
    const category = screen.getByTestId('article-category');
    const tags = screen.getAllByTestId('article-tag');

    expect(heading).toHaveTextContent(metadata.heading!);
    expect(date).toHaveTextContent(metadata.date!.toLocaleDateString());
    expect(description).toHaveTextContent(metadata.description!);
    expect(category).toHaveTextContent(ARTICLE_CATEGORIES[metadata.category!]);
    tags.forEach((tag, index) => {
      expect(tag).toHaveTextContent(metadata.tags[index]);
    });
  });
});
