'use client';

import { useRef, useState } from 'react';

import { useCreateReviewMutation } from '@/hooks/queries/useReviewMutation';
import { useToastStore } from '@/stores/useToastStore';

export const useReviewForm = (placeId: number) => {
  const { addToast } = useToastStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState('');
  const [visitDate, setVisitDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const resetForm = () => {
    setIsOpen(false);
    setRating(0);
    setContent('');
    setVisitDate(new Date().toISOString().split('T')[0]);
    setImages([]);
    setPreviews([]);
  };

  const { mutate: createReview, isPending } = useCreateReviewMutation(placeId, {
    onSuccess: () => {
      addToast('리뷰가 등록되었습니다!', 'success');
      resetForm();
    },
    onError: () => addToast('리뷰 등록에 실패했습니다.', 'error'),
  });

  const addImages = (files: File[]) => {
    if (images.length + files.length > 3) {
      addToast('이미지는 최대 3장까지 첨부할 수 있습니다.', 'error');
      return;
    }
    setImages((prev) => [...prev, ...files]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) =>
        setPreviews((prev) => [...prev, e.target?.result as string]);
      reader.readAsDataURL(file);
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const submit = () => {
    if (rating === 0) return addToast('별점을 선택해주세요.', 'error');
    if (content.trim().length < 10)
      return addToast('리뷰는 10자 이상 작성해주세요.', 'error');

    createReview({
      placeId,
      rating,
      content: content.trim(),
      visitDate,
      images: images.length > 0 ? images : undefined,
    });
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
    images,
    previews,
    isPending,
    fileInputRef,
    addImages,
    removeImage,
    submit,
    resetForm,
  };
};
