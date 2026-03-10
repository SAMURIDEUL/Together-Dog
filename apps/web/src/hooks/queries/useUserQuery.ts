'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getPlaceDetail } from '@/api/place';
import { deleteReview, getMyReviews } from '@/api/review';
import {
  changePassword,
  deleteUser,
  getMyInfo,
  getMyLikedPlaceIds,
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

// ─── 찜한 장소 ID 목록만 단독 조회 ───
export const useLikedPlaceIdsQuery = () => {
  return useQuery({
    queryKey: [...userKeys.all, 'likedPlaceIds'] as const,
    queryFn: getMyLikedPlaceIds,
    staleTime: 1000 * 60 * 3,
  });
};

// ─── 찜 목록 조회 (/users/likes → 장소 상세 조회) ───
export const useLikedPlacesQuery = () => {
  const { data: placeIds, isLoading: isIdsLoading } = useLikedPlaceIdsQuery();

  const query = useQuery({
    queryKey: [
      ...userKeys.all,
      'likedPlaces',
      placeIds ? [...placeIds].sort((a, b) => a - b).join(',') : '',
    ] as const,
    queryFn: async () => {
      if (!placeIds || !placeIds.length) return [];
      const results = await Promise.all(
        placeIds.map((id) =>
          getPlaceDetail(id).catch((err) => {
            console.error(
              `Failed to fetch liked place detail (ID: ${id}):`,
              err,
            );
            return null;
          }),
        ),
      );
      return results.filter(Boolean);
    },
    enabled: !!placeIds, // placeIds가 로딩 완료된 후에만 실행
    staleTime: 1000 * 60 * 3,
  });

  return {
    ...query,
    isLoading: isIdsLoading || query.isLoading,
  };
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
