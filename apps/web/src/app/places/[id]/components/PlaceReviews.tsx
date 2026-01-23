'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';

import { getPlaceReviews } from '@/api/place';

interface PlaceReviewsProps {
  placeId: number;
}

export const PlaceReviews = ({ placeId }: PlaceReviewsProps) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['reviews', placeId],
    queryFn: ({ pageParam }) => getPlaceReviews(placeId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasNext ? allPages.length : undefined,
  });

  const reviews = data?.pages.flatMap((page) => page.reviews) || [];

  if (status === 'pending') {
    return (
      <div className='bg-white px-4 py-8 text-center text-gray-500'>
        리뷰를 불러오는 중...
      </div>
    );
  }

  if (status === 'success' && reviews.length === 0) {
    return (
      <div className='bg-white px-4 py-8 text-center text-gray-500'>
        아직 작성된 리뷰가 없습니다.
      </div>
    );
  }

  return (
    <div className='bg-white px-4 py-6'>
      <h2 className='mb-4 text-lg font-bold text-gray-900'>
        리뷰 <span className='text-orange-500'>{reviews.length}</span>
      </h2>

      <div className='flex flex-col gap-6'>
        {reviews.map((review) => (
          <div
            key={review.id}
            className='border-b border-gray-100 pb-6 last:border-0 last:pb-0'
          >
            <div className='mb-2 flex items-center justify-between'>
              <span className='font-medium text-gray-900'>
                사용자 {review.userId}
              </span>
              <span className='text-xs text-gray-400'>
                {review.createdAt.split('T')[0]}
              </span>
            </div>

            <div className='mb-2 flex text-sm text-yellow-500'>
              {'★'.repeat(review.rating)}
              {'☆'.repeat(5 - review.rating)}
            </div>

            <p className='whitespace-pre-wrap text-sm text-gray-700'>
              {review.content}
            </p>

            {review.photos && review.photos.length > 0 && (
              <div className='mt-3 flex gap-2 overflow-x-auto'>
                {review.photos.map((photo) => (
                  <div
                    key={photo}
                    className='relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100'
                  >
                    <Image
                      fill
                      alt='Review photo'
                      className='object-cover'
                      src={photo}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {hasNextPage && (
        <button
          className='mt-6 w-full rounded-lg border border-gray-200 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50'
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage ? '로딩 중...' : '더보기'}
        </button>
      )}

      {isFetching && !isFetchingNextPage && (
        <div className='py-4 text-center text-xs text-gray-400'>
          업데이트 중...
        </div>
      )}
    </div>
  );
};
