'use client';

import Image from 'next/image';

interface ReviewItemProps {
  review: {
    id: number;
    userId: number;
    createdAt?: string;
    rating: number;
    content: string;
    photos?: string[];
  };
  currentUserId?: number;
  onDelete: (id: number) => void;
}

export const ReviewItem = ({
  review,
  currentUserId,
  onDelete,
}: ReviewItemProps) => {
  return (
    <div className='border-b border-gray-100 pb-6 last:border-0 last:pb-0'>
      <div className='mb-2 flex items-center justify-between'>
        <span className='font-medium text-gray-900'>
          사용자 {review.userId}
        </span>
        <div className='flex items-center gap-2'>
          <span className='text-xs text-gray-400'>
            {review.createdAt?.split('T')[0]}
          </span>
          {/* 본인 리뷰만 삭제 가능 */}
          {currentUserId === review.userId && (
            <button
              className='text-xs text-red-400 hover:text-red-500'
              type='button'
              onClick={() => onDelete(review.id)}
            >
              삭제
            </button>
          )}
        </div>
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
  );
};
