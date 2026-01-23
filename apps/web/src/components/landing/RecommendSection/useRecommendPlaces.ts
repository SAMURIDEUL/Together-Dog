'use client';

import { useEffect, useState } from 'react';
import { getRandomPlaces, likePlace, unlikePlace } from '@/api/place';
import type { Place, PlaceItem } from '@/types/place';

export interface PlaceItemWithLike extends PlaceItem {
  isLike: boolean;
}

export const useRecommendPlaces = () => {
  const [places, setPlaces] = useState<PlaceItemWithLike[]>([]);
  const [loadingIds, setLoadingIds] = useState<Set<number>>(new Set());

  // 1. 초기 데이터 페칭
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const data = await getRandomPlaces();

        // 적응형 매핑: 다양한 API 응답 구조 대응
        const mappedPlaces = data.map((item: any) => {
          if (item.places) {
            return { placeInfo: item.places, thumbnail: item.thumbnail, isLike: false };
          }
          if (item.placeInfo) {
            return { ...item, isLike: false };
          }
          return { placeInfo: item as unknown as Place, thumbnail: '', isLike: false };
        });
        setPlaces(mappedPlaces);
      } catch (error) {
        console.error('Failed to fetch recommend places:', error);
      }
    };
    fetchPlaces();
  }, []);

  // 2. 찜하기/취소 처리
  const handleLikeClick = async (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (loadingIds.has(id)) return;

    const targetPlace = places.find((p) => p.placeInfo.id === id);
    if (!targetPlace) return;

    setLoadingIds((prev) => new Set(prev).add(id));

    // 낙관적 업데이트
    const previousIsLike = targetPlace.isLike;
    setPlaces((prev) =>
      prev.map((place) =>
        place.placeInfo.id === id ? { ...place, isLike: !place.isLike } : place,
      ),
    );

    try {
      if (previousIsLike) {
        await unlikePlace(id);
      } else {
        await likePlace(id);
      }
    } catch (error) {
      console.error('Failed to toggle like:', error);
      // 에러 발생 시 롤백
      setPlaces((prev) =>
        prev.map((place) =>
          place.placeInfo.id === id ? { ...place, isLike: previousIsLike } : place,
        ),
      );
      alert('찜하기 처리에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoadingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  return {
    places,
    loadingIds,
    handleLikeClick,
  };
};
