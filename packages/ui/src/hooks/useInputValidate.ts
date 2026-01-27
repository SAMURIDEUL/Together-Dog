'use client';

import { useState } from 'react';

// 공통 유효성 검사 패턴
export const VALIDATION_PATTERNS = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, // 8자 이상, 영문/숫자/특수문자 포함
  nickname: /^[가-힣a-zA-Z0-9]{2,10}$/,
} as const;

export const ERROR_MESSAGES = {
  email: '올바른 이메일 형식이 아닙니다.',
  password: '비밀번호는 8자 이상, 영문/숫자/특수문자를 포함해야 합니다.',
  nickname: '닉네임은 2~10자의 한글, 영문, 숫자여야 합니다.',
} as const;

export type InputType = keyof typeof VALIDATION_PATTERNS;

export function getValidationError(type: InputType, value: string): string {
  if (!value) return '';
  const pattern = VALIDATION_PATTERNS[type];
  if (!pattern.test(value)) {
    return ERROR_MESSAGES[type];
  }
  return '';
}

export function useInputValidate(type: InputType, initial?: string) {
  const [value, setValue] = useState<string>(initial ?? '');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setErrorMsg(getValidationError(type, newValue));
  };

  // 필요 시 수동으로 유효성 검사를 트리거하는 함수
  const validate = () => {
    const msg = getValidationError(type, value);
    setErrorMsg(msg);
    return !msg;
  };

  return {
    value,
    setValue,
    handleChange,
    errorMsg,
    isValid: !errorMsg && value.length > 0,
    validate,
  };
}
