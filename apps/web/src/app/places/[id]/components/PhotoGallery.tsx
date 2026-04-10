'use client';

import { useState } from 'react';

import { AuthorizedImage } from '@/components/shared/AuthorizedImage';
import { ImageModal } from '@/components/shared/ImageModal';
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

  const closeModal = () => setModalOpen(false);

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
          <AuthorizedImage
            fill
            priority
            alt={placeName}
            className='object-contain'
            sizes='(max-width: 768px) 100vw, 800px'
            src={resolved[0]}
            unoptimized={resolved[0]?.startsWith('/uploads')}
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
              <AuthorizedImage
                fill
                alt={`${placeName} ${i + 1}`}
                className='object-cover'
                priority={i === 0}
                sizes='(max-width: 768px) 50vw, 400px'
                src={src}
                unoptimized={src?.startsWith('/uploads')}
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
            <AuthorizedImage
              fill
              priority
              alt={`${placeName} 1`}
              className='object-cover'
              sizes='(max-width: 768px) 66vw, 600px'
              src={resolved[0]}
              unoptimized={resolved[0]?.startsWith('/uploads')}
            />
          </button>

          {/* 오른쪽 상단 */}
          <button
            className='relative bg-gray-100'
            // eslint-disable-next-line react/jsx-sort-props
            onClick={() => openModal(1)}
            type='button'
          >
            <AuthorizedImage
              fill
              alt={`${placeName} 2`}
              className='object-cover'
              sizes='(max-width: 768px) 33vw, 300px'
              src={resolved[1]}
              unoptimized={resolved[1]?.startsWith('/uploads')}
            />
          </button>

          {/* 오른쪽 하단 */}
          <button
            className='relative bg-gray-100'
            type='button'
            onClick={() => openModal(2)}
          >
            <AuthorizedImage
              fill
              alt={`${placeName} 3`}
              className='object-cover'
              sizes='(max-width: 768px) 33vw, 300px'
              src={resolved[2]}
              unoptimized={resolved[2]?.startsWith('/uploads')}
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
      <ImageModal
        altPrefix={placeName}
        initialIndex={activeIndex}
        isOpen={modalOpen}
        photos={resolved}
        onClose={closeModal}
      />
    </>
  );
};
