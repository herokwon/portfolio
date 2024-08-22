import type { IconType } from 'react-icons';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { LuMail } from 'react-icons/lu';

import { ARTICLE_CATEGORIES } from './constant';

interface NavItem {
  path: string;
  heading: string;
}

interface SocialItem extends NavItem {
  icon: IconType;
}

export const navItems: NavItem[] = [
  {
    path: '/',
    heading: '홈',
  },
  ...Object.keys(ARTICLE_CATEGORIES).map(value => {
    const category = value as keyof typeof ARTICLE_CATEGORIES;

    return {
      path: `/${category}`,
      heading: ARTICLE_CATEGORIES[category],
    };
  }),
];

export const socialItems: SocialItem[] = [
  {
    path: 'mailto:contact@herokwon.dev',
    heading: 'Email',
    icon: LuMail,
  },
  {
    path: 'https://github.com/herokwon',
    heading: 'Github',
    icon: FaGithub,
  },
  {
    path: 'https://linkedin.com/in/herokwon',
    heading: 'Linked In',
    icon: FaLinkedin,
  },
];
