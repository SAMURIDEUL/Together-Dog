'use client';

import { useCallback, useMemo } from 'react';

import { getFilteredAndSortedPlaces } from '@/utils/map/filterUtils';

import { CATEGORY_MAP, useMapFetch } from './useMapFetch';
import { useMapFilters } from './useMapFilters';

/**
 * 지도 검색 기능의 메인 오케스트레이터 훅입니다.
 * 필터 상태 관리(useMapFilters)와 데이터 페칭(useMapFetch)을 조합하여 최종 UI 데이터를 제공합니다.
 */
export const useMapSearch = () => {
  // 1. 데이터 페칭 관련 훅
  const { allFetchedPlaces, referenceLocation, loading, error, fetchPlaces } =
    useMapFetch();

  // 2. 필터 상태 관련 훅
  const {
    keyword,
    setKeyword,
    selectedCategories,
    toggleCategory,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    activeChips,
    activeFilterCount,
  } = useMapFilters();

  // 3. API 호출 래핑 (인자 자동 주입)
  const search = useCallback(
    (location?: { lat: number; lng: number }) => {
      fetchPlaces(selectedCategories, keyword, location);
    },
    [fetchPlaces, selectedCategories, keyword],
  );

  // 4. 최종 필터링 및 정렬된 결과 계산 (Memoized)
  const filteredPlaces = useMemo(() => {
    return getFilteredAndSortedPlaces(
      allFetchedPlaces,
      filters,
      sortBy,
      referenceLocation,
    );
  }, [allFetchedPlaces, filters, sortBy, referenceLocation]);

  return {
    // 상태 및 핸들러
    keyword,
    setKeyword,
    selectedCategories,
    toggleCategory,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    activeChips,
    activeFilterCount,

    // 데이터 및 결과
    filteredPlaces,
    loading,
    error,
    search,

    // 유틸리티
    getCategoryKey: (id: number) => (CATEGORY_MAP[id] as any) || 'cafe',
  };
};
