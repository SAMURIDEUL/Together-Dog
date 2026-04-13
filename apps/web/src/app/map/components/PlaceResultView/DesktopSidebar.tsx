'use client';

import clsx from 'clsx';

interface DesktopSidebarProps {
  isVisible: boolean;
  onClose: () => void;
  resultCount: number;
  headerContent: React.ReactNode;
  children: React.ReactNode;
}

export const DesktopSidebar = ({
  isVisible,
  onClose,
  resultCount,
  headerContent,
  children,
}: DesktopSidebarProps) => {
  return (
    <div
      className={clsx(
        'absolute bottom-4 right-4 z-10 hidden w-[400px] flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/90 shadow-2xl backdrop-blur-md transition-all duration-300 md:flex',
        // top-20에서 top-4로 상향 조정하여 검색창과 높이 일치
        'top-4',
        !isVisible && 'translate-x-[420px]',
      )}
    >
      <div className='flex items-center justify-between border-b bg-white/50 p-4'>
        <div className='flex items-center gap-3'>
          <button
            aria-label='목록 닫기'
            className='rounded-lg p-1 transition-colors hover:bg-gray-100'
            onClick={onClose}
          >
            <svg
              className='h-5 w-5 text-gray-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                d='M6 18L18 6M6 6l12 12'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
              />
            </svg>
          </button>
          <h2 className='font-bold text-gray-900'>결과 {resultCount}</h2>
        </div>
        {headerContent}
      </div>
      <div className='thin-scrollbar flex flex-1 flex-col gap-4 overflow-y-auto p-4'>
        {children}
      </div>
    </div>
  );
};
