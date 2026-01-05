import { ApiResponse } from './api';

// --- Review DTOs ---
export interface ReviewPhoto {
  id: number;
  reviewId: number;
  photoUrl: string;
}

// 리뷰 작성/수정 응답용 (상세 photo 객체 포함)
export interface ReviewWithPhotos {
  id: number;
  placeId: number;
  userId: number;
  rating: number;
  content: string;
  visitDate: string;
  createdAt?: string;
  updatedAt?: string;
  photos?: ReviewPhoto[];
}

// 리뷰 목록 조회용 (간단한 URL 배열만)
export interface ReviewSummary {
  id: number;
  placeId: number;
  userId: number;
  rating: number;
  content: string;
  visitDate: string;
  createdAt?: string;
  updatedAt?: string;
  photoUrls?: string[];
}

// --- Create Review ---
export interface CreateReviewRequest {
  placeId: number;
  rating: number;
  content: string;
  visitDate: string;
  images?: File[]; // Frontend usage for multipart/form-data
}

export type CreateReviewApiResponse = ApiResponse<ReviewWithPhotos>;

// --- Update Review ---
export interface UpdateReviewRequest {
  rating: number;
  content: string;
  visitDate: string;
  keepImageIds?: number[];
  newImages?: File[];
}

// ReviewUpdateResponse from Swagger
export interface ReviewUpdateResponse {
  updatedReview: ReviewWithPhotos;
  reviewUpdated: boolean;
  deletePhotoIds: number[];
  newPhotos: ReviewPhoto[];
}

export type UpdateReviewApiResponse = ApiResponse<ReviewUpdateResponse>;

// --- My Reviews ---
// MyReviewItem is essentially ReviewSummary
export type MyReviewItem = ReviewSummary;

export interface MyReviewsResponse {
  content: MyReviewItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export type MyReviewsApiResponse = ApiResponse<MyReviewsResponse>;
