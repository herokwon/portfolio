import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { navItems } from '@data';

import NavBar from './NavBar';
import SideBar from './SideBar';

describe('Side Bar', () => {
  it('should active sidebar', async () => {
    render(<NavBar theme="light" />);

    const sidebarButton = screen.getByTestId('sidebar-button');
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
