'use client';

import clsx from 'clsx';

interface MobileBottomSheetProps {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  resultCount: number;
  headerContent: React.ReactNode;
  children: React.ReactNode;
}

export const MobileBottomSheet = ({
  isExpanded,
  setIsExpanded,
  resultCount,
  headerContent,
  children,
}: MobileBottomSheetProps) => {
  return (
    <div
      aria-label='장소 검색 결과'
      className={clsx(
        'fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-[32px] bg-white shadow-[0_-8px_30px_rgb(0,0,0,0.12)] transition-transform duration-500 ease-out md:hidden',
        // 80vh에서 화면 전체(h-screen)로 확장하여 시인성 확보
        isExpanded
          ? 'h-screen translate-y-0'
          : 'h-screen translate-y-[calc(100vh-80px)]',
      )}
      role='dialog'
    >
      {/* Handle */}
      <div
        aria-label={isExpanded ? '목록 닫기' : '목록 열기'}
        className='flex w-full shrink-0 cursor-pointer justify-center py-4'
        role='button'
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className='h-1.5 w-12 rounded-full bg-gray-200' />
      </div>

      <div className='flex shrink-0 items-center justify-between px-6 pb-4'>
        <div className='flex flex-col gap-0.5'>
          <h2 className='text-lg font-bold text-gray-900'>
            검색 결과 {resultCount}개
          </h2>
          {isExpanded && headerContent}
        </div>
        {!isExpanded && (
          <button
            aria-label='장소 목록 전체 보기'
            className='text-sm font-semibold text-orange-500'
            onClick={() => setIsExpanded(true)}
          >
            목록보기
          </button>
        )}
      </div>

      <div className='thin-scrollbar flex flex-1 flex-col gap-4 overflow-y-auto px-6 pb-20'>
        {children}
      </div>
    </div>
  );
};
