'use client';

import { useEffect, useRef, useState } from 'react';

import {
  useCreateReviewMutation,
  useUpdateReviewMutation,
} from '@/hooks/queries/useReviewMutation';
import { useToastStore } from '@/stores/useToastStore';
import { compressImage } from '@/utils/imageCompressor';

interface ExistingPhoto {
  id?: number; // 백엔드에서 내려온 사진 ID (있으면 keepImageIds에 사용)
  photoUrl: string; // 미리보기용 URL
}

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(!!initialData);
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState(initialData?.content || '');
  const [visitDate, setVisitDate] = useState(
    initialData?.visitDate || new Date().toISOString().split('T')[0],
  );

  // 기존 사진 목록 (id + url, 삭제 추적용)
  const [existingPhotos, setExistingPhotos] = useState<ExistingPhoto[]>(
    initialData?.photos || [],
  );
  // 새로 추가한 사진 File 목록
  const [newImages, setNewImages] = useState<File[]>([]);
  // 새로 추가한 사진 미리보기 URL 목록
  const [newPreviews, setNewPreviews] = useState<string[]>([]);

  // 전체 미리보기 = 기존 사진 URL + 새 사진 미리보기
  const allPreviews = [
    ...existingPhotos.map((p) => p.photoUrl),
    ...newPreviews,
  ];
  // 전체 사진 수 = 기존 사진 + 새 사진
  const totalPhotoCount = existingPhotos.length + newImages.length;

  // 언마운트 시 메모리 해제를 위한 Ref
  const previewsRef = useRef<string[]>([]);
  useEffect(() => {
    previewsRef.current = newPreviews;
  }, [newPreviews]);

  useEffect(() => {
    return () => {
      // 컴포넌트가 언마운트(화면에서 사라짐)될 때 메모리에 남은 Blob URL 전체 해제
      previewsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const resetForm = () => {
    setIsOpen(!!initialData);
    setRating(initialData?.rating || 0);
    setContent(initialData?.content || '');
    setVisitDate(
      initialData?.visitDate || new Date().toISOString().split('T')[0],
    );
    setExistingPhotos(initialData?.photos || []);
    newPreviews.forEach((url) => URL.revokeObjectURL(url)); // 폼 초기화 시 생성되었던 메모리 해제
    setNewImages([]);
    setNewPreviews([]);
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

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const addImages = async (files: File[]) => {
    // 1차 필터: 개수 제한 (기존 + 추가할 파일이 3장을 넘는지)
    const remainingSlots = 3 - totalPhotoCount;
    if (remainingSlots <= 0) {
      addToast('이미지는 최대 3장까지 첨부할 수 있습니다.', 'error');
      return;
    }

    let targetFiles = files;
    if (files.length > remainingSlots) {
      addToast(
        `이미지는 최대 3장까지 첨부할 수 있어 ${remainingSlots}장만 추가됩니다.`,
        'error',
      );
      targetFiles = files.slice(0, remainingSlots);
    }

    // 프론트엔드 이미지 최적화(압축 및 리사이즈) 진행
    const compressedFiles = await Promise.all(
      targetFiles.map(async (file) => {
        try {
          return await compressImage(file);
        } catch (error) {
          console.error('Image compression failed:', error);
          return file; // 에러 시 원본 반환
        }
      }),
    );

    // 2차 필터: 압축 후 용량 제한 (5MB)
    const validFiles = compressedFiles.filter((file) => {
      if (file.size > MAX_FILE_SIZE) {
        addToast(
          `'${file.name}'의 용량이 압축 후에도 5MB를 초과합니다.`,
          'error',
        );
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setNewImages((prev) => [...prev, ...validFiles]);
    validFiles.forEach((file) => {
      // Base64 문자열 대신 브라우저의 고유한 URL(blob:...)을 생성하여 미리보기로 사용합니다.
      // 동일한 사진을 올려도 매번 다른 URL이 생성되므로 React key 중복 경고가 사라지며 렌더링도 훨씬 빠릅니다!
      setNewPreviews((prev) => [...prev, URL.createObjectURL(file)]);
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (index: number) => {
    const existingCount = existingPhotos.length;

    if (index < existingCount) {
      // 기존 사진 삭제 (existingPhotos에서 제거 → keepImageIds에 포함 안 됨)
      setExistingPhotos((prev) => prev.filter((_, i) => i !== index));
    } else {
      // 새로 추가한 사진 삭제
      const newIndex = index - existingCount;

      URL.revokeObjectURL(newPreviews[newIndex]); // 삭제하는 특정 사진의 메모리 즉시 해제

      setNewImages((prev) => prev.filter((_, i) => i !== newIndex));
      setNewPreviews((prev) => prev.filter((_, i) => i !== newIndex));
    }
  };

  const submit = () => {
    if (rating === 0) return addToast('별점을 선택해주세요.', 'error');
    if (content.trim().length < 10)
      return addToast('리뷰는 10자 이상 작성해주세요.', 'error');

    if (initialData) {
      // 수정 모드: 유지할 기존 사진 ID 목록 전달
      // 백엔드: keepImageIds가 null → 전부 유지, [] → 전부 삭제
      // 따라서 항상 keepImageIds를 보내야 함
      const keepIds = existingPhotos
        .map((p) => p.id)
        .filter((id): id is number => id !== undefined);

      updateReview({
        rating,
        content: content.trim(),
        visitDate,
        // ID가 있는 사진이 있든 없든 항상 배열을 보냄 (빈 배열 = 전부 삭제)
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
