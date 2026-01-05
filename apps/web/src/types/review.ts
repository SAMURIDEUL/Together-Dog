import { ApiResponse } from './api';

// --- Review DTOs ---
export interface ReviewPhoto {
  id: number;
  reviewId: number;
  photoUrl: string;
}

export interface Review {
  id: number;
  placeId: number;
  userId: number;
  rating: number;
  content: string;
  visitDate: string;
  createdAt?: string;
  updatedAt?: string;
  photos?: ReviewPhoto[];
  photoUrls?: string[]; // ReviewResponse uses photoUrls
}

// --- Create Review ---
export interface CreateReviewRequest {
  placeId: number;
  rating: number;
  content: string;
  visitDate: string;
  images?: File[]; // Frontend usage for multipart/form-data
}

export type CreateReviewApiResponse = ApiResponse<Review>;

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
  updatedReview: Review;
  reviewUpdated: boolean;
  deletePhotoIds: number[];
  newPhotos: ReviewPhoto[];
}

export type UpdateReviewApiResponse = ApiResponse<ReviewUpdateResponse>;

// --- My Reviews ---
export interface MyReviewItem {
  id: number;
  placeId: number;
  rating: number;
  content: string;
  visitDate: string;
  createdAt: string;
  updatedAt: string;
  photoUrls: string[];
}

export interface MyReviewsResponse {
  content: MyReviewItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export type MyReviewsApiResponse = ApiResponse<MyReviewsResponse>;
