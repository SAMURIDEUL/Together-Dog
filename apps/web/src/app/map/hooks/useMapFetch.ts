'use client';

import { useCallback, useState } from 'react';

import { getPlaces } from '@/api/place';
import { PlaceItem } from '@/types/place';
import { resolveThumbnailPath } from '@/utils/pet/resolvers';

export const CATEGORY_MAP: Record<number, string> = {
  3: 'cafe',
  9: 'restaurant',
  10: 'travelSpot',
  8: 'pension',
  13: 'hotel',
  4: 'petHospital',
  1: 'petPharmacy',
  5: 'petSupplies',
  6: 'grooming',
  11: 'entrustedCare',
  12: 'museum',
  2: 'artGallery',
  7: 'culturalCenter',
};

export const useMapFetch = () => {
  const [allFetchedPlaces, setAllFetchedPlaces] = useState<PlaceItem[]>([]);
  const [referenceLocation, setReferenceLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlaces = useCallback(
    async (
      selectedCategories: number[],
      keyword: string,
      location?: { lat: number; lng: number },
    ) => {
      if (selectedCategories.length === 0) {
        setAllFetchedPlaces([]);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const results = await Promise.all(
          selectedCategories.map((catId) =>
            getPlaces(catId, {
              size: 50,
              lat: location?.lat,
              lon: location?.lng,
              keyword: keyword || undefined,
            }).then((res) => res.data.places),
          ),
        );

        if (location) setReferenceLocation(location);

        // 병합 및 중복 제거
        const merged = results.flat();
        const mapped = merged.map((item) => ({
          ...item,
          thumbnail: item.thumbnail
            ? resolveThumbnailPath(item.thumbnail)
            : undefined,
        }));
        const unique = Array.from(
          new Map(mapped.map((item) => [item.placeInfo.id, item])).values(),
        );

        setAllFetchedPlaces(unique);
      } catch (error) {
        console.error('Failed to fetch places:', error);
        setError('장소 정보를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    allFetchedPlaces,
    referenceLocation,
    loading,
    error,
    fetchPlaces,
  };
};
