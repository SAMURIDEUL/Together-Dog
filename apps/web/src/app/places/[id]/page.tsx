'use client';

import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { likePlace, unlikePlace } from '@/api/place';
import { usePlaceDetailQuery } from '@/hooks/queries/usePlaceQuery';
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

  // Optimistic UI update를 위한 로컬 상태 유지
  const [isLiked, setIsLiked] = useState(false);

  // 데이터가 로드되거나 변경될 때마다 로컬 상태 동기화
  useEffect(() => {
    if (data?.placeInfo) {
      setIsLiked(!!data.placeInfo.isLiked);
    }
  }, [data?.placeInfo?.isLiked, data?.placeInfo]);

  const queryClient = useQueryClient();

  const handleLikeToggle = async () => {
    if (!data || !data.placeInfo) return;

    // Optimistic UI update
    const previousState = isLiked;
    setIsLiked(!previousState);

    try {
      if (previousState) {
        await unlikePlace(data.placeInfo.id);
      } else {
        await likePlace(data.placeInfo.id);
      }

      // 장소 상세 정보 캐시 무효화 (해당 장소) 및 찜 목록 무효화
      queryClient.invalidateQueries({
        queryKey: ['places', 'detail', data.placeInfo.id],
      });
      queryClient.invalidateQueries({ queryKey: ['user', 'likedPlaces'] });
    } catch (error) {
      console.error('Failed to toggle like:', error);
      // Revert on error
      setIsLiked(previousState);
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
