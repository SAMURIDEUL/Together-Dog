import type {
  CheckAvailabilityApiResponse,
  LoginApiResponse,
  LoginRequest,
  RefreshTokenApiResponse,
  SignupApiResponse,
  SignupRequest,
} from '@/types/auth';

import { apiClient } from './client';

export const login = async (data: LoginRequest): Promise<LoginApiResponse> => {
  const payload = {
    email: data.email,
    password_hash: data.password,
  };

  const response = await apiClient.post<LoginApiResponse>(
    '/users/login',
    payload,
  );
  return response.data;
};

export const logout = async (): Promise<void> => {
  await apiClient.post('/users/logout');
};

export const signup = async (
  data: SignupRequest,
): Promise<SignupApiResponse> => {
  const response = await apiClient.post<SignupApiResponse>(
    '/users/signup',
    data,
  );
  return response.data;
};

export const refreshAccessToken = async (
  token: string,
): Promise<RefreshTokenApiResponse> => {
  const response = await apiClient.post<RefreshTokenApiResponse>(
    '/users/refresh',
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

// 닉네임 중복 확인
export const checkNickname = async (
  nickname: string,
): Promise<CheckAvailabilityApiResponse> => {
  const response = await apiClient.post<CheckAvailabilityApiResponse>(
    '/users/check-nickname',
    { nickname },
  );
  return response.data;
};

// 이메일 중복 확인
export const checkEmail = async (
  email: string,
): Promise<CheckAvailabilityApiResponse> => {
  const response = await apiClient.post<CheckAvailabilityApiResponse>(
    '/users/check-email',
    { email },
  );
  return response.data;
};
