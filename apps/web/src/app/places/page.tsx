'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import { getPlaces } from '@/api/place';
import { PlaceInfoCard } from '@/components/shared/PlaceInfoCard';
import { Place } from '@/types/place';
import { getCategoryId } from '@/utils/categoryMapper';
import { mapPlaceToCardProps } from '@/utils/petMapper';

// Client Component to handle search params
const PlacesContent = () => {
  const searchParams = useSearchParams();
  const categoryKey = searchParams.get('category');
  const keyword = searchParams.get('keyword');

  // State
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      setError(null);

      try {
        // 1. Determine Category ID
        // If category is present in URL, map it.
        // If not, default to 3 (Cafe) as agreed.
        let categoryId = 3;
        if (categoryKey) {
          const mappedId = getCategoryId(categoryKey);
          if (mappedId) {
            categoryId = mappedId;
          }
        }

        // 2. Fetch Data
        const response = await getPlaces(categoryId, {
          keyword: keyword || undefined,
          size: 20, // Default size
        });

        setPlaces(response.data);
      } catch (err) {
        console.error('Failed to fetch places:', err);
        setError('장소 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [categoryKey, keyword]);

  // Title Logic
  const getTitle = () => {
    if (keyword) return `'${keyword}' 검색 결과`;
    if (categoryKey) {
      // Simple mapping for display
      return '장소 목록';
    }
    return '추천 장소';
  };

  return (
    <div className='container mx-auto max-w-screen-xl px-4 py-8'>
      <h1 className='mb-6 text-2xl font-bold text-gray-900'>{getTitle()}</h1>

      {loading && (
        <div className='py-20 text-center'>
          <div className='mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-orange-500' />
          <p className='mt-4 text-gray-500'>장소를 불러오고 있습니다...</p>
        </div>
      )}

      {error && <div className='py-20 text-center text-red-500'>{error}</div>}

      {!loading && !error && places.length === 0 && (
        <div className='py-20 text-center text-gray-500'>
          검색 결과가 없습니다.
        </div>
      )}

      {!loading && !error && places.length > 0 && (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {places.map((place, index) => (
            <Link key={place.id} href={`/places/${place.id}`}>
              <PlaceInfoCard
                {...mapPlaceToCardProps(place, index)}
                isLike={false} // TODO: Implement like logic
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default function PlacesPage() {
  return (
    <Suspense fallback={<div className='min-h-screen' />}>
      <PlacesContent />
    </Suspense>
  );
}
