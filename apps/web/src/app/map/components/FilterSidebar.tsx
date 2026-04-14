'use client';

import clsx from 'clsx';

import { DEFAULT_FILTERS, ESSENTIAL_POLICIES, MapFilters } from './FilterPanel';

interface FilterSidebarProps {
  currentRegion: string;
  filters: MapFilters;
  isOpen: boolean;
  onClose: () => void;
  onFilterChange: (filters: MapFilters) => void;
  onRegionClick: () => void;
}

export const FilterSidebar = ({
  currentRegion,
  filters,
  isOpen,
  onClose,
  onFilterChange,
  onRegionClick,
}: FilterSidebarProps) => {
  const toggleSize = (size: string) => {
    const newSizes = filters.sizeLimit.includes(size)
      ? filters.sizeLimit.filter((s) => s !== size)
      : [...filters.sizeLimit, size];
    onFilterChange({ ...filters, sizeLimit: newSizes });
  };

  const togglePolicy = (policy: string) => {
    const newPolicies = filters.essentialPolicies.includes(policy)
      ? filters.essentialPolicies.filter((p) => p !== policy)
      : [...filters.essentialPolicies, policy];
    onFilterChange({ ...filters, essentialPolicies: newPolicies });
  };

  if (!isOpen) return null;

  return (
    <div className='absolute left-4 top-[140px] z-[60] w-[calc(100vw-32px)] md:w-[400px]'>
      {/* Backdrop for Mobile */}
      <div
        className='fixed inset-0 bg-transparent md:hidden'
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div className='animate-in slide-in-from-left-4 relative flex max-h-[calc(100vh-200px)] flex-col rounded-[24px] bg-white p-6 shadow-2xl ring-1 ring-black/5 duration-300'>
        <div className='mb-6 flex items-center justify-between'>
          <h2 className='text-lg font-bold text-gray-900'>상세 필터</h2>
          <div className='flex items-center gap-3'>
            <button
              className='text-xs font-bold text-gray-400 hover:text-gray-600'
              onClick={() => onFilterChange(DEFAULT_FILTERS)}
            >
              초기화
            </button>
            <button
              aria-label='필터 닫기'
              className='rounded-full bg-gray-100 p-1 text-gray-400 hover:bg-gray-200'
              onClick={onClose}
            >
              <svg
                className='h-4 w-4'
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
          </div>
        </div>

        <div className='thin-scrollbar flex-1 overflow-y-auto pr-1'>
          {/* 1. 지역 설정 */}
          <section className='mb-8'>
            <h3 className='mb-3 text-[13px] font-bold text-gray-900'>
              위치 설정
            </h3>
            <button
              className='flex w-full items-center justify-between rounded-xl bg-gray-50 px-4 py-3 transition-colors hover:bg-gray-100'
              onClick={onRegionClick}
            >
              <div className='flex items-center gap-2'>
                <svg
                  className='h-4 w-4 text-orange-500'
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
                <span className='text-sm font-semibold text-gray-700'>
                  {currentRegion || '전국'}
                </span>
              </div>
              <span className='text-[10px] font-bold uppercase text-orange-500'>
                Change
              </span>
            </button>
          </section>

          {/* 2. 견종 크기 */}
          <section className='mb-8'>
            <h3 className='mb-3 text-[13px] font-bold text-gray-900'>
              견종 크기
            </h3>
            <div className='flex gap-2'>
              {['소형', '중형', '대형'].map((size) => (
                <button
                  key={`size-${size}`}
                  className={clsx(
                    'flex-1 rounded-xl py-2.5 text-xs font-semibold transition-all',
                    filters.sizeLimit.includes(size)
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-100'
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100',
                  )}
                  onClick={() => toggleSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </section>

          {/* 3. 추가 옵션 */}
          <section className='mb-8'>
            <h3 className='mb-3 text-[13px] font-bold text-gray-900'>
              추가 옵션
            </h3>
            <div className='grid grid-cols-2 gap-2'>
              <button
                className={clsx(
                  'rounded-xl py-2.5 text-xs font-semibold transition-all',
                  filters.minRating === 4
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-100'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100',
                )}
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    minRating: filters.minRating === 4 ? null : 4,
                  })
                }
              >
                ★ 4.0 이상
              </button>
              <button
                className={clsx(
                  'rounded-xl py-2.5 text-xs font-semibold transition-all',
                  filters.hasParking
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-100'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100',
                )}
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    hasParking: filters.hasParking ? null : true,
                  })
                }
              >
                🚗 주차 가능
              </button>
            </div>
          </section>

          {/* 4. 장소 정책 */}
          <section className='mb-2'>
            <h3 className='mb-3 text-[13px] font-bold text-gray-900'>
              장소 정책
            </h3>
            <div className='grid grid-cols-2 gap-2'>
              {ESSENTIAL_POLICIES.map((policy) => (
                <button
                  key={policy.id}
                  className={clsx(
                    'h-11 rounded-xl py-2.5 text-[11px] font-semibold leading-tight transition-all',
                    filters.essentialPolicies.includes(policy.id)
                      ? 'bg-gray-800 text-white shadow-lg shadow-gray-200'
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100',
                  )}
                  onClick={() => togglePolicy(policy.id)}
                >
                  {policy.id}
                </button>
              ))}
            </div>
          </section>
        </div>

        <button
          className='mt-6 w-full rounded-2xl bg-orange-500 py-3.5 text-sm font-bold text-white shadow-xl shadow-orange-100 transition-transform active:scale-[0.98]'
          onClick={onClose}
        >
          필터 적용하기
        </button>
      </div>
    </div>
  );
};
