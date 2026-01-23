'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import { CategoryListView } from './components/CategoryListView';
import { DashboardSection } from './components/DashboardSection';
import { PlacesMapSection } from './components/PlacesMapSection';
import { DASHBOARD_SECTIONS, getCategoryId } from './constants';
import { usePlacesData } from './hooks/usePlacesData';

const PlacesContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = getCategoryId(searchParams.get('category'));

  // 커스텀 훅을 통한 데이터 및 위치 상태 관리
  const {
    sectionData,
    allPlaces,
    categoryPlaces,
    loading,
    error,
    userLocation,
    setUserLocation,
    locationStatus,
    setLocationStatus,
  } = usePlacesData(categoryId);

  // 로딩 및 에러 처리
  if (loading && !categoryId) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='h-12 w-12 animate-spin rounded-full border-b-2 border-orange-500' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex min-h-screen items-center justify-center font-medium text-red-500'>
        {error}
      </div>
    );
  }

  // 1. 리스트 뷰 (카테고리별 그리드)
  if (categoryId) {
    const currentCategory = DASHBOARD_SECTIONS.find((s) => s.apiId === categoryId);
    return (
      <CategoryListView
        categoryPlaces={categoryPlaces}
        title={currentCategory?.title || '장소 목록'}
        onBackClick={() => router.push('/places')}
      />
    );
  }

  // 2. 대시보드 뷰 (지도 + 섹션별 리스트)
  return (
    <div className='relative min-h-screen bg-gray-50 pb-20'>
      <PlacesMapSection
        allPlaces={allPlaces}
        locationStatus={locationStatus}
        userLocation={userLocation}
        onLocationUpdate={(lat, lng) => {
          setUserLocation({ lat, lng });
          setLocationStatus('granted');
        }}
      />

      <div className='container mx-auto mt-8 max-w-screen-xl space-y-12 px-4'>
        {DASHBOARD_SECTIONS.map((section) => (
          <DashboardSection
            key={section.id}
            places={sectionData[section.id] || []}
            section={section}
          />
        ))}
      </div>
    </div>
  );
};

export default function PlacesPage() {
  return (
    <Suspense fallback={<div className='min-h-screen bg-gray-50' />}>
      <PlacesContent />
    </Suspense>
  );
}

