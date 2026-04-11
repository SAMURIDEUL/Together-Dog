interface PlaceReviewStatesProps {
  status: 'pending' | 'error' | 'success';
  onRetry: () => void;
}

export const PlaceReviewPending = () => (
  <div className='bg-white px-4 py-8 text-center text-gray-500'>
    리뷰를 불러오는 중...
  </div>
);

export const PlaceReviewError = ({ onRetry }: { onRetry: () => void }) => (
  <div className='bg-white px-4 py-8 text-center'>
    <p className='text-sm text-gray-500'>리뷰를 불러오는 데 실패했습니다.</p>
    <button
      className='mt-3 text-sm font-medium text-orange-500 hover:text-orange-600'
      type='button'
      onClick={onRetry}
    >
      다시 시도
    </button>
  </div>
);
