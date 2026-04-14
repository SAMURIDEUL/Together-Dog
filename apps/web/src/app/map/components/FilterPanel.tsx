'use client';

import clsx from 'clsx';
import { useMemo } from 'react';

export interface MapFilters {
  sizeLimit: string[];
  isIndoor: boolean | null;
  isOutdoor: boolean | null;
  minRating: number | null;
  essentialPolicies: string[];
  hasParking: boolean | null;
}

export const DEFAULT_FILTERS: MapFilters = {
  sizeLimit: [],
  isIndoor: null,
  isOutdoor: null,
  minRating: null,
  essentialPolicies: [],
  hasParking: null,
};

interface FilterPanelProps {
  filters: MapFilters;
  onFilterChange: (filters: MapFilters) => void;
  onFilterClick: () => void;
}

export const ESSENTIAL_POLICIES = [
  { id: '리드줄', label: '리드줄' },
  { id: '접종', label: '접종' },
  { id: '예약', label: '예약' },
  { id: '이동장', label: '이동장' },
  { id: '매너벨트', label: '매너벨트' },
  { id: '배변봉투', label: '배변봉투' },
  { id: '입마개', label: '입마개' },
  { id: '노키즈존', label: '노키즈존' },
];

export const FilterPanel = ({
  filters,
  onFilterChange,
  onFilterClick,
}: FilterPanelProps) => {
  const activeChips = useMemo(() => {
    const chips: { id: string; label: string; handleRemove: () => void }[] = [];

    if (filters.minRating === 4) {
      chips.push({
        id: 'rating',
        label: '★ 4.0+',
        handleRemove: () => onFilterChange({ ...filters, minRating: null }),
      });
    }
    if (filters.hasParking) {
      chips.push({
        id: 'parking',
        label: '🚗 주차',
        handleRemove: () => onFilterChange({ ...filters, hasParking: null }),
      });
    }
    filters.sizeLimit.forEach((size) => {
      chips.push({
        id: `size-${size}`,
        label: size,
        handleRemove: () =>
          onFilterChange({
            ...filters,
            sizeLimit: filters.sizeLimit.filter((s) => s !== size),
          }),
      });
    });
    if (filters.isIndoor) {
      chips.push({
        id: 'indoor',
        label: '실내',
        handleRemove: () => onFilterChange({ ...filters, isIndoor: null }),
      });
    }
    if (filters.isOutdoor) {
      chips.push({
        id: 'outdoor',
        label: '야외',
        handleRemove: () => onFilterChange({ ...filters, isOutdoor: null }),
      });
    }
    filters.essentialPolicies.forEach((policy) => {
      chips.push({
        id: `policy-${policy}`,
        label: policy,
        handleRemove: () =>
          onFilterChange({
            ...filters,
            essentialPolicies: filters.essentialPolicies.filter(
              (p) => p !== policy,
            ),
          }),
      });
    });

    return chips;
  }, [filters, onFilterChange]);

  return (
    <>
      {/* 1. Mobile Active Filter Chips */}
      <div className='no-scrollbar absolute inset-x-0 top-[148px] z-20 flex gap-2 overflow-x-auto px-4 py-2 md:hidden'>
        {activeChips.map((chip) => (
          <button
            key={chip.id}
            className='flex shrink-0 items-center gap-1 rounded-full bg-orange-50 px-3 py-1.5 text-[11px] font-bold text-orange-600 shadow-sm ring-1 ring-orange-200 transition-all active:scale-95'
            onClick={chip.handleRemove}
          >
            {chip.label}
            <svg
              className='h-3 w-3'
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
        {activeChips.length > 0 && (
          <button
            className='flex shrink-0 items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 text-[11px] font-bold text-gray-500 shadow-sm ring-1 ring-gray-200'
            onClick={() => onFilterChange(DEFAULT_FILTERS)}
          >
            초기화
          </button>
        )}
      </div>

      {/* 2. Desktop Filter UI (Naver Style: Horizontal & Compact) */}
      <div className='absolute left-4 top-36 z-10 hidden items-center gap-2 md:flex'>
        <button
          className={clsx(
            'flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold shadow-md transition-all active:scale-95',
            activeChips.length > 0
              ? 'bg-orange-500 text-white'
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
          상세 필터
          {activeChips.length > 0 && (
            <span className='ml-1 text-[10px] opacity-80'>
              {activeChips.length}
            </span>
          )}
        </button>

        <div className='flex items-center gap-1.5'>
          {activeChips.map((chip) => (
            <button
              key={chip.id}
              className='flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-gray-600 shadow-sm ring-1 ring-black/5 transition-all hover:bg-gray-50'
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
          {activeChips.length > 0 && (
            <button
              className='text-[11px] font-bold text-gray-400 hover:text-gray-600'
              onClick={() => onFilterChange(DEFAULT_FILTERS)}
            >
              초기화
            </button>
          )}
        </div>
      </div>
    </>
  );
};
