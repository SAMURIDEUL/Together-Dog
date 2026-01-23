import { iconPaths } from '@together-dog/ui';

import restrictionKeywords from '@/assets/data/restriction-keywords.json';

import { RestrictionKeyword } from './types';
import { isRestrictionKeyword } from './validators';

// 안전하게 파싱된 제한사항 키워드 맵 (런타임 검증 및 경고 포함)
const { valid, invalid } = (restrictionKeywords as unknown[]).reduce<{
  valid: RestrictionKeyword[];
  invalid: unknown[];
}>(
  (acc, item) => {
    if (isRestrictionKeyword(item)) {
      acc.valid.push(item);
    } else {
      acc.invalid.push(item);
    }
    return acc;
  },
  { valid: [], invalid: [] },
);

if (invalid.length > 0) {
  console.warn(
    `[RestrictionKeyword] Found ${invalid.length} invalid entries in restriction-keywords.json:`,
    invalid,
  );
}

export const RESTRICTION_KEYWORD_MAP: RestrictionKeyword[] = valid;

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
  'market.png': 'petSupplies.png',
  'travel.png': 'travelSpot.png',
  'literary.png': 'culturalCenter.png',
  'consignment.png': 'entrustedCare.png',
};
