// packages/ui/src/stories/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';

import type {
  ButtonRounded,
  ButtonSize,
  ButtonVariant,
} from '../../constants/buttonStyles';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
         🧩 **Button 컴포넌트**

디자인 토큰 기반의 공통 버튼 컴포넌트입니다.  
variant, size, rounded, isDisabled 등의 props를 통해 다양한 형태를 제공합니다.  
라이트 / 다크 모드에 자동 대응합니다.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'kakao'] satisfies ButtonVariant[],
      description: '버튼의 스타일 종류',
      table: {
        type: {
          summary: 'primary | secondary | kakao',
        },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'] satisfies ButtonSize[],
      description: '버튼의 크기',
      table: {
        type: {
          summary: 'xs | sm | md | lg | xl',
        },
        defaultValue: { summary: 'md' },
      },
    },
    rounded: {
      control: 'select',
      options: ['8', '12', '14', '16'] satisfies ButtonRounded[],
      description: '버튼의 둥근 정도 (px 단위)',
      table: {
        type: { summary: '8 | 12 | 14 | 16' },
      },
    },
    isDisabled: {
      control: 'boolean',
      description: '비활성화 여부',
      table: {
        type: { summary: 'boolean' },
      },
    },
    children: {
      control: 'text',
      description: '버튼 안에 들어갈 내용',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    onClick: {
      action: 'click',
      description: '버튼 클릭 이벤트 핸들러',
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    children: '클릭하세요',
    isDisabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/** 🔹 기본 버튼 */
export const 기본: Story = {
  args: {
    onClick: () => {
      alert('버튼이 클릭!');
    },
  },
};

/** 🔹 Secondary 버튼 */
export const 세컨더리: Story = {
  args: {
    variant: 'secondary',
    children: '보조 버튼',
  },
};

/** 🔹 Kakao 버튼 */
export const 카카오: Story = {
  args: {
    variant: 'kakao',
    children: '카카오 로그인',
  },
};

/** 🔹 Disabled 상태 */
export const 비활성화: Story = {
  args: {
    isDisabled: true,
    children: '비활성화됨',
  },
};
