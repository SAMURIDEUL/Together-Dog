'use client';

import { clsx } from 'clsx';

export interface MapFilters {
  sizeLimit: string[]; // ['소형', '중형', '대형']
  isIndoor: boolean | null;
  isOutdoor: boolean | null;
  minRating: number | null;
  essentialPolicies: string[];
  hasParking: boolean | null;
}

interface FilterPanelProps {
  filters: MapFilters;
  onFilterChange: (filters: MapFilters) => void;
}

const ESSENTIAL_POLICIES = [
  { id: '리드줄', label: '리드줄 착용' },
  { id: '접종', label: '접종 필수' },
  { id: '예약', label: '사전 예약' },
  { id: '이동장', label: '이동장/케이지 필수' },
  { id: '매너벨트', label: '매너벨트 필수' },
  { id: '배변봉투', label: '배변봉투 상시 지참' },
  { id: '입마개', label: '입마개 필수' },
  { id: '노키즈존', label: '노키즈존' },
];

export const FilterPanel = ({ filters, onFilterChange }: FilterPanelProps) => {
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

  const toggleIndoor = () => {
    onFilterChange({ ...filters, isIndoor: filters.isIndoor ? null : true });
  };

  const toggleOutdoor = () => {
    onFilterChange({ ...filters, isOutdoor: filters.isOutdoor ? null : true });
  };

  const toggleParking = () => {
    onFilterChange({
      ...filters,
      hasParking: filters.hasParking ? null : true,
    });
  };

  const toggleRating = () => {
    onFilterChange({
      ...filters,
      minRating: filters.minRating === 4 ? null : 4,
    });
  };

  return (
    <div className='absolute left-4 top-48 z-10 flex flex-col gap-2 md:top-36'>
      <div className='no-scrollbar flex max-h-[calc(100vh-250px)] w-[220px] flex-col gap-3 overflow-y-auto rounded-2xl bg-white p-3 shadow-xl ring-1 ring-black/5'>
        {/* 평점 및 주차 필터 */}
        <div>
          <span className='mb-2 block text-[10px] font-bold text-gray-400'>
            조건
          </span>
          <div className='flex flex-col gap-1'>
            <button
              aria-label='평점 4.0 이상만 보기'
              aria-pressed={filters.minRating === 4}
              className={clsx(
                'flex w-full items-center justify-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                filters.minRating === 4
                  ? 'bg-orange-100 text-orange-600 ring-1 ring-orange-500'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100',
              )}
              onClick={toggleRating}
            >
              <span className='text-orange-500'>★</span> 평점 4.0+
            </button>
            <button
              aria-label='주차 가능 장소만 보기'
              aria-pressed={!!filters.hasParking}
              className={clsx(
                'flex w-full items-center justify-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                filters.hasParking
                  ? 'bg-blue-100 text-blue-600 ring-1 ring-blue-500'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100',
              )}
              onClick={toggleParking}
            >
              🚗 주차 가능
            </button>
          </div>
        </div>

        <div className='h-[1px] bg-gray-100' />

        {/* 견종 크기 필터 */}
        <div>
          <span className='mb-2 block text-[10px] font-bold text-gray-400'>
            견종 크기
          </span>
          <div className='flex flex-wrap gap-1'>
            {['소형', '중형', '대형'].map((size) => {
              const isActive = filters.sizeLimit.includes(size);
              return (
                <button
                  key={size}
                  aria-label={`${size}형견 필터`}
                  aria-pressed={isActive}
                  className={clsx(
                    'flex-1 rounded-lg px-2 py-1.5 text-center text-[11px] font-medium transition-all',
                    isActive
                      ? 'bg-orange-100 text-orange-600 ring-1 ring-orange-500'
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100',
                  )}
                  onClick={() => toggleSize(size)}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        <div className='h-[1px] bg-gray-100' />

        {/* 장소 환경 필터 */}
        <div>
          <span className='mb-2 block text-[10px] font-bold text-gray-400'>
            장소 환경
          </span>
          <div className='flex gap-1'>
            <button
              aria-label='실내 가능 장소만 보기'
              aria-pressed={!!filters.isIndoor}
              className={clsx(
                'flex-1 rounded-lg px-2 py-1.5 text-[11px] font-medium transition-all',
                filters.isIndoor
                  ? 'bg-blue-100 text-blue-600 ring-1 ring-blue-500'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100',
              )}
              onClick={toggleIndoor}
            >
              실내 가능
            </button>
            <button
              aria-label='야외 가능 장소만 보기'
              aria-pressed={!!filters.isOutdoor}
              className={clsx(
                'flex-1 rounded-lg px-2 py-1.5 text-[11px] font-medium transition-all',
                filters.isOutdoor
                  ? 'bg-green-100 text-green-600 ring-1 ring-green-500'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100',
              )}
              onClick={toggleOutdoor}
            >
              야외 가능
            </button>
          </div>
        </div>

        <div className='h-[1px] bg-gray-100' />

        {/* 상세 정책 필터 */}
        <div>
          <span className='mb-2 block text-[10px] font-bold text-gray-400'>
            반려견 정책 (추천)
          </span>
          <div className='grid grid-cols-2 gap-1'>
            {ESSENTIAL_POLICIES.map((policy) => {
              const isActive = filters.essentialPolicies.includes(policy.id);
              return (
                <button
                  key={policy.id}
                  aria-label={policy.label}
                  aria-pressed={isActive}
                  className={clsx(
                    'flex h-10 items-center justify-center rounded-lg px-2 py-2 text-center text-[10px] font-medium leading-tight transition-all',
                    isActive
                      ? 'bg-orange-100 text-orange-600 ring-1 ring-orange-500'
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100',
                  )}
                  onClick={() => togglePolicy(policy.id)}
                >
                  {policy.id}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
