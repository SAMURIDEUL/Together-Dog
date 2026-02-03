'use client';

import { MapIcon, SearchIcon, UserIcon } from '@together-dog/ui';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useAuthStore } from '@/stores/useAuthStore';

export const GNB = () => {
  const { isLoggedIn } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className='sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md transition-colors'>
      <div className='mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 md:px-8'>
        {/* 로고 영역 */}
        <Link className='group flex items-center gap-2' href='/'>
          <div className='relative h-7 w-7 overflow-hidden transition-transform group-hover:scale-110'>
            <Image
              fill
              priority
              alt='함께하개 로고'
              className='object-contain'
              sizes='28px'
              src='/images/logo.png'
            />
          </div>
          <span className='font-nanum text-lg font-bold text-gray-900 transition-colors'>
            함께하개
          </span>
        </Link>

        {/* 오른쪽 액션 영역 */}
        <div className='flex items-center gap-2 md:gap-4'>
          {/* 모바일/데스크톱 공용 아이콘 링크들 */}
          <Link
            aria-label='장소 리스트 보기'
            className='rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100'
            href='/places'
          >
            <SearchIcon className='h-5 w-5' />
          </Link>
          <Link
            aria-label='지도 보기'
            className='rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100'
            href='/map'
          >
            <MapIcon className='h-5 w-5' />
          </Link>

          <div className='h-4 w-[1px] bg-gray-200' />

          {/* 인증 상태에 따른 버튼 */}
          {mounted && isLoggedIn ? (
            <Link
              aria-label='마이페이지'
              className='rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100'
              href='/my'
            >
              <UserIcon className='h-5 w-5' />
            </Link>
          ) : (
            <Link
              className='text-sm font-semibold text-gray-700 transition-colors hover:text-orange-500'
              href='/login'
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
