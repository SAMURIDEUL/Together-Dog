import { iconPaths } from '@together-dog/ui';

import { RestrictionKeyword } from './types';

// 타입 가드 함수
export const isRestrictionKeyword = (
  item: unknown,
): item is RestrictionKeyword => {
  if (typeof item !== 'object' || item === null) return false;
  const i = item as Record<string, unknown>;

  return (
    typeof i.keyword === 'string' &&
    typeof i.name === 'string' &&
    i.name in iconPaths.restriction &&
    typeof i.label === 'string' &&
    (i.variant === undefined ||
      (typeof i.variant === 'string' &&
        ['default', 'positive', 'warning'].includes(i.variant)))
  );
};
