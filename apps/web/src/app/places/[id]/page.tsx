'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

import {
  useLikeToggleMutation,
  usePlaceDetailQuery,
} from '@/hooks/queries/usePlaceQuery';
import { useLikedPlaceIdsQuery } from '@/hooks/queries/useUserQuery';
import { useToastStore } from '@/stores/useToastStore';

import { PhotoGallery } from './components/PhotoGallery';
import { PlaceDetailHeader } from './components/PlaceDetailHeader';
import { PlaceDetailInfo } from './components/PlaceDetailInfo';
import { PlaceDetailMap } from './components/PlaceDetailMap';
import { PlaceReviews } from './components/PlaceReviews';

export default function PlaceDetailPage() {
  const params = useParams();
  const idString = Array.isArray(params.id) ? params.id[0] : params.id;
  const placeId = parseInt(idString || '', 10);

  const { data, isLoading: loading, error } = usePlaceDetailQuery(placeId);
  const { data: likedPlaceIds } = useLikedPlaceIdsQuery();
  const { addToast } = useToastStore();

  // 서버 데이터 우선, 없으면 Optimistic UI 상태
  const isServerLiked = likedPlaceIds?.includes(placeId) ?? false;
  const [optimisticLiked, setOptimisticLiked] = useState<boolean | null>(null);
  const isLiked = optimisticLiked !== null ? optimisticLiked : isServerLiked;

  const { mutate: toggleLike, isPending: isLikeToggling } =
    useLikeToggleMutation();

  if (Number.isNaN(placeId) || placeId <= 0) {
    return (
      <div className='flex h-full min-h-[50vh] flex-col items-center justify-center p-6'>
        <p className='text-lg font-semibold text-gray-700'>
          잘못된 접근입니다.
        </p>
        <p className='mt-2 text-sm text-gray-500'>
          장소 정보를 찾을 수 없습니다.
        </p>
      </div>
    );
  }

  const handleLikeToggle = () => {
    if (!data?.placeInfo || isLikeToggling) return;

    const previousState = isLiked;
    setOptimisticLiked(!previousState);

    toggleLike(
      { placeId: data.placeInfo.id, isCurrentlyLiked: previousState },
      {
        onSuccess: () => {
          addToast(
            previousState
              ? '찜 목록에서 제외되었습니다.'
              : '찜 목록에 추가되었습니다.',
            previousState ? 'default' : 'success',
          );
        },
        onError: () => {
          setOptimisticLiked(previousState);
          addToast('요청에 실패했습니다. 다시 시도해주세요.', 'error');
        },
        onSettled: () => {
          setOptimisticLiked(null);
        },
      },
    );
  };

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='h-12 w-12 animate-spin rounded-full border-b-2 border-orange-500' />
      </div>
    );
  }

  if (error || !data || !data.placeInfo) {
    return (
      <div className='flex min-h-screen items-center justify-center text-gray-500'>
        {error ? error.message : '장소를 찾을 수 없습니다.'}
      </div>
    );
  }

  const { placeInfo, top3photos } = data;

  return (
    <div className='pb-safe min-h-screen bg-gray-50'>
      {/* 포토 갤러리 */}
      <PhotoGallery photos={top3photos || []} placeName={placeInfo.name} />

      <PlaceDetailHeader
        isLiked={isLiked}
        place={placeInfo}
        onLikeToggle={handleLikeToggle}
      />

      <PlaceDetailInfo place={placeInfo} />

      <div className='my-2 h-2 bg-gray-100' />

      <PlaceDetailMap place={placeInfo} />

      <div className='my-2 h-2 bg-gray-100' />

      <PlaceReviews placeId={placeInfo.id} />
    </div>
  );
}
