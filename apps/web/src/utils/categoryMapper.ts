import { iconPaths } from '@together-dog/ui';

// Backend ID (number) <-> Frontend Key (string) Mapping
export const CATEGORY_MAP: Record<string, number> = {
  petPharmacy: 1, // 동물약국
  artGallery: 2, // 미술관
  cafe: 3, // 카페
  petHospital: 4, // 동물병원
  petSupplies: 5, // 반려동물용품
  grooming: 6, // 미용
  culturalCenter: 7, // 문예회관
  pension: 8, // 펜션
  restaurant: 9, // 식당
  travelSpot: 10, // 여행지
  entrustedCare: 11, // 위탁관리
  museum: 12, // 박물관
  hotel: 13, // 호텔
};

export const getCategoryId = (key: string): number | undefined => {
  return CATEGORY_MAP[key];
};

export const getCategoryKey = (id: number): string | undefined => {
  return Object.keys(CATEGORY_MAP).find((key) => CATEGORY_MAP[key] === id);
};

// UI Icon Mapping Helper
export const getCategoryIconPath = (
  key: string,
): keyof typeof iconPaths.category => {
  // If the key exists in iconPaths, return it, otherwise default
  if (key in iconPaths.category) {
    return key as keyof typeof iconPaths.category;
  }
  return 'travelSpot';
};
