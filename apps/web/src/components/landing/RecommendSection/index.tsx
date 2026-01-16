'use client';

import { cn } from '@together-dog/ui';
import Link from 'next/link';
import { type ComponentProps, useEffect, useState } from 'react';

import { getRandomPlaces, likePlace, unlikePlace } from '@/api/place';
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
  const [loadingIds, setLoadingIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const data = await getRandomPlaces();
        // data type is PlaceWithThumbnail[]
        const mappedPlaces = data.map((item) => ({
          ...item.place,
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

  const handleLikeClick = async (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (loadingIds.has(id)) return;

    const targetPlace = places.find((p) => p.id === id);
    if (!targetPlace) return;

    setLoadingIds((prev) => new Set(prev).add(id));

    // 1. Optimistic Update (즉시 UI 반영)
    const previousIsLike = targetPlace.isLike;
    setPlaces((prev) =>
      prev.map((place) =>
        place.id === id ? { ...place, isLike: !place.isLike } : place,
      ),
    );

    try {
      // 2. API Call
      if (previousIsLike) {
        await unlikePlace(id);
      } else {
        await likePlace(id);
      }
    } catch (error) {
      console.error('Failed to toggle like:', error);
      // 3. Rollback on Error (에러 발생 시 원복)
      setPlaces((prev) =>
        prev.map((place) =>
          place.id === id ? { ...place, isLike: previousIsLike } : place,
        ),
      );
      // TODO: Add toast notification here
      alert('찜하기 처리에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoadingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
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
        {places.map((place, index) => {
          const cardProps = mapPlaceToCardProps(place, index);
          return (
            <Link key={place.id} href={`/places/${place.id}`}>
              <PlaceInfoCard
                {...cardProps}
                disabled={loadingIds.has(place.id)}
                imageSrc={place.thumbnail || cardProps.imageSrc}
                isLike={place.isLike}
                onLikeClick={(e) => handleLikeClick(e, place.id)}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
};
