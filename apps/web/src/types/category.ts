import { ApiResponse } from './api';

export interface Category {
  id: number;
  name: string;
  sort_order: number;
}

export type CategoryListApiResponse = ApiResponse<Category[]>;
