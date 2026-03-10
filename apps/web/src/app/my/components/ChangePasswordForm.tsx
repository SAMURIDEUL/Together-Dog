'use client';

import { Button, Input } from '@together-dog/ui';
import { useState } from 'react';

import { useChangePasswordMutation } from '@/hooks/queries/useUserQuery';
import { useToastStore } from '@/stores/useToastStore';

export const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { addToast } = useToastStore();

  const { mutate: changePassword, isPending } = useChangePasswordMutation({
    onSuccess: () => {
      addToast('비밀번호가 변경되었습니다.', 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    },
    onError: () => {
      addToast(
        '비밀번호 변경에 실패했습니다. 현재 비밀번호를 확인해주세요.',
        'error',
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      addToast('새 비밀번호가 일치하지 않습니다.', 'error');
      return;
    }

    if (newPassword.length < 8) {
      addToast('비밀번호는 8자 이상이어야 합니다.', 'error');
      return;
    }

    changePassword({ currentPassword, newPassword });
  };

  const isFormValid =
    currentPassword.trim() !== '' &&
    newPassword.trim() !== '' &&
    confirmPassword.trim() !== '' &&
    newPassword === confirmPassword &&
    newPassword.length >= 8;

  return (
    <div className='space-y-4'>
      <h3 className='text-sm font-semibold text-gray-500'>비밀번호 변경</h3>

      <form className='space-y-4' onSubmit={handleSubmit}>
        {/* 현재 비밀번호 */}
        <div className='space-y-1.5'>
          <label
            className='text-xs font-medium text-gray-500'
            htmlFor='current-password'
          >
            현재 비밀번호
          </label>
          <Input
            className='h-11'
            id='current-password'
            placeholder='현재 비밀번호 입력'
            type='password'
            value={currentPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCurrentPassword(e.target.value)
            }
          />
        </div>

        {/* 새 비밀번호 + 확인 (2열 그리드) */}
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='space-y-1.5'>
            <label
              className='text-xs font-medium text-gray-500'
              htmlFor='new-password'
            >
              새 비밀번호
            </label>
            <Input
              className='h-11'
              id='new-password'
              placeholder='새 비밀번호 (8자 이상)'
              type='password'
              value={newPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewPassword(e.target.value)
              }
            />
          </div>

          <div className='space-y-1.5'>
            <label
              className='text-xs font-medium text-gray-500'
              htmlFor='confirm-password'
            >
              비밀번호 확인
            </label>
            <Input
              className='h-11'
              id='confirm-password'
              placeholder='비밀번호 다시 입력'
              type='password'
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
            />
          </div>
        </div>

        {confirmPassword && newPassword !== confirmPassword && (
          <p className='text-xs text-red-500'>비밀번호가 일치하지 않습니다.</p>
        )}

        {/* 저장하기 버튼 */}
        <div className='flex justify-end pt-2'>
          <Button
            className='text-sm'
            isDisabled={isPending || !isFormValid}
            size='md'
            type='submit'
          >
            {isPending ? '변경 중...' : '저장하기'}
          </Button>
        </div>
      </form>
    </div>
  );
};
