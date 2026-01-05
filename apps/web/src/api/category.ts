import type { CategoryListApiResponse } from '@/types/category';

import { apiClient } from './client';

export const getCategories = async (): Promise<CategoryListApiResponse> => {
  const response = await apiClient.get<CategoryListApiResponse>('/categories');
  return response.data;
};
