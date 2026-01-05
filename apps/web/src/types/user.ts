import { ApiResponse } from './api';

// --- User Info ---
export interface User {
  id: number;
  email: string;
  nickname: string;
  created_at: string;
  updated_at: string;
}

export interface MyInfo {
  email: string;
  nickname: string;
  created_at: string;
  updated_at: string;
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
