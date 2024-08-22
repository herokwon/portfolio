import { render, screen } from '@testing-library/react';

import ArticleList from './ArticleList';

const errorMessage = 'This is an error message.';

jest.mock('herokwon-ds', () => ({
  EmptyData: jest.fn(),
  Pagination: jest.fn(() => 100),
  SectionMessage: jest.fn(() => errorMessage),
}));

describe('Article List', () => {
  it('should expose with props', () => {
    render(
      <ArticleList totalPageNumber={1} className="class">
        test
      </ArticleList>,
    );

    const container = screen.getByTestId('article-list');

    expect(container).toHaveClass('class');
    expect(container).toHaveTextContent('test');
  });

  it('should render pagination', () => {
    const { container } = render(<ArticleList totalPageNumber={1} />);
    expect(container).toHaveTextContent('100');
  });

  it('should render error message', () => {
    const { container } = render(<ArticleList errorMessage={errorMessage} />);
    expect(container).toHaveTextContent(errorMessage);
  });
});
