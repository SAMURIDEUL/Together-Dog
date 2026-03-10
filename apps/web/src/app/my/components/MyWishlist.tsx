'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useLikedPlacesQuery } from '@/hooks/queries/useUserQuery';
import { PlaceDetail } from '@/types/place';
import { resolveThumbnailPath } from '@/utils/petMapper';

export const MyWishlist = () => {
  const { data: places, isLoading } = useLikedPlacesQuery();

  if (isLoading) {
    return (
      <section className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8'>
        <h2 className='mb-4 text-lg font-bold text-gray-900'>
          My Wishlist (찜 목록)
        </h2>
        <div className='flex items-center justify-center py-12'>
          <div className='h-6 w-6 animate-spin rounded-full border-2 border-orange-400 border-t-transparent' />
        </div>
      </section>
    );
  }

  const likedPlaces = (places as PlaceDetail[]) || [];

  return (
    <section className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-lg font-bold text-gray-900'>
          My Wishlist (찜 목록)
        </h2>
        <span className='text-sm text-gray-400'>총 {likedPlaces.length}개</span>
      </div>

      {likedPlaces.length === 0 ? (
        <div className='py-12 text-center'>
          <p className='text-gray-400'>찜한 장소가 없습니다.</p>
          <Link
            className='mt-2 inline-block text-sm font-medium text-orange-500 hover:text-orange-600'
            href='/places'
          >
            장소 둘러보기 →
          </Link>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {likedPlaces.map((place) => (
            <Link
              key={place.placeInfo.id}
              className='group overflow-hidden rounded-xl border border-gray-100 transition-shadow hover:shadow-md'
              href={`/places/${place.placeInfo.id}`}
            >
              {/* 썸네일 */}
              <div className='relative aspect-[4/3] w-full overflow-hidden bg-gray-100'>
                {place.top3photos?.[0] ? (
                  <Image
                    fill
                    alt={place.placeInfo.name}
                    className='object-contain transition-transform group-hover:scale-105'
                    sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                    src={resolveThumbnailPath(place.top3photos[0])}
                  />
                ) : (
                  <div className='flex h-full items-center justify-center text-sm text-gray-300'>
                    이미지 없음
                  </div>
                )}
              </div>

              {/* 정보 */}
              <div className='p-3'>
                <h3 className='text-sm font-bold text-gray-900'>
                  {place.placeInfo.name}
                </h3>
                <p className='mt-0.5 text-xs text-gray-400'>
                  {place.placeInfo.city} {place.placeInfo.district}
                  {place.placeInfo.subdistrict
                    ? ` ${place.placeInfo.subdistrict}`
                    : ''}
                </p>
                {place.placeInfo.averageRating != null && (
                  <div className='mt-1 flex items-center gap-1'>
                    <span className='text-xs text-amber-400'>★</span>
                    <span className='text-xs text-gray-500'>
                      {place.placeInfo.averageRating.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};
