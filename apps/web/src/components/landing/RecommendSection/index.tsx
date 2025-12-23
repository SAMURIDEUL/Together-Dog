'use client';

import { cn } from '@together-dog/ui';
import Link from 'next/link';
import { type ComponentProps, useState } from 'react';

import { PlaceInfoCard } from '@/components/shared/PlaceInfoCard';
import type { Place } from '@/types/place';
import { mapPlaceToCardProps } from '@/utils/petMapper';

import { MOCK_API_RESPONSE } from './mock';

interface PlaceWithLike extends Place {
  isLike?: boolean;
}

export const RecommendSection = ({
  className,
  ...props
}: ComponentProps<'section'>) => {
  const [places, setPlaces] = useState<PlaceWithLike[]>(MOCK_API_RESPONSE.data);

  const handleLikeClick = (id: number) => {
    const targetPlace = places.find((p) => p.id === id);
    if (!targetPlace) return;

    if (!targetPlace.isLike) {
      console.log(`찜한 장소 id : ${id}`);
    } else {
      console.log(`취소한 장소 id : ${id}`);
    }

    setPlaces((prev) =>
      prev.map((place) =>
        place.id === id ? { ...place, isLike: !place.isLike } : place,
      ),
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
          href='/map'
        >
          전체 보기 {'>'}
        </Link>
      </div>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {places.map((place, index) => (
          <PlaceInfoCard
            key={place.id}
            {...mapPlaceToCardProps(place, index)}
            isLike={place.isLike}
            onLikeClick={() => handleLikeClick(place.id)}
          />
        ))}
      </div>
    </section>
  );
};
