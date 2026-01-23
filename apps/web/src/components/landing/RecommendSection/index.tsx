'use client';

import { cn } from '@together-dog/ui';
import Link from 'next/link';
import { type ComponentProps, useEffect, useState } from 'react';

import { getRandomPlaces, likePlace, unlikePlace } from '@/api/place';
import { PlaceInfoCard } from '@/components/shared/PlaceInfoCard';
import type { Place, PlaceItem } from '@/types/place';
import { mapPlaceToCardProps } from '@/utils/petMapper';

interface PlaceItemWithLike extends PlaceItem {
  isLike: boolean;
}

export const RecommendSection = ({
  className,
  ...props
}: ComponentProps<'section'>) => {
  const [places, setPlaces] = useState<PlaceItemWithLike[]>([]);
  const [loadingIds, setLoadingIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const data = await getRandomPlaces();

        // 적응형 매핑: 'places' 키, 'placeInfo' 키 또는 단일 객체 구조 대응
        const mappedPlaces = data.map((item: any) => {
          // 케이스 1: 'places' 키가 있는 경우 (랜덤 API 디버그에서 확인됨)
          if (item.places) {
            return {
              placeInfo: item.places,
              thumbnail: item.thumbnail,
              isLike: false,
            };
          }

          // 케이스 2: 'placeInfo' 키가 있는 경우 (표준 PlaceItem 구조)
          if (item.placeInfo) {
            return {
              ...item,
              isLike: false,
            };
          }

          // 케이스 3: 평면적인 Place 객체인 경우 (레거시 대응)
          return {
            placeInfo: item as unknown as Place,
            thumbnail: '',
            isLike: false,
          };
        });
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

    const targetPlace = places.find((p) => p.placeInfo.id === id);
    if (!targetPlace) return;

    setLoadingIds((prev) => new Set(prev).add(id));

    // 1. 낙관적 업데이트 (즉시 UI 반영)
    const previousIsLike = targetPlace.isLike;
    setPlaces((prev) =>
      prev.map((place) =>
        place.placeInfo.id === id ? { ...place, isLike: !place.isLike } : place,
      ),
    );

    try {
      // 2. API 요청
      if (previousIsLike) {
        await unlikePlace(id);
      } else {
        await likePlace(id);
      }
    } catch (error) {
      console.error('Failed to toggle like:', error);
      // 3. 에러 발생 시 원복 (롤백)
      setPlaces((prev) =>
        prev.map((place) =>
          place.placeInfo.id === id
            ? { ...place, isLike: previousIsLike }
            : place,
        ),
      );
      // TODO: 토스트 알림 추가 필요
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
