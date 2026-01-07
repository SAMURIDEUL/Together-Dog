'use client';

import { PlaceInfoBadge, PlaceInfoBadgeProps } from '@together-dog/ui';

import { Place } from '@/types/place';

// Reuse map function or logic from petMapper but specific for Detail view
// which might show more specific text.
// For now, mirroring the logic to generate badges.

interface PlaceDetailInfoProps {
  place: Place;
}

export const PlaceDetailInfo = ({ place }: PlaceDetailInfoProps) => {
  const { petPolicy } = place;

  const badges: PlaceInfoBadgeProps[] = [];

  // Pet Allowed
  if (petPolicy?.petAllowed) {
    badges.push({ variant: 'orange', text: '반려동물 동반 가능' });
  }

  // Size Limit
  if (petPolicy?.petSizeLimit) {
    // Map backend enum/string to readable text if needed, or display as is
    badges.push({ variant: 'orange', text: petPolicy.petSizeLimit });
  }

  // Indoor/Outdoor
  if (petPolicy?.indoorFlag)
    badges.push({ variant: 'gray', text: '실내 입장 가능' });
  if (petPolicy?.outdoorFlag)
    badges.push({ variant: 'gray', text: '야외 좌석 구비' });

  // Restrictions
  if (petPolicy?.petRestrictions) {
    badges.push({ variant: 'gray', text: petPolicy.petRestrictions });
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(place.roadAddress);
    alert('주소가 복사되었습니다.');
  };

  return (
    <div className='bg-white px-4 py-6'>
      <h2 className='mb-4 text-lg font-bold text-gray-900'>장소 정보</h2>

      <div className='flex flex-col gap-4'>
        {/* Address */}
        <div className='flex items-start gap-3'>
          <span className='w-16 shrink-0 text-gray-500'>주소</span>
          <div className='flex flex-col items-start gap-1'>
            <span className='text-gray-900'>{place.roadAddress}</span>
            <button
              className='text-xs text-gray-400 underline'
              onClick={copyAddress}
            >
              주소 복사
            </button>
          </div>
        </div>

        {/* Phone */}
        <div className='flex items-center gap-3'>
          <span className='w-16 shrink-0 text-gray-500'>전화번호</span>
          <span className='text-gray-900'>{place.phone || '정보 없음'}</span>
        </div>

        {/* Badges */}
        <div className='mt-2 flex flex-wrap gap-2'>
          {badges.map((badge, idx) => (
            <PlaceInfoBadge key={idx} {...badge} />
          ))}
        </div>
      </div>
    </div>
  );
};
