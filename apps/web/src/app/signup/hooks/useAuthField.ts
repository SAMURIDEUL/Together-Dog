import { useInputValidate } from '@together-dog/ui';
import { useState } from 'react';

import {
  useCheckEmailMutation,
  useCheckNicknameMutation,
} from '@/hooks/queries/useAuthMutation';

export type AuthFieldType = 'email' | 'nickname';

export const useAuthField = (type: AuthFieldType) => {
  // 1. 기본 유효성 검사 (validation)
  const validation = useInputValidate(type);

  // 2. 중복 확인 상태
  const [isChecked, setIsChecked] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 3. API Mutation 선택
  const checkEmailMutation = useCheckEmailMutation();
  const checkNicknameMutation = useCheckNicknameMutation();
  const mutation =
    type === 'email' ? checkEmailMutation : checkNicknameMutation;

  // 중복 확인 핸들러
  const handleCheck = () => {
    if (!validation.isValid) return;

    setSuccessMessage('');
    setErrorMessage('');

    mutation.mutate(validation.value, {
      onSuccess: (res) => {
        const { isDuplicate } = res.data;

        if (isDuplicate) {
          setErrorMessage(
            `이미 사용 중인 ${type === 'email' ? '이메일' : '닉네임'}입니다.`,
          );
          setIsChecked(false);
        } else {
          setSuccessMessage(
            `사용 가능한 ${type === 'email' ? '이메일' : '닉네임'}입니다.`,
          );
          setIsChecked(true);
        }
      },
      onError: (error: any) => {
        if (error.response?.status === 400) {
          setErrorMessage(
            `이미 사용 중인 ${type === 'email' ? '이메일' : '닉네임'}입니다.`,
          );
        } else {
          setErrorMessage(
            `${type === 'email' ? '이메일' : '닉네임'} 중복 확인 중 오류가 발생했습니다.`,
          );
        }
        setIsChecked(false);
      },
    });
  };

  // 값 변경 시 상태 초기화
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validation.handleChange(e);
    setIsChecked(false);
    setSuccessMessage('');
    setErrorMessage('');
  };

  return {
    ...validation,
    handleChange, // 오버라이드
    isChecked,
    successMessage,
    errorMessage: validation.errorMsg || errorMessage,
    handleCheck,
  };
};
