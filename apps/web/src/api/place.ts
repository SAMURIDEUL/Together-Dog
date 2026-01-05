import {
  ApiPlaceResponse,
  Place,
  PlaceDetail,
  PlaceReviewResponse,
} from '@/types/place';

import { apiClient } from './client';

export interface GetPlacesParams {
  size?: number;
  city?: string;
  district?: string;
  subdistrict?: string;
  keyword?: string;
  lastId?: number;
}

export interface GetPlacesResponse {
  data: Place[];
  nextCursor: number | null;
  hasNext: boolean;
}

// 장소 목록 조회 (카테고리별)
export const getPlaces = async (
  categoryId: number,
  params: GetPlacesParams = {},
): Promise<GetPlacesResponse> => {
  const response = await apiClient.get<GetPlacesResponse>(
    `/categories/${categoryId}/places`,
    {
      params,
    },
  );
  return response.data;
};

// 랜덤 장소 추천 (메인 페이지용)
export const getRandomPlaces = async (): Promise<ApiPlaceResponse> => {
  const response = await apiClient.get<ApiPlaceResponse>('/places/random');
  return response.data;
};

// 장소 상세 정보 조회
export const getPlaceDetail = async (placeId: number): Promise<PlaceDetail> => {
  const response = await apiClient.get<PlaceDetail>(`/places/${placeId}`);
  return response.data;
};

// 장소 리뷰 목록 조회
export const getPlaceReviews = async (
  placeId: number,
  page = 0,
  size = 10,
): Promise<PlaceReviewResponse> => {
  const response = await apiClient.get<PlaceReviewResponse>(
    `/places/${placeId}/reviews`,
    {
      params: { page, size },
    },
  );
  return response.data;
};
