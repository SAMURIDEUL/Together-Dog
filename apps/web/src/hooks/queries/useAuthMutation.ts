'use client';

import { CONSTANTS } from '@shared/config/constants';
import { useMutation } from '@tanstack/react-query';

import { checkEmail, checkNickname, login, logout, signup } from '@/api/auth';
import { LoginRequest, SignupRequest } from '@/types/auth';

interface UseSignupMutationProps {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

// ─── 회원가입 ───
export const useSignupMutation = ({
  onSuccess,
  onError,
}: UseSignupMutationProps = {}) => {
  return useMutation({
    mutationFn: async ({ email, password, nickname }: SignupRequest) => {
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

interface UseLoginMutationProps {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

// ─── 로그인 ───
export const useLoginMutation = ({
  onSuccess,
  onError,
}: UseLoginMutationProps = {}) => {
  return useMutation({
    mutationFn: async ({ email, password }: LoginRequest) => {
      const response = await login({ email, password });
      return response;
    },
    onSuccess: (response) => {
      const data = response.data;
      if (typeof window !== 'undefined' && data?.accessToken) {
        localStorage.setItem(
          CONSTANTS.STORAGE_KEYS.AUTH_TOKEN,
          data.accessToken,
        );
        if (data.refreshToken) {
          localStorage.setItem(
            CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN,
            data.refreshToken,
          );
        }
      } else {
        console.warn(
          'Login successful but no accessToken received from server.',
        );
      }
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};

// ─── 이메일 중복 확인 ───
export const useCheckEmailMutation = () => {
  return useMutation({
    mutationFn: checkEmail,
  });
};

// ─── 닉네임 중복 확인 ───
export const useCheckNicknameMutation = () => {
  return useMutation({
    mutationFn: checkNickname,
  });
};

// ─── 로그아웃 ───
interface UseLogoutMutationProps {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const useLogoutMutation = ({
  onSuccess,
  onError,
}: UseLogoutMutationProps = {}) => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // API 성공 후 실행될 콜백
      onSuccess?.();
    },
    onError,
    onSettled: () => {
      // API 요청의 성공/실패 여부와 관계없이 토큰 제거 처리
      if (typeof window !== 'undefined') {
        localStorage.removeItem(CONSTANTS.STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem('accessToken');
      }
    },
  });
};
