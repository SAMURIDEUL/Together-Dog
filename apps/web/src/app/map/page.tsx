'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CustomOverlayMap, Map } from 'react-kakao-maps-sdk';

import { usePlaceStore } from '@/stores/usePlaceStore';
import { PlaceItem } from '@/types/place';

import { FilterPanel } from './components/FilterPanel';
import { PlaceResultView } from './components/PlaceResultView';
import { SearchOverlay } from './components/SearchOverlay';
import { useMapSearch } from './hooks/useMapSearch';

export default function MapPage() {
  const router = useRouter();
  const { userLocation, initLocation } = usePlaceStore();
  const {
    keyword,
    setKeyword,
    selectedCategories,
    toggleCategory,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    filteredPlaces,
    loading,
    search,
    getCategoryKey,
  } = useMapSearch();

  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<PlaceItem | null>(null);
  const [mapCenter, setMapCenter] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // 1. 초기 하드코딩된 위치 또는 사용자 위치 초기화
  useEffect(() => {
    if (userLocation && !mapCenter) {
      setMapCenter({ lat: userLocation.lat, lng: userLocation.lng });
    }
    if (!userLocation) {
      initLocation();
    }
  }, [userLocation, initLocation, mapCenter]);

  // 2. 위치정보가 오면 첫 검색 수행
  useEffect(() => {
    if (userLocation) {
      search(userLocation);
    }
  }, [userLocation, search]);

  // 3. 지도 이동 후 재검색 핸들러
  const handleSearchAtCurrentLocation = () => {
    if (!map) return;
    const center = map.getCenter();
    search({ lat: center.getLat(), lng: center.getLng() });
  };

  return (
    <div className='relative h-[calc(100vh-64px)] w-full overflow-hidden bg-gray-50'>
      {/* 1. 지도 영역 */}
      {userLocation && mapCenter && (
        <Map
          center={mapCenter}
          className='h-full w-full'
          level={4}
          onCenterChanged={(m) => {
            setMapCenter({
              lat: m.getCenter().getLat(),
              lng: m.getCenter().getLng(),
            });
          }}
          onCreate={(m) => setMap(m)}
          onDragEnd={handleSearchAtCurrentLocation}
        >
          {/* 내 위치 마커 (커스텀 오버레이로 변경하여 기본 말풍선 제거) */}
          <CustomOverlayMap
            position={{ lat: userLocation.lat, lng: userLocation.lng }}
            yAnchor={2.2}
          >
            <div className='flex flex-col items-center gap-1'>
              <div className='rounded-full bg-blue-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-md'>
                내 위치
              </div>
              <div className='h-3 w-3 rounded-full border-2 border-white bg-blue-500 shadow-lg' />
            </div>
          </CustomOverlayMap>

          {/* 검색 결과 마커들 (커스텀 오버레이로 구현) */}
          {filteredPlaces.map((item) => (
            <CustomOverlayMap
              key={item.placeInfo.id}
              position={{ lat: item.placeInfo.lat, lng: item.placeInfo.lon }}
              yAnchor={1}
            >
              <div
                aria-label={`${item.placeInfo.name} 상세보기`}
                className={clsx(
                  'flex cursor-pointer flex-col items-center gap-1 transition-transform hover:scale-110 active:scale-95',
                  selectedPlace?.placeInfo.id === item.placeInfo.id
                    ? 'z-20'
                    : 'z-10',
                )}
                role='button'
                onClick={() => setSelectedPlace(item)}
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
                    setSelectedPlace(item);
                    setMapCenter({
                      lat: item.placeInfo.lat,
                      lng: item.placeInfo.lon,
                    });
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
                {/* 선택된 상태에서만 이름 표시 */}
                {selectedPlace?.placeInfo.id === item.placeInfo.id && (
                  <div
                    className='animate-in fade-in slide-in-from-top-1 zoom-in-50 absolute left-1/2 top-full mt-1.5 -translate-x-1/2'
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/places/${item.placeInfo.id}`);
                    }}
                  >
                    <div className='flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full bg-orange-500 px-3 py-1.5 text-[11px] font-bold text-white shadow-xl ring-2 ring-white hover:bg-orange-600 active:scale-95'>
                      {item.placeInfo.name}
                      <span className='rounded-sm bg-white/20 px-1 py-0.5 text-[9px] font-medium'>
                        상세보기 ›
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </CustomOverlayMap>
          ))}
        </Map>
      )}

      {/* 2. UI 오리지널 레이어 */}
      <SearchOverlay
        keyword={keyword}
        selectedCategories={selectedCategories}
        onCategoryToggle={toggleCategory}
        onKeywordChange={setKeyword}
        onSearch={() => userLocation && search(userLocation)}
      />

      <FilterPanel filters={filters} onFilterChange={setFilters} />

      {/* 3. 결과 뷰 (PC: 사이드바, 모바일: 바텀시트) */}
      <PlaceResultView
        getCategoryKey={getCategoryKey}
        loading={loading}
        places={filteredPlaces}
        sortBy={sortBy}
        onNavigate={(item) => router.push(`/places/${item.placeInfo.id}`)}
        onPlaceClick={(item) => {
          setSelectedPlace(item);
          setMapCenter({ lat: item.placeInfo.lat, lng: item.placeInfo.lon });
        }}
        onSortChange={setSortBy}
      />

      {/* 4. '이 위치에서 검색' 버튼 (플로팅) */}
      <div className='absolute bottom-24 left-1/2 z-10 -translate-x-1/2 md:bottom-8'>
        <button
          aria-label='현재 지도 위치에서 장소 다시 검색'
          className='flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-gray-700 shadow-2xl ring-1 ring-black/5 transition-all hover:bg-gray-50 active:scale-95'
          onClick={handleSearchAtCurrentLocation}
        >
          <span className='h-2 w-2 animate-pulse rounded-full bg-orange-500' />
          이 위치에서 재검색
        </button>
      </div>
    </div>
  );
}
