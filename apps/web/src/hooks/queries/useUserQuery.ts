'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { logout } from '@/api/auth';
import {
  changePassword,
  deleteUser,
  getMyInfo,
  updateMyInfo,
} from '@/api/user';
import { ChangePasswordRequest, UpdateUserRequest } from '@/types/user';

// ─── Query Keys ───
const userKeys = {
  all: ['user'] as const,
  myInfo: () => [...userKeys.all, 'myInfo'] as const,
};

// ─── 내 정보 조회 ───
export const useMyInfoQuery = () => {
  return useQuery({
    queryKey: userKeys.myInfo(),
    queryFn: async () => {
      const response = await getMyInfo();
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5분
  });
};

// ─── 닉네임 수정 ───
interface UseMutationCallbacks {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const useUpdateNicknameMutation = ({
  onSuccess,
  onError,
}: UseMutationCallbacks = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserRequest) => updateMyInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.myInfo() });
      onSuccess?.();
    },
    onError,
  });
};

// ─── 비밀번호 변경 ───
export const useChangePasswordMutation = ({
  onSuccess,
  onError,
}: UseMutationCallbacks = {}) => {
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) => changePassword(data),
    onSuccess: () => {
      onSuccess?.();
    },
    onError,
  });
};

// ─── 로그아웃 ───
export const useLogoutMutation = ({
  onSuccess,
  onError,
}: UseMutationCallbacks = {}) => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      onSuccess?.();
    },
    onError,
  });
};

// ─── 회원 탈퇴 ───
export const useDeleteAccountMutation = ({
  onSuccess,
  onError,
}: UseMutationCallbacks = {}) => {
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      onSuccess?.();
    },
    onError,
  });
};
