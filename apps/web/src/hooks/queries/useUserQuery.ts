'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getPlaceDetail } from '@/api/place';
import { deleteReview, getMyReviews } from '@/api/review';
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

// ─── 내 리뷰 목록 조회 ───
export const useMyReviewsQuery = (page = 0, size = 5) => {
  return useQuery({
    queryKey: [...userKeys.all, 'myReviews', page, size] as const,
    queryFn: async () => {
      const response = await getMyReviews(page, size);
      return response.data;
    },
    staleTime: 1000 * 60 * 3, // 3분
  });
};

// ─── 찜 목록 조회 (likedPlaceIds 기반) ───
export const useLikedPlacesQuery = (placeIds: number[]) => {
  return useQuery({
    queryKey: [...userKeys.all, 'likedPlaces', placeIds] as const,
    queryFn: async () => {
      if (!placeIds.length) return [];
      const results = await Promise.all(
        placeIds.map((id) => getPlaceDetail(id).catch(() => null)),
      );
      return results.filter(Boolean);
    },
    enabled: placeIds.length > 0,
    staleTime: 1000 * 60 * 5,
  });
};

// ─── 리뷰 삭제 ───
export const useDeleteReviewMutation = ({
  onSuccess,
  onError,
}: UseMutationCallbacks = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      placeId,
      reviewId,
    }: {
      placeId: number;
      reviewId: number;
    }) => deleteReview(placeId, reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...userKeys.all, 'myReviews'],
      });
      onSuccess?.();
    },
    onError,
  });
};
