import {
  ApiPlaceReviewResponse,
  PlaceDetail,
  PlaceDetailResponse,
  PlaceItem,
  PlaceReviewResponse,
  RandomPlaceResponse,
} from '@/types/place';

import { apiClient } from './client';

export interface GetPlacesParams {
  size?: number;
  city?: string;
  district?: string;
  subdistrict?: string;
  keyword?: string;
  lastId?: number;
  lat?: number;
  lon?: number;
}

export interface GetPlacesResponse {
  status: number;
  message: string;
  data: {
    places: PlaceItem[];
    nextCursor: number | null;
    hasNext: boolean;
  };
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
  return response.data; // Returns the full API body including status, message, data
};

// 랜덤 장소 추천 (메인 페이지용)
export const getRandomPlaces = async (): Promise<PlaceItem[]> => {
  const response = await apiClient.get<RandomPlaceResponse>('/places/random');
  return response.data.data;
};

// 장소 상세 정보 조회
export const getPlaceDetail = async (placeId: number): Promise<PlaceDetail> => {
  const response = await apiClient.get<PlaceDetailResponse>(
    `/places/${placeId}`,
  );
  return response.data.data;
};

// 장소 리뷰 목록 조회
export const getPlaceReviews = async (
  placeId: number,
  page = 0,
  size = 10,
): Promise<PlaceReviewResponse> => {
  const response = await apiClient.get<ApiPlaceReviewResponse>(
    `/places/${placeId}/reviews`,
    {
      params: { page, size },
    },
  );
  return response.data.data;
};

// 장소 찜하기
export const likePlace = async (placeId: number): Promise<void> => {
  await apiClient.post(`/places/${placeId}/like`, null, {
    headers: {
      'Content-Type': false,
    },
  });
};

// 장소 찜 취소하기
export const unlikePlace = async (placeId: number): Promise<void> => {
  await apiClient.delete(`/places/${placeId}/like`, {
    headers: {
      'Content-Type': false,
    },
  });
};
