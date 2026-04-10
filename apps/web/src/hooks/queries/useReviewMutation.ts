'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createReview, deleteReview, updateReview } from '@/api/review';
import { placeKeys } from '@/hooks/queries/usePlaceQuery';
import { CreateReviewRequest, UpdateReviewRequest } from '@/types/review';

interface UseMutationCallbacks {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

// ─── 리뷰 작성 ───
export const useCreateReviewMutation = (
  placeId: number,
  { onSuccess, onError }: UseMutationCallbacks = {},
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReviewRequest) => createReview(placeId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', placeId] });
      queryClient.invalidateQueries({ queryKey: placeKeys.detail(placeId) });
      queryClient.invalidateQueries({ queryKey: ['user', 'myReviews'] });
      onSuccess?.();
    },
    onError,
  });
};

// ─── 리뷰 수정 ───
export const useUpdateReviewMutation = (
  placeId: number,
  reviewId: number,
  { onSuccess, onError }: UseMutationCallbacks = {},
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateReviewRequest) =>
      updateReview(placeId, reviewId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', placeId] });
      queryClient.invalidateQueries({ queryKey: placeKeys.detail(placeId) });
      queryClient.invalidateQueries({ queryKey: ['user', 'myReviews'] });
      onSuccess?.();
    },
    onError,
  });
};

// ─── 리뷰 삭제 ───
export const useDeletePlaceReviewMutation = (
  placeId: number,
  { onSuccess, onError }: UseMutationCallbacks = {},
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId: number) => deleteReview(placeId, reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', placeId] });
      queryClient.invalidateQueries({ queryKey: placeKeys.detail(placeId) });
      // 마이페이지 리뷰 목록도 무효화
      queryClient.invalidateQueries({ queryKey: ['user', 'myReviews'] });
      onSuccess?.();
    },
    onError,
  });
};
