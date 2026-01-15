import { iconPaths } from '@together-dog/ui';

import { CATEGORY_ICON_MAP, THUMBNAIL_MAPPING } from './constants';

export const getCategoryIcon = (
  _categoryId: number,
  category3: string,
): keyof typeof iconPaths.category => {
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
