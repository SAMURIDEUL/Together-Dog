'use client';

import { CustomOverlayMap, Map } from 'react-kakao-maps-sdk';

import { PlaceItem } from '@/types/place';

import { MapMarkers } from './MapMarkers';

interface MainMapProps {
  mapCenter: { lat: number; lng: number } | null;
  userLocation: { lat: number; lng: number } | null;
  onMapCreate: (map: kakao.maps.Map) => void;
  onDragEnd: (map: kakao.maps.Map) => void;
  getCategoryKey: (id: number) => string;
  filteredPlaces: PlaceItem[];
  selectedPlace: PlaceItem | null;
  onPlaceClick: (item: PlaceItem) => void;
  onSelectPlace: (item: PlaceItem) => void;
}

export const MainMap = ({
  mapCenter,
  userLocation,
  onMapCreate,
  onDragEnd,
  getCategoryKey,
  filteredPlaces,
  selectedPlace,
  onPlaceClick,
  onSelectPlace,
}: MainMapProps) => {
  if (!userLocation || !mapCenter) return null;

  return (
    <Map
      center={mapCenter}
      className='h-full w-full'
      level={4}
      onCreate={onMapCreate}
      onDragEnd={onDragEnd}
    >
      <CustomOverlayMap
        position={{ lat: userLocation.lat, lng: userLocation.lng }}
        yAnchor={2.2}
      >
        <div className='flex flex-col items-center gap-1 text-blue-500'>
          <div className='rounded-full border border-blue-200 bg-white/90 px-2 py-0.5 text-[10px] font-bold shadow-sm backdrop-blur-sm'>
            내 위치
          </div>
          <div className='h-3 w-3 rounded-full border-2 border-white bg-blue-500 shadow-lg' />
        </div>
      </CustomOverlayMap>
      <MapMarkers
        getCategoryKey={getCategoryKey}
        places={filteredPlaces}
        selectedPlace={selectedPlace}
        onPlaceClick={onPlaceClick}
        onSelectPlace={onSelectPlace}
      />
    </Map>
  );
};
