'use client';

import { PlaceInfoBadge, PlaceInfoBadgeProps } from '@together-dog/ui';

import { Place } from '@/types/place';
// We don't need direct iconPath access if we just use string literals for 'group' and 'name'
// PlaceInfoBadgeProps should be sufficient if it is exported correctly from ui.

interface PlaceDetailInfoProps {
  place: Place;
}

// Helper to generate restriction badges
const getRestrictionBadges = (restrictions: string): PlaceInfoBadgeProps[] => {
  if (!restrictions) return [];

  const badges: PlaceInfoBadgeProps[] = [];
  const text = restrictions;

  if (text.includes('목줄') || text.includes('리드줄')) {
    badges.push({
      group: 'restriction',
      name: 'leash',
      text: '리드줄 착용 안내',
      variant: 'default',
    });
  }
  if (
    text.includes('매너벨트') ||
    text.includes('기저귀') ||
    text.includes('마킹')
  ) {
    badges.push({
      group: 'restriction',
      name: 'diaper',
      text: '매너벨트 착용',
      variant: 'default',
    });
  }
  if (text.includes('입마개')) {
    badges.push({
      group: 'restriction',
      name: 'muzzle',
      text: '입마개 착용',
      variant: 'warning',
    });
  }
  if (
    text.includes('이동장') ||
    text.includes('케이지') ||
    text.includes('가방')
  ) {
    badges.push({
      group: 'restriction',
      name: 'carrier',
      text: '이동장 필수',
      variant: 'default',
    });
  }
  if (text.includes('접종')) {
    badges.push({
      group: 'restriction',
      name: 'vaccination',
      text: '예방접종 증명',
      variant: 'default',
    });
  }
  if (text.includes('맹견')) {
    badges.push({
      group: 'restriction',
      name: 'ban',
      text: '맹견 출입 제한',
      variant: 'warning',
    });
  }

  // If no specific keywords found but text exists, maybe just show a generic warning or info
  // For now, we only extract known categories to keep UI clean.

  return badges;
};

// Helper for Size
const getSizeBadge = (sizeLimit: string): PlaceInfoBadgeProps | null => {
  if (!sizeLimit) return null;

  if (sizeLimit.includes('소형')) {
    return {
      group: 'restriction',
      name: 'sizeS',
      text: '소형견 가능',
      variant: 'positive',
    };
  }
  if (sizeLimit.includes('중형')) {
    return {
      group: 'restriction',
      name: 'sizeM',
      text: '중형견 가능',
      variant: 'positive',
    };
  }
  if (sizeLimit.includes('대형')) {
    return {
      group: 'restriction',
      name: 'sizeL',
      text: '대형견 가능',
      variant: 'positive',
    };
  }
  // Default
  return {
    group: 'restriction',
    name: 'pets',
    text: '반려동물 동반',
    variant: 'positive',
  };
};

export const PlaceDetailInfo = ({ place }: PlaceDetailInfoProps) => {
  const { petPolicy } = place;

  const sizeBadge = petPolicy?.petSizeLimit
    ? getSizeBadge(petPolicy.petSizeLimit)
    : null;

  const amenityBadges: PlaceInfoBadgeProps[] = [];
  if (petPolicy?.indoorFlag) {
    amenityBadges.push({
      group: 'restriction',
      name: 'floor',
      text: '실내 이용 가능',
      variant: 'default',
    });
  }
  if (petPolicy?.outdoorFlag) {
    amenityBadges.push({
      group: 'restriction',
      name: 'terrace',
      text: '야외 이용 가능',
      variant: 'default',
    });
  }

  const restrictionBadges = petPolicy?.petRestrictions
    ? getRestrictionBadges(petPolicy.petRestrictions)
    : [];

  const copyAddress = () => {
    navigator.clipboard.writeText(place.roadAddress);
    alert('주소가 복사되었습니다.');
  };

  return (
    <div className='bg-white px-4 py-6'>
      {/* Section 1: Basic Info */}
      <h2 className='mb-4 text-lg font-bold text-gray-900'>장소 정보</h2>
      <div className='mb-8 flex flex-col gap-4'>
        <div className='flex items-start gap-3'>
          <span className='w-16 shrink-0 text-gray-500'>주소</span>
          <div className='flex flex-row items-center gap-2'>
            <span className='text-gray-900'>{place.roadAddress}</span>
            <button
              className='whitespace-nowrap text-xs text-gray-400 underline'
              onClick={copyAddress}
            >
              주소 복사
            </button>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <span className='w-16 shrink-0 text-gray-500'>전화번호</span>
          <span className='text-gray-900'>{place.phone || '정보 없음'}</span>
        </div>
      </div>

      {/* Section 2: Pet Info & Restrictions */}
      <h2 className='mb-4 text-lg font-bold text-gray-900'>반려동물 안내</h2>

      <div className='flex flex-col gap-6'>
        {/* 1. Size & Amenities */}
        <div>
          <h3 className='mb-2 text-sm font-semibold text-gray-500'>
            입장 가능 정보
          </h3>
          <div className='flex flex-wrap gap-2'>
            {sizeBadge && <PlaceInfoBadge {...sizeBadge} />}
            {amenityBadges.map((badge, idx) => (
              <PlaceInfoBadge key={`amenity-${badge.name}-${idx}`} {...badge} />
            ))}
            {!sizeBadge && amenityBadges.length === 0 && (
              <span className='text-sm text-gray-400'>
                등록된 정보가 없습니다.
              </span>
            )}
          </div>
        </div>

        {/* 2. Restrictions Rules */}
        {/* Show either parsed badges OR raw text if no badges found but text exists */}
        {(restrictionBadges.length > 0 || petPolicy?.petRestrictions) && (
          <div>
            <h3 className='mb-2 text-sm font-semibold text-gray-500'>
              이용 제한 및 안내
            </h3>
            <div className='mb-2 flex flex-wrap gap-2'>
              {restrictionBadges.map((badge, idx) => (
                <PlaceInfoBadge key={`rest-${badge.name}-${idx}`} {...badge} />
              ))}
            </div>
            {/* If we have original text, mostly it's good to show it as detail text below badges for completeness */}
            {petPolicy?.petRestrictions && (
              <p className='rounded-lg bg-gray-50 p-3 text-sm leading-relaxed text-gray-600'>
                {petPolicy.petRestrictions}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
