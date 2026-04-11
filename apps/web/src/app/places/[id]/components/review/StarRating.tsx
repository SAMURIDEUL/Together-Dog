'use client';

import { StarIcon } from '@/components/shared/StarIcon';

interface StarRatingProps {
  rating: number;
  hoverRating: number;
  onRate: (star: number) => void;
  onHover: (star: number) => void;
  onLeave: () => void;
}

export const StarRating = ({
  rating,
  hoverRating,
  onRate,
  onHover,
  onLeave,
}: StarRatingProps) => {
  const handleMouseMove = (
    e: React.MouseEvent<HTMLButtonElement>,
    star: number,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isHalf = x < rect.width / 2;
    onHover(isHalf ? star - 0.5 : star);
  };

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    star: number,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isHalf = x < rect.width / 2;
    onRate(isHalf ? star - 0.5 : star);
  };

  return (
    <div className='mb-4'>
      <p className='mb-1.5 text-sm font-medium text-gray-600'>별점</p>
      <div className='flex gap-1'>
        {[1, 2, 3, 4, 5].map((star) => {
          const currentDisplayRating = hoverRating || rating;
          // 이 별이 얼마나 채워져야 하는지 계산 (0, 50, 100)
          const fillPercentage =
            currentDisplayRating >= star
              ? 100
              : currentDisplayRating >= star - 0.5
                ? 50
                : 0;

          return (
            <button
              key={`star-${star}`}
              aria-label={`Rate ${star} stars`}
              aria-pressed={star <= rating}
              className='text-2xl transition-transform hover:scale-110 active:scale-95'
              type='button'
              onClick={(e) => handleClick(e, star)}
              onMouseLeave={onLeave}
              onMouseMove={(e) => handleMouseMove(e, star)}
            >
              <StarIcon
                className='h-8 w-8 transition-colors'
                fillPercentage={fillPercentage}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
