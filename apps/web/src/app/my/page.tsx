'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useMyInfoQuery } from '@/hooks/queries/useUserQuery';
import { useAuthStore } from '@/stores/useAuthStore';

import { AccountActions } from './components/AccountActions';
import { ChangePasswordForm } from './components/ChangePasswordForm';
import { EditNicknameForm } from './components/EditNicknameForm';
import { MyPageProfile } from './components/MyPageProfile';

export default function MyPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const { data: myInfo, isLoading, error } = useMyInfoQuery();

  // 비로그인 시 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  if (isLoading) {
    return (
      <div className='mx-auto flex min-h-[60vh] max-w-md items-center justify-center'>
        <div className='flex flex-col items-center gap-3'>
          <div className='h-8 w-8 animate-spin rounded-full border-2 border-orange-400 border-t-transparent' />
          <p className='text-sm text-gray-400'>불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !myInfo) {
    return (
      <div className='mx-auto flex min-h-[60vh] max-w-md items-center justify-center'>
        <div className='text-center'>
          <p className='text-gray-500'>정보를 불러올 수 없습니다.</p>
          <button
            className='mt-3 text-sm font-medium text-orange-500 hover:text-orange-600'
            type='button'
            onClick={() => window.location.reload()}
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='mx-auto w-full max-w-md px-4 py-8 md:py-12'>
      {/* 페이지 제목 */}
      <h1 className='mb-6 text-xl font-bold text-gray-900 md:text-2xl'>
        마이페이지
      </h1>

      {/* 프로필 카드 */}
      <div className='space-y-4'>
        <MyPageProfile user={myInfo} />

        {/* 닉네임 수정 */}
        <EditNicknameForm currentNickname={myInfo.nickname} />

        {/* 비밀번호 변경 */}
        <ChangePasswordForm />

        {/* 구분선 */}
        <div className='my-2' />

        {/* 로그아웃 / 회원 탈퇴 */}
        <AccountActions />
      </div>
    </div>
  );
}
