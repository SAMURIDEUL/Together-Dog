'use client';

import Script from 'next/script';
import { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

import { Place } from '@/types/place';

// Using the key provided by the user
const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=66384a84f00917706827f455af891fbb&libraries=services,clusterer&autoload=false`;

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

  return (
    <div className='bg-white px-4 py-6'>
      <h2 className='mb-4 text-lg font-bold text-gray-900'>위치</h2>

      {/* Script Load */}
      <Script
        src={KAKAO_SDK_URL}
        strategy='afterInteractive'
        onLoad={() => {
          // SDK loaded, but we must initialize it because of autoload=false
          window.kakao.maps.load(() => {
            setMapLoaded(true);
          });
        }}
      />

      <div className='relative h-[320px] w-full overflow-hidden rounded-lg bg-gray-100'>
        {mapLoaded ? (
          <Map
            center={{ lat: place.lat, lng: place.lon }}
            level={3}
            style={{ width: '100%', height: '100%' }}
          >
            <MapMarker position={{ lat: place.lat, lng: place.lon }} />
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
          href={`https://map.kakao.com/link/to/${place.name},${place.lat},${place.lon}`}
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
