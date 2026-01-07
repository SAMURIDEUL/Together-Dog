'use client';

import Image from 'next/image';
// PageProps interface removed as we use useParams hook
// Since params is now a Promise in newer Next.js versions (though this seems like Next 13/14 stable syntax depending on version)
// For safety with 'use client' page interacting with params, we might need to be careful.
// But typically for pages, params are passed as props.
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getPlaceDetail } from '@/api/place';
import { PlaceDetail } from '@/types/place';

import { PlaceDetailHeader } from './components/PlaceDetailHeader';
import { PlaceDetailInfo } from './components/PlaceDetailInfo';
import { PlaceReviews } from './components/PlaceReviews';

export default function PlaceDetailPage() {
  const params = useParams();
  const [data, setData] = useState<PlaceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const idString = Array.isArray(params.id) ? params.id[0] : params.id;
        if (!idString) return;

        const placeId = parseInt(idString, 10);
        if (isNaN(placeId)) throw new Error('Invalid Place ID');

        const result = await getPlaceDetail(placeId);
        setData(result);
      } catch (err) {
        console.error(err);
        setError('장소 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [params.id]);

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='h-12 w-12 animate-spin rounded-full border-b-2 border-orange-500' />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className='flex min-h-screen items-center justify-center text-gray-500'>
        {error || '장소를 찾을 수 없습니다.'}
      </div>
    );
  }

  const { placeInfo, top3photos } = data;

  return (
    <div className='pb-safe min-h-screen bg-gray-50'>
      {/* Hero / Gallery */}
      {top3photos && top3photos.length > 0 ? (
        <div className='relative aspect-video w-full bg-gray-200'>
          <Image
            fill
            priority
            alt={placeInfo.name}
            className='object-cover'
            src={top3photos[0].replace('/images/default/', '/images/category/')}
          />
          {/* Overlay count or dots could go here */}
        </div>
      ) : (
        <div className='relative flex aspect-video w-full items-center justify-center bg-gray-200 text-gray-400'>
          이미지 없음
        </div>
      )}

      <PlaceDetailHeader place={placeInfo} />

      <div className='mt-2 px-4 text-xs text-gray-400'>
        {/* Debug/Divider */}
      </div>

      <PlaceDetailInfo place={placeInfo} />

      <div className='my-2 h-2 bg-gray-100' />

      <PlaceReviews placeId={placeInfo.id} />
    </div>
  );
}
