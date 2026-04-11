import { type PlaceInfoCardProps } from '@/components/shared/PlaceInfoCard';

import { RESTRICTION_KEYWORD_MAP } from './constants';

export const parseRestrictionBadges = (
  restrictions: string,
): PlaceInfoCardProps['badges'] => {
  if (!restrictions || restrictions.trim() === '') {
    return [];
  }

  const badges: PlaceInfoCardProps['badges'] = [];

  // 1. 동적 매칭 (특정 값 추출 정규식)

  // 마리 수 제한: "최대 2마리", "2마리", "객실당 1마리" 등
  const countMatch = restrictions.match(/((객실당|팀당)\s*)?(최대\s*)?\d+마리/);
  if (countMatch) {
    badges.push({
      text: countMatch[0],
      group: 'restriction',
      name: 'warning',
      variant: 'warning',
    });
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
      variant: 'warning',
    });
  }

  // 접종 차수: "5차 접종", "3차 예방접종" 등
  const vaccineMatch = restrictions.match(/\d+차\s*(예방)?접종/);
  if (vaccineMatch) {
    badges.push({
      text: vaccineMatch[0],
      group: 'restriction',
      name: 'vaccination',
      variant: 'warning',
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

// --- Helper Function: Pet Size Variant Logic ---
export const determinePetSizeVariant = (
  limitString: string,
): PlaceInfoCardProps['badges'][0]['variant'] => {
  if (!limitString || limitString.trim() === '') return 'default';

  // 1. Absolute Positive (제한 없음 등)
  if (limitString.match(/제한\s*없음|해당\s*없음|모두\s*가능|모두\s*허용/)) {
    return 'positive';
  }

  // 2. Strong Negative (명시적 금지)
  // "대형견 불가", "입질견 금지" 등은 무조건 경고
  if (limitString.match(/(불가|금지|제한|필수|주의|안됨)/)) {
    return 'warning';
  }

  // 3. Conditional Positive (허용/가능)
  // 위에서 '불가'가 걸러졌으므로, 여기서는 "10kg 이상 가능", "소형견 전용" 등 긍정적 의미
  if (limitString.match(/(가능|전용|동반|소형|중형|대형|특수|묘|허용)/)) {
    return 'positive';
  }

  // 4. Size/Age Constraints (단순 제한)
  // "10kg 미만", "10kg 이상" 등 수치 제한만 있는 경우 경고로 처리
  return 'default';
};

export const getPetSizeBadge = (
  sizeLimit: string,
): PlaceInfoCardProps['badges'][number] | null => {
  if (!sizeLimit) return null;

  const variant = determinePetSizeVariant(sizeLimit);
  let name: PlaceInfoCardProps['badges'][number]['name'] = 'pets';

  // 간단한 아이콘 매핑
  if (sizeLimit.includes('소형')) {
    name = 'sizeS';
  } else if (sizeLimit.includes('중형')) {
    name = 'sizeM';
  } else if (sizeLimit.includes('대형')) {
    name = 'sizeL';
  }

  // 텍스트가 "해당없음" 이면 표시 안함? (기획 확인 필요, 일단 기존 로직 따름)
  if (sizeLimit === '해당없음') return null;

  return {
    group: 'restriction',
    name,
    text: sizeLimit,
    variant,
  };
};

export const getAmenityBadges = (
  indoorFlag?: boolean,
  outdoorFlag?: boolean,
  parkingAvailable?: boolean,
): PlaceInfoCardProps['badges'] => {
  const badges: PlaceInfoCardProps['badges'] = [];

  if (indoorFlag) {
    badges.push({
      group: 'restriction',
      name: 'floor',
      text: '실내 이용 가능',
      variant: 'default',
    });
  }
  if (outdoorFlag) {
    badges.push({
      group: 'restriction',
      name: 'terrace',
      text: '야외 이용 가능',
      variant: 'default',
    });
  }

  // 주차 정보 추가 (불리언 필드 기반)
  if (parkingAvailable) {
    badges.push({
      group: 'restriction',
      name: 'warning',
      text: '주차 가능',
      variant: 'positive',
    });
  }

  return badges;
};

interface AddressParts {
  roadAddress?: string | null;
  city?: string | null;
  district?: string | null;
  subdistrict?: string | null;
}

export const formatDisplayAddress = (place: AddressParts): string => {
  const isInvalidAddress =
    !place.roadAddress ||
    place.roadAddress === '\\N' ||
    place.roadAddress === '';

  return isInvalidAddress
    ? [place.city, place.district, place.subdistrict].filter(Boolean).join(' ')
    : place.roadAddress || '';
};
