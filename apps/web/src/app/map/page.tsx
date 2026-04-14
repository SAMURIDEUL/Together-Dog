'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { RegionSelector } from '@/components/shared/RegionSelector';

import { DEFAULT_FILTERS } from './components/FilterPanel';
import { FilterSidebar } from './components/FilterSidebar';
import { MainMap } from './components/MainMap';
import { MapFloatingButtons } from './components/MapFloatingButtons';
import { PlaceResultView } from './components/PlaceResultView';
import { SearchOverlay } from './components/SearchOverlay';
import { useMapLocation } from './hooks/useMapLocation';
import { useMapSearch } from './hooks/useMapSearch';

export default function MapPage() {
  const router = useRouter();

  // 1. 검색 및 필터 비즈니스 로직
  const {
    activeChips,
    activeFilterCount,
    filteredPlaces,
    filters,
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
  } = useMapSearch();

  // 2. 지도 및 위치 비즈니스 로직
  const {
    setMap,
    selectedPlace,
    setSelectedPlace,
    mapCenter,
    setMapCenter,
    selectedRegion,
    setSelectedRegion,
    userLocation,
    moveToRegion,
    searchAtCurrentLocation,
    moveToUserLocation,
  } = useMapLocation();

  // 3. UI 상태 관리
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isRegionSelectorOpen, setIsRegionSelectorOpen] = useState(false);

  // 4. 검색 트리거 로직 (위치/필터/키워드 변경 시 자동 검색)
  useEffect(() => {
    const searchTarget = mapCenter || userLocation;
    if (searchTarget) {
      search(searchTarget);
    }
  }, [userLocation, search, mapCenter, selectedCategories, keyword]);

  return (
    <div className='relative h-[calc(100vh-64px)] w-full overflow-hidden bg-gray-50'>
      {/* 지도 컨테이너 */}
      <MainMap
        filteredPlaces={filteredPlaces}
        getCategoryKey={getCategoryKey}
        mapCenter={mapCenter}
        selectedPlace={selectedPlace}
        userLocation={userLocation}
        onDragEnd={(m) => {
          const c = m.getCenter();
          setMapCenter({ lat: c.getLat(), lng: c.getLng() });
        }}
        onMapCreate={setMap}
        onPlaceClick={(item) => router.push(`/places/${item.placeInfo.id}`)}
        onSelectPlace={setSelectedPlace}
      />

      {/* 검색 및 카테고리 오버레이 */}
      <SearchOverlay
        activeChips={activeChips}
        activeFilterCount={activeFilterCount}
        keyword={keyword}
        selectedCategories={selectedCategories}
        onCategoryToggle={toggleCategory}
        onFilterClick={() => setIsFilterDrawerOpen(true)}
        onFilterReset={() => {
          setFilters(DEFAULT_FILTERS);
          setSelectedRegion('');
        }}
        onKeywordChange={setKeyword}
        onRegionClick={() => setIsRegionSelectorOpen(true)}
        onSearch={() => mapCenter && setMapCenter({ ...mapCenter })}
      />

      {/* 상세 필터 사이드바 */}
      <FilterSidebar
        currentRegion={selectedRegion}
        filters={filters}
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        onFilterChange={setFilters}
        onRegionClick={() => setIsRegionSelectorOpen(true)}
      />

      {/* 지역 선택 모달 */}
      <RegionSelector
        isOpen={isRegionSelectorOpen}
        onClose={() => setIsRegionSelectorOpen(false)}
        onComplete={(name) => {
          setIsRegionSelectorOpen(false);
          moveToRegion(name);
        }}
      />

      {/* 장소 결과 목록/그리드 뷰 */}
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

      {/* 지도 플로팅 버튼 (내 위치 이동 등) */}
      <MapFloatingButtons
        onMoveToUserLocation={moveToUserLocation}
        onSearchAtCurrentLocation={searchAtCurrentLocation}
      />
    </div>
  );
}
