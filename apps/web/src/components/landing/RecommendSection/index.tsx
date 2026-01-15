'use client';

import { cn } from '@together-dog/ui';
import Link from 'next/link';
import { type ComponentProps, useEffect, useState } from 'react';

import { getRandomPlaces } from '@/api/place';
import { PlaceInfoCard } from '@/components/shared/PlaceInfoCard';
import type { Place } from '@/types/place';
import { mapPlaceToCardProps, resolveThumbnailPath } from '@/utils/petMapper';

interface PlaceWithLike extends Place {
  isLike?: boolean;
  thumbnail?: string;
}

export const RecommendSection = ({
  className,
  ...props
}: ComponentProps<'section'>) => {
  const [places, setPlaces] = useState<PlaceWithLike[]>([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await getRandomPlaces();
        // API response structure: { places: Place, thumbnail: string }[]
        // Map it to PlaceWithLike
        const mappedPlaces = response.data.map((item) => ({
          ...item.places,
          thumbnail: resolveThumbnailPath(item.thumbnail),
          isLike: false,
        }));
        setPlaces(mappedPlaces);
      } catch (error) {
        console.error('Failed to fetch recommend places:', error);
      }
    };
    fetchPlaces();
  }, []);

  const handleLikeClick = (id: number) => {
    const targetPlace = places.find((p) => p.id === id);
    if (!targetPlace) return;

    // console.log removed for production
    if (!targetPlace.isLike) {
      // 찜하기 로직
    } else {
      // 찜 취소 로직
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
          href='/places'
        >
          전체 보기 {'>'}
        </Link>
      </div>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {places.map((place, index) => (
          <Link
            // eslint-disable-next-line react/no-array-index-key
            key={`${place.id}-${index}`}
            href={`/places/${place.id}`}
          >
            <PlaceInfoCard
              {...mapPlaceToCardProps(place, index)}
              imageSrc={
                place.thumbnail || mapPlaceToCardProps(place, index).imageSrc
              }
              isLike={place.isLike}
              onLikeClick={() => handleLikeClick(place.id)}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};
