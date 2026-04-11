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

  const response = await apiClient.patch<UpdateReviewApiResponse>(
    `/places/${placeId}/reviews/${reviewId}`,
    formData,
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

  const resData = response.data.data;

  if (Array.isArray(resData)) {
    return {
      content: resData as unknown as MyReviewsResponse['content'],
      page,
      size,
      totalElements: resData.length,
      totalPages: resData.length > 0 ? 1 : 0,
    };
  }

  if (
    !resData ||
    (!Array.isArray(resData.content) &&
      !Array.isArray((resData as unknown as { reviews?: unknown }).reviews))
  ) {
    throw new Error('내 리뷰 응답 형식이 올바르지 않습니다.');
  }

  let content: MyReviewsResponse['content'] = [];

  if (Array.isArray(resData.content)) {
    content = resData.content;
  } else if (
    Array.isArray((resData as unknown as { reviews?: unknown }).reviews)
  ) {
    content = (resData as unknown as { reviews: MyReviewsResponse['content'] })
      .reviews;
  }

  return {
    content,
    page: resData.page ?? page,
    size: resData.size ?? size,
    totalElements: resData.totalElements ?? content.length,
    totalPages: resData.totalPages ?? (content.length > 0 ? 1 : 0),
  };
};
