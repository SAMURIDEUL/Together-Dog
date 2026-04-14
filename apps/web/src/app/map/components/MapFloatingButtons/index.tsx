'use client';

import { MyLocationButton } from '../MyLocationButton';

interface MapFloatingButtonsProps {
  onSearchAtCurrentLocation: () => void;
  onMoveToUserLocation: () => void;
  hasSidebar?: boolean;
}

export const MapFloatingButtons = ({
  onSearchAtCurrentLocation,
  onMoveToUserLocation,
  hasSidebar = true,
}: MapFloatingButtonsProps) => {
  return (
    <div className='absolute inset-x-0 bottom-10 px-4'>
      {/* 이 위치에서 재검색 버튼 */}
      <div className='absolute left-1/2 z-10 -translate-x-1/2 transition-all'>
        <button
          className='flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-gray-700 shadow-[0_8px_30px_rgb(0,0,0,0.12)] ring-1 ring-black/5 transition-all hover:bg-gray-50 active:scale-95'
          onClick={onSearchAtCurrentLocation}
        >
          <span className='h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]' />
          이 위치에서 재검색
        </button>
      </div>

      {/* 내 위치 버튼 */}
      <div
        className={`absolute right-4 z-10 transition-all ${hasSidebar ? 'md:right-[420px]' : 'md:right-10'}`}
      >
        <MyLocationButton onClick={onMoveToUserLocation} />
      </div>
    </div>
  );
};
