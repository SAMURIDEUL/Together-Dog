'use client';

import { useEffect } from 'react';

import { usePlaceStore } from '@/stores/usePlaceStore';

export const usePlacesData = (categoryId: number | null) => {
  const userLocation = usePlaceStore((state) => state.userLocation);
  const initLocation = usePlaceStore((state) => state.initLocation);
  const fetchCategoryData = usePlaceStore((state) => state.fetchCategoryData);
  const fetchDashboardData = usePlaceStore((state) => state.fetchDashboardData);
  const store = usePlaceStore(); // UI에서 전체 상태가 필요한 경우를 위해 유지 (단, 이펙트 의존성에서는 제외)

  // 1. 초기 위치 권한 확인 및 설정 (최초 1회)
  useEffect(() => {
    if (!userLocation) {
      initLocation();
    }
  }, [userLocation, initLocation]);

  // 2. 위치 정보가 확보되면 데이터 페칭
  useEffect(() => {
    if (!userLocation) return;

    if (categoryId !== null) {
      fetchCategoryData(categoryId, userLocation);
    } else {
      fetchDashboardData(userLocation);
    }
  }, [userLocation, categoryId, fetchCategoryData, fetchDashboardData]);

  return {
    ...store,
  };
};
