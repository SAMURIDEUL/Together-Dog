'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { checkEmail, checkNickname, login, signup } from '@/api/auth';
import { useAuthStore } from '@/stores/useAuthStore';
import { SignupRequest } from '@/types/auth';

interface UseSignupMutationProps {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const useSignupMutation = ({
  onSuccess,
  onError,
}: UseSignupMutationProps = {}) => {
  const router = useRouter();
  const { setLogin } = useAuthStore();

  return useMutation({
    mutationFn: async ({
      email,
      password,
      nickname,
    }: SignupRequest) => {
      // 1. 회원가입 요청만 수행 (자동 로그인 제거)
      await signup({ email, password, nickname });
    },
    onSuccess: () => {
      // 성공 시 콜백 실행 (예: 로그인 페이지 이동)
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};

export const useCheckEmailMutation = () => {
  return useMutation({
    mutationFn: checkEmail,
  });
};

export const useCheckNicknameMutation = () => {
  return useMutation({
    mutationFn: checkNickname,
  });
};
