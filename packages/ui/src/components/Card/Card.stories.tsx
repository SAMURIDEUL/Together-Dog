import type { Meta, StoryObj } from '@storybook/react';

import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    darkMode: {
      control: 'boolean',
      description: '다크 모드 여부 (기본값: false)',
    },
    children: {
      control: 'text',
      description: '카드 안에 들어갈 콘텐츠',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

// 👉 기본 카드
export const Light: Story = {
  args: {
    darkMode: false,
    children: '🐾 반려동물과 함께하는 공간',
  },
};

// 👉 다크 모드 카드
export const Dark: Story = {
  args: {
    darkMode: true,
    children: '🌙 따뜻한 밤의 카드',
  },
};
