'use client';

import { useState } from 'react';

import {
  useCreateReviewMutation,
  useUpdateReviewMutation,
} from '@/hooks/queries/useReviewMutation';
import { useToastStore } from '@/stores/useToastStore';
import { formatToLocalYYYYMMDD } from '@/utils/date';

import { ExistingPhoto, useReviewImages } from './useReviewImages';

interface InitialData {
  id: number;
  rating: number;
  content: string;
  visitDate: string;
  photos?: ExistingPhoto[];
}

export const useReviewForm = (
  placeId: number,
  initialData?: InitialData,
  onSuccessCallback?: () => void,
) => {
  const { addToast } = useToastStore();

  const [isOpen, setIsOpen] = useState(!!initialData);
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState(initialData?.content || '');
  const [visitDate, setVisitDate] = useState(
    initialData?.visitDate || formatToLocalYYYYMMDD(),
  );

  // 이미지 전용 커스텀 훅 연동
  const {
    existingPhotos,
    newImages,
    allPreviews,
    totalPhotoCount,
    fileInputRef,
    addImages,
    removeImage,
    resetImages,
  } = useReviewImages(initialData?.photos);

  const resetForm = () => {
    setIsOpen(!!initialData);
    setRating(initialData?.rating || 0);
    setContent(initialData?.content || '');
    setVisitDate(initialData?.visitDate || formatToLocalYYYYMMDD());
    resetImages(initialData?.photos);
  };

  const { mutate: createReview, isPending: isCreating } =
    useCreateReviewMutation(placeId, {
      onSuccess: () => {
        addToast('리뷰가 등록되었습니다!', 'success');
        resetForm();
        if (onSuccessCallback) onSuccessCallback();
      },
      onError: () => addToast('리뷰 등록에 실패했습니다.', 'error'),
    });

  const { mutate: updateReview, isPending: isUpdating } =
    useUpdateReviewMutation(placeId, initialData?.id || 0, {
      onSuccess: () => {
        addToast('리뷰가 수정되었습니다!', 'success');
        if (onSuccessCallback) onSuccessCallback();
      },
      onError: () => addToast('리뷰 수정에 실패했습니다.', 'error'),
    });

  const isPending = isCreating || isUpdating;

  const submit = () => {
    if (rating === 0) return addToast('별점을 선택해주세요.', 'error');
    if (content.trim().length < 10)
      return addToast('리뷰는 10자 이상 작성해주세요.', 'error');

    if (initialData) {
      const keepIds = existingPhotos
        .map((p) => p.id)
        .filter((id): id is number => id !== undefined);

      updateReview({
        rating,
        content: content.trim(),
        visitDate,
        keepImageIds: keepIds,
        newImages: newImages.length > 0 ? newImages : undefined,
      });
    } else {
      createReview({
        placeId,
        rating,
        content: content.trim(),
        visitDate,
        images: newImages.length > 0 ? newImages : undefined,
      });
    }
  };

  return {
    isOpen,
    setIsOpen,
    rating,
    setRating,
    hoverRating,
    setHoverRating,
    content,
    setContent,
    visitDate,
    setVisitDate,
    images: newImages,
    previews: allPreviews,
    totalPhotoCount,
    isPending,
    fileInputRef,
    addImages,
    removeImage,
    submit,
    resetForm,
  };
};
