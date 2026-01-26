// 1. 대시보드 카테고리 설정
export const DASHBOARD_SECTIONS = [
  {
    id: 'cafe',
    apiId: 3,
    title: '강아지와 커피 한잔 ☕️',
    subtitle: '함께 쉴 수 있는 카페',
  },
  {
    id: 'restaurant',
    apiId: 9,
    title: '맛있는 식사도 함께 🍴',
    subtitle: '반려동물 동반 식당',
  },
  {
    id: 'travelSpot',
    apiId: 10,
    title: '산책과 놀이를 하러 공원 🌿',
    subtitle: '신나게 뛰어놀 수 있는 여행지',
  },
  {
    id: 'pension',
    apiId: 8,
    title: '편안한 휴식 펜션 🏡',
    subtitle: '자연 속 힐링 공간',
  },
  {
    id: 'hotel',
    apiId: 13,
    title: '호캉스는 강아지와 함께 🏨',
    subtitle: '럭셔리한 휴가',
  },
  {
    id: 'petHospital',
    apiId: 4,
    title: '아플 땐 병원으로!! 🏥',
    subtitle: '믿을 수 있는 동물병원',
  },
  {
    id: 'petPharmacy',
    apiId: 1,
    title: '약이 필요할 땐 약국 💊',
    subtitle: '동물 의약품 판매',
  },
  {
    id: 'petSupplies',
    apiId: 5,
    title: '필요한 건 여기서! 용품점 🦴',
    subtitle: '장난감부터 간식까지',
  },
  {
    id: 'grooming',
    apiId: 6,
    title: '예쁘게 미용해요 ✂️',
    subtitle: '깔끔한 관리',
  },
  {
    id: 'entrustedCare',
    apiId: 11,
    title: '잠시 맡겨주세요 유치원/돌봄 🐕',
    subtitle: '안심 위탁 케어',
  },
  {
    id: 'museum',
    apiId: 12,
    title: '견문 넓히기 박물관 🏛️',
    subtitle: '함께 관람해요',
  },
  {
    id: 'artGallery',
    apiId: 2,
    title: '예술적 감성 미술관 🎨',
    subtitle: '조용한 관람',
  },
  {
    id: 'culturalCenter',
    apiId: 7,
    title: '문화 생활 문화센터 🎭',
    subtitle: '복합 문화 공간',
  },
] as const;

// 2. 하버사인 공식 (두 좌표 사이의 거리 계산)
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  const R = 6371; // 지구 반지름 (km)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// 4. 카테고리 ID 파싱 헬퍼
export const getCategoryId = (param: string | null) => {
  if (!param) return null;

  // 숫자로만 구성된 경우 (엄격한 체크)
  if (/^\d+$/.test(param)) {
    return Number(param);
  }

  // 문자열 ID인 경우 매핑 테이블에서 조회
  const section = DASHBOARD_SECTIONS.find((s) => s.id === param);
  return section ? section.apiId : null;
};
