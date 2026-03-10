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

  if (!isEditing) {
    return (
      <section className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-sm font-semibold text-gray-500'>닉네임</h3>
            <p className='mt-1 text-base font-medium text-gray-900'>
              {currentNickname}
            </p>
          </div>
          <Button
            className='text-sm'
            size='sm'
            type='button'
            onClick={() => setIsEditing(true)}
          >
            수정
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'>
      <h3 className='mb-3 text-sm font-semibold text-gray-500'>닉네임 수정</h3>
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
        <div className='flex gap-2'>
          <Button
            className='h-11 text-sm'
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
            className='h-11 rounded-lg px-3 text-sm text-gray-500 transition-colors hover:bg-gray-100'
            type='button'
            onClick={() => {
              setNickname(currentNickname);
              setIsEditing(false);
            }}
          >
            취소
          </button>
        </div>
      </form>
    </section>
  );
};
