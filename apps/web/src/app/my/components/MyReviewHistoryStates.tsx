import Link from 'next/link';

export const MyReviewHistorySkeleton = () => {
  return (
    <section className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8'>
      <h2 className='mb-4 text-lg font-bold text-gray-900'>내 리뷰 보기</h2>
      <div className='flex items-center justify-center py-12'>
        <div className='h-6 w-6 animate-spin rounded-full border-2 border-orange-400 border-t-transparent' />
      </div>
    </section>
  );
};

interface MyReviewHistoryErrorProps {
  onRetry: () => void;
}

export const MyReviewHistoryError = ({
  onRetry,
}: MyReviewHistoryErrorProps) => {
  return (
    <section className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8'>
      <h2 className='mb-4 text-lg font-bold text-gray-900'>내 리뷰 보기</h2>
      <div className='py-12 text-center'>
        <p className='text-gray-500'>리뷰를 불러오는 데 실패했습니다.</p>
        <button
          className='mt-3 text-sm font-medium text-orange-500 hover:text-orange-600'
          type='button'
          onClick={onRetry}
        >
          다시 시도
        </button>
      </div>
    </section>
  );
};

export const MyReviewHistoryEmpty = () => {
  return (
    <div className='py-12 text-center'>
      <p className='text-gray-400'>작성한 리뷰가 없습니다.</p>
      <Link
        className='mt-2 inline-block text-sm font-medium text-orange-500 hover:text-orange-600'
        href='/places'
      >
        장소 둘러보기 →
      </Link>
    </div>
  );
};
