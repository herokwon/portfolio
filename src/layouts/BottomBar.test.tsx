import { render, screen } from '@testing-library/react';

import { socialItems } from '@data';

import BottomBar from './BottomBar';

describe('Bottom Bar', () => {
  it('should render the logo', () => {
    render(<BottomBar />);

    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('alt', 'logo');
    expect(logo).toBeVisible();
  });

  it('should render all social links', () => {
    render(<BottomBar />);

    const links = screen.getAllByRole('link');
    links.forEach((link, index) => {
      expect(link).toHaveAttribute('href', socialItems[index].path);
    });
  });

  it('should render a paragraph for copyright.', () => {
    const currentYear = new Date().getFullYear();
    const author = 'HeroKwon';
    render(<BottomBar />);

    const paragraph = screen.getByTestId('copyright-paragraph');
    expect(paragraph).toHaveTextContent(
      new RegExp(`${currentYear}|${author}`, 'g'),
    );
  });
});
