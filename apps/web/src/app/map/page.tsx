'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { CustomOverlayMap, Map } from 'react-kakao-maps-sdk';

import { RegionSelector } from '@/components/shared/RegionSelector';
import { usePlaceStore } from '@/stores/usePlaceStore';
import { PlaceItem } from '@/types/place';

import { DEFAULT_FILTERS } from './components/FilterPanel';
import { FilterSidebar } from './components/FilterSidebar';
import { MapFloatingButtons } from './components/MapFloatingButtons';
import { MapMarkers } from './components/MapMarkers';
import { PlaceResultView } from './components/PlaceResultView';
import { SearchOverlay } from './components/SearchOverlay';
import { useMapSearch } from './hooks/useMapSearch';

export default function MapPage() {
  const router = useRouter();
  const { initLocation, userLocation } = usePlaceStore();
  const {
    filteredPlaces,
    getCategoryKey,
    keyword,
    loading,
    search,
    selectedCategories,
    setFilters,
    setKeyword,
    setSortBy,
    sortBy,
    toggleCategory,
    filters,
  } = useMapSearch();

  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<PlaceItem | null>(null);
  const [mapCenter, setMapCenter] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isRegionSelectorOpen, setIsRegionSelectorOpen] = useState(false);

  useEffect(() => {
    if (userLocation && !mapCenter)
      setMapCenter({ lat: userLocation.lat, lng: userLocation.lng });
    if (!userLocation) initLocation();
  }, [userLocation, initLocation, mapCenter]);

  useEffect(() => {
    const searchTarget = mapCenter || userLocation;
    if (searchTarget) {
      search(searchTarget);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocation, search]);

  // 지역 좌표 검색 및 지도 이동
  const moveToRegion = (regionName: string) => {
    if (!window.kakao) return;
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(regionName, (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = {
          lat: parseFloat(result[0].y),
          lng: parseFloat(result[0].x),
        };
        setMapCenter(coords);
        search(coords);
      }
    });
  };

  const activeChips = useMemo(() => {
    const chips: { handleRemove: () => void; id: string; label: string }[] = [];
    if (filters.minRating === 4) {
      chips.push({
        handleRemove: () => setFilters({ ...filters, minRating: null }),
        id: 'rating',
        label: '★ 4.0+',
      });
    }
    if (filters.hasParking) {
      chips.push({
        handleRemove: () => setFilters({ ...filters, hasParking: null }),
        id: 'parking',
        label: '주차',
      });
    }
    filters.sizeLimit.forEach((size) =>
      chips.push({
        handleRemove: () =>
          setFilters({
            ...filters,
            sizeLimit: filters.sizeLimit.filter((s) => s !== size),
          }),
        id: `size-${size}`,
        label: size,
      }),
    );
    filters.essentialPolicies.forEach((p) =>
      chips.push({
        handleRemove: () =>
          setFilters({
            ...filters,
            essentialPolicies: filters.essentialPolicies.filter((x) => x !== p),
          }),
        id: `p-${p}`,
        label: p,
      }),
    );
    return chips;
  }, [filters, setFilters]);

  const activeFilterCount =
    activeChips.length +
    (filters.isIndoor ? 1 : 0) +
    (filters.isOutdoor ? 1 : 0);

  return (
    <div className='relative h-[calc(100vh-64px)] w-full overflow-hidden bg-gray-50'>
      {userLocation && mapCenter && (
        <Map
          center={mapCenter}
          className='h-full w-full'
          level={4}
          onCenterChanged={(m) =>
            setMapCenter({
              lat: m.getCenter().getLat(),
              lng: m.getCenter().getLng(),
            })
          }
          onCreate={setMap}
          onDragEnd={(m) => {
            const c = m.getCenter();
            search({ lat: c.getLat(), lng: c.getLng() });
          }}
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
            onPlaceClick={(item) => router.push(`/places/${item.placeInfo.id}`)}
            onSelectPlace={setSelectedPlace}
          />
        </Map>
      )}

      <SearchOverlay
        activeChips={activeChips}
        activeFilterCount={activeFilterCount}
        keyword={keyword}
        selectedCategories={selectedCategories}
        onCategoryToggle={toggleCategory}
        onFilterClick={() => setIsFilterDrawerOpen(true)}
        onFilterReset={() => setFilters(DEFAULT_FILTERS)}
        onKeywordChange={setKeyword}
        onRegionClick={() => setIsRegionSelectorOpen(true)}
        onSearch={() => mapCenter && search(mapCenter)}
      />

      <FilterSidebar
        currentRegion={keyword}
        filters={filters}
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        onFilterChange={setFilters}
        onRegionClick={() => setIsRegionSelectorOpen(true)}
      />

      <RegionSelector
        isOpen={isRegionSelectorOpen}
        onClose={() => setIsRegionSelectorOpen(false)}
        onComplete={(name) => {
          setIsRegionSelectorOpen(false);
          moveToRegion(name);
        }}
      />

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

      <MapFloatingButtons
        onMoveToUserLocation={() => {
          if (userLocation) {
            setMapCenter({ lat: userLocation.lat, lng: userLocation.lng });
            search(userLocation);
          }
        }}
        onSearchAtCurrentLocation={() => {
          const c = map?.getCenter();
          if (c) search({ lat: c.getLat(), lng: c.getLng() });
        }}
      />
    </div>
  );
}
