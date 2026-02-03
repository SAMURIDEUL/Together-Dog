import { ApiResponse } from './api';

// --- 로그인 (Login) ---
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export type LoginApiResponse = ApiResponse<LoginResponse>;

// --- 토큰 재발급 (Refresh Token) ---
export type RefreshTokenApiResponse = ApiResponse<LoginResponse>;

// --- 이메일/닉네임 중복 확인 (Check Email/Nickname) ---
export type CheckAvailabilityApiResponse = {
  isDuplicate?: boolean;
  isDupicate?: boolean; // API 문서상의 오타 대응
  [key: string]: string | boolean | undefined;
};

// --- 회원가입 (Signup) ---
export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
}

export type SignupApiResponse = ApiResponse<void>;
