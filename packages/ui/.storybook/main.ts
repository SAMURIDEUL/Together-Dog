import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import { mergeConfig, type UserConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)', '../src/**/*.mdx'],
  addons: [],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: { disableTelemetry: true },
  async viteFinal(baseConfig: UserConfig) {
    return mergeConfig(baseConfig, {
      css: {
        postcss: {
          plugins: [tailwindcss(), autoprefixer()],
        },
      },
      plugins: [tsconfigPaths()],
    });
  },
};

export default config;
