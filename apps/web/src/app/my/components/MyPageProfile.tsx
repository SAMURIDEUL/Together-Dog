'use client';

import { MyInfo } from '@/types/user';

interface MyPageProfileProps {
  user: MyInfo;
}

export const MyPageProfile = ({ user }: MyPageProfileProps) => {
  // 백엔드 날짜 형식 변환: "2026-03-10 06-17-27" → "2026-03-10T06:17:27"
  const parseDate = (dateStr: string) => {
    if (!dateStr) return null;
    const normalized = dateStr.replace(
      /(\d{4}-\d{2}-\d{2})\s(\d{2})-(\d{2})-(\d{2})/,
      '$1T$2:$3:$4',
    );
    const date = new Date(normalized);
    return isNaN(date.getTime()) ? null : date;
  };

  const parsed = parseDate(user.createdAt);
  const formattedDate = parsed
    ? parsed.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '정보 없음';

  const initial = user.nickname?.charAt(0)?.toUpperCase() || '?';

  return (
    <div className='flex items-center gap-4'>
      {/* 아바타 */}
      <div className='flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-amber-300 text-2xl font-bold text-white shadow-md'>
        {initial}
      </div>

      {/* 사용자 정보 */}
      <div className='flex flex-col'>
        <h3 className='text-base font-bold text-gray-900'>{user.nickname}</h3>
        <p className='text-sm text-gray-500'>{user.email}</p>
        <p className='mt-1 text-xs text-gray-400'>가입일: {formattedDate}</p>
      </div>
    </div>
  );
};
