'use client';

import { MyInfo } from '@/types/user';

interface MyPageProfileProps {
  user: MyInfo;
}

export const MyPageProfile = ({ user }: MyPageProfileProps) => {
  const formattedDate = new Date(user.createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // 닉네임 첫 글자로 아바타 표시
  const initial = user.nickname?.charAt(0)?.toUpperCase() || '?';

  return (
    <section className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'>
      <div className='flex items-center gap-4'>
        {/* 아바타 */}
        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-amber-300 text-2xl font-bold text-white shadow-md'>
          {initial}
        </div>

        {/* 사용자 정보 */}
        <div className='flex flex-col'>
          <h2 className='text-lg font-bold text-gray-900'>{user.nickname}</h2>
          <p className='text-sm text-gray-500'>{user.email}</p>
          <p className='mt-1 text-xs text-gray-400'>가입일: {formattedDate}</p>
        </div>
      </div>
    </section>
  );
};
