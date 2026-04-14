'use client';

import { useCallback, useMemo, useState } from 'react';

import { getPlaces } from '@/api/place';
import { PlaceItem } from '@/types/place';
import { resolveThumbnailPath } from '@/utils/pet/resolvers';

import { DEFAULT_FILTERS, MapFilters } from '../components/FilterPanel';

export type SortOrder = 'rating' | 'latest' | 'distance';

// API 카테고리 ID를 아이콘 키와 매칭
const CATEGORY_MAP: Record<number, string> = {
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

export const useMapSearch = () => {
  const [keyword, setKeyword] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([3]); // 기본값: 카페
  const [filters, setFilters] = useState<MapFilters>(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState<SortOrder>('rating');

  const [allFetchedPlaces, setAllFetchedPlaces] = useState<PlaceItem[]>([]);
  const [referenceLocation, setReferenceLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. 데이터 가져오기 (각 카테고리별 병렬 호출)
  const fetchPlaces = useCallback(
    async (location?: { lat: number; lng: number }) => {
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
    [selectedCategories, keyword],
  );

  // 2. 클라이언트 필터링 및 정렬 로직
  const filteredPlaces = useMemo(() => {
    const filtered = allFetchedPlaces.filter((item) => {
      const { petPolicy } = item.placeInfo;

      // 2-1. 견종 크기 필터링 (petPolicy가 있을 때만 체크)
      if (filters.sizeLimit.length > 0 && petPolicy) {
        const sizeString = petPolicy.petSizeLimit || '';
        const restrictions = petPolicy.petRestrictions || '';
        const isMasterPolicyMatch =
          sizeString.includes('모두 가능') || sizeString.includes('제한 없음');

        const isExcluded = filters.sizeLimit.some((size) => {
          if (!isMasterPolicyMatch && !sizeString.includes(size)) return true;
          if (
            restrictions.includes(`${size}견 불가`) ||
            restrictions.includes(`${size}견 금지`)
          )
            return true;
          return false;
        });

        if (isExcluded) return false;
      }

      // 2-2. 실내/야외 필터링 (petPolicy가 있을 때만 체크)
      if (filters.isIndoor && petPolicy && !petPolicy.indoorFlag) return false;
      if (filters.isOutdoor && petPolicy && !petPolicy.outdoorFlag)
        return false;

      // 2-3. 평점 필터링
      if (
        filters.minRating &&
        (item.placeInfo.averageRating || 0) < filters.minRating
      )
        return false;

      // 2-4. 주차 필터링 (실제 DB 데이터 기반)
      if (filters.hasParking && item.placeInfo.parkingAvailable === false)
        return false;

      // 2-5. 상세 정책 필터링 (키워드 매칭)
      if (filters.essentialPolicies.length > 0) {
        const restrictions = petPolicy?.petRestrictions || '';
        const isMissingPolicy = filters.essentialPolicies.some(
          (policy) => !restrictions.includes(policy),
        );
        if (isMissingPolicy) return false;
      }

      return true;
    });

    // 3. 정렬 로직
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'rating') {
        const ratingA = a.placeInfo.averageRating || 0;
        const ratingB = b.placeInfo.averageRating || 0;
        return ratingB - ratingA;
      }
      if (sortBy === 'latest') {
        const getTime = (dateStr?: string) => {
          if (!dateStr) return 0;
          const time = new Date(dateStr).getTime();
          return isNaN(time) ? 0 : time;
        };
        return getTime(b.placeInfo.updatedAt) - getTime(a.placeInfo.updatedAt);
      }
      if (sortBy === 'distance' && referenceLocation) {
        const getDistanceSq = (p: PlaceItem) => {
          const dLat = p.placeInfo.lat - referenceLocation.lat;
          const dLon = p.placeInfo.lon - referenceLocation.lng;
          return dLat * dLat + dLon * dLon;
        };
        return getDistanceSq(a) - getDistanceSq(b);
      }
      return 0;
    });

    return sorted;
  }, [allFetchedPlaces, filters, sortBy, referenceLocation]);

  const toggleCategory = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return {
    keyword,
    setKeyword,
    selectedCategories,
    toggleCategory,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    filteredPlaces,
    loading,
    error,
    search: fetchPlaces,
    getCategoryKey: (id: number) => (CATEGORY_MAP[id] as any) || 'cafe',
  };
};
