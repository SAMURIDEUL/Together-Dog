// .storybook/preview.ts
import '../src/styles/globals.css';
import '../styles/fonts.css';
import '../styles/preview.css';

import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
