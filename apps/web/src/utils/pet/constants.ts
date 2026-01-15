import { iconPaths } from '@together-dog/ui';

import restrictionKeywords from '@/assets/data/restriction-keywords.json';

// 제한사항 키워드 데이터 타입 정의
export interface RestrictionKeyword {
  keyword: string;
  name: keyof typeof iconPaths.restriction;
  label: string;
  variant?: 'default' | 'positive' | 'warning';
}

// 타입 가드 함수
const isRestrictionKeyword = (item: unknown): item is RestrictionKeyword => {
  if (typeof item !== 'object' || item === null) return false;
  const i = item as Record<string, unknown>;

  return (
    typeof i.keyword === 'string' &&
    typeof i.name === 'string' &&
    i.name in iconPaths.restriction &&
    typeof i.label === 'string' &&
    (i.variant === undefined ||
      ['default', 'positive', 'warning'].includes(i.variant as string))
  );
};

// 안전하게 파싱된 제한사항 키워드 맵 (런타임 검증 포함)
export const RESTRICTION_KEYWORD_MAP: RestrictionKeyword[] = (
  restrictionKeywords as unknown[]
).filter(isRestrictionKeyword);

// categoryId/category3를 iconPaths 키로 매핑
export const CATEGORY_ICON_MAP: {
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

export const CATEGORY_IMAGE_MAP: Record<
  keyof typeof iconPaths.category,
  string
> = {
  petHospital: 'petHospital.png',
  petPharmacy: 'petPharmacy.png',
  petSupplies: 'petSupplies.png',
  cafe: 'cafe.png',
  restaurant: 'restaurant.png',
  pension: 'pension.png',
  hotel: 'hotel.png',
  museum: 'museum.png',
  artGallery: 'artGallery.png',
  culturalCenter: 'culturalCenter.png',
  entrustedCare: 'entrustedCare.png',
  grooming: 'grooming.png',
  travelSpot: 'travelSpot.png',
};

export const THUMBNAIL_MAPPING: Record<string, string> = {
  'supplies.png': 'petSupplies.png',
  'art.png': 'artGallery.png',
  'beauty.png': 'grooming.png',
  'pharmacy.png': 'petPharmacy.png',
  'hospital.png': 'petHospital.png',
  'market.png': 'petSupplies.png', // Fallback for market if needed
  'travel.png': 'travelSpot.png',
};
