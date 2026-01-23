'use client';

import { useEffect } from 'react';

import { usePlaceStore } from '@/stores/usePlaceStore';

export const usePlacesData = (categoryId: number | null) => {
  const store = usePlaceStore();

  // 1. 초기 위치 권한 확인 및 설정 (최초 1회)
  useEffect(() => {
    if (!store.userLocation) {
      store.initLocation();
    }
  }, []);

  // 2. 위치 정보가 확보되면 데이터 페칭
  useEffect(() => {
    if (!store.userLocation) return;

    if (categoryId) {
      store.fetchCategoryData(categoryId, store.userLocation);
    } else {
      store.fetchDashboardData(store.userLocation);
    }
  }, [store.userLocation, categoryId]);

  return {
    ...store,
  };
};

