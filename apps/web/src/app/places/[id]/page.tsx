'use client';

import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import { likePlace, unlikePlace } from '@/api/place';
import { usePlaceDetailQuery } from '@/hooks/queries/usePlaceQuery';
import { useLikedPlaceIdsQuery } from '@/hooks/queries/useUserQuery';
import { useToastStore } from '@/stores/useToastStore';
import { resolveThumbnailPath } from '@/utils/petMapper';

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

  // 서버 데이터 우선, 없으면 Optimistic UI 상태
  const isServerLiked = likedPlaceIds?.includes(placeId) ?? false;
  const [optimisticLiked, setOptimisticLiked] = useState<boolean | null>(null);

  const isLiked = optimisticLiked !== null ? optimisticLiked : isServerLiked;

  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  const handleLikeToggle = async () => {
    if (!data || !data.placeInfo) return;

    // Optimistic UI update
    const previousState = isLiked;
    setOptimisticLiked(!previousState);

    try {
      if (previousState) {
        await unlikePlace(data.placeInfo.id);
        addToast('찜 목록에서 제외되었습니다.', 'default');
      } else {
        await likePlace(data.placeInfo.id);
        addToast('찜 목록에 추가되었습니다.', 'success');
      }
    } catch (error) {
      console.error('Failed to toggle like:', error);
      // Revert on error
      setOptimisticLiked(previousState);
      addToast('요청에 실패했습니다. 다시 시도해주세요.', 'error');
      return;
    }

    try {
      // 장소 상세 정보 캐시 무효화 (해당 장소) 및 찜 목록 아이디 캐시 무효화
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['user', 'likedPlaceIds'] }),
        queryClient.invalidateQueries({ queryKey: ['user', 'likedPlaces'] }),
        queryClient.invalidateQueries({
          queryKey: ['places', 'detail', data.placeInfo.id],
        }),
      ]);
    } catch (refetchError) {
      console.error('Failed to refetch queries:', refetchError);
    } finally {
      // 실제 API 데이터 페칭 완료(또는 에러) 후에 Optimistic 상태 해제 (Blink 방지)
      setOptimisticLiked(null);
    }
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
      {/* Hero / Gallery */}
      {top3photos && top3photos.length > 0 ? (
        <div className='relative aspect-video w-full bg-gray-50'>
          <Image
            fill
            priority
            alt={placeInfo.name}
            className='object-contain'
            src={resolveThumbnailPath(top3photos[0])}
          />
        </div>
      ) : (
        <div className='relative flex aspect-video w-full items-center justify-center bg-gray-200 text-gray-400'>
          이미지 없음
        </div>
      )}

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
