'use client';

import { Button } from '@together-dog/ui';
import { useState } from 'react';

import { useModalStore } from '../stores/useModalStore';

export default function MyClientButton() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    console.log('✅ 버튼 클릭 이벤트 발생');
    setClicked(true);
  };

  return (
    <div className='flex w-full flex-col items-center justify-center gap-4 p-10'>
      {/* 🔹 기본 크기 버튼 */}
      <Button size='md' variant='primary' onClick={handleClick}>
        {clicked ? '테스트 완료 🎉' : '테스트 버튼'}
      </Button>

      {/* 🔹 가로로 긴 버튼 (xl 사이즈) */}
      <Button
        size='xl'
        variant='primary'
        onClick={() => alert('긴 버튼 클릭!')}
      >
        아주 길~~~은 버튼입니다 😎
      </Button>

      {/* 🔹 secondary 스타일로도 테스트 */}
      <Button size='xl' variant='secondary'>
        Secondary 긴 버튼
      </Button>

      {/* 🔹 전역 모달 테스트 */}
      <Button
        size='xl'
        variant='primary'
        onClick={() => {
          useModalStore.getState().openModal({
            title: '전역 모달 테스트',
            content: 'Zustand로 관리되는 전역 모달입니다!',
            primaryAction: {
              label: '확인',
              onClick: () => {
                alert('확인 버튼 클릭됨');
                useModalStore.getState().closeModal();
              },
            },
            secondaryAction: {
              label: '취소',
              onClick: () => useModalStore.getState().closeModal(),
            },
          });
        }}
      >
        전역 모달 열기 🚀
      </Button>

      {clicked && (
        <p className='font-semibold text-green-600'>버튼 클릭 성공!</p>
      )}
    </div>
  );
}
