'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { getPlaceReviews } from '@/api/place';
import { useDeletePlaceReviewMutation } from '@/hooks/queries/useReviewMutation';
import { useMyInfoQuery } from '@/hooks/queries/useUserQuery';
import { useModalStore } from '@/stores/useModalStore';
import { useToastStore } from '@/stores/useToastStore';

import { ReviewForm } from './ReviewForm';
import { ReviewItem } from './ReviewItem';

interface PlaceReviewsProps {
  placeId: number;
}

export const PlaceReviews = ({ placeId }: PlaceReviewsProps) => {
  const { data: myInfo } = useMyInfoQuery();
  const { openModal, closeModal } = useModalStore();
  const { addToast } = useToastStore();

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

  const { mutate: deleteReview } = useDeletePlaceReviewMutation(placeId, {
    onSuccess: () => addToast('리뷰가 삭제되었습니다.', 'success'),
    onError: () => addToast('리뷰 삭제에 실패했습니다.', 'error'),
  });

  const handleDelete = (reviewId: number) => {
    openModal({
      title: '리뷰 삭제',
      content: '정말 이 리뷰를 삭제하시겠습니까?',
      primaryAction: {
        label: '삭제',
        onClick: () => {
          closeModal();
          deleteReview(reviewId);
        },
      },
      secondaryAction: { label: '취소', onClick: closeModal },
    });
  };

  const reviews = data?.pages.flatMap((page) => page.reviews) || [];

  if (status === 'pending') {
    return (
      <div className='bg-white px-4 py-8 text-center text-gray-500'>
        리뷰를 불러오는 중...
      </div>
    );
  }

  return (
    <div className='bg-white px-4 py-6'>
      <h2 className='mb-4 text-lg font-bold text-gray-900'>
        리뷰 <span className='text-orange-500'>{reviews.length}</span>
      </h2>

      {/* 리뷰 작성 폼 */}
      <div className='mb-6'>
        <ReviewForm placeId={placeId} />
      </div>

      {reviews.length === 0 ? (
        <p className='py-4 text-center text-sm text-gray-400'>
          아직 작성된 리뷰가 없습니다.
        </p>
      ) : (
        <div className='flex flex-col gap-6'>
          {reviews.map((review) => (
            <ReviewItem
              key={review.id}
              currentUserId={myInfo?.id}
              review={review}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

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
