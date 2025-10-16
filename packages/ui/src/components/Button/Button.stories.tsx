// packages/ui/src/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const 기본: Story = {
  args: {
    children: '클릭하세요',
    onClick: () => alert('버튼 클릭!'),
  },
};
