'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='flex items-center justify-between bg-[#FFF9E8] px-8 py-4'>
      <Image
        priority
        alt='Together Dog'
        height={40}
        src='/images/logo.png'
        width={40}
      />
      <nav className='flex gap-6 font-medium text-[#3A2F2F]'>
        <Link href='/'>홈</Link>
      </nav>
    </header>
  );
}
