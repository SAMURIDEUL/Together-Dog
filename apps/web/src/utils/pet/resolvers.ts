import { iconPaths } from '@together-dog/ui';

import { CATEGORY_ICON_MAP, THUMBNAIL_MAPPING } from './constants';

// 카테고리 ID를 아이콘 이름으로 매핑
const CATEGORY_ID_ICON_MAP: Record<number, keyof typeof iconPaths.category> = {
  1: 'petPharmacy', // 동물약국
  2: 'artGallery', // 미술관
  3: 'cafe', // 카페
  4: 'petHospital', // 동물병원
  5: 'petSupplies', // 용품
  6: 'grooming', // 미용
  7: 'culturalCenter', // 문화센터
  8: 'pension', // 펜션
  9: 'restaurant', // 식당
  10: 'travelSpot', // 여행지
  11: 'entrustedCare', // 위탁관리
  12: 'museum', // 박물관
  13: 'hotel', // 호텔
};

export const getCategoryIcon = (
  categoryId: number,
  category3: string,
): keyof typeof iconPaths.category => {
  // 1. 우선순위: 카테고리 ID로 조회 (예: 7 -> 문화센터)
  if (CATEGORY_ID_ICON_MAP[categoryId]) {
    return CATEGORY_ID_ICON_MAP[categoryId];
  }

  // 2. 대체 로직: category3 문자열 매칭으로 조회
  if (!category3) return 'travelSpot';

  const match = CATEGORY_ICON_MAP.find((item) =>
    item.keywords.some((keyword) => category3.includes(keyword)),
  );

  return match ? match.icon : 'travelSpot';
};

export const resolveThumbnailPath = (apiPath: string): string => {
  if (!apiPath) return '/images/category/travelSpot.png';

  // 1. /images/default/ 경로를 /images/category/로 변경
  let localPath = apiPath.replace('/images/default/', '/images/category/');

  // 2. 파일명 매핑
  const lastSlashIndex = localPath.lastIndexOf('/');
  const filename = localPath.substring(lastSlashIndex + 1);

  if (THUMBNAIL_MAPPING[filename]) {
    const directory = localPath.substring(0, lastSlashIndex + 1);
    localPath = `${directory}${THUMBNAIL_MAPPING[filename]}`;
  }

  return localPath;
};
