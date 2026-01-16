import { type PlaceInfoCardProps } from '@/components/shared/PlaceInfoCard';
import { type Place } from '@/types/place';

import { CATEGORY_IMAGE_MAP } from './pet/constants';
import { determinePetSizeVariant, parseRestrictionBadges } from './pet/parsers';
import { getCategoryIcon } from './pet/resolvers';

// Re-export specific helpers if needed elsewhere (optional)
export { resolveThumbnailPath } from './pet/resolvers';

export const mapPlaceToCardProps = (
  place: Place,
  _index: number,
): PlaceInfoCardProps => {
  const badges: PlaceInfoCardProps['badges'] = [];
  // 0. petPolicy가 없는 경우 방어 코드
  if (!place.petPolicy) {
    return {
      imageSrc: '/images/category/travelSpot.png',
      category: 'travelSpot',
      categoryLabel: place.category3 || '기타',
      name: place.name,
      address: place.roadAddress || place.city || '',
      badges: [],
      isLike: false,
    };
  }

  // 1. 명시적 플래그 매핑 (우선순위 높음)
  if (place.petPolicy.indoorFlag) {
    badges.push({
      text: '실내 동반',
      group: 'category',
      name: 'pension',
      variant: 'positive',
    });
  }

  if (place.petPolicy.outdoorFlag) {
    badges.push({
      text: '야외 동반',
      group: 'restriction',
      name: 'terrace',
      variant: 'positive',
    });
  }

  if (
    place.petPolicy.petSizeLimit &&
    place.petPolicy.petSizeLimit !== '해당없음'
  ) {
    // "가능" 또는 "모두" 포함 시 긍정, "미만/이하/제한" 등은 경고, "소형/중형" 등은 긍정(허용)으로 간주
    const variant = determinePetSizeVariant(place.petPolicy.petSizeLimit);

    badges.push({
      text: place.petPolicy.petSizeLimit,
      group: 'restriction',
      name: 'pets',
      variant,
    });
  }

  // 2. petRestrictions 키워드 파싱 및 매핑 (동적)
  if (place.petPolicy.petRestrictions) {
    const restrictionBadges = parseRestrictionBadges(
      place.petPolicy.petRestrictions,
    );

    // 필요한 경우 기존 배지와 중복 제거 (단순 텍스트 확인)
    restrictionBadges.forEach((rb) => {
      const isDuplicate = badges.some(
        (b) => b.text === rb.text && b.group === rb.group && b.name === rb.name,
      );
      if (!isDuplicate) {
        badges.push(rb);
      }
    });
  }

  // 배지 key 고유값 보장
  const badgesWithKeys = badges.map((badge, idx) => ({ ...badge, key: idx }));

  // 카테고리 매퍼 사용
  const categoryKey = getCategoryIcon(place.categoryId, place.category3);

  // 이미지 매핑
  const imageFilename = CATEGORY_IMAGE_MAP[categoryKey] || 'travelSpot.png';

  return {
    id: place.id,
    imageSrc: `/images/category/${imageFilename}`,
    category: categoryKey,
    categoryLabel: place.category3 || '기타',
    name: place.name,
    address: place.roadAddress || place.city || '',
    badges: badgesWithKeys,
    isLike: false,
  };
};
