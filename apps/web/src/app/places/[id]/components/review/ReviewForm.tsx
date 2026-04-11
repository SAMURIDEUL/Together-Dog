'use client';

import { useAuthStore } from '@/stores/useAuthStore';

import { useReviewForm } from '../../hooks/useReviewForm';
import { ReviewFormBody } from './ReviewFormBody';

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
    <ReviewFormBody
      form={form}
      initialData={initialData}
      onClose={handleCloseForm}
    />
  );
};
