import { ApiResponse } from './api';

// --- User Info ---
export interface User {
  id: number;
  email: string;
  nickname: string;
  likedPlaceIds: number[];
  createdAt: string;
  updatedAt: string;
}

export interface MyInfo {
  id?: number;
  userId?: number; // 백엔드 필드 파편화 대응용
  memberId?: number; // 백엔드 필드 파편화 대응용
  email: string;
  nickname: string;
  likedPlaceIds?: number[];
  createdAt: string;
  updatedAt: string;
}

export type MyInfoApiResponse = ApiResponse<MyInfo>;

// --- Update Info ---
export interface UpdateUserRequest {
  nickname: string;
}

export type UpdateUserApiResponse = ApiResponse<void>;

// --- Change Password ---
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export type ChangePasswordApiResponse = ApiResponse<void>;
