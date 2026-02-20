'use client';

import { Button } from '@together-dog/ui';

import { AuthInput } from '@/app/signup/components/AuthInput';

import { useLogin } from '../hooks/useLogin';

export const LoginForm = () => {
  const { email, setEmail, password, setPassword, isPending, handleSubmit } =
    useLogin();

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  return (
    <form className='space-y-4' onSubmit={handleSubmit}>
      <AuthInput
        id='email'
        label='이메일'
        placeholder='이메일 입력'
        type='email'
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />

      <AuthInput
        id='password'
        label='비밀번호'
        placeholder='비밀번호 입력'
        type='password'
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />

      <Button
        className='mt-6 !w-full !max-w-none font-bold'
        isDisabled={isPending || !isFormValid}
        size='lg'
        type='submit'
      >
        {isPending ? '로그인 중...' : '로그인'}
      </Button>
    </form>
  );
};
