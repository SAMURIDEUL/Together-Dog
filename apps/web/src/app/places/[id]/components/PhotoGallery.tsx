'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import { resolveThumbnailPath } from '@/utils/petMapper';

interface PhotoGalleryProps {
  photos: string[];
  placeName: string;
}

export const PhotoGallery = ({ photos, placeName }: PhotoGalleryProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const resolved = photos.map(resolveThumbnailPath);
  const count = resolved.length;

  const openModal = (index: number) => {
    setActiveIndex(index);
    setModalOpen(true);
  };

  const closeModal = useCallback(() => setModalOpen(false), []);

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
    if (!modalOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [modalOpen, closeModal, goPrev, goNext]);

  if (count === 0) {
    return (
      <div className='flex aspect-video w-full items-center justify-center bg-gray-200 text-gray-400'>
        이미지 없음
      </div>
    );
  }

  return (
    <>
      {/* ───── 갤러리 레이아웃 ───── */}
      {count === 1 && (
        <button
          className='relative aspect-video w-full bg-gray-100'
          type='button'
          onClick={() => openModal(0)}
        >
          <Image
            fill
            priority
            alt={placeName}
            className='object-contain'
            src={resolved[0]}
          />
        </button>
      )}

      {count === 2 && (
        <div className='grid aspect-[2/1] w-full grid-cols-2 gap-0.5'>
          {resolved.map((src, i) => (
            <button
              key={src}
              className='relative bg-gray-100'
              type='button'
              onClick={() => openModal(i)}
            >
              <Image
                fill
                alt={`${placeName} ${i + 1}`}
                className='object-cover'
                priority={i === 0}
                src={src}
              />
            </button>
          ))}
        </div>
      )}

      {count >= 3 && (
        <div className='grid aspect-[2/1] w-full grid-cols-[2fr_1fr] grid-rows-2 gap-0.5'>
          {/* 왼쪽 큰 이미지 */}
          <button
            className='relative row-span-2 bg-gray-100'
            type='button'
            onClick={() => openModal(0)}
          >
            <Image
              fill
              priority
              alt={`${placeName} 1`}
              className='object-cover'
              src={resolved[0]}
            />
          </button>

          {/* 오른쪽 상단 */}
          <button
            className='relative bg-gray-100'
            type='button'
            onClick={() => openModal(1)}
          >
            <Image
              fill
              alt={`${placeName} 2`}
              className='object-cover'
              src={resolved[1]}
            />
          </button>

          {/* 오른쪽 하단 */}
          <button
            className='relative bg-gray-100'
            type='button'
            onClick={() => openModal(2)}
          >
            <Image
              fill
              alt={`${placeName} 3`}
              className='object-cover'
              src={resolved[2]}
            />
            {count > 3 && (
              <div className='absolute inset-0 flex items-center justify-center bg-black/40 text-lg font-bold text-white'>
                +{count - 3}
              </div>
            )}
          </button>
        </div>
      )}

      {/* ───── 전체화면 모달 ───── */}
      {modalOpen && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/90'
          role='dialog'
          onClick={closeModal}
        >
          {/* 닫기 버튼 */}
          <button
            className='absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur-sm transition-colors hover:bg-white/20'
            type='button'
            onClick={closeModal}
          >
            ✕
          </button>

          {/* 이전 */}
          {count > 1 && (
            <button
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
            <Image
              fill
              alt={`${placeName} ${activeIndex + 1}`}
              className='object-contain'
              sizes='90vw'
              src={resolved[activeIndex]}
            />
          </div>

          {/* 다음 */}
          {count > 1 && (
            <button
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
            <div className='absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2'>
              {resolved.map((src, i) => (
                <button
                  key={`indicator-${src}`}
                  className={`h-2 rounded-full transition-all ${
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
      )}
    </>
  );
};
