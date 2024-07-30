import type { Config } from 'tailwindcss';
import { tailwindExtendTheme, tailwindCustomPlugin } from 'herokwon-ds';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      ...tailwindExtendTheme,
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
    },
  },
  plugins: [tailwindCustomPlugin],
};
export default config;
