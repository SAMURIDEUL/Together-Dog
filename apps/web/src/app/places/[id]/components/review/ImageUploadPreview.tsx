'use client';

import Image from 'next/image';
import { RefObject } from 'react';

interface ImageUploadPreviewProps {
  images: File[];
  previews: string[];
  totalCount?: number;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onAdd: (files: File[]) => void;
  onRemove: (index: number) => void;
}

export const ImageUploadPreview = ({
  images,
  previews,
  totalCount,
  fileInputRef,
  onAdd,
  onRemove,
}: ImageUploadPreviewProps) => {
  const displayCount = totalCount ?? images.length;
  return (
    <div className='mb-5'>
      <p className='mb-1.5 text-sm font-medium text-gray-600'>
        사진 ({displayCount}/3)
      </p>
      <div className='flex gap-2'>
        {previews.map((preview, idx) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`preview-${idx}-${preview}`}
            className='group relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100'
          >
            <Image
              fill
              alt={`미리보기 ${idx + 1}`}
              className='object-cover'
              src={preview}
              unoptimized={
                preview.startsWith('/uploads') ||
                preview.startsWith('http') ||
                preview.startsWith('blob:')
              }
            />
            <button
              aria-label={`사진 ${idx + 1} 삭제`}
              className='absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-xs text-white opacity-100 transition-opacity focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100'
              type='button'
              onClick={() => onRemove(idx)}
            >
              ✕
            </button>
          </div>
        ))}
        {displayCount < 3 && (
          <button
            aria-label='사진 추가'
            className='flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 text-gray-400 hover:border-orange-300 hover:text-orange-500'
            type='button'
            onClick={() => fileInputRef.current?.click()}
          >
            📷
          </button>
        )}
      </div>
      <input
        ref={fileInputRef}
        multiple
        accept='image/*'
        className='hidden'
        type='file'
        onChange={(e) => {
          onAdd(Array.from(e.target.files || []));
          e.target.value = '';
        }}
      />
    </div>
  );
};
