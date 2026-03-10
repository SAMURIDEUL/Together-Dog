'use client';

import { Button, Input } from '@together-dog/ui';
import { useState } from 'react';

import { useUpdateNicknameMutation } from '@/hooks/queries/useUserQuery';
import { useToastStore } from '@/stores/useToastStore';

interface EditNicknameFormProps {
  currentNickname: string;
}

export const EditNicknameForm = ({
  currentNickname,
}: EditNicknameFormProps) => {
  const [nickname, setNickname] = useState(currentNickname);
  const [isEditing, setIsEditing] = useState(false);
  const { addToast } = useToastStore();

  const { mutate: updateNickname, isPending } = useUpdateNicknameMutation({
    onSuccess: () => {
      addToast('닉네임이 변경되었습니다.', 'success');
      setIsEditing(false);
    },
    onError: () => {
      addToast('닉네임 변경에 실패했습니다.', 'error');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nickname.trim();
    if (!trimmed || trimmed === currentNickname) return;
    updateNickname({ nickname: trimmed });
  };

  return (
    <div className='space-y-1.5'>
      <label
        className='text-sm font-semibold text-gray-500'
        htmlFor='edit-nickname'
      >
        닉네임
      </label>

      {!isEditing ? (
        <div className='flex gap-2'>
          <div className='flex h-11 flex-1 items-center rounded-xl border border-gray-200 px-4 text-sm text-gray-900'>
            {currentNickname}
          </div>
          <button
            className='h-11 shrink-0 rounded-xl border border-gray-200 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50'
            type='button'
            onClick={() => setIsEditing(true)}
          >
            수정
          </button>
        </div>
      ) : (
        <form className='flex gap-2' onSubmit={handleSubmit}>
          <div className='flex-1'>
            <Input
              className='h-11'
              id='edit-nickname'
              placeholder='새 닉네임 입력'
              type='text'
              value={nickname}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNickname(e.target.value)
              }
            />
          </div>
          <Button
            className='h-11 shrink-0 text-sm'
            isDisabled={
              isPending ||
              !nickname.trim() ||
              nickname.trim() === currentNickname
            }
            size='sm'
            type='submit'
          >
            {isPending ? '저장 중...' : '저장'}
          </Button>
          <button
            className='h-11 shrink-0 rounded-xl px-3 text-sm text-gray-500 transition-colors hover:bg-gray-100'
            type='button'
            onClick={() => {
              setNickname(currentNickname);
              setIsEditing(false);
            }}
          >
            취소
          </button>
        </form>
      )}
    </div>
  );
};
