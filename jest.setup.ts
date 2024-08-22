import '@testing-library/jest-dom';
import 'isomorphic-fetch';

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

jest.mock('ky', () => ({
  create: jest.fn(),
  extend: jest.fn(),
}));
