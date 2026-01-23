import { PlaceInfoBadge } from '@together-dog/ui';

import { Place } from '@/types/place';
import {
  getAmenityBadges,
  getPetSizeBadge,
  parseRestrictionBadges,
} from '@/utils/pet/parsers';

import { BasicInfoSection } from './BasicInfoSection';

interface PlaceDetailInfoProps {
  place: Place;
}

export const PlaceDetailInfo = ({ place }: PlaceDetailInfoProps) => {
  const { petPolicy } = place;

  const sizeBadge = petPolicy?.petSizeLimit
    ? getPetSizeBadge(petPolicy.petSizeLimit)
    : null;

  const amenityBadges = getAmenityBadges(
    petPolicy?.indoorFlag,
    petPolicy?.outdoorFlag,
  );

  const restrictionBadges = petPolicy?.petRestrictions
    ? parseRestrictionBadges(petPolicy.petRestrictions) // Using shared parser
    : [];

  return (
    <div className='bg-white px-4 py-6'>
      <BasicInfoSection place={place} />

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
            {amenityBadges.map((badge) => (
              <PlaceInfoBadge key={`amenity-${badge.name}`} {...badge} />
            ))}
            {!sizeBadge && amenityBadges.length === 0 && (
              <span className='text-sm text-gray-400'>
                등록된 정보가 없습니다.
              </span>
            )}
          </div>
        </div>

        {/* 2. 이용 제한 및 안내 */}
        {/* 키워드 배지 또는 원본 텍스트 표시 */}
        {(restrictionBadges.length > 0 || petPolicy?.petRestrictions) && (
          <div>
            <h3 className='mb-2 text-sm font-semibold text-gray-500'>
              이용 제한 및 안내
            </h3>
            <div className='mb-2 flex flex-wrap gap-2'>
              {restrictionBadges.map((badge) => (
                <PlaceInfoBadge key={`rest-${badge.name}`} {...badge} />
              ))}
            </div>
            {/* 텍스트가 있으면 배지 아래에 상세 설명으로 노출 */}
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
