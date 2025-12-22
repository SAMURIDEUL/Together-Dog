import { iconPaths } from '@together-dog/ui';

import { RANDOM_IMAGES } from '@/components/landing/RecommendSection/mock';
import { type PlaceInfoCardProps } from '@/components/shared/PlaceInfoCard';
import { type Place } from '@/types/place';

// 제한사항 키워드 매핑 설정
const RESTRICTION_KEYWORD_MAP: {
  keyword: string;
  name: keyof typeof iconPaths.restriction;
  label: string;
  variant?: 'default' | 'positive' | 'warning';
}[] = [
  // 안전 및 통제
  // 견종 및 접근 제한
  {
    keyword: '견종',
    name: 'speciesMulti',
    label: '견종 제한',
    variant: 'warning',
  },
  {
    keyword: '진도',
    name: 'speciesMulti',
    label: '특정견종 제한',
    variant: 'warning',
  },
  {
    keyword: '시바',
    name: 'speciesMulti',
    label: '특정견종 제한',
    variant: 'warning',
  },
  {
    keyword: '웰시',
    name: 'speciesMulti',
    label: '특정견종 제한',
    variant: 'warning',
  },
  {
    keyword: '혼종',
    name: 'speciesMulti',
    label: '믹스견 제한',
    variant: 'warning',
  },
  {
    keyword: '믹스',
    name: 'speciesMulti',
    label: '믹스견 제한',
    variant: 'warning',
  },
  {
    keyword: '닥스훈트',
    name: 'speciesMulti',
    label: '특정견종 제한',
    variant: 'warning',
  },
  {
    keyword: '미니핀',
    name: 'speciesMulti',
    label: '특정견종 제한',
    variant: 'warning',
  },
  {
    keyword: '코카',
    name: 'speciesMulti',
    label: '특정견종 제한',
    variant: 'warning',
  },
  {
    keyword: '비글',
    name: 'speciesMulti',
    label: '특정견종 제한',
    variant: 'warning',
  },
  {
    keyword: '불독',
    name: 'speciesMulti',
    label: '특정견종 제한',
    variant: 'warning',
  },
  {
    keyword: '불리',
    name: 'speciesMulti',
    label: '특정견종 제한',
    variant: 'warning',
  },
  {
    keyword: '리트리버',
    name: 'speciesMulti',
    label: '특정견종 제한',
    variant: 'warning',
  },
  {
    keyword: '스피츠',
    name: 'speciesMulti',
    label: '특정견종 제한',
    variant: 'warning',
  },
  {
    keyword: '치와와',
    name: 'speciesMulti',
    label: '특정견종 제한',
    variant: 'warning',
  },
  {
    keyword: '말티즈',
    name: 'speciesMulti',
    label: '특정견종 제한',
    variant: 'warning',
  },
  {
    keyword: '요크셔',
    name: 'speciesMulti',
    label: '특정견종 제한',
    variant: 'warning',
  },
  {
    keyword: '비숑',
    name: 'speciesMulti',
    label: '특정견종 제한',
    variant: 'warning',
  },
  {
    keyword: '시츄',
    name: 'speciesMulti',
    label: '특정견종 제한',
    variant: 'warning',
  },
  {
    keyword: '포메',
    name: 'speciesMulti',
    label: '특정견종 제한',
    variant: 'warning',
  },
  {
    keyword: '풍산개',
    name: 'speciesMulti',
    label: '특정견종 제한',
    variant: 'warning',
  },
  {
    keyword: '차우차우',
    name: 'speciesMulti',
    label: '특정견종 제한',
    variant: 'warning',
  },
  {
    keyword: '도베르만',
    name: 'speciesMulti',
    label: '특정견종 제한',
    variant: 'warning',
  },
  {
    keyword: '테리어',
    name: 'speciesMulti',
    label: '특정견종 제한',
    variant: 'warning',
  },
  {
    keyword: '푸들',
    name: 'speciesMulti',
    label: '특정견종 제한',
    variant: 'warning',
  },

  // 크기 및 나이
  {
    keyword: '대형견 불가',
    name: 'sizeS',
    label: '대형견 불가',
    variant: 'warning',
  },
  { keyword: '대형견', name: 'sizeL', label: '대형견 관련' },
  {
    keyword: '소형견',
    name: 'sizeS',
    label: '소형견 전용',
    variant: 'positive',
  },
  {
    keyword: '중형견',
    name: 'sizeM',
    label: '중형견 가능',
    variant: 'positive',
  },
  { keyword: 'kg', name: 'warning', label: '무게 제한', variant: 'warning' },
  {
    keyword: '노령견',
    name: 'warning',
    label: '노령견 주의',
    variant: 'warning',
  },
  {
    keyword: '노견',
    name: 'warning',
    label: '노령견 주의',
    variant: 'warning',
  },
  { keyword: '나이', name: 'warning', label: '나이 제한', variant: 'warning' },
  {
    keyword: '살 이상',
    name: 'warning',
    label: '나이 제한',
    variant: 'warning',
  },
  { keyword: '개월', name: 'warning', label: '월령 제한', variant: 'warning' },
  {
    keyword: '실내견',
    name: 'sizeS',
    label: '실내견 전용',
    variant: 'positive',
  },

  // 용품, 이동수단
  { keyword: '목줄', name: 'leash', label: '목줄 착용', variant: 'warning' },
  {
    keyword: '리드줄',
    name: 'leash',
    label: '리드줄 착용',
    variant: 'warning',
  },
  {
    keyword: '하네스',
    name: 'leash',
    label: '하네스 착용',
    variant: 'warning',
  },
  {
    keyword: '입마개',
    name: 'muzzle',
    label: '입마개 필수',
    variant: 'warning',
  },
  { keyword: '케이지', name: 'carrier', label: '케이지' },
  { keyword: '이동장', name: 'carrier', label: '이동장' },
  { keyword: '유모차', name: 'stroller', label: '유모차' },
  { keyword: '개모차', name: 'stroller', label: '유모차' },
  {
    keyword: '카트',
    name: 'stroller',
    label: '카트 이용',
    variant: 'positive',
  },
  { keyword: '가방', name: 'carrier', label: '이동가방' },
  { keyword: '백팩', name: 'carrier', label: '백팩' },
  { keyword: '캔넬', name: 'carrier', label: '캔넬' },
  { keyword: '안기', name: 'carrier', label: '안기 필수', variant: 'warning' },
  { keyword: '안고', name: 'carrier', label: '안기 필수', variant: 'warning' },
  { keyword: '안아', name: 'carrier', label: '안기 필수', variant: 'warning' },
  { keyword: '안거', name: 'carrier', label: '안기 필수', variant: 'warning' },

  // 위생 및 준비
  { keyword: '배변봉투', name: 'poopBag', label: '배변봉투' },
  { keyword: '매너벨트', name: 'diaper', label: '매너벨트' },
  { keyword: '기저귀', name: 'diaper', label: '매너벨트' },
  {
    keyword: '패드',
    name: 'cleaning',
    label: '배변패드 지참',
    variant: 'warning',
  },
  {
    keyword: '마킹',
    name: 'noMarking',
    label: '마킹 주의',
    variant: 'warning',
  },
  { keyword: '용품', name: 'cleaning', label: '용품 지참', variant: 'warning' },
  {
    keyword: '개별준비',
    name: 'cleaning',
    label: '용품 지참',
    variant: 'warning',
  },
  { keyword: '지참', name: 'cleaning', label: '용품 지참', variant: 'warning' },
  { keyword: '침구', name: 'cleaning', label: '침구 지참', variant: 'warning' },

  // 건강 및 법적사항
  {
    keyword: '중성화',
    name: 'warning',
    label: '중성화 필수',
    variant: 'warning',
  },
  {
    keyword: '생리',
    name: 'warning',
    label: '생리중 불가',
    variant: 'warning',
  },
  {
    keyword: '발정기',
    name: 'warning',
    label: '생리중 불가',
    variant: 'warning',
  },
  {
    keyword: '임신',
    name: 'warning',
    label: '임신견 불가',
    variant: 'warning',
  },
  {
    keyword: '질환',
    name: 'warning',
    label: '전염병 제한',
    variant: 'warning',
  },
  {
    keyword: '털빠짐',
    name: 'cleaning',
    label: '털빠짐 주의',
    variant: 'warning',
  },
  {
    keyword: '접종',
    name: 'vaccination',
    label: '접종 필수',
    variant: 'warning',
  },
  { keyword: '서약서', name: 'document', label: '서약서', variant: 'warning' },
  { keyword: '등록', name: 'document', label: '등록 필수', variant: 'warning' },
  { keyword: '신분증', name: 'document', label: '신분증', variant: 'warning' },

  // 행동 및 성향
  {
    keyword: '공격성',
    name: 'warning',
    label: '공격성 제한',
    variant: 'warning',
  },
  { keyword: '입질', name: 'warning', label: '입질 제한', variant: 'warning' },
  { keyword: '물지', name: 'warning', label: '입질 제한', variant: 'warning' },
  { keyword: '짖음', name: 'bark', label: '짖음 주의', variant: 'warning' },
  {
    keyword: '분리불안',
    name: 'warning',
    label: '분리불안 주의',
    variant: 'warning',
  },
  {
    keyword: '마운팅',
    name: 'warning',
    label: '마운팅 주의',
    variant: 'warning',
  },
  {
    keyword: '사회화',
    name: 'warning',
    label: '사회화 필수',
    variant: 'warning',
  },
  { keyword: '엉킴', name: 'warning', label: '엉킴 주의', variant: 'warning' },
  { keyword: '노키즈', name: 'warning', label: '노키즈존', variant: 'warning' },

  // 장소 및 출입
  {
    keyword: '테라스',
    name: 'terrace',
    label: '테라스 이용',
    variant: 'positive',
  },
  {
    keyword: '루프탑',
    name: 'terrace',
    label: '루프탑 이용',
    variant: 'positive',
  },
  { keyword: '1층', name: 'floor', label: '1층만 가능', variant: 'positive' },
  {
    keyword: '2층',
    name: 'noEntry',
    label: '2층 출입 불가',
    variant: 'warning',
  },
  { keyword: '야외', name: 'terrace', label: '야외 공간', variant: 'positive' },
  { keyword: '실외', name: 'terrace', label: '야외 공간', variant: 'positive' },
  { keyword: '외부', name: 'terrace', label: '야외 공간', variant: 'positive' },
  { keyword: '마당', name: 'terrace', label: '마당 이용', variant: 'positive' },
  {
    keyword: '놀이터',
    name: 'terrace',
    label: '놀이터 이용',
    variant: 'positive',
  },
  {
    keyword: '실내',
    name: 'noEntry',
    label: '실내 이용 제한',
    variant: 'warning',
  },
  {
    keyword: '고양이 불가',
    name: 'noCats',
    label: '고양이 불가',
    variant: 'warning',
  },
  {
    keyword: '고양이 전용',
    name: 'catsOnly',
    label: '고양이 전용',
    variant: 'positive',
  },
  {
    keyword: '강아지 전용',
    name: 'dogsOnly',
    label: '반려견 전용',
    variant: 'positive',
  },
  { keyword: '맹견', name: 'ban', label: '맹견 불가', variant: 'warning' },
  {
    keyword: '입장 불가',
    name: 'noEntry',
    label: '입장 제한',
    variant: 'warning',
  },
  {
    keyword: '출입 불가',
    name: 'noEntry',
    label: '출입 제한',
    variant: 'warning',
  },
  {
    keyword: '수영장',
    name: 'warning',
    label: '수영장 제한',
    variant: 'warning',
  },
  {
    keyword: '샤워',
    name: 'warning',
    label: '샤워실 제한',
    variant: 'warning',
  },
  { keyword: '독채', name: 'terrace', label: '독채 이용', variant: 'positive' },
  {
    keyword: '미용',
    name: 'warning',
    label: '미용 제한사항',
    variant: 'warning',
  },

  // 기타 & 추가 항목
  { keyword: '예약', name: 'document', label: '사전 예약', variant: 'warning' },
  { keyword: '상담', name: 'document', label: '사전 문의', variant: 'warning' },
  {
    keyword: '예치금',
    name: 'warning',
    label: '보증금 있음',
    variant: 'warning',
  },
  {
    keyword: '평일',
    name: 'warning',
    label: '평일만 가능',
    variant: 'positive',
  },
  { keyword: '주말', name: 'warning', label: '주말 제한', variant: 'warning' },
  { keyword: '요일', name: 'warning', label: '요일 제한', variant: 'warning' },
  {
    keyword: '공휴일',
    name: 'warning',
    label: '공휴일 제한',
    variant: 'warning',
  },
  {
    keyword: '피부병',
    name: 'warning',
    label: '피부병 제한',
    variant: 'warning',
  },

  // 특수동물 및 기타 종
  {
    keyword: '특수동물',
    name: 'speciesMulti',
    label: '특수동물 동반',
    variant: 'positive',
  },
  {
    keyword: '설치류',
    name: 'speciesMulti',
    label: '설치류 동반',
    variant: 'positive',
  },
  {
    keyword: '토끼',
    name: 'speciesMulti',
    label: '토끼 동반',
    variant: 'positive',
  },
  {
    keyword: '햄스터',
    name: 'speciesMulti',
    label: '햄스터 동반',
    variant: 'positive',
  },
  {
    keyword: '고슴도치',
    name: 'speciesMulti',
    label: '고슴도치 동반',
    variant: 'positive',
  },
  {
    keyword: '조류',
    name: 'speciesMulti',
    label: '조류 동반',
    variant: 'positive',
  },
  {
    keyword: '앵무새',
    name: 'speciesMulti',
    label: '앵무새 동반',
    variant: 'positive',
  },
  {
    keyword: '파충류',
    name: 'speciesMulti',
    label: '파충류 동반',
    variant: 'positive',
  },
  {
    keyword: '도마뱀',
    name: 'speciesMulti',
    label: '도마뱀 동반',
    variant: 'positive',
  },

  // 신체 조건 및 상태
  { keyword: '체고', name: 'sizeM', label: '체고 제한', variant: 'warning' },
  { keyword: 'cm', name: 'sizeM', label: '크기(cm) 제한', variant: 'warning' },
  {
    keyword: '모두 가능',
    name: 'pets',
    label: '모두 가능',
    variant: 'positive',
  },
  {
    keyword: '제한 없음',
    name: 'pets',
    label: '제한 없음',
    variant: 'positive',
  },
];

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
export const getCategoryIcon = (
  _categoryId: number,
  category3: string,
): keyof typeof iconPaths.category => {
  if (category3.includes('동물병원') || category3.includes('병원'))
    return 'petHospital';
  if (category3.includes('약국')) return 'petPharmacy';
  if (category3.includes('용품') || category3.includes('샵'))
    return 'petSupplies';
  if (category3.includes('카페') || category3.includes('베이커리'))
    return 'cafe';
  if (
    category3.includes('식당') ||
    category3.includes('음식점') ||
    category3.includes('요리')
  )
    return 'restaurant';
  if (
    category3.includes('펜션') ||
    category3.includes('숙소') ||
    category3.includes('민박')
  )
    return 'pension';
  if (category3.includes('호텔') || category3.includes('리조트'))
    return 'hotel';
  if (category3.includes('박물관')) return 'museum';
  if (category3.includes('미술관') || category3.includes('갤러리'))
    return 'artGallery';
  if (
    category3.includes('문화') ||
    category3.includes('센터') ||
    category3.includes('체험')
  )
    return 'culturalCenter';
  if (
    category3.includes('유치원') ||
    category3.includes('위탁') ||
    category3.includes('돌봄')
  )
    return 'entrustedCare';
  if (category3.includes('미용')) return 'grooming';
  if (
    category3.includes('운동장') ||
    category3.includes('공원') ||
    category3.includes('여행')
  )
    return 'travelSpot';

  return 'travelSpot'; // Default fallback
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
    let variant: PlaceInfoCardProps['badges'][0]['variant'] = 'default';

    if (
      place.petPolicy.petSizeLimit.match(
        /제한\s*없음|해당\s*없음|모두\s*가능|모두\s*허용/,
      )
    ) {
      variant = 'positive';
    } else if (
      place.petPolicy.petSizeLimit.match(
        /(미만|이하|제한|불가|금지|초과|필수|주의|이상)/,
      )
    ) {
      variant = 'warning';
    } else if (
      place.petPolicy.petSizeLimit.match(
        /(가능|전용|동반|소형|중형|대형|특수|묘|허용)/,
      )
    ) {
      variant = 'positive';
    }

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
