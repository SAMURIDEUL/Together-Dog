import { iconPaths } from '@together-dog/ui';

import restrictionKeywords from '@/assets/data/restriction-keywords.json';
import { RANDOM_IMAGES } from '@/components/landing/RecommendSection/mock';
import { type PlaceInfoCardProps } from '@/components/shared/PlaceInfoCard';
import { type Place } from '@/types/place';

// 제한사항 키워드 매핑 설정
const RESTRICTION_KEYWORD_MAP = restrictionKeywords as {
  keyword: string;
  name: keyof typeof iconPaths.restriction;
  label: string;
  variant?: 'default' | 'positive' | 'warning';
}[];

export const parseRestrictionBadges = (
  restrictions: string,
): PlaceInfoCardProps['badges'] => {
  const badges: PlaceInfoCardProps['badges'] = [];

  // 1. 동적 매칭 (특정 값 추출 정규식)

  // 마리 수 제한: "최대 2마리", "2마리", "객실당 1마리" 등
  const countMatch = restrictions.match(/((객실당|팀당)\s*)?(최대\s*)?\d+마리/);
  if (countMatch) {
    badges.push({ text: countMatch[0], group: 'restriction', name: 'warning' });
  }

  // 무게 제한: "15kg 미만", "10kg", "8~15kg" 등
  const weightMatch = restrictions.match(
    /(\d+(\.\d+)?\s*(~|-|부터)\s*)?\d+(\.\d+)?kg(\s*(미만|이하|이상|초과))?/,
  );
  if (weightMatch) {
    badges.push({
      text: weightMatch[0],
      group: 'restriction',
      name: 'warning',
    });
  }

  // 접종 차수: "5차 접종", "3차 예방접종" 등
  const vaccineMatch = restrictions.match(/\d+차\s*(예방)?접종/);
  if (vaccineMatch) {
    badges.push({
      text: vaccineMatch[0],
      group: 'restriction',
      name: 'vaccination',
    });
  }

  // 2. 정적 키워드 매핑
  RESTRICTION_KEYWORD_MAP.forEach(({ keyword, name, label, variant }) => {
    // 동적 매칭으로 이미 처리된 경우 정적 매핑 건너뛰기
    if (keyword === '마리' && countMatch) return;
    if (keyword === 'kg' && weightMatch) return;
    if (keyword === '접종' && vaccineMatch) return;

    if (restrictions.includes(keyword)) {
      // 아이콘이 같더라도 라벨이 다르면 허용 (예: 노령견 주의, 공격성 제한 모두 warning 아이콘 사용)
      const exists = badges.some(
        (b) => b.text === label && b.group === 'restriction',
      );
      if (!exists) {
        badges.push({ text: label, group: 'restriction', name, variant });
      }
    }
  });

  return badges;
};

// --- 추가 장소 매핑 로직 ---// categoryId/category3를 iconPaths 키로 매핑
const CATEGORY_ICON_MAP: {
  keywords: string[];
  icon: keyof typeof iconPaths.category;
}[] = [
  { keywords: ['동물병원', '병원'], icon: 'petHospital' },
  { keywords: ['약국'], icon: 'petPharmacy' },
  { keywords: ['용품', '샵'], icon: 'petSupplies' },
  { keywords: ['카페', '베이커리'], icon: 'cafe' },
  { keywords: ['식당', '음식점', '요리'], icon: 'restaurant' },
  { keywords: ['펜션', '숙소', '민박'], icon: 'pension' },
  { keywords: ['호텔', '리조트'], icon: 'hotel' },
  { keywords: ['박물관'], icon: 'museum' },
  { keywords: ['미술관', '갤러리'], icon: 'artGallery' },
  { keywords: ['문화', '센터', '체험'], icon: 'culturalCenter' },
  { keywords: ['유치원', '위탁', '돌봄'], icon: 'entrustedCare' },
  { keywords: ['미용'], icon: 'grooming' },
  { keywords: ['운동장', '공원', '여행'], icon: 'travelSpot' },
];

// --- 추가 장소 매핑 로직 ---// categoryId/category3를 iconPaths 키로 매핑
export const getCategoryIcon = (
  _categoryId: number,
  category3: string,
): keyof typeof iconPaths.category => {
  const match = CATEGORY_ICON_MAP.find((item) =>
    item.keywords.some((keyword) => category3.includes(keyword)),
  );

  return match ? match.icon : 'travelSpot';
};

// --- Helper Function: Pet Size Variant Logic ---
export const determinePetSizeVariant = (
  limitString: string,
): PlaceInfoCardProps['badges'][0]['variant'] => {
  if (limitString.match(/제한\s*없음|해당\s*없음|모두\s*가능|모두\s*허용/)) {
    return 'positive';
  }
  if (limitString.match(/(미만|이하|제한|불가|금지|초과|필수|주의|이상)/)) {
    return 'warning';
  }
  if (limitString.match(/(가능|전용|동반|소형|중형|대형|특수|묘|허용)/)) {
    return 'positive';
  }
  return 'default';
};

export const mapPlaceToCardProps = (
  place: Place,
  _index: number,
): PlaceInfoCardProps => {
  const badges: PlaceInfoCardProps['badges'] = [];

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
      group: 'general',
      name: 'map',
      variant: 'positive',
    });
  }
  if (
    place.petPolicy.petSizeLimit &&
    place.petPolicy.petSizeLimit !== '해당없음'
  ) {
    // 동적 파서가 "10kg"를 찾아내면 중복될 수 있음.
    // 하지만 이 컬럼은 명시적인 데이터임.
    // 동적 파서가 무게 제한을 찾았는지 확인하고 건너뛸 수도 있겠지만,
    // 일단은 명시적 데이터가 보통 우선하거나 보완하므로 유지함.

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
      const isDuplicate = badges.some((b) => b.text === rb.text); // Strict text match
      if (!isDuplicate) {
        badges.push(rb);
      }
    });
  }

  // 배지 key 고유값 보장
  const badgesWithKeys = badges.map((badge, idx) => ({ ...badge, key: idx }));

  // 카테고리 매퍼 사용
  const categoryKey = getCategoryIcon(place.categoryId, place.category3);

  return {
    imageSrc:
      RANDOM_IMAGES[place.id % RANDOM_IMAGES.length] || RANDOM_IMAGES[0],
    category: categoryKey,
    categoryLabel: place.category3,
    name: place.name,
    address: place.roadAddress || place.city || '',
    badges: badgesWithKeys,
    isLike: false,
  };
};
