'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { checkEmail, checkNickname, login, signup } from '@/api/auth';
import { getMyInfo } from '@/api/user';
import { useAuthStore } from '@/stores/useAuthStore';
import { SignupRequest } from '@/types/auth'; // Ensure this type is exported
import { CONSTANTS } from '@shared/config/constants';

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
    }: Pick<SignupRequest, 'email' | 'nickname'> & { password: string }) => {
      // 1. 회원가입 요청 (password -> password_hash 매핑)
      // * API 스펙상 password_hash 필드를 요구함
      await signup({ email, password_hash: password, nickname });

      // 2. 바로 로그인 요청 (토큰 받아오기)
      const loginRes = await login({ email, password });
      const { accessToken } = loginRes.data;

      // 3. 토큰 로컬스토리지 저장
      if (typeof window !== 'undefined') {
        localStorage.setItem(CONSTANTS.STORAGE_KEYS.AUTH_TOKEN, accessToken);
      }

      // 4. 내 정보(User) 가져오기
      const myInfoRes = await getMyInfo();
      return myInfoRes.data;
    },
    onSuccess: (userInfo) => {
      // 5. 성공 시 스토어 업데이트
      setLogin({ ...userInfo, id: 0, likedPlaceIds: [] });
      
      // 추가 작업 (예: 페이지 이동)
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
