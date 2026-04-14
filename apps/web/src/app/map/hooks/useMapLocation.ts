'use client';

import { useCallback, useEffect, useState } from 'react';

import { usePlaceStore } from '@/stores/usePlaceStore';
import { useToastStore } from '@/stores/useToastStore';
import { PlaceItem } from '@/types/place';

export const useMapLocation = () => {
  const { initLocation, userLocation } = usePlaceStore();
  const { addToast } = useToastStore();

  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<PlaceItem | null>(null);
  const [mapCenter, setMapCenter] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectedRegion, setSelectedRegion] = useState('');

  // 1. 초기 위치 설정 및 이동
  useEffect(() => {
    if (userLocation && !mapCenter) {
      setMapCenter({ lat: userLocation.lat, lng: userLocation.lng });
    }
    if (!userLocation) {
      initLocation();
    }
  }, [userLocation, initLocation, mapCenter]);

  // 2. 지역 좌표 검색 및 지도 이동 핸들러
  const moveToRegion = useCallback(
    (regionName: string) => {
      if (!window.kakao) return;
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(regionName, (result: any, status: any) => {
        if (
          status !== window.kakao.maps.services.Status.OK ||
          !result ||
          result.length === 0
        ) {
          addToast('해당 지역의 좌표를 찾을 수 없습니다.', 'error');
          return;
        }

        const coords = {
          lat: parseFloat(result[0].y),
          lng: parseFloat(result[0].x),
        };

        setSelectedRegion(regionName);
        setMapCenter(coords);
      });
    },
    [addToast],
  );

  // 3. 현재 위치 주변 검색 핸들러
  const searchAtCurrentLocation = useCallback(() => {
    const c = map?.getCenter();
    if (c) {
      setMapCenter({ lat: c.getLat(), lng: c.getLng() });
    }
  }, [map]);

  // 4. 내 위치로 이동 핸들러
  const moveToUserLocation = useCallback(() => {
    if (userLocation) {
      setMapCenter({ lat: userLocation.lat, lng: userLocation.lng });
    }
  }, [userLocation]);

  return {
    map,
    setMap,
    selectedPlace,
    setSelectedPlace,
    mapCenter,
    setMapCenter,
    selectedRegion,
    setSelectedRegion,
    userLocation,
    moveToRegion,
    searchAtCurrentLocation,
    moveToUserLocation,
  };
};
