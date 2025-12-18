// packages/ui/tailwind.config.ts
import type { Config } from 'tailwindcss';

import { palette } from './src/tokens/color';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx, mdx}',
    './.storybook/**/*.{js,ts,jsx,tsx}',
    '../../apps/web/**/*.{js,ts,jsx,tsx}',
    './src/safelist.css',
  ],
  theme: {
    extend: {
      colors: {
        // 라이트 테마
        primary: palette.light.primary,
        secondary: palette.light.secondary,
        accent: palette.light.accent,
        neutralLight: palette.light.neutralLight,
        neutralDark: palette.light.neutralDark,
      },
    },
  },
  plugins: [],
};

export default config;
