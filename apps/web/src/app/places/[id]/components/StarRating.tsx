'use client';

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
}: StarRatingProps) => (
  <div className='mb-4'>
    <p className='mb-1.5 text-sm font-medium text-gray-600'>별점</p>
    <div className='flex gap-1'>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={`star-${star}`}
          className={`text-2xl transition-colors ${star <= (hoverRating || rating) ? 'text-amber-400' : 'text-gray-200'}`}
          type='button'
          onClick={() => onRate(star)}
          onMouseEnter={() => onHover(star)}
          onMouseLeave={onLeave}
        >
          ★
        </button>
      ))}
    </div>
  </div>
);
