'use client';

import Link from 'next/link';
import { useState } from 'react';

import {
  useDeleteReviewMutation,
  useMyReviewsQuery,
} from '@/hooks/queries/useUserQuery';
import { useModalStore } from '@/stores/useModalStore';
import { useToastStore } from '@/stores/useToastStore';

export const MyReviewHistory = () => {
  const [page, setPage] = useState(0);
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

  // 날짜 파싱 헬퍼
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const normalized = dateStr.replace(
      /(\d{4}-\d{2}-\d{2})\s(\d{2})-(\d{2})-(\d{2})/,
      '$1T$2:$3:$4',
    );
    const date = new Date(normalized);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  // 별점 렌더링
  const renderStars = (rating: number) => {
    return (
      <div aria-label={`5점 만점에 ${rating}점`} role='img'>
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            aria-hidden='true'
            className={i < rating ? 'text-amber-400' : 'text-gray-200'}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <section className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8'>
        <h2 className='mb-4 text-lg font-bold text-gray-900'>My Review History</h2>
        <div className='flex items-center justify-center py-12'>
          <div className='h-6 w-6 animate-spin rounded-full border-2 border-orange-400 border-t-transparent' />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8'>
        <h2 className='mb-4 text-lg font-bold text-gray-900'>My Review History</h2>
        <div className='py-12 text-center'>
          <p className='text-gray-500'>리뷰를 불러오는 데 실패했습니다.</p>
          <button
            className='mt-3 text-sm font-medium text-orange-500 hover:text-orange-600'
            type='button'
            onClick={() => refetch()}
          >
            다시 시도
          </button>
        </div>
      </section>
    );
  }

  const reviews = data?.content || [];
  const totalElements = data?.totalElements || 0;
  const totalPages = data?.totalPages || 0;

  return (
    <section className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-lg font-bold text-gray-900'>My Review History</h2>
        <span className='text-sm text-gray-400'>총 {totalElements}개</span>
      </div>

      {reviews.length === 0 ? (
        <div className='py-12 text-center'>
          <p className='text-gray-400'>작성한 리뷰가 없습니다.</p>
          <Link
            className='mt-2 inline-block text-sm font-medium text-orange-500 hover:text-orange-600'
            href='/places'
          >
            장소 둘러보기 →
          </Link>
        </div>
      ) : (
        <div className='space-y-4'>
          {reviews.map((review) => (
            <div
              key={review.id}
              className='rounded-xl border border-gray-100 p-4 transition-colors hover:bg-gray-50'
            >
              <div className='flex items-start justify-between'>
                <div className='min-w-0 flex-1'>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm'>
                      {renderStars(review.rating)}
                    </span>
                    <span className='text-xs text-gray-400'>
                      {formatDate(review.visitDate)}
                    </span>
                  </div>
                  <p className='mt-1.5 line-clamp-2 text-sm text-gray-700'>
                    {review.content}
                  </p>
                </div>

                {/* 장소 보기 / 삭제 */}
                <div className='ml-3 flex shrink-0 gap-1'>
                  <Link
                    className='rounded-lg px-2.5 py-1 text-xs text-gray-500 transition-colors hover:bg-gray-100'
                    href={`/places/${review.placeId}#review-${review.id}`}
                  >
                    📍 장소 보기
                  </Link>
                  <button
                    className='rounded-lg px-2.5 py-1 text-xs text-red-400 transition-colors hover:bg-red-50'
                    type='button'
                    onClick={() => handleDelete(review.placeId, review.id)}
                  >
                    🗑️ 삭제
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className='flex items-center justify-center gap-2 pt-2'>
              <button
                className='rounded-lg px-3 py-1.5 text-sm text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-30'
                disabled={page === 0}
                type='button'
                onClick={() => setPage((p) => Math.max(0, p - 1))}
              >
                ← 이전
              </button>
              <span className='text-xs text-gray-400'>
                {page + 1} / {totalPages}
              </span>
              <button
                className='rounded-lg px-3 py-1.5 text-sm text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-30'
                disabled={page >= totalPages - 1}
                type='button'
                onClick={() => setPage((p) => p + 1)}
              >
                다음 →
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
