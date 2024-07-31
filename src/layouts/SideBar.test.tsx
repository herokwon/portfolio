import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { navItems } from '@data';

import NavBar from './NavBar';
import SideBar from './SideBar';

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

describe('SideBar', () => {
  it('should active sidebar', async () => {
    render(<NavBar theme="light" />);

    const sidebarButton = screen.getByTestId('sidebar-button');
    console.log(sidebarButton.parentElement);
    await userEvent.click(sidebarButton);

    expect(sidebarButton).toBeVisible();
  });

  it('should render all navigation items', () => {
    render(<SideBar />);

    const Links = screen.getAllByRole('link');
    Links.forEach((link, index) => {
      expect(link).toHaveAttribute('href', navItems[index].path);
      expect(link).toHaveTextContent(navItems[index].heading);
    });
  });
});
