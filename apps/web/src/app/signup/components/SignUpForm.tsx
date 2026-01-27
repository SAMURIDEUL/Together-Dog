'use client';

import { Button } from '@together-dog/ui'; // Input import removed as it's now wrapped in AuthInput

import { AuthInput } from './AuthInput';
import { useSignup } from '../hooks/useSignup';

export const SignUpForm = () => {
  const { formState, handlers, errors, isPending, isFormValid } = useSignup();

  const {
    email,
    password,
    passwordConfirm,
    nickname,
    emailMessage,
    nicknameMessage,
  } = formState;
  const {
    handleEmailChange,
    handlePasswordChange,
    handleNicknameChange,
    handlePasswordConfirmChange,
    handleCheckEmail,
    handleCheckNickname,
    handleSubmit,
  } = handlers;
  const { emailError, pwError, nicknameError, passwordConfirmError } = errors;

  return (
    <form className='space-y-4' onSubmit={handleSubmit}>
      <AuthInput
        checkButtonLabel='중복 확인'
        error={!!nicknameError}
        errorMessage={nicknameError}
        label='닉네임'
        placeholder='닉네임 (2~10자)'
        successMessage={nicknameMessage}
        type='text'
        value={nickname}
        onChange={handleNicknameChange}
        onCheck={handleCheckNickname}
      />

      <AuthInput
        checkButtonLabel='중복 확인'
        error={!!emailError}
        errorMessage={emailError}
        label='이메일'
        placeholder='이메일 (example@email.com)'
        successMessage={emailMessage}
        type='email'
        value={email}
        onChange={handleEmailChange}
        onCheck={handleCheckEmail}
      />

      <AuthInput
        error={!!pwError}
        errorMessage={pwError}
        label='비밀번호'
        placeholder='비밀번호 (영문, 숫자, 특수문자 포함 8자 이상)'
        type='password'
        value={password}
        onChange={handlePasswordChange}
      />

      <AuthInput
        error={!!passwordConfirmError}
        errorMessage={passwordConfirmError}
        label='비밀번호 확인'
        placeholder='비밀번호 확인'
        type='password'
        value={passwordConfirm}
        onChange={handlePasswordConfirmChange}
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