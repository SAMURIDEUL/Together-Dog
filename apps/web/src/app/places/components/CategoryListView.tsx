'use client';

import Link from 'next/link';

import { PlaceInfoCard } from '@/components/shared/PlaceInfoCard';
import { PlaceItem } from '@/types/place';
import { mapPlaceToCardProps } from '@/utils/petMapper';

interface CategoryListViewProps {
  title: string;
  categoryPlaces: PlaceItem[];
  loading: boolean;
  onBackClick: () => void;
}

export const CategoryListView = ({
  title,
  categoryPlaces,
  loading,
  onBackClick,
}: CategoryListViewProps) => {
  return (
    <div className='container mx-auto max-w-screen-xl px-4 py-8 pb-20'>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-2xl font-bold text-gray-900'>{title}</h2>
        <button
          className='text-sm text-gray-500 hover:text-gray-700 font-medium'
          onClick={onBackClick}
        >
          ← 전체 보기
        </button>
      </div>

      {loading && (
        <div className='flex items-center justify-center py-20'>
          <div className='h-12 w-12 animate-spin rounded-full border-b-2 border-orange-500' />
        </div>
      )}

      {!loading && categoryPlaces.length === 0 && (
        <div className='rounded-xl border border-dashed bg-white py-20 text-center text-gray-500'>
          검색 결과가 없습니다.
        </div>
      )}

      {!loading && categoryPlaces.length > 0 && (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {categoryPlaces.map((item, index) => (
            <Link key={item.placeInfo.id} href={`/places/${item.placeInfo.id}`}>
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
};
