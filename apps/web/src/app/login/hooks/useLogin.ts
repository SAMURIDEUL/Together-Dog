'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { getMyInfo } from '@/api/user';
import { useLoginMutation } from '@/hooks/queries/useAuthMutation';
import { useAuthStore } from '@/stores/useAuthStore';
import { useToastStore } from '@/stores/useToastStore';
import type { User } from '@/types/user';

export const useLogin = () => {
  const router = useRouter();
  const { setLogin, setIsLoading, setError } = useAuthStore();
  const { addToast } = useToastStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: login, isPending } = useLoginMutation({
    onSuccess: async () => {
      try {
        setIsLoading(true);
        const userInfoResponse = await getMyInfo();
        setLogin(userInfoResponse.data as User);
        addToast('로그인에 성공했습니다.', 'success', 3000);
        router.push('/');
      } catch (error) {
        console.error('Failed to fetch user info after login', error);
        setError('사용자 정보를 가져오는데 실패했습니다.');
        addToast('사용자 정보를 불러오는데 실패했습니다.', 'error', 3000);
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || '이메일 또는 비밀번호가 틀렸습니다.';
      setError(errorMessage);
      addToast(errorMessage, 'error', 3000);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      addToast('이메일과 비밀번호를 모두 입력해주세요.', 'error', 3000);
      return;
    }

    login({ email, password });
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isPending,
    handleSubmit,
  };
};
