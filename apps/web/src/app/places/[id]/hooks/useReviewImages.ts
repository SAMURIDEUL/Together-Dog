'use client';

import { useEffect, useRef, useState } from 'react';

import { useToastStore } from '@/stores/useToastStore';
import { compressImage } from '@/utils/imageCompressor';

export interface ExistingPhoto {
  id?: number;
  photoUrl: string;
}

export const useReviewImages = (initialPhotos: ExistingPhoto[] = []) => {
  const { addToast } = useToastStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 기존 사진 목록
  const [existingPhotos, setExistingPhotos] =
    useState<ExistingPhoto[]>(initialPhotos);
  // 새로 추가한 사진 File 목록
  const [newImages, setNewImages] = useState<File[]>([]);
  // 새로 추가한 사진 미리보기 URL 목록
  const [newPreviews, setNewPreviews] = useState<string[]>([]);

  // 전체 미리보기 및 사진 수 계산
  const allPreviews = [
    ...existingPhotos.map((p) => p.photoUrl),
    ...newPreviews,
  ];
  const totalPhotoCount = existingPhotos.length + newImages.length;

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  // 메모리 해제 로직
  const previewsRef = useRef<string[]>([]);
  useEffect(() => {
    previewsRef.current = newPreviews;
  }, [newPreviews]);

  useEffect(() => {
    return () => {
      previewsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const addImages = async (files: File[]) => {
    try {
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

      const compressedFiles = await Promise.all(
        targetFiles.map(async (file) => {
          try {
            return await compressImage(file);
          } catch (error) {
            console.error('Image compression failed:', error);
            return file;
          }
        }),
      );

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
        setNewPreviews((prev) => [...prev, URL.createObjectURL(file)]);
      });
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    const existingCount = existingPhotos.length;
    if (index < existingCount) {
      setExistingPhotos((prev) => prev.filter((_, i) => i !== index));
    } else {
      const newIndex = index - existingCount;
      URL.revokeObjectURL(newPreviews[newIndex]);
      setNewImages((prev) => prev.filter((_, i) => i !== newIndex));
      setNewPreviews((prev) => prev.filter((_, i) => i !== newIndex));
    }
  };

  const resetImages = (photos: ExistingPhoto[] = []) => {
    newPreviews.forEach((url) => URL.revokeObjectURL(url));
    setExistingPhotos(photos);
    setNewImages([]);
    setNewPreviews([]);
  };

  return {
    existingPhotos,
    newImages,
    newPreviews,
    allPreviews,
    totalPhotoCount,
    fileInputRef,
    addImages,
    removeImage,
    resetImages,
  };
};
