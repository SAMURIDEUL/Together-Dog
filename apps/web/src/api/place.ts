import { Place } from '@/types/place';

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

export const getRandomPlaces = async () => {
  const response = await apiClient.get<{
    status: number;
    message: string;
    data: Place[];
  }>('/categories/places/random');
  return response.data;
};
