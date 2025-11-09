import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import path from 'path';
import { mergeConfig, type UserConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: { disableTelemetry: true },
  staticDirs: [path.resolve(__dirname, '../../../apps/web/public')],

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
