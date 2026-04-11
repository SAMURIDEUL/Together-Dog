'use client';

import { useCallback, useEffect, useState } from 'react';

import { AuthorizedImage } from '@/components/shared/AuthorizedImage';

interface ImageModalProps {
  altPrefix?: string;
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  photos: string[];
}

export const ImageModal = ({
  altPrefix = 'Image',
  initialIndex = 0,
  isOpen,
  onClose,
  photos,
}: ImageModalProps) => {
  const [activeIndex, setActiveIndex] = useState(() =>
    photos.length > 0
      ? Math.max(0, Math.min(initialIndex, photos.length - 1))
      : 0,
  );
  const count = photos.length;

  // 모달이 열릴 때마다 initialIndex로 초기화 및 범위 검사
  useEffect(() => {
    if (isOpen && count > 0) {
      const safeIndex = Math.max(0, Math.min(initialIndex, count - 1));
      setActiveIndex(safeIndex);
    }
  }, [isOpen, initialIndex, count]);

  const goPrev = useCallback(
    () => setActiveIndex((i) => (i > 0 ? i - 1 : count - 1)),
    [count],
  );

  const goNext = useCallback(
    () => setActiveIndex((i) => (i < count - 1 ? i + 1 : 0)),
    [count],
  );

  // 키보드 네비게이션
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose, goPrev, goNext]);

  // 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || count === 0) return null;

  return (
    <div
      aria-label='이미지 확대 보기'
      aria-modal='true'
      className='fixed inset-0 z-[100] flex items-center justify-center bg-black/90'
      role='dialog'
      onClick={onClose}
    >
      {/* 닫기 버튼 */}
      <button
        aria-label='닫기'
        className='absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur-sm transition-colors hover:bg-white/20'
        type='button'
        onClick={onClose}
      >
        ✕
      </button>

      {/* 이전 */}
      {count > 1 && (
        <button
          aria-label='이전 이미지'
          className='absolute left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl text-white backdrop-blur-sm transition-colors hover:bg-white/20'
          type='button'
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
        >
          ‹
        </button>
      )}

      {/* 이미지 */}
      <div
        className='relative h-[80vh] w-[90vw] max-w-4xl'
        onClick={(e) => e.stopPropagation()}
      >
        <AuthorizedImage
          fill
          alt={`${altPrefix} ${activeIndex + 1}`}
          className='object-contain'
          sizes='90vw'
          src={photos[activeIndex]}
          unoptimized={photos[activeIndex]?.startsWith('/uploads')}
        />
      </div>

      {/* 다음 */}
      {count > 1 && (
        <button
          aria-label='다음 이미지'
          className='absolute right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl text-white backdrop-blur-sm transition-colors hover:bg-white/20'
          type='button'
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
        >
          ›
        </button>
      )}

      {/* 인디케이터 */}
      {count > 1 && (
        <div className='absolute bottom-6 left-1/2 flex max-w-full -translate-x-1/2 gap-2 overflow-x-auto px-4'>
          {photos.map((src, i) => (
            <button
              // eslint-disable-next-line react/no-array-index-key
              key={`indicator-${i}-${src}`}
              aria-current={i === activeIndex}
              aria-label={`이미지 ${i + 1} 보기`}
              className={`h-2 shrink-0 rounded-full transition-all ${
                i === activeIndex
                  ? 'w-6 bg-white'
                  : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
              type='button'
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(i);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
