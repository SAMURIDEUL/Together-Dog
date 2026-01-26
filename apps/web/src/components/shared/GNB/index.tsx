'use client';
import { MapIcon, UserIcon } from '@together-dog/ui';
import Image from 'next/image';
import Link from 'next/link';

export const GNB = () => {
  return (
    <header className='sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md transition-colors'>
      <div className='mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 md:px-8'>
        {/* Logo Area */}
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

        {/* Right Actions */}
        <div className='flex items-center gap-2 md:gap-4'>
          {/* Map Link */}
          <Link
            aria-label='지도 보기'
            className='rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100'
            href='/map'
          >
            <MapIcon className='h-5 w-5' />
          </Link>
          <Link
            aria-label='마이페이지'
            className='rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100'
            href='/my'
          >
            <UserIcon className='h-5 w-5' />
          </Link>
        </div>
      </div>
    </header>
  );
};
