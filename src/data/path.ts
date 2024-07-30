interface NavItem {
  path: string;
  heading: string;
}

export const navItems: NavItem[] = [
  {
    path: '/',
    heading: '홈',
  },
  {
    path: '/posts/dev',
    heading: '개발',
  },
  {
    path: '/posts/retrospect',
    heading: '회고록',
  },
  {
    path: '/posts/essay',
    heading: '에세이',
  },
];
