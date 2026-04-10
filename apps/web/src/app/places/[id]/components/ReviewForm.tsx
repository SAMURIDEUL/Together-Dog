'use client';

import { Button } from '@together-dog/ui';

import { useAuthStore } from '@/stores/useAuthStore';

import { useReviewForm } from '../hooks/useReviewForm';
import { ImageUploadPreview } from './ImageUploadPreview';
import { StarRating } from './StarRating';

interface ReviewFormProps {
  placeId: number;
  initialData?: {
    id: number;
    rating: number;
    content: string;
    visitDate: string;
    photos?: { id?: number; photoUrl: string }[];
  };
  onCancelEdit?: () => void;
}

export const ReviewForm = ({
  placeId,
  initialData,
  onCancelEdit,
}: ReviewFormProps) => {
  const { isLoggedIn } = useAuthStore();
  const form = useReviewForm(placeId, initialData, () => {
    if (onCancelEdit) onCancelEdit();
  });

  const handleOpenForm = () => form.setIsOpen(true);
  const handleCloseForm = () => {
    form.resetForm();
    if (onCancelEdit) onCancelEdit();
  };
  const handleHoverStar = (star: number) => form.setHoverRating(star);
  const handleLeaveStar = () => form.setHoverRating(0);
  const handleRateStar = (star: number) => form.setRating(star);
  const handleAddImages = (files: File[]) => form.addImages(files);
  const handleRemoveImage = (index: number) => form.removeImage(index);

  if (!isLoggedIn) return null;

  if (!form.isOpen) {
    return (
      <button
        className='w-full rounded-xl border-2 border-dashed border-gray-200 py-4 text-sm font-medium text-gray-500 transition-colors hover:border-orange-300 hover:text-orange-500'
        type='button'
        onClick={handleOpenForm}
      >
        ✏️ 리뷰 작성하기
      </button>
    );
  }

  return (
    <form
      className='rounded-xl border border-gray-200 bg-white p-5'
      onSubmit={(e) => {
        e.preventDefault();
        form.submit();
      }}
    >
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='text-base font-bold text-gray-900'>
          {initialData ? '리뷰 수정' : '리뷰 작성'}
        </h3>
        <button
          className='text-sm text-gray-400 hover:text-gray-600'
          type='button'
          onClick={handleCloseForm}
        >
          취소
        </button>
      </div>

      <StarRating
        hoverRating={form.hoverRating}
        rating={form.rating}
        onHover={handleHoverStar}
        onLeave={handleLeaveStar}
        onRate={handleRateStar}
      />

      {/* 방문일 */}
      <div className='mb-4'>
        <label
          className='mb-1.5 block text-sm font-medium text-gray-600'
          htmlFor='visit-date'
        >
          방문일
        </label>
        <input
          className='h-10 w-full rounded-lg border border-gray-200 px-3 text-sm focus:border-orange-400 focus:outline-none'
          id='visit-date'
          max={new Date().toISOString().split('T')[0]}
          type='date'
          value={form.visitDate}
          onChange={(e) => form.setVisitDate(e.target.value)}
        />
      </div>

      {/* 내용 */}
      <div className='mb-4'>
        <label
          className='mb-1.5 block text-sm font-medium text-gray-600'
          htmlFor='review-content'
        >
          내용
        </label>
        <textarea
          className='min-h-[100px] w-full resize-none rounded-lg border border-gray-200 p-3 text-sm focus:border-orange-400 focus:outline-none'
          id='review-content'
          maxLength={500}
          placeholder='방문 경험을 10자 이상 작성해주세요'
          value={form.content}
          onChange={(e) => form.setContent(e.target.value)}
        />
        <p className='mt-1 text-right text-xs text-gray-400'>
          {form.content.length}/500
        </p>
      </div>

      <ImageUploadPreview
        fileInputRef={form.fileInputRef}
        images={form.images}
        previews={form.previews}
        totalCount={form.totalPhotoCount}
        onAdd={handleAddImages}
        onRemove={handleRemoveImage}
      />

      <Button
        className='w-full text-sm'
        isDisabled={
          form.isPending ||
          form.rating === 0 ||
          form.content.trim().length < 10 ||
          !form.visitDate
        }
        size='md'
        type='submit'
      >
        {form.isPending && '처리 중...'}
        {!form.isPending && (initialData ? '리뷰 수정' : '리뷰 등록')}
      </Button>
    </form>
  );
};
