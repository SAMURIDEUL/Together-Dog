import {
  FilterStepVisual,
  ReviewStepVisual,
  SearchStepVisual,
} from './StepVisuals';

const PROCESS_CONTENT = {
  SEARCH: {
    TITLE: '우리 아이와 갈 곳 찾기',
    DESC_1: '가고 싶은 지역이나 장소명을',
    DESC_2: '자유롭게 검색해보세요.',
  },
  FILTER: {
    TITLE: '맞춤 필터 적용하기',
    DESC_1: '반려견 크기나 필요한 편의시설,',
    DESC_2: '조건에 딱 맞는 장소를 찾아보세요.',
  },
  REVIEW: {
    TITLE: '방문 및 후기 남기기',
    DESC_1: '다녀온 뒤 다른 반려인들을 위해',
    DESC_2: '생생한 방문 후기를 남겨주세요.',
  },
} as const;

const COLOR = 'bg-orange-50';

export const STEPS = [
  {
    id: 1,
    title: PROCESS_CONTENT.SEARCH.TITLE,
    description: (
      <>
        {PROCESS_CONTENT.SEARCH.DESC_1}
        <br />
        {PROCESS_CONTENT.SEARCH.DESC_2}
      </>
    ),
    bgColor: COLOR,
    uiFragment: <SearchStepVisual />,
  },
  {
    id: 2,
    title: PROCESS_CONTENT.FILTER.TITLE,
    description: (
      <>
        {PROCESS_CONTENT.FILTER.DESC_1}
        <br />
        {PROCESS_CONTENT.FILTER.DESC_2}
      </>
    ),
    bgColor: COLOR,
    uiFragment: <FilterStepVisual />,
  },
  {
    id: 3,
    title: PROCESS_CONTENT.REVIEW.TITLE,
    description: (
      <>
        {PROCESS_CONTENT.REVIEW.DESC_1}
        <br />
        {PROCESS_CONTENT.REVIEW.DESC_2}
      </>
    ),
    bgColor: COLOR,
    uiFragment: <ReviewStepVisual />,
  },
];
