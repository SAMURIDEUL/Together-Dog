'use client';

import { MapIcon, MoonIcon, SunIcon, UserIcon } from '@together-dog/ui';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useTheme } from './ThemeProvider';

export const GNB = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className='sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md transition-colors dark:border-gray-800 dark:bg-gray-950/80'>
      <div className='mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 md:px-8'>
        {/* Logo Area */}
        <Link className='group flex items-center gap-2' href='/'>
          <div className='relative h-8 w-8 overflow-hidden transition-transform group-hover:scale-110'>
            <Image
              fill
              priority
              alt='함께하개 로고'
              className='object-contain'
              src='/images/logo.png'
            />
          </div>
          <span className='font-nanum text-lg font-bold text-gray-900 transition-colors dark:text-white'>
            함께하개
          </span>
        </Link>

        {/* Right Actions */}
        <div className='flex items-center gap-2 md:gap-4'>
          {/* Map Link */}
          <Link
            aria-label='지도 보기'
            className={`rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
              pathname === '/map'
                ? 'text-orange-500'
                : 'text-gray-600 dark:text-gray-400'
            }`}
            href='/map'
          >
            <MapIcon className='h-6 w-6' />
          </Link>

          {/* Theme Toggle */}
          <button
            aria-label='테마 변경'
            className='rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
            onClick={toggleTheme}
          >
            {theme === 'dark' ? (
              <MoonIcon className='h-6 w-6' />
            ) : (
              <SunIcon className='h-6 w-6' />
            )}
          </button>

          {/* Profile Link */}
          <Link
            aria-label='마이페이지'
            className={`rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
              pathname?.startsWith('/my')
                ? 'text-orange-500'
                : 'text-gray-600 dark:text-gray-400'
            }`}
            href='/my'
          >
            <UserIcon className='h-6 w-6' />
          </Link>
        </div>
      </div>
    </header>
  );
};
