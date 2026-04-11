'use client';

import { SearchIcon } from '@together-dog/ui';
import { clsx } from 'clsx';

import { DASHBOARD_SECTIONS } from '@/app/places/constants';

interface SearchOverlayProps {
  keyword: string;
  onKeywordChange: (value: string) => void;
  selectedCategories: number[];
  onCategoryToggle: (id: number) => void;
  onSearch: () => void;
}

export const SearchOverlay = ({
  keyword,
  onKeywordChange,
  selectedCategories,
  onCategoryToggle,
  onSearch,
}: SearchOverlayProps) => {
  return (
    <div className='absolute left-0 right-0 top-0 z-10 px-4 py-4 md:left-4 md:right-auto md:w-[400px]'>
      <div className='flex flex-col gap-3'>
        {/* 1. 검색창 */}
        <div className='flex items-center gap-2 overflow-hidden rounded-2xl bg-white p-2 pl-4 shadow-xl ring-1 ring-black/5'>
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

        {/* 2. 카테고리 퀵 칩 (가로 스크롤) */}
        <div className='no-scrollbar flex gap-2 overflow-x-auto pb-1'>
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
                    : 'bg-white text-gray-600 hover:bg-gray-50',
                )}
                onClick={() => onCategoryToggle(section.apiId)}
              >
                {section.title.split(' ').pop()}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
