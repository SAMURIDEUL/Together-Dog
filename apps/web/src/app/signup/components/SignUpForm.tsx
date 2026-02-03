'use client';

import { Button } from '@together-dog/ui';

import { AuthInput } from './AuthInput';
import { useSignup } from '../hooks/useSignup';

export const SignUpForm = () => {
  const { fields, isPending, isFormValid, handleSubmit } = useSignup();
  const { emailField, nicknameField, passwordField, passwordConfirm } = fields;

  return (
    <form className='space-y-4' onSubmit={handleSubmit}>
      <AuthInput
        checkButtonLabel='중복 확인'
        id='nickname'
        label='닉네임'
        placeholder='닉네임 (2~10자)'
        type='text'
        {...nicknameField}
        onCheck={nicknameField.handleCheck}
      />

      <AuthInput
        checkButtonLabel='중복 확인'
        id='email'
        label='이메일'
        placeholder='이메일 (example@email.com)'
        type='email'
        {...emailField}
        onCheck={emailField.handleCheck}
      />

      <AuthInput
        id='password'
        label='비밀번호'
        placeholder='비밀번호 (5자 이상)'
        type='password'
        value={passwordField.value}
        onChange={passwordField.handleChange}
        error={!!passwordField.errorMsg}
        errorMessage={passwordField.errorMsg}
      />

      <AuthInput
        id='passwordConfirm'
        label='비밀번호 확인'
        placeholder='비밀번호 확인'
        type='password'
        {...passwordConfirm}
      />

      <Button
        className='mt-6 !w-full !max-w-none font-bold'
        isDisabled={isPending || !isFormValid}
        size='lg'
        type='submit'
      >
        {isPending ? '가입 처리 중...' : '회원가입'}
      </Button>
    </form>
  );
};