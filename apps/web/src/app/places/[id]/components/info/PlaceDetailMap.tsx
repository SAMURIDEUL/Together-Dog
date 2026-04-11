'use client';

import { useEffect, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';

import { CategoryPin } from '@/app/places/components/CategoryPin';
import { Place } from '@/types/place';

// Declare global window interface for kakao
declare global {
  interface Window {
    kakao: {
      maps: {
        load: (cb: () => void) => void;
      };
    };
  }
}

interface PlaceDetailMapProps {
  place: Place;
}

export const PlaceDetailMap = ({ place }: PlaceDetailMapProps) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const loadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          setMapLoaded(true);
        });
        return true;
      }
      return false;
    };

    if (!loadKakaoMap()) {
      // SDK가 아직 로드되지 않은 경우 재시도
      const interval = setInterval(() => {
        if (loadKakaoMap()) {
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className='bg-white px-4 py-6'>
      <h2 className='mb-4 text-lg font-bold text-gray-900'>위치</h2>

      <div className='relative h-[320px] w-full overflow-hidden rounded-lg bg-gray-100'>
        {mapLoaded ? (
          <Map
            center={{ lat: place.lat, lng: place.lon }}
            level={3}
            style={{ width: '100%', height: '100%' }}
          >
            <CategoryPin
              category3={place.category3}
              categoryId={place.categoryId}
              name={place.name}
              position={{ lat: place.lat, lng: place.lon }}
              onClick={() => {}} // 상세 페이지이므로 클릭 액션은 비워둠
            />
          </Map>
        ) : (
          <div className='flex h-full w-full items-center justify-center text-gray-400'>
            지도 로딩중...
          </div>
        )}
      </div>

      <div className='mt-3 flex gap-2'>
        <a
          className='flex-1 rounded-lg border border-gray-200 bg-white py-3 text-center text-sm font-medium text-gray-700 hover:bg-gray-50'
          href={`https://map.kakao.com/link/to/${encodeURIComponent(
            place.name,
          )},${place.lat},${place.lon}`}
          rel='noreferrer'
          target='_blank'
        >
          카카오맵
        </a>
        <a
          className='flex-1 rounded-lg border border-gray-200 bg-white py-3 text-center text-sm font-medium text-gray-700 hover:bg-gray-50'
          href={`https://map.naver.com/v5/search/${encodeURIComponent(place.roadAddress)}`}
          rel='noreferrer'
          target='_blank'
        >
          네이버지도
        </a>
      </div>
    </div>
  );
};
