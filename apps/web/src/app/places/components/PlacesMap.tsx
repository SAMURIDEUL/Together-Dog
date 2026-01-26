'use client';

import { useRouter } from 'next/navigation';
import { Map, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk';

import { PlaceItem } from '@/types/place';

import { CategoryPin } from './CategoryPin';

interface PlacesMapProps {
  userLocation: { lat: number; lng: number } | null;
  allPlaces: PlaceItem[];
  locationStatus: 'loading' | 'granted' | 'denied';
}

export const PlacesMap = ({
  userLocation,
  allPlaces,
  locationStatus,
}: PlacesMapProps) => {
  const router = useRouter();
  const mapCenter = userLocation || { lat: 37.5665, lng: 126.978 };

  return (
    <div className='relative h-[350px] w-full bg-gray-200'>
      {userLocation && (
        <Map
          center={mapCenter}
          level={7}
          style={{ width: '100%', height: '100%' }}
        >
          {/* 내 위치 마커 */}
          <MapMarker
            image={{
              src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
              size: { width: 29, height: 35 },
            }}
            position={mapCenter}
            title='내 위치'
          />

          {/* 장소 커스텀 마커 클러스터링 */}
          <MarkerClusterer averageCenter minLevel={6}>
            {allPlaces.map((place) => (
              <CategoryPin
                key={place.placeInfo.id}
                category3={place.placeInfo.category3}
                categoryId={place.placeInfo.categoryId}
                name={place.placeInfo.name}
                position={{
                  lat: place.placeInfo.lat,
                  lng: place.placeInfo.lon,
                }}
                onClick={() => router.push(`/places/${place.placeInfo.id}`)}
              />
            ))}
          </MarkerClusterer>
        </Map>
      )}
      {!userLocation && (
        <div className='flex h-full items-center justify-center bg-gray-100 font-medium text-gray-400'>
          {locationStatus === 'loading'
            ? '지도를 불러오는 중...'
            : '위치 정보를 사용할 수 없습니다.'}
        </div>
      )}
    </div>
  );
};
