'use client';

import { GithubIcon } from '@together-dog/ui';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className='border-t border-gray-200 bg-gray-50 py-8'>
      <div className='mx-auto flex max-w-screen-xl flex-col gap-6 px-4 md:px-8'>
        <div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
          {/* Logo & Copyright */}
          <div className='flex flex-col items-center gap-1 sm:items-start'>
            <span className='font-nanum text-lg font-bold text-gray-900'>
              함께하개
            </span>
            <p className='text-sm text-gray-500'>
              © 2025 Together Dog. All rights reserved.
            </p>
          </div>

          {/* Social & Team */}
          <div className='flex items-center gap-4'>
            <a
              aria-label='GitHub Repository'
              className='group rounded-full p-2 transition-colors hover:bg-gray-200'
              href='https://github.com/SAMURIDEUL/Together-Dog'
              rel='noopener noreferrer'
              target='_blank'
            >
              <GithubIcon className='h-6 w-6 text-gray-600 transition-colors group-hover:text-black' />
            </a>
            <span className='text-sm font-medium text-gray-600'>
              Team SAMURIDEUL
            </span>
          </div>
        </div>

        {/* Links (Placeholder) */}
        <div className='flex justify-center gap-6 border-t border-gray-200 pt-6 text-sm text-gray-500 sm:justify-start'>
          <Link className='hover:text-gray-900' href='#'>
            이용약관
          </Link>
          <Link className='hover:text-gray-900' href='#'>
            개인정보처리방침
          </Link>
        </div>
      </div>
    </footer>
  );
};
