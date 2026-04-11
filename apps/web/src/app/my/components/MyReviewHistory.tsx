'use client';

import { useState } from 'react';

import { ImageModal } from '@/components/shared/ImageModal';
import { Pagination } from '@/components/shared/Pagination';
import {
  useDeleteReviewMutation,
  useMyReviewsQuery,
} from '@/hooks/queries/useUserQuery';
import { useModalStore } from '@/stores/useModalStore';
import { useToastStore } from '@/stores/useToastStore';

import {
  MyReviewHistoryEmpty,
  MyReviewHistoryError,
  MyReviewHistorySkeleton,
} from './MyReviewHistoryStates';
import { MyReviewItem } from './MyReviewItem';

export const MyReviewHistory = () => {
  const [page, setPage] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerPhotos, setViewerPhotos] = useState<string[]>([]);
  const [viewerInitialIndex, setViewerInitialIndex] = useState(0);

  const { data, isLoading, isError, refetch } = useMyReviewsQuery(page, 5);
  const { openModal, closeModal } = useModalStore();
  const { addToast } = useToastStore();

  const { mutate: deleteReview } = useDeleteReviewMutation({
    onSuccess: () => addToast('리뷰가 삭제되었습니다.', 'success'),
    onError: () => addToast('리뷰 삭제에 실패했습니다.', 'error'),
  });

  const handleDelete = (placeId: number, reviewId: number) => {
    openModal({
      title: '리뷰 삭제',
      content: '정말 이 리뷰를 삭제하시겠습니까?',
      primaryAction: {
        label: '삭제',
        onClick: () => {
          closeModal();
          deleteReview({ placeId, reviewId });
        },
      },
      secondaryAction: { label: '취소', onClick: closeModal },
    });
  };

  const handlePhotoClick = (photos: string[], index: number) => {
    setViewerPhotos(photos);
    setViewerInitialIndex(index);
    setViewerOpen(true);
  };

  if (isLoading) return <MyReviewHistorySkeleton />;
  if (isError) return <MyReviewHistoryError onRetry={() => refetch()} />;

  const reviews = data?.content || [];
  const totalElements = data?.totalElements || 0;
  const totalPages = data?.totalPages || 0;

  return (
    <section className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-lg font-bold text-gray-900'>내 리뷰 보기</h2>
        <span className='text-sm text-gray-400'>총 {totalElements}개</span>
      </div>

      {reviews.length === 0 ? (
        <MyReviewHistoryEmpty />
      ) : (
        <div className='space-y-4'>
          {reviews.map((review) => (
            <MyReviewItem
              key={review.id}
              review={review}
              onDelete={handleDelete}
              onPhotoClick={handlePhotoClick}
            />
          ))}

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}

      <ImageModal
        altPrefix='Review photo'
        initialIndex={viewerInitialIndex}
        isOpen={viewerOpen}
        photos={viewerPhotos}
        onClose={() => setViewerOpen(false)}
      />
    </section>
  );
};
