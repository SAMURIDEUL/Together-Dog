'use client';

import Link from 'next/link';

import { AuthorizedImage } from '@/components/shared/AuthorizedImage';
import { StarIcon } from '@/components/shared/StarIcon';
import type { MyReviewItem as ReviewItemType } from '@/types/review';
import { formatDisplayDate } from '@/utils/date';

// 별점 렌더링
const renderStars = (rating: number) => {
  return (
    <span
      aria-label={`5점 만점에 ${rating}점`}
      className='flex gap-0.5'
      role='img'
    >
      {Array.from({ length: 5 }, (_, i) => {
        const fillPercentage = Math.max(0, Math.min(100, (rating - i) * 100));
        return (
          <StarIcon
            key={i}
            className='h-3.5 w-3.5'
            fillPercentage={fillPercentage}
          />
        );
      })}
    </span>
  );
};

interface MyReviewItemProps {
  review: ReviewItemType;
  onDelete: (placeId: number, reviewId: number) => void;
  onPhotoClick: (photos: string[], index: number) => void;
}

export const MyReviewItem = ({
  review,
  onDelete,
  onPhotoClick,
}: MyReviewItemProps) => {
  return (
    <div className='flex flex-col rounded-xl border border-gray-100 p-4 transition-colors hover:bg-gray-50'>
      <div className='flex items-center gap-2'>
        <span className='shrink-0 text-sm'>{renderStars(review.rating)}</span>
        <span className='shrink-0 whitespace-nowrap text-xs text-gray-400'>
          방문일 {formatDisplayDate(review.visitDate)}
        </span>
      </div>

      <p className='mt-2.5 line-clamp-2 text-sm text-gray-700'>
        {review.content}
      </p>

      {/* 사진 표시 */}
      {review.photoUrls && review.photoUrls.length > 0 && (
        <div className='mt-3 flex gap-2 overflow-x-auto pb-1'>
          {review.photoUrls.map((photo: string, idx: number) => (
            <button
              key={photo}
              className='relative h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-lg bg-gray-100 text-left disabled:cursor-auto'
              type='button'
              onClick={() => onPhotoClick(review.photoUrls!, idx)}
            >
              <AuthorizedImage
                fill
                alt='Review photo'
                className='object-cover'
                src={photo}
                unoptimized={photo.startsWith('/uploads')}
              />
            </button>
          ))}
        </div>
      )}

      {/* 카드 푸터: 액션 버튼 */}
      <div className='mt-4 flex justify-end gap-2'>
        <Link
          className='rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100'
          href={`/places/${review.placeId}#review-${review.id}`}
        >
          📍 장소 보기
        </Link>
        <button
          className='rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-50'
          type='button'
          onClick={() => onDelete(review.placeId, review.id)}
        >
          🗑️ 삭제
        </button>
      </div>
    </div>
  );
};
