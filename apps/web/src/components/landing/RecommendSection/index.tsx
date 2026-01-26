'use client';

import { cn } from '@together-dog/ui';
import Link from 'next/link';
import { type ComponentProps } from 'react';

import { PlaceInfoCard } from '@/components/shared/PlaceInfoCard';
import { mapPlaceToCardProps } from '@/utils/petMapper';
import { useRecommendPlaces } from './useRecommendPlaces';

export const RecommendSection = ({
  className,
  ...props
}: ComponentProps<'section'>) => {
  const { places, isLoading, error, loadingIds, handleLikeClick } =
    useRecommendPlaces();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className='flex items-center justify-center py-20'>
          <div className='h-12 w-12 animate-spin rounded-full border-b-2 border-orange-500' />
        </div>
      );
    }

    if (error) {
      return (
        <div className='rounded-xl border border-dashed bg-white py-20 text-center'>
          <p className='mb-4 text-gray-500'>{error}</p>
          <button
            className='text-sm font-semibold text-orange-500 hover:underline'
            onClick={() => window.location.reload()}
          >
            다시 시도하기
          </button>
        </div>
      );
    }

    return (
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {places.map((place, index) => {
          if (!place || !place.placeInfo) return null;

          const cardProps = mapPlaceToCardProps(place, index);

          return (
            <Link
              key={place.placeInfo.id}
              href={`/places/${place.placeInfo.id}`}
            >
              <PlaceInfoCard
                {...cardProps}
                disabled={loadingIds.has(place.placeInfo.id)}
                isLike={place.isLike}
                onLikeClick={(e) => handleLikeClick(e, place.placeInfo.id)}
              />
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <section
      className={cn(
        'mx-auto w-full max-w-screen-xl px-4 py-16 md:px-8',
        className,
      )}
      {...props}
    >
      <div className='mb-8 flex items-end justify-between'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-2xl font-bold text-gray-900 md:text-3xl'>
            이번 주 인기 장소 🔥
          </h2>
          <p className='text-gray-500'>이번 주말엔 여기 어때요?</p>
        </div>
        <Link
          className='flex items-center text-sm font-medium text-gray-500 hover:text-orange-500 hover:underline'
          href='/places'
        >
          전체 보기 {'>'}
        </Link>
      </div>

      {renderContent()}
    </section>
  );
};

