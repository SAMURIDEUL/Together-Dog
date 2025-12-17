import type { Meta, StoryObj } from '@storybook/react';

import { useInputValidate } from '../../hooks/useInputValidate';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: 'boolean',
      description: '에러 상태 여부',
    },
    errorMessage: {
      control: 'text',
      description: '에러 메시지 텍스트',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '텍스트를 입력해주세요',
  },
};

export const WithValue: Story = {
  args: {
    placeholder: '이름을 입력하세요',
    value: '홍길동',
    readOnly: true,
  },
};

export const Error: Story = {
  args: {
    placeholder: '이메일을 입력해주세요',
    error: true,
    errorMessage: '잘못된 이메일 형식입니다.',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: '입력할 수 없습니다',
    disabled: true,
  },
};

// Hook usage example component
const ValidationExampleComponent = () => {
  const email = useInputValidate('email');
  const password = useInputValidate('password');

  return (
    <div className='flex w-[300px] flex-col gap-4'>
      <div>
        <h3 className='mb-2 text-sm font-bold'>실시간 이메일 검증 예시</h3>
        <Input
          error={!email.isValid && email.value.length > 0}
          errorMessage={email.errorMsg}
          placeholder='이메일을 입력하세요 (abc@example.com)'
          value={email.value}
          onChange={email.handleChange}
        />
      </div>

      <div>
        <h3 className='mb-2 text-sm font-bold'>실시간 비밀번호 검증 예시</h3>
        <Input
          error={!password.isValid && password.value.length > 0}
          errorMessage={password.errorMsg}
          placeholder='비밀번호 (8자 이상, 특수문자 포함)'
          type='password'
          value={password.value}
          onChange={password.handleChange}
        />
      </div>

      <div className='text-xs text-gray-500'>
        <p>이메일 유효성: {email.isValid ? '✅' : '❌'}</p>
        <p>비밀번호 유효성: {password.isValid ? '✅' : '❌'}</p>
      </div>
    </div>
  );
};

export const ValidationExample: Story = {
  render: () => <ValidationExampleComponent />,
};
