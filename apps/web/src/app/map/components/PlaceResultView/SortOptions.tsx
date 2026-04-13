'use client';

import clsx from 'clsx';

import { SortOrder } from '../../hooks/useMapSearch';

interface SortOptionsProps {
  sortBy: SortOrder;
  onSortChange: (sort: SortOrder) => void;
}

export const SortOptions = ({ sortBy, onSortChange }: SortOptionsProps) => {
  return (
    <div className='flex gap-2 text-[11px] font-medium'>
      <button
        className={clsx(
          'transition-colors',
          sortBy === 'rating' ? 'text-orange-500' : 'text-gray-400',
        )}
        onClick={() => onSortChange('rating')}
      >
        평점순
      </button>
      <div className='h-3 w-[1px] self-center bg-gray-200' />
      <button
        className={clsx(
          'transition-colors',
          sortBy === 'latest' ? 'text-orange-500' : 'text-gray-400',
        )}
        onClick={() => onSortChange('latest')}
      >
        최신순
      </button>
    </div>
  );
};
