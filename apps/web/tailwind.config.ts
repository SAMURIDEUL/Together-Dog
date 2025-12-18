// apps/web/tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  // darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      fontFamily: {
        pretendard: ['var(--font-primary)'],
        nanum: ['var(--font-secondary)'],
      },
    },
  },

  plugins: [],
};

export default config;
