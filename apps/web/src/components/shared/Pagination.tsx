'use client';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export const Pagination = ({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className='flex items-center justify-center gap-2 pt-2'>
      <button
        className='rounded-lg px-3 py-1.5 text-sm text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-30'
        disabled={page === 0}
        type='button'
        onClick={() => onPageChange(Math.max(0, page - 1))}
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
        onClick={() => onPageChange(page + 1)}
      >
        다음 →
      </button>
    </div>
  );
};
