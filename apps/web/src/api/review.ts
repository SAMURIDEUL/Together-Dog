import type {
  CreateReviewApiResponse,
  CreateReviewRequest,
  MyReviewsApiResponse,
  MyReviewsResponse,
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

  // JSON 데이터 구성 (일부 백엔드는 URL의 placeId와 중복되면 오류가 날 수 있어 제거)
  const reviewDto = {
    rating: data.rating,
    content: data.content,
    visitDate: data.visitDate,
  };

  formData.append(
    'review',
    new Blob([JSON.stringify(reviewDto)], { type: 'application/json' }),
  );

  // 이미지 파일 추가
  if (data.images && data.images.length > 0) {
    data.images.forEach((file) => {
      formData.append('images', file);
    });
  }

  const response = await apiClient.post<CreateReviewApiResponse>(
    `/places/${placeId}/reviews`,
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

  // 유지할 이미지 ID 목록 추가 (FormData 개별 값)
  if (data.keepImageIds && data.keepImageIds.length > 0) {
    data.keepImageIds.forEach((id) =>
      formData.append('keepImageIds', id.toString()),
    );
  }

  // 새로운 이미지 파일 추가
  if (data.newImages) {
    data.newImages.forEach((file) => formData.append('newImages', file));
  }

  const response = await apiClient.put<UpdateReviewApiResponse>(
    `/places/${placeId}/reviews/${reviewId}`,
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
  await apiClient.delete(`/places/${placeId}/reviews/${reviewId}`);
};

// 내 리뷰 목록 조회
export const getMyReviews = async (
  page = 0,
  size = 10,
): Promise<MyReviewsResponse> => {
  const response = await apiClient.get<MyReviewsApiResponse>('/users/reviews', {
    params: { page, size },
  });

  // 데이터가 없을 경우 기본 객체 반환으로 'Query data cannot be undefined' 유발 방지
  return (
    response.data.data || {
      content: [],
      page: 0,
      size: 10,
      totalElements: 0,
      totalPages: 0,
    }
  );
};
