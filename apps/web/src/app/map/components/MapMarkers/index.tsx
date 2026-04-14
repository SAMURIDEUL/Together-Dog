'use client';

import clsx from 'clsx';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';

import { PlaceItem } from '@/types/place';
import { getAmenityBadges, getPetSizeBadge } from '@/utils/pet/parsers';

interface MapMarkersProps {
  places: PlaceItem[];
  selectedPlace: PlaceItem | null;
  onPlaceClick: (item: PlaceItem) => void;
  onSelectPlace: (item: PlaceItem) => void;
  getCategoryKey: (id: number) => string;
}

export const MapMarkers = ({
  places,
  selectedPlace,
  onPlaceClick,
  onSelectPlace,
  getCategoryKey,
}: MapMarkersProps) => {
  return (
    <>
      {places.map((item) => {
        const badges = [
          ...(item.placeInfo.petPolicy?.petSizeLimit
            ? [getPetSizeBadge(item.placeInfo.petPolicy.petSizeLimit)!]
            : []),
          ...getAmenityBadges(
            item.placeInfo.petPolicy?.indoorFlag,
            item.placeInfo.petPolicy?.outdoorFlag,
            item.placeInfo.parkingAvailable,
          ),
        ].filter(Boolean);

        return (
          <CustomOverlayMap
            key={item.placeInfo.id}
            position={{ lat: item.placeInfo.lat, lng: item.placeInfo.lon }}
            yAnchor={1}
          >
            <div
              aria-label={`${item.placeInfo.name} 상세보기`}
              className={clsx(
                'flex cursor-pointer flex-col items-center gap-1 outline-none transition-transform hover:scale-110 focus-visible:scale-110 active:scale-95',
                selectedPlace?.placeInfo.id === item.placeInfo.id
                  ? 'z-20'
                  : 'z-10',
              )}
              role='button'
              tabIndex={0}
              onClick={() => onSelectPlace(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectPlace(item);
                }
              }}
            >
              <div
                className={clsx(
                  'flex h-8 w-8 items-center justify-center rounded-full border-2 p-1.5 shadow-lg transition-all',
                  selectedPlace?.placeInfo.id === item.placeInfo.id
                    ? 'z-30 scale-125 border-4 border-orange-600 bg-white'
                    : 'border-orange-500 bg-white hover:bg-orange-50',
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPlace(item);
                }}
              >
                <img
                  alt='카테고리 아이콘'
                  className={clsx(
                    'h-full w-full object-contain transition-transform',
                    selectedPlace?.placeInfo.id === item.placeInfo.id &&
                      'scale-110',
                  )}
                  src={`/images/category/${getCategoryKey(item.placeInfo.categoryId)}.png`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/logo.png';
                  }}
                />
              </div>

              {selectedPlace?.placeInfo.id === item.placeInfo.id && (
                <button
                  aria-label={`${item.placeInfo.name} 상세 정보 보기`}
                  className='animate-in fade-in slide-in-from-top-1 zoom-in-50 absolute left-1/2 top-full mt-1 -translate-x-1/2'
                  type='button'
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlaceClick(item);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      e.stopPropagation();
                      onPlaceClick(item);
                    }
                  }}
                >
                  <div className='flex flex-col gap-1.5 whitespace-nowrap rounded-2xl bg-orange-500 px-4 py-2.5 text-white shadow-xl ring-2 ring-white hover:bg-orange-600 active:scale-95'>
                    <div className='flex items-center justify-between gap-4 border-b border-white/20 pb-1.5'>
                      <span className='text-[13px] font-bold text-white'>
                        {item.placeInfo.name}
                      </span>
                      <span className='rounded bg-white/20 px-1 py-0.5 text-[9px] font-medium'>
                        상세보기 ›
                      </span>
                    </div>
                    <div className='flex gap-1'>
                      {badges.map((badge) => (
                        <span
                          key={badge.text}
                          className='rounded-md bg-white/20 px-1.5 py-0.5 text-[9px] font-semibold text-white'
                        >
                          {badge.text}
                        </span>
                      ))}
                      {badges.length === 0 && (
                        <span className='text-[9px] text-white/70'>
                          정책 정보 없음
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              )}
            </div>
          </CustomOverlayMap>
        );
      })}
    </>
  );
};
