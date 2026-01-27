'use client';

import { useInputValidate } from '@together-dog/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  useCheckEmailMutation,
  useCheckNicknameMutation,
  useSignupMutation,
} from '@/hooks/queries/useAuthMutation';

export const useSignup = () => {
  const router = useRouter();

  // 1. Validation Hooks
  const {
    value: email,
    handleChange: handleEmailChange,
    errorMsg: emailError,
    isValid: isEmailValid,
  } = useInputValidate('email');

  const {
    value: password,
    handleChange: handlePasswordChange,
    errorMsg: pwError,
    isValid: isPasswordValid,
  } = useInputValidate('password');

  const {
    value: nickname,
    handleChange: handleNicknameChange,
    errorMsg: nicknameError,
    isValid: isNicknameValid,
  } = useInputValidate('nickname');

  // 2. Duplicate Check States & Mutations
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [nicknameMessage, setNicknameMessage] = useState('');

  const checkEmailMutation = useCheckEmailMutation();
  const checkNicknameMutation = useCheckNicknameMutation();

  const handleCheckEmail = () => {
    if (!isEmailValid) return;
    checkEmailMutation.mutate(email, {
      onSuccess: (res) => {
        const { isDuplicate, isDupicate } = res.data;
        if (isDuplicate || isDupicate) {
          setEmailMessage('이미 사용 중인 이메일입니다.');
          setIsEmailChecked(false);
        } else {
          setEmailMessage('사용 가능한 이메일입니다.');
          setIsEmailChecked(true);
        }
      },
      onError: () => {
        setEmailMessage('이메일 중복 확인 중 오류가 발생했습니다.');
        setIsEmailChecked(false);
      },
    });
  };

  const handleCheckNickname = () => {
    if (!isNicknameValid) return;
    checkNicknameMutation.mutate(nickname, {
      onSuccess: (res) => {
        const { isDuplicate, isDupicate } = res.data;
        if (isDuplicate || isDupicate) {
          setNicknameMessage('이미 사용 중인 닉네임입니다.');
          setIsNicknameChecked(false);
        } else {
          setNicknameMessage('사용 가능한 닉네임입니다.');
          setIsNicknameChecked(true);
        }
      },
      onError: () => {
        setNicknameMessage('닉네임 중복 확인 중 오류가 발생했습니다.');
        setIsNicknameChecked(false);
      },
    });
  };

  // Reset check state on change
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleEmailChange(e);
    setIsEmailChecked(false);
    setEmailMessage('');
  };

  const onNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleNicknameChange(e);
    setIsNicknameChecked(false);
    setNicknameMessage('');
  };

  // 3. Password Confirm Logic
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const isPasswordMatch = password === passwordConfirm;
  const passwordConfirmError =
    passwordConfirm && !isPasswordMatch ? '비밀번호가 일치하지 않습니다.' : '';

  // 4. Signup Mutation (Global Hook)
  const signupMutation = useSignupMutation({
    onSuccess: () => {
      router.push('/');
    },
    onError: (error) => {
      console.error('회원가입 실패:', error);
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password || !passwordConfirm || !nickname) {
      alert('모든 정보를 입력해 주세요.');
      return;
    }

    if (!isEmailChecked) {
      alert('이메일 중복 확인을 해주세요.');
      return;
    }

    if (!isNicknameChecked) {
      alert('닉네임 중복 확인을 해주세요.');
      return;
    }

    if (
      !isEmailValid ||
      !isPasswordValid ||
      !isNicknameValid ||
      !isPasswordMatch
    ) {
      alert('입력 정보를 다시 확인해 주세요.');
      return;
    }

    signupMutation.mutate({ email, password, nickname });
  };

  // 5. Form Validity
  const isFormValid =
    isEmailValid &&
    isPasswordValid &&
    isNicknameValid &&
    isPasswordMatch &&
    isEmailChecked &&
    isNicknameChecked &&
    // Ensure all fields have values
    !!email &&
    !!password &&
    !!passwordConfirm &&
    !!nickname;

  return {
    formState: {
      email,
      password,
      passwordConfirm,
      nickname,
      isEmailChecked,
      isNicknameChecked,
      emailMessage,
      nicknameMessage,
    },
    handlers: {
      handleEmailChange: onEmailChange,
      handlePasswordChange,
      handleNicknameChange: onNicknameChange,
      handlePasswordConfirmChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPasswordConfirm(e.target.value),
      handleCheckEmail,
      handleCheckNickname,
      handleSubmit,
    },
    errors: {
      emailError,
      pwError,
      nicknameError,
      passwordConfirmError,
    },
    isPending: signupMutation.isPending,
    isFormValid,
  };
};
