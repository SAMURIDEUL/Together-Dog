'use client';

import { useState } from 'react';

import { PlaceInfoCard } from '@/components/shared/PlaceInfoCard';

export default function CardTestPage() {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-8 bg-gray-50 p-8'>
      <h1 className='text-3xl font-bold'>PlaceInfoCard Test</h1>

      <div className='w-[320px]'>
        <PlaceInfoCard
          address='서울시 강남구 테헤란로 123'
          badges={[
            { text: '주차 가능', group: 'general', name: 'parking' },
            {
              text: '입질견 출입 불가',
              group: 'restriction',
              name: 'muzzle',
              variant: 'warning',
            },
            {
              text: '대형견 가능',
              group: 'restriction',
              name: 'sizeL',
              variant: 'positive',
            },
          ]}
          category='cafe'
          categoryLabel='카페'
          id={1}
          imageSrc='https://images.unsplash.com/photo-1712746438534-f0cc699b0b90?q=80&w=2070&auto=format&fit=crop'
          isLike={isLiked}
          name='투게더 카페'
          onLikeClick={() => setIsLiked(!isLiked)}
        />
      </div>
    </div>
  );
}
