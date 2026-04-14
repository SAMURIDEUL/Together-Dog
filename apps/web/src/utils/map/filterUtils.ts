import { MapFilters } from '@/app/map/components/FilterPanel';
import { PlaceItem } from '@/types/place';

export type SortOrder = 'rating' | 'latest' | 'distance';

/**
 * 장소 목록을 필터링하고 정렬하는 순수 함수 유틸리티입니다.
 */
export const getFilteredAndSortedPlaces = (
  allFetchedPlaces: PlaceItem[],
  filters: MapFilters,
  sortBy: SortOrder,
  referenceLocation: { lat: number; lng: number } | null,
) => {
  // 1. 클라이언트 필터링
  const filtered = allFetchedPlaces.filter((item) => {
    const { petPolicy } = item.placeInfo;

    // 1-1. 견종 크기 필터링
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

    // 1-2. 실내/야외 필터링
    if (filters.isIndoor && petPolicy && !petPolicy.indoorFlag) return false;
    if (filters.isOutdoor && petPolicy && !petPolicy.outdoorFlag) return false;

    // 1-3. 평점 필터링
    if (
      filters.minRating &&
      (item.placeInfo.averageRating || 0) < filters.minRating
    )
      return false;

    // 1-4. 주차 필터링
    if (filters.hasParking && item.placeInfo.parkingAvailable !== true)
      return false;

    // 1-5. 상세 정책 필터링 (키워드 매칭)
    if (filters.essentialPolicies.length > 0) {
      const restrictions = petPolicy?.petRestrictions || '';
      const isMissingPolicy = filters.essentialPolicies.some(
        (policy) => !restrictions.includes(policy),
      );
      if (isMissingPolicy) return false;
    }

    return true;
  });

  // 2. 정렬 로직
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
};
