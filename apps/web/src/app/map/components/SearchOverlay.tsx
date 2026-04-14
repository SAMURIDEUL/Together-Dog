'use client';

import { SearchIcon } from '@together-dog/ui';
import clsx from 'clsx';

import { DASHBOARD_SECTIONS } from '@/app/places/constants';

interface SearchOverlayProps {
  keyword: string;
  onKeywordChange: (value: string) => void;
  selectedCategories: number[];
  onCategoryToggle: (id: number) => void;
  onSearch: () => void;
  onFilterClick: () => void;
  onRegionClick: () => void;
  activeFilterCount: number;
  activeChips?: { id: string; label: string; handleRemove: () => void }[];
  onFilterReset?: () => void;
}

export const SearchOverlay = ({
  keyword,
  onKeywordChange,
  selectedCategories,
  onCategoryToggle,
  onSearch,
  onFilterClick,
  onRegionClick,
  activeFilterCount,
  activeChips = [],
  onFilterReset,
}: SearchOverlayProps) => {
  return (
    <div className='absolute left-0 right-0 top-0 z-10 px-4 py-4 md:left-4 md:right-auto md:w-[400px]'>
      <div className='flex flex-col gap-3'>
        {/* 1. 검색창 */}
        <div className='flex items-center gap-2 overflow-hidden rounded-2xl bg-white p-2 pl-3 shadow-xl ring-1 ring-black/5'>
          <button
            aria-label='지역 선택'
            className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-500 transition-colors hover:bg-gray-100 active:scale-95'
            onClick={onRegionClick}
          >
            <svg
              className='h-5 w-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
              />
              <path
                d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
              />
            </svg>
          </button>
          <input
            aria-label='장소, 지역, 키워드 검색'
            className='flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400'
            placeholder='장소, 지역, 키워드 검색...'
            type='text'
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          />
          <button
            aria-label='검색'
            className='flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white transition-transform active:scale-95'
            onClick={onSearch}
          >
            <SearchIcon className='h-5 w-5' />
          </button>
        </div>

        {/* 2. 필터 및 카테고리 칩 (가로 스크롤 유닛) */}
        <div className='no-scrollbar flex items-center gap-2 overflow-x-auto pb-1'>
          <button
            aria-label='상세 필터 설정'
            className={clsx(
              'flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold shadow-sm transition-all active:scale-95',
              activeFilterCount > 0
                ? 'bg-orange-500 text-white shadow-orange-200'
                : 'bg-white text-gray-700 ring-1 ring-black/5 hover:bg-gray-50',
            )}
            onClick={onFilterClick}
          >
            <svg
              className='h-3.5 w-3.5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
              />
            </svg>
            필터
            {activeFilterCount > 0 ? (
              <span className='ml-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-orange-500'>
                {activeFilterCount}
              </span>
            ) : null}
          </button>

          <div className='h-4 w-[1px] shrink-0 bg-gray-200' />

          {DASHBOARD_SECTIONS.map((section) => {
            const isSelected = selectedCategories.includes(section.apiId);
            return (
              <button
                key={section.id}
                aria-label={`${section.title.split(' ').pop()} 카테고리 필터`}
                aria-pressed={isSelected}
                className={clsx(
                  'whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold shadow-sm transition-all',
                  isSelected
                    ? 'bg-orange-500 text-white shadow-orange-200'
                    : 'bg-white text-gray-600 ring-1 ring-black/5 hover:bg-gray-50',
                )}
                onClick={() => onCategoryToggle(section.apiId)}
              >
                {section.title.split(' ').pop()}
              </button>
            );
          })}
        </div>

        {/* 3. 활성 필터 상세 칩 렌더링 (칩이 있을 때만 노출) */}
        {activeChips.length > 0 ? (
          <div className='no-scrollbar flex items-center gap-1.5 overflow-x-auto pb-1'>
            {activeChips.map((chip) => (
              <button
                key={chip.id}
                aria-label={`${chip.label} 필터 제거`}
                className='flex shrink-0 items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold text-gray-600 shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition-all hover:bg-white'
                onClick={chip.handleRemove}
              >
                {chip.label}
                <svg
                  className='h-3 w-3 text-gray-400'
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
            ))}
            {onFilterReset ? (
              <button
                className='shrink-0 px-2 text-[11px] font-bold text-gray-400 hover:text-gray-600'
                onClick={onFilterReset}
              >
                초기화
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};
