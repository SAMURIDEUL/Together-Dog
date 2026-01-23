'use client';

import { useState } from 'react';

import { PlaceItem } from '@/types/place';

import { AddressSearchModal } from './AddressSearchModal';
import { PlacesMap } from './PlacesMap';

interface PlacesMapSectionProps {
  userLocation: { lat: number; lng: number } | null;
  allPlaces: PlaceItem[];
  locationStatus: 'loading' | 'granted' | 'denied';
  onLocationUpdate: (lat: number, lng: number) => void;
}

export const PlacesMapSection = ({
  userLocation,
  allPlaces,
  locationStatus,
  onLocationUpdate,
}: PlacesMapSectionProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 주소 검색 완료 후 좌표 변환
  const handleComplete = (data: unknown) => {
    const fullAddress = (data as any).address;
    if (window.kakao && window.kakao.maps) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(fullAddress, (result: any[], status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const { y, x } = result[0];
          onLocationUpdate(parseFloat(y), parseFloat(x));
          setIsSearchOpen(false);
        }
      });
    }
  };

  return (
    <div className='relative'>
      {/* 지도 위 컨트롤 버튼 */}
      <div className='absolute left-4 right-4 top-4 z-10 flex gap-2'>
        <button
          className='flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold shadow-md transition-all hover:bg-gray-50 active:scale-95'
          onClick={() => window.location.reload()}
        >
          📍 {locationStatus === 'granted' ? '내 위치' : '위치 권한 없음'}
        </button>
        <button
          className='flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold shadow-md transition-all hover:bg-gray-50 active:scale-95'
          onClick={() => setIsSearchOpen(true)}
        >
          🔍 지역 검색
        </button>
      </div>

      <PlacesMap
        allPlaces={allPlaces}
        locationStatus={locationStatus}
        userLocation={userLocation}
      />

      <AddressSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onComplete={handleComplete}
      />
    </div>
  );
};
