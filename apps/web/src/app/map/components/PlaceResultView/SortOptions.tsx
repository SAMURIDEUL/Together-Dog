'use client';

import clsx from 'clsx';

import { SortOrder } from '@/utils/map/filterUtils';

interface SortOptionsProps {
  sortBy: SortOrder;
  onSortChange: (sort: SortOrder) => void;
}

export const SortOptions = ({ sortBy, onSortChange }: SortOptionsProps) => {
  return (
    <div className='flex gap-2 text-[11px] font-medium'>
      <button
        aria-label={`정렬: 평점순${sortBy === 'rating' ? ' 선택됨' : ''}`}
        aria-pressed={sortBy === 'rating'}
        className={clsx(
          'rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2',
          sortBy === 'rating' ? 'text-orange-500' : 'text-gray-400',
        )}
        type='button'
        onClick={() => onSortChange('rating')}
      >
        평점순
      </button>
      <div className='h-3 w-[1px] self-center bg-gray-200' />
      <button
        aria-label={`정렬: 최신순${sortBy === 'latest' ? ' 선택됨' : ''}`}
        aria-pressed={sortBy === 'latest'}
        className={clsx(
          'rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2',
          sortBy === 'latest' ? 'text-orange-500' : 'text-gray-400',
        )}
        type='button'
        onClick={() => onSortChange('latest')}
      >
        최신순
      </button>
      <div className='h-3 w-[1px] self-center bg-gray-200' />
      <button
        aria-label={`정렬: 거리순${sortBy === 'distance' ? ' 선택됨' : ''}`}
        aria-pressed={sortBy === 'distance'}
        className={clsx(
          'rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2',
          sortBy === 'distance' ? 'text-orange-500' : 'text-gray-400',
        )}
        type='button'
        onClick={() => onSortChange('distance')}
      >
        거리순
      </button>
    </div>
  );
};
