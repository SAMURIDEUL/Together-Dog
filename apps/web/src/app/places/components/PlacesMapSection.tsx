'use client';

import { useState } from 'react';

import { PlaceItem } from '@/types/place';

import { PlacesMap } from './PlacesMap';
import { RegionSelector } from './RegionSelector';

interface PlacesMapSectionProps {
  userLocation: { lat: number; lng: number } | null;
  allPlaces: PlaceItem[];
  locationStatus: 'loading' | 'granted' | 'denied';
  onLocationUpdate: (lat: number, lng: number) => void;
  onLocationRequest: () => void;
}

export const PlacesMapSection = ({
  userLocation,
  allPlaces,
  locationStatus,
  onLocationUpdate,
  onLocationRequest,
}: PlacesMapSectionProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 시군구동 선택 완료 후 좌표 변환
  const handleComplete = (regionName: string) => {
    // Kakao SDK 로드 확인
    if (!window.kakao || !window.kakao.maps) {
      console.error('Kakao Maps SDK not loaded');
      alert('지도 서비스를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
      setIsSearchOpen(false); // 모달 닫기
      return;
    }

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(
      regionName,
      (result: { y: string; x: string }[], status: string) => {
        if (
          status === window.kakao.maps.services.Status.OK &&
          result &&
          result.length > 0
        ) {
          const { y, x } = result[0];
          onLocationUpdate(parseFloat(y), parseFloat(x));
          setIsSearchOpen(false);
        } else {
          console.error('Geocoder addressSearch failed:', status, result);
          alert('선택한 지역의 위치 정보를 가져오는데 실패했습니다.');
        }
      },
    );
  };

  return (
    <div className='relative'>
      {/* 지도 위 컨트롤 버튼 */}
      <div className='absolute left-4 right-4 top-4 z-10 flex gap-2'>
        <button
          className='flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold shadow-md transition-all hover:bg-gray-50 active:scale-95 disabled:opacity-50'
          disabled={locationStatus === 'loading'}
          onClick={onLocationRequest}
        >
          📍{' '}
          {(() => {
            if (locationStatus === 'loading') return '위치 확인 중...';
            if (locationStatus === 'granted') return '내 위치';
            return '위치 권한 없음';
          })()}
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

      <RegionSelector
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onComplete={handleComplete}
      />
    </div>
  );
};
