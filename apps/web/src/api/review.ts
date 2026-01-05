import type {
  CreateReviewApiResponse,
  CreateReviewRequest,
  MyReviewsApiResponse,
  UpdateReviewApiResponse,
  UpdateReviewRequest,
} from '@/types/review';

import { apiClient } from './client';

// 리뷰 작성 (멀티파트)
export const createReview = async (
  placeId: number,
  data: CreateReviewRequest,
): Promise<CreateReviewApiResponse> => {
  const formData = new FormData();

  // JSON 데이터 추가
  const reviewDto = {
    placeId,
    rating: data.rating,
    content: data.content,
    visitDate: data.visitDate,
  };

  formData.append(
    'review',
    new Blob([JSON.stringify(reviewDto)], { type: 'application/json' }),
  );

  // 이미지 파일 추가
  if (data.images) {
    data.images.forEach((file) => {
      formData.append('images', file);
    });
  }

  const response = await apiClient.post<CreateReviewApiResponse>(
    `/place/${placeId}/reviews`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};

// 리뷰 수정 (멀티파트)
export const updateReview = async (
  placeId: number,
  reviewId: number,
  data: UpdateReviewRequest,
): Promise<UpdateReviewApiResponse> => {
  const formData = new FormData();

  const reviewDto = {
    rating: data.rating,
    content: data.content,
    visitDate: data.visitDate,
  };

  formData.append(
    'review',
    new Blob([JSON.stringify(reviewDto)], { type: 'application/json' }),
  );

  // 유지할 이미지 ID 목록 추가
  if (data.keepImageIds) {
    data.keepImageIds.forEach((id) =>
      formData.append('keepImageIds', id.toString()),
    );
  }

  // 새로운 이미지 파일 추가
  if (data.newImages) {
    data.newImages.forEach((file) => formData.append('newImages', file));
  }

  const response = await apiClient.put<UpdateReviewApiResponse>(
    `/place/${placeId}/reviews/${reviewId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};

// 리뷰 삭제
export const deleteReview = async (
  placeId: number,
  reviewId: number,
): Promise<void> => {
  await apiClient.delete(`/place/${placeId}/reviews/${reviewId}`);
};

// 내 리뷰 목록 조회
export const getMyReviews = async (
  page = 0,
  size = 10,
): Promise<MyReviewsApiResponse> => {
  const response = await apiClient.get<MyReviewsApiResponse>('/users/reviews', {
    params: { page, size },
  });
  return response.data;
};
