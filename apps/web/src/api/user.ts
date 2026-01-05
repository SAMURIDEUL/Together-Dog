import type {
  ChangePasswordApiResponse,
  ChangePasswordRequest,
  MyInfoApiResponse,
  UpdateUserApiResponse,
  UpdateUserRequest,
} from '@/types/user';

import { apiClient } from './client';

// 내 정보 조회
export const getMyInfo = async (): Promise<MyInfoApiResponse> => {
  const response = await apiClient.get<MyInfoApiResponse>('/users/info');
  return response.data;
};

// 내 정보 수정
export const updateMyInfo = async (
  data: UpdateUserRequest,
): Promise<UpdateUserApiResponse> => {
  const response = await apiClient.put<UpdateUserApiResponse>(
    '/users/me',
    data,
  );
  return response.data;
};

// 비밀번호 변경
export const changePassword = async (
  data: ChangePasswordRequest,
): Promise<ChangePasswordApiResponse> => {
  const response = await apiClient.put<ChangePasswordApiResponse>(
    '/users/change-password',
    data,
  );
  return response.data;
};

// 회원 탈퇴
export const deleteUser = async (): Promise<void> => {
  await apiClient.delete('/users/delete');
};
