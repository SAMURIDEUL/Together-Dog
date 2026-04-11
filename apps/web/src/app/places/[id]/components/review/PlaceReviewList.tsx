import { ReviewItem } from './ReviewItem';

interface PlaceReviewListProps {
  reviews: any[];
  myInfo?: { id?: number };
  placeId: number;
  onDelete: (id: number) => void;
}

export const PlaceReviewList = ({
  reviews,
  myInfo,
  placeId,
  onDelete,
}: PlaceReviewListProps) => {
  if (reviews.length === 0) {
    return (
      <p className='py-4 text-center text-sm text-gray-400'>
        아직 작성된 리뷰가 없습니다.
      </p>
    );
  }

  return (
    <div className='flex flex-col gap-6'>
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          currentUserId={myInfo?.id}
          placeId={placeId}
          review={review}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
