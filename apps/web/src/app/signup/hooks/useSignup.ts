'use client';

import { useInputValidate } from '@together-dog/ui';
import { useRouter } from 'next/navigation';
import { type ChangeEvent, type FormEvent, useState } from 'react';

import { useSignupMutation } from '@/hooks/queries/useAuthMutation';

import { useAuthField } from './useAuthField';

export const useSignup = () => {
  const router = useRouter();

  // 1. 개별 필드별 로직 분리 (Fields Logic)
  const emailField = useAuthField('email');
  const nicknameField = useAuthField('nickname');

  // 비밀번호는 중복 확인이 필요 없으므로 기본 유효성 검사 훅 사용
  const passwordField = useInputValidate('password');

  // 2. 비밀번호 확인 로직 (Password Confirm)
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const isPasswordMatch = passwordField.value === passwordConfirm;
  const passwordConfirmError =
    passwordConfirm && !isPasswordMatch ? '비밀번호가 일치하지 않습니다.' : '';

  // 3. 회원가입 뮤테이션 (Mutation)
  const signupMutation = useSignupMutation({
    onSuccess: () => {
      alert('회원가입이 완료되었습니다! 로그인해 주세요.');
      router.push('/login');
    },
    onError: (error) => {
      console.error('회원가입 실패:', error);
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.');
    },
  });

  // 4. 폼 제출 핸들러 (Submit Handler)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailField.isChecked || !nicknameField.isChecked) {
      alert('이메일과 닉네임 중복 확인을 해주세요.');
      return;
    }

    if (
      !isPasswordMatch ||
      !emailField.isValid ||
      !passwordField.isValid ||
      !nicknameField.isValid
    ) {
      alert('입력 정보를 다시 확인해 주세요.');
      return;
    }

    signupMutation.mutate({
      email: emailField.value,
      password: passwordField.value,
      nickname: nicknameField.value,
    });
  };

  // 5. 버튼 활성화 상태 (Button Status)
  const isFormValid =
    emailField.isChecked &&
    nicknameField.isChecked &&
    passwordField.isValid &&
    isPasswordMatch &&
    !!passwordConfirm;

  return {
    fields: {
      emailField,
      nicknameField,
      passwordField,
      passwordConfirm: {
        value: passwordConfirm,
        error: !!passwordConfirmError,
        errorMessage: passwordConfirmError,
        onChange: (e: ChangeEvent<HTMLInputElement>) =>
          setPasswordConfirm(e.target.value),
      },
    },
    isPending: signupMutation.isPending,
    isFormValid,
    handleSubmit,
  };
};
