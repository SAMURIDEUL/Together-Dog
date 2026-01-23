'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { Map, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk';

import { getPlaces } from '@/api/place';
import { PlaceInfoCard } from '@/components/shared/PlaceInfoCard';
import { PlaceItem } from '@/types/place';
import { mapPlaceToCardProps } from '@/utils/petMapper';

// Haversine formula to calculate distance between two coordinates
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const getMarkerImageUrl = (): string => {
  return 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
};

// Dashboard Categories configuration
const DASHBOARD_SECTIONS = [
  {
    id: 'cafe',
    apiId: 3,
    title: '강아지와 커피 한잔 ☕️',
    subtitle: '함께 쉴 수 있는 카페',
  },
  {
    id: 'restaurant',
    apiId: 9,
    title: '맛있는 식사도 함께 🍴',
    subtitle: '반려동물 동반 식당',
  },
  {
    id: 'travelSpot',
    apiId: 10,
    title: '산책과 놀이를 하려 공원 🌿',
    subtitle: '신나게 뛰어놀 수 있는 여행지',
  },
  {
    id: 'pension',
    apiId: 8,
    title: '편안한 휴식 펜션 🏡',
    subtitle: '자연 속 힐링 공간',
  },
  {
    id: 'hotel',
    apiId: 13,
    title: '호캉스는 강아지와 함께 🏨',
    subtitle: '럭셔리한 휴가',
  },
  {
    id: 'petHospital',
    apiId: 4,
    title: '아플 땐 병원으로!! 🏥',
    subtitle: '믿을 수 있는 동물병원',
  },
  {
    id: 'petPharmacy',
    apiId: 1,
    title: '약이 필요할 땐 약국 💊',
    subtitle: '동물 의약품 판매',
  },
  {
    id: 'petSupplies',
    apiId: 5,
    title: '필요한 건 여기서! 용품점 🦴',
    subtitle: '장난감부터 간식까지',
  },
  {
    id: 'grooming',
    apiId: 6,
    title: '예쁘게 미용해요 ✂️',
    subtitle: '깔끔한 관리',
  },
  {
    id: 'entrustedCare',
    apiId: 11,
    title: '잠시 맡겨주세요 유치원/돌봄 🐕',
    subtitle: '안심 위탁 케어',
  },
  {
    id: 'museum',
    apiId: 12,
    title: '견문 넓히기 박물관 🏛️',
    subtitle: '함께 관람해요',
  },
  {
    id: 'artGallery',
    apiId: 2,
    title: '예술적 감성 미술관 🎨',
    subtitle: '조용한 관람',
  },
  {
    id: 'culturalCenter',
    apiId: 7,
    title: '문화 생활 문화센터 🎭',
    subtitle: '복합 문화 공간',
  },
];

const PlacesContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const categoryId = categoryParam ? parseInt(categoryParam, 10) : null;

  // State
  const [sectionData, setSectionData] = useState<Record<string, PlaceItem[]>>(
    {},
  );
  const [allPlaces, setAllPlaces] = useState<PlaceItem[]>([]);
  const [categoryPlaces, setCategoryPlaces] = useState<PlaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [locationStatus, setLocationStatus] = useState<
    'loading' | 'granted' | 'denied'
  >('loading');

  // Get user location on mount
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationStatus('granted');
        },
        (error) => {
          console.warn('Location permission denied:', error);
          setLocationStatus('denied');
          // Fallback to Seoul City Hall
          setUserLocation({ lat: 37.5665, lng: 126.978 });
        },
      );
    } else {
      setLocationStatus('denied');
      setUserLocation({ lat: 37.5665, lng: 126.978 });
    }
  }, []);

  // Fetch data
  useEffect(() => {
    if (!userLocation) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (categoryId) {
          // List View: Fetch specific category
          const res = await getPlaces(categoryId, { size: 50 });
          setCategoryPlaces(res.data.places);
        } else {
          // Dashboard View: Fetch all sections
          const results = await Promise.all(
            DASHBOARD_SECTIONS.map((section) =>
              getPlaces(section.apiId, { size: 20 }).then((res) => ({
                id: section.id,
                data: res.data.places,
              })),
            ),
          );

          const newSectionData: Record<string, PlaceItem[]> = {};
          let collectedPlaces: PlaceItem[] = [];

          results.forEach(({ id, data }) => {
            // Sort by distance from user location
            const sortedData = data
              .map((place) => ({
                ...place,
                distance: calculateDistance(
                  userLocation.lat,
                  userLocation.lng,
                  place.placeInfo.lat,
                  place.placeInfo.lon,
                ),
              }))
              .sort((a, b) => a.distance - b.distance)
              .slice(0, 10); // Take top 10 closest

            newSectionData[id] = sortedData;
            collectedPlaces = [...collectedPlaces, ...sortedData];
          });

          setSectionData(newSectionData);
          setAllPlaces(collectedPlaces);
        }
      } catch (err) {
        console.error('Failed to fetch place data:', err);
        setError('장소 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userLocation, categoryId]);

  const mapCenter = userLocation || { lat: 37.5665, lng: 126.978 };

  // Common Loading
  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='h-12 w-12 animate-spin rounded-full border-b-2 border-orange-500' />
      </div>
    );
  }

  // Common Error
  if (error) {
    return (
      <div className='flex min-h-screen items-center justify-center text-red-500'>
        {error}
      </div>
    );
  }

  // --- List View (Category Grid) ---
  if (categoryId) {
    const currentCategory = DASHBOARD_SECTIONS.find(
      (s) => s.apiId === categoryId,
    );
    return (
      <div className='container mx-auto max-w-screen-xl px-4 py-8 pb-20'>
        <div className='mb-6 flex items-center justify-between'>
          <h2 className='text-2xl font-bold text-gray-900'>
            {currentCategory?.title || '카테고리 장소'}
          </h2>
          <button
            className='text-sm text-gray-500 hover:text-gray-700'
            onClick={() => router.push('/places')}
          >
            ← 전체 보기
          </button>
        </div>

        {categoryPlaces.length === 0 ? (
          <div className='py-20 text-center text-gray-500'>
            검색 결과가 없습니다.
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {categoryPlaces.map((item, index) => (
              <Link
                key={item.placeInfo.id}
                href={`/places/${item.placeInfo.id}`}
              >
                <PlaceInfoCard
                  {...mapPlaceToCardProps(item, index)}
                  isLike={false}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  // --- Dashboard View ---
  return (
    <div className='relative min-h-screen bg-gray-50 pb-20'>
      {/* 1. Top Map Section */}
      <div className='relative h-[350px] w-full bg-gray-200'>
        {/* Location Controls Overlay */}
        <div className='absolute left-4 right-4 top-4 z-10 flex gap-2'>
          <button
            className='flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium shadow-md transition-colors hover:bg-gray-50'
            onClick={() => window.location.reload()}
          >
            <span className='text-lg'>📍</span>
            {locationStatus === 'granted' ? '내 위치' : '위치 권한 없음'}
          </button>
          <button className='flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium shadow-md transition-colors hover:bg-gray-50'>
            <span className='text-lg'>🔍</span>
            지역 검색
          </button>
        </div>

        {userLocation && (
          <Map
            center={mapCenter}
            level={7}
            style={{ width: '100%', height: '100%' }}
          >
            {/* User Location Marker */}
            <MapMarker
              image={{
                src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
                size: { width: 29, height: 35 },
              }}
              position={mapCenter}
              title='내 위치'
            />

            {/* Clustered Place Markers */}
            <MarkerClusterer averageCenter minLevel={6}>
              {allPlaces.map((place) => {
                const markerImageUrl = getMarkerImageUrl();

                return (
                  <MapMarker
                    key={place.placeInfo.id}
                    image={{
                      src: markerImageUrl,
                      size: { width: 24, height: 35 },
                    }}
                    position={{
                      lat: place.placeInfo.lat,
                      lng: place.placeInfo.lon,
                    }}
                    title={place.placeInfo.name}
                    onClick={() => router.push(`/places/${place.placeInfo.id}`)}
                  />
                );
              })}
            </MarkerClusterer>
          </Map>
        )}
      </div>

      <div className='container mx-auto mt-8 max-w-screen-xl space-y-12 px-4'>
        {/* Loading State */}
        {loading && (
          <div className='py-32 text-center'>
            <div className='mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-orange-500' />
            <p className='mt-4 text-gray-500'>
              {locationStatus === 'loading'
                ? '위치 정보를 가져오는 중...'
                : '장소를 불러오고 있습니다...'}
            </p>
          </div>
        )}

        {/* Dashboard Sections */}
        {!loading &&
          DASHBOARD_SECTIONS.map((section) => (
            <section key={section.id} className='flex flex-col gap-4'>
              <div className='flex items-end justify-between px-1'>
                <div>
                  <h2 className='flex items-center gap-2 text-xl font-bold text-gray-900'>
                    {section.title}
                  </h2>
                  <p className='mt-1 text-sm text-gray-500'>
                    {section.subtitle}
                  </p>
                </div>
                <button
                  className='flex items-center gap-1 text-xs font-medium text-orange-500 hover:text-orange-600'
                  onClick={() =>
                    router.push(`/places?category=${section.apiId}`)
                  }
                >
                  더보기 <span className='text-lg leading-none'>›</span>
                </button>
              </div>

              {/* Horizontal Scroll List */}
              <div className='scrollbar-hide -mx-4 flex gap-4 overflow-x-auto px-4 pb-4'>
                {sectionData[section.id]?.length > 0 ? (
                  sectionData[section.id].map((place, index) => (
                    <div
                      key={place.placeInfo.id}
                      className='w-[280px] flex-shrink-0'
                    >
                      <Link href={`/places/${place.placeInfo.id}`}>
                        <PlaceInfoCard
                          {...mapPlaceToCardProps(place, index)}
                          isLike={false}
                        />
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className='w-full rounded-xl border border-dashed border-gray-200 bg-white py-10 text-center text-sm text-gray-400'>
                    주변에 등록된 장소가 없습니다.
                  </div>
                )}
              </div>
            </section>
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
