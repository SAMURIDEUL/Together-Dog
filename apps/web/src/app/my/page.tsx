'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useMyInfoQuery } from '@/hooks/queries/useUserQuery';
import { useAuthStore } from '@/stores/useAuthStore';

import { AccountActions } from './components/AccountActions';
import { ChangePasswordForm } from './components/ChangePasswordForm';
import { EditNicknameForm } from './components/EditNicknameForm';
import { MyPageProfile } from './components/MyPageProfile';

type TabType = 'profile' | 'settings';

export default function MyPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const { data: myInfo, isLoading, error } = useMyInfoQuery();
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  // 비로그인 시 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  if (isLoading) {
    return (
      <div className='mx-auto flex min-h-[60vh] max-w-5xl items-center justify-center'>
        <div className='flex flex-col items-center gap-3'>
          <div className='h-8 w-8 animate-spin rounded-full border-2 border-orange-400 border-t-transparent' />
          <p className='text-sm text-gray-400'>불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !myInfo) {
    return (
      <div className='mx-auto flex min-h-[60vh] max-w-5xl items-center justify-center'>
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

  const initial = myInfo.nickname?.charAt(0)?.toUpperCase() || '?';

  const tabs: { key: TabType; label: string; icon: string }[] = [
    { key: 'profile', label: '프로필 관리', icon: '👤' },
    { key: 'settings', label: '설정', icon: '⚙️' },
  ];

  return (
    <div className='mx-auto w-full max-w-5xl px-4 py-8 md:py-12'>
      <h1 className='mb-6 text-xl font-bold text-gray-900 md:hidden'>
        마이페이지
      </h1>

      <div className='flex flex-col gap-6 md:flex-row md:gap-8'>
        {/* ───── 사이드바 (데스크탑: 왼쪽 고정, 모바일: 상단 가로 스크롤) ───── */}
        <aside className='w-full shrink-0 md:w-60'>
          {/* 프로필 카드 */}
          <div className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'>
            <div className='flex flex-col items-center'>
              <div className='flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-amber-300 text-3xl font-bold text-white shadow-md'>
                {initial}
              </div>
              <h2 className='mt-3 text-base font-bold text-gray-900'>
                {myInfo.nickname}
              </h2>
              <p className='mt-0.5 text-xs text-gray-400'>
                반려동물과 함께하는 일상
              </p>
            </div>

            {/* 탭 네비게이션 */}
            <nav className='mt-6 space-y-1'>
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                    activeTab === tab.key
                      ? 'bg-orange-50 text-orange-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  type='button'
                  onClick={() => setActiveTab(tab.key)}
                >
                  <span className='text-base'>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* ───── 메인 콘텐츠 영역 ───── */}
        <main className='min-w-0 flex-1'>
          {activeTab === 'profile' && (
            <div className='space-y-6'>
              {/* My Profile 섹션 */}
              <section className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8'>
                <h2 className='mb-6 text-lg font-bold text-gray-900'>
                  My Profile
                </h2>

                {/* 프로필 정보 */}
                <MyPageProfile user={myInfo} />

                {/* 구분선 */}
                <hr className='my-6 border-gray-100' />

                {/* 닉네임 + 이메일 */}
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <EditNicknameForm currentNickname={myInfo.nickname} />

                  {/* 이메일 (읽기 전용) */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-semibold text-gray-500'>
                      이메일
                    </label>
                    <div className='flex h-11 items-center rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-500'>
                      {myInfo.email}
                    </div>
                  </div>
                </div>

                {/* 구분선 */}
                <hr className='my-6 border-gray-100' />

                {/* 비밀번호 변경 */}
                <ChangePasswordForm />
              </section>
            </div>
          )}

          {activeTab === 'settings' && (
            <section className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8'>
              <h2 className='mb-6 text-lg font-bold text-gray-900'>설정</h2>
              <AccountActions />
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
