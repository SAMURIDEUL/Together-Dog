'use client';

import { Button, Input } from '@together-dog/ui';
import { useState } from 'react';

import { useChangePasswordMutation } from '@/hooks/queries/useUserQuery';
import { useToastStore } from '@/stores/useToastStore';

export const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { addToast } = useToastStore();

  const { mutate: changePassword, isPending } = useChangePasswordMutation({
    onSuccess: () => {
      addToast('비밀번호가 변경되었습니다.', 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsOpen(false);
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

  if (!isOpen) {
    return (
      <section className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-sm font-semibold text-gray-500'>비밀번호</h3>
            <p className='mt-1 text-sm text-gray-400'>••••••••</p>
          </div>
          <Button
            className='text-sm'
            size='sm'
            type='button'
            onClick={() => setIsOpen(true)}
          >
            변경
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'>
      <h3 className='mb-4 text-sm font-semibold text-gray-500'>
        비밀번호 변경
      </h3>
      <form className='space-y-3' onSubmit={handleSubmit}>
        <div className='space-y-1'>
          <label
            className='ml-1 text-sm font-bold text-gray-700'
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

        <div className='space-y-1'>
          <label
            className='ml-1 text-sm font-bold text-gray-700'
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

        <div className='space-y-1'>
          <label
            className='ml-1 text-sm font-bold text-gray-700'
            htmlFor='confirm-password'
          >
            새 비밀번호 확인
          </label>
          <Input
            className='h-11'
            id='confirm-password'
            placeholder='새 비밀번호 다시 입력'
            type='password'
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
          />
          {confirmPassword && newPassword !== confirmPassword && (
            <p className='ml-1 text-xs text-red-500'>
              비밀번호가 일치하지 않습니다.
            </p>
          )}
        </div>

        <div className='flex gap-2 pt-2'>
          <Button
            className='flex-1 text-sm'
            isDisabled={isPending || !isFormValid}
            size='sm'
            type='submit'
          >
            {isPending ? '변경 중...' : '비밀번호 변경'}
          </Button>
          <button
            className='rounded-lg px-4 py-2 text-sm text-gray-500 transition-colors hover:bg-gray-100'
            type='button'
            onClick={() => {
              setCurrentPassword('');
              setNewPassword('');
              setConfirmPassword('');
              setIsOpen(false);
            }}
          >
            취소
          </button>
        </div>
      </form>
    </section>
  );
};
