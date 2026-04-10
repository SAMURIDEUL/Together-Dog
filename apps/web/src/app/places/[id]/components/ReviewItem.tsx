'use client';

import { useState } from 'react';

import { AuthorizedImage } from '@/components/shared/AuthorizedImage';
import { ImageModal } from '@/components/shared/ImageModal';

// "2025-03-15 00-00-00" 같은 비표준 포맷 → "YYYY-MM-DD" 로 정규화
const normalizeDate = (dateStr?: string): string => {
  if (!dateStr) return new Date().toISOString().split('T')[0];
  const normalized = dateStr.replace(
    /(\d{4}-\d{2}-\d{2})\s(\d{2})-(\d{2})-(\d{2})/,
    '$1T$2:$3:$4',
  );
  const date = new Date(normalized);
  if (!isNaN(date.getTime())) return date.toISOString().split('T')[0];
  // 그냥 앞 10자리만 잘라서 반환 (T 기준 or 공백 기준)
  return dateStr.split('T')[0].split(' ')[0];
};

import { ReviewForm } from './ReviewForm';

interface ReviewItemProps {
  currentUserId?: number;
  onDelete: (id: number) => void;
  placeId: number;
  review: {
    content: string;
    createdAt?: string;
    id: number;
    photoUrls?: string[];
    photos?: any[];
    rating: number;
    userId: number;
    visitDate?: string;
  };
}

export const ReviewItem = ({
  currentUserId,
  onDelete,
  placeId,
  review,
}: ReviewItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerInitialIndex, setViewerInitialIndex] = useState(0);

  if (isEditing) {
    // 사진 데이터를 {id?, photoUrl} 형태로 통일
    const rawPhotos = review.photoUrls || review.photos || [];
    const initialPhotos = rawPhotos.map(
      (photo: any) =>
        typeof photo === 'string'
          ? { photoUrl: photo } // string[] → id 없이 URL만
          : { id: photo.id, photoUrl: photo.photoUrl }, // {id, photoUrl}
    );
    return (
      <div className='border-b border-gray-100 pb-6 last:border-0 last:pb-0'>
        <ReviewForm
          initialData={{
            id: review.id,
            rating: review.rating,
            content: review.content,
            visitDate: normalizeDate(review.visitDate || review.createdAt),
            photos: initialPhotos,
          }}
          placeId={placeId}
          onCancelEdit={() => setIsEditing(false)}
        />
      </div>
    );
  }

  const rawPhotos = review.photoUrls || review.photos || [];
  const reviewPhotos = rawPhotos.map((p: any) =>
    typeof p === 'string' ? p : p.photoUrl,
  );

  return (
    <div className='border-b border-gray-100 pb-6 last:border-0 last:pb-0'>
      <div className='mb-2 flex items-center justify-between'>
        <span className='font-medium text-gray-900'>
          {(() => {
            const authorName =
              (review as any).nickname ??
              (review as any).authorName ??
              (review as any).authorNickname ??
              (review as any).user?.nickname;
            return authorName ? authorName : `사용자 ${review.userId ?? ''}`;
          })()}
        </span>
        <div className='flex items-center gap-2'>
          <span className='text-xs text-gray-400'>
            {review.createdAt?.split('T')[0]}
          </span>
          {/* 본인 리뷰만 수정/삭제 가능 (방어 코드: 둘 다 undefined일 경우 true가 되는 버그 방지 및 백엔드 필드명 변경 대비) */}
          {(() => {
            const authorId =
              review.userId ??
              (review as any).authorId ??
              (review as any).memberId ??
              (review as any).user?.id;
            return (
              currentUserId !== undefined &&
              authorId !== undefined &&
              Number(currentUserId) === Number(authorId)
            );
          })() && (
            <>
              <button
                className='text-xs text-gray-400 hover:text-gray-600'
                type='button'
                onClick={() => setIsEditing(true)}
              >
                수정
              </button>
              <button
                className='text-xs text-red-400 hover:text-red-500'
                type='button'
                onClick={() => onDelete(review.id)}
              >
                삭제
              </button>
            </>
          )}
        </div>
      </div>

      {(() => {
        const safeRating = Math.max(
          0,
          Math.min(5, Math.floor(review.rating || 0)),
        );
        return (
          <div className='mb-2 flex text-sm text-yellow-500'>
            {'★'.repeat(safeRating)}
            {'☆'.repeat(5 - safeRating)}
          </div>
        );
      })()}

      <p className='whitespace-pre-wrap text-sm text-gray-700'>
        {review.content}
      </p>

      {reviewPhotos.length > 0 && (
        <div className='mt-3 flex gap-2 overflow-x-auto'>
          {reviewPhotos.map((photo: string, idx: number) => (
            <button
              // eslint-disable-next-line react/no-array-index-key
              key={`${idx}-${photo}`}
              className='relative h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-lg bg-gray-100 text-left disabled:cursor-auto'
              type='button'
              onClick={() => {
                setViewerInitialIndex(idx);
                setViewerOpen(true);
              }}
            >
              <AuthorizedImage
                fill
                alt='Review photo'
                className='object-cover'
                src={photo}
                unoptimized={photo.startsWith('/uploads')}
              />
            </button>
          ))}
        </div>
      )}

      {/* 이미지 뷰어 모달 */}
      <ImageModal
        altPrefix='Review photo'
        initialIndex={viewerInitialIndex}
        isOpen={viewerOpen}
        photos={reviewPhotos}
        onClose={() => setViewerOpen(false)}
      />
    </div>
  );
};
