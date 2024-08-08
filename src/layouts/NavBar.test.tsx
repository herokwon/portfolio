import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { navItems } from '@data';

import NavBar from './NavBar';

describe('Nav Bar', () => {
  it('should render the logo with a link to home', () => {
    render(<NavBar theme="light" />);

    const logoLink = screen.getByRole('link', { name: /logo/i });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('should render all navigation items', () => {
    render(<NavBar theme="light" />);

    const Links = screen
      .getAllByRole('link')
      .filter(link => link !== screen.getByRole('link', { name: /logo/i }));
    Links.forEach((link, index) => {
      expect(link).toHaveAttribute('href', navItems[index].path);
      expect(link).toHaveTextContent(navItems[index].heading);
    });
  });

  it('should render theme toggle', async () => {
    render(<NavBar theme="light" />);

    const toggle = screen.getByTestId('theme-toggle');
    expect(toggle).toBeInTheDocument();
  });

  it('should activate theme toggle', async () => {
    render(<NavBar theme="light" />);

    const toggle = screen.getByTestId('theme-toggle');
    await userEvent.click(toggle);

    expect(toggle).toHaveClass('hover:bg-dark-blue');
  });

  it('should inactivate theme toggle', async () => {
    render(<NavBar theme="dark" />);

    const toggle = screen.getByTestId('theme-toggle');
    await userEvent.click(toggle);

    expect(toggle).toHaveClass('hover:bg-light-tertiary');
  });
});
