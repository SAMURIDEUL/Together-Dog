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
  const { places, loadingIds, handleLikeClick } = useRecommendPlaces();

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

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {places.map((place, index) => {
          // 가드 절: 유효하지 않은 데이터 건너뛰기
          if (!place || !place.placeInfo) return null;

          const cardProps = mapPlaceToCardProps(place, index);

          return (
            <Link
              key={`${place.placeInfo.id}-${index}`}
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
    </section>
  );
};

