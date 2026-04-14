'use client';

import clsx from 'clsx';

interface MyLocationButtonProps {
  onClick: () => void;
  className?: string;
}

export const MyLocationButton = ({
  onClick,
  className,
}: MyLocationButtonProps) => {
  return (
    <button
      aria-label='내 현재 위치로 이동'
      className={clsx(
        'flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-xl ring-1 ring-black/5 transition-all hover:bg-gray-50 active:scale-90',
        className,
      )}
      type='button'
      onClick={onClick}
    >
      <svg
        className='h-7 w-7 text-gray-800'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        {/* 바깥 원 */}
        <circle cx='12' cy='12' r='8' strokeWidth='2' />
        {/* 안쪽 작은 원 */}
        <circle cx='12' cy='12' r='2' strokeWidth='2.5' />
        {/* 십자선 (과녁 스타일) */}
        <path d='M12 2v3' strokeLinecap='round' strokeWidth='2' />
        <path d='M12 19v3' strokeLinecap='round' strokeWidth='2' />
        <path d='M2 12h3' strokeLinecap='round' strokeWidth='2' />
        <path d='M19 12h3' strokeLinecap='round' strokeWidth='2' />
      </svg>
    </button>
  );
};
