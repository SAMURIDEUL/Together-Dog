import { ApiResponse } from './api';

// --- Login ---
export interface LoginRequest {
  email: string;
  password_hash: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export type LoginApiResponse = ApiResponse<LoginResponse>;

// --- Refresh Token ---
export type RefreshTokenApiResponse = ApiResponse<LoginResponse>;

// --- Check Email/Nickname ---
export type CheckAvailabilityApiResponse = ApiResponse<{
  [key: string]: string;
}>;

// --- Signup ---
export interface SignupRequest {
  email: string;
  password_hash: string;
  nickname: string;
}

export type SignupApiResponse = ApiResponse<void>;
