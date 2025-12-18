import type { Meta, StoryObj } from '@storybook/react';

import { Toast } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'error'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    id: '1',
    message: 'This is a default toast message.',
    variant: 'default',
    onClose: (id) => console.log(`Closed toast ${id}`),
  },
};

export const Success: Story = {
  args: {
    id: '2',
    message: 'Operation completed successfully!',
    variant: 'success',
    onClose: (id) => console.log(`Closed toast ${id}`),
  },
};

export const Error: Story = {
  args: {
    id: '3',
    message: 'Something went wrong. Please try again.',
    variant: 'error',
    onClose: (id) => console.log(`Closed toast ${id}`),
  },
};
