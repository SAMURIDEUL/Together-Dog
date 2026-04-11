'use client';

import { clsx } from 'clsx';
import { useState } from 'react';

import { PlaceInfoCard } from '@/components/shared/PlaceInfoCard';
import { PlaceItem } from '@/types/place';
import { getAmenityBadges, getPetSizeBadge } from '@/utils/pet/parsers';

import { SortOrder } from '../hooks/useMapSearch';

interface PlaceResultViewProps {
  places: PlaceItem[];
  loading: boolean;
  onPlaceClick: (place: PlaceItem) => void;
  getCategoryKey: (id: number) => any;
  sortBy: SortOrder;
  onSortChange: (sort: SortOrder) => void;
  onNavigate: (place: PlaceItem) => void;
}

export const PlaceResultView = ({
  places,
  loading,
  onPlaceClick,
  getCategoryKey,
  sortBy,
  onSortChange,
  onNavigate,
}: PlaceResultViewProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const renderSortOptions = () => (
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

  const renderContent = () => {
    if (loading) {
      return (
        <div className='flex h-40 items-center justify-center text-gray-400'>
          불러오는 중...
        </div>
      );
    }

    if (places.length === 0) {
      return (
        <div className='flex h-40 items-center justify-center text-gray-400'>
          일치하는 장소가 없습니다.
        </div>
      );
    }

    return places.map((item, index) => (
      <div
        key={item.placeInfo.id}
        className='cursor-pointer'
        onClick={() => onPlaceClick(item)}
      >
        <PlaceInfoCard
          address={item.placeInfo.roadAddress}
          badges={[
            ...(item.placeInfo.petPolicy?.petSizeLimit
              ? [getPetSizeBadge(item.placeInfo.petPolicy.petSizeLimit)!]
              : []),
            ...getAmenityBadges(
              item.placeInfo.petPolicy?.indoorFlag,
              item.placeInfo.petPolicy?.outdoorFlag,
              item.placeInfo.parkingAvailable,
            ),
          ].filter(Boolean)}
          category={getCategoryKey(item.placeInfo.categoryId)}
          categoryLabel={item.placeInfo.category3}
          imageSrc={item.thumbnail || '/images/logo.png'}
          name={item.placeInfo.name}
          priority={index === 0}
          onDetailClick={(e) => {
            e.stopPropagation();
            onNavigate(item);
          }}
        />
      </div>
    ));
  };

  return (
    <>
      {/* Desktop Sidebar Toggle Button */}
      {!isVisible && (
        <button
          aria-label='목록 열기'
          className='absolute right-4 top-20 z-20 hidden h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-xl ring-1 ring-black/5 transition-all hover:bg-gray-50 active:scale-95 md:flex'
          onClick={() => setIsVisible(true)}
        >
          <div className='flex flex-col items-center gap-1'>
            <div className='h-0.5 w-5 bg-gray-600' />
            <div className='h-0.5 w-5 bg-gray-600' />
            <div className='h-0.5 w-5 bg-gray-600' />
          </div>
        </button>
      )}

      {/* Desktop Sidebar */}
      <div
        className={clsx(
          'absolute bottom-4 right-4 top-20 z-10 hidden w-[400px] flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/90 shadow-2xl backdrop-blur-md transition-all duration-300 md:flex',
          !isVisible && 'translate-x-[420px]',
        )}
      >
        <div className='flex items-center justify-between border-b bg-white/50 p-4'>
          <div className='flex items-center gap-3'>
            <button
              aria-label='목록 닫기'
              className='rounded-lg p-1 transition-colors hover:bg-gray-100'
              onClick={() => setIsVisible(false)}
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
            <h2 className='font-bold text-gray-900'>결과 {places.length}</h2>
          </div>
          {renderSortOptions()}
        </div>
        <div className='thin-scrollbar flex flex-1 flex-col gap-4 overflow-y-auto p-4'>
          {renderContent()}
        </div>
      </div>

      {/* Mobile Bottom Sheet */}
      <div
        aria-label='장소 검색 결과'
        className={clsx(
          'fixed inset-x-0 bottom-0 z-50 rounded-t-[32px] bg-white shadow-[0_-8px_30px_rgb(0,0,0,0.12)] transition-transform duration-500 ease-out md:hidden',
          isExpanded
            ? 'h-[80vh] translate-y-0'
            : 'h-[80vh] translate-y-[calc(80vh-80px)]',
        )}
        role='dialog'
      >
        {/* Handle */}
        <div
          aria-label={isExpanded ? '목록 닫기' : '목록 열기'}
          className='flex w-full cursor-pointer justify-center py-4'
          role='button'
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className='h-1.5 w-12 rounded-full bg-gray-200' />
        </div>

        <div className='flex items-center justify-between px-6 pb-4'>
          <div className='flex flex-col gap-0.5'>
            <h2 className='text-lg font-bold text-gray-900'>
              검색 결과 {places.length}개
            </h2>
            {isExpanded && renderSortOptions()}
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

        <div className='no-scrollbar flex flex-1 flex-col gap-4 overflow-y-auto px-6 pb-20'>
          {renderContent()}
        </div>
      </div>
    </>
  );
};
