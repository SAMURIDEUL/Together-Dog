# 🐾 함께하개 (Together-Dog)

> 우리 아이와 함께, 망설임 없이 떠나는 길. '함께하개'가 반려 생활의 새로운 쉼표를 안내합니다.

## 🌟 프로젝트 소개

'함께하개'는 반려동물 동반이 가능한 전국의 카페, 식당, 숙소 정보를 지도 기반으로 제공하는 플랫폼입니다.

반려인들이 외출 시 겪는 **'불확실성'** (과연 우리 대형견도 들어갈 수 있을까? 목줄 없이 뛰어놀 수 있을까?)을 해소하는 것이 저희 서비스의 핵심 목표입니다. 한국관광공사의 API 데이터를 기반으로, 사용자 리뷰와 **투명하고 상세한 펫 정책 태그**를 결합하여 신뢰도 높은 정보를 제공합니다.

### 핵심 기능 (MVP)

- **지도 기반 탐색:** 카테고리(카페, 식당, 호텔)별 실시간 필터링 지도.
- **정책 투명성:** 반려동물 크기 제한 (소/중/대형견), 펫 메뉴 유무, 목줄/가방 필수 여부 등 상세 규칙을 아이콘으로 명시.
- **신뢰도 높은 후기:** 실제 반려인들이 작성한 사진 첨부 후기 및 별점 시스템.
- **개인화:** 찜 목록 관리 및 내가 작성한 후기 내역 관리.

## 🛠️ 기술 스택 (Tech Stack)

확장성과 최고의 성능을 위해 최신 웹 기술 스택을 모노레포 환경으로 구성했습니다.

| 영역           | 기술 스택                | 특징                                                     |
| :------------- | :----------------------- | :------------------------------------------------------- |
| **Front-end**  | Next.js 15 (App Router)  | SEO와 빠른 로딩을 위한 SSR 및 PPR 전략 채택 [1, 2]       |
| **Styling**    | Tailwind CSS v4          | 유틸리티 기반의 빠른 스타일링 및 디자인 일관성 확보      |
| **Monorepo**   | pnpm Workspaces          | 컴포넌트 재사용성과 효율적인 의존성 관리                 |
| **Quality/DX** | Biome, TypeScript, Husky | 압도적인 속도로 코드 품질 및 포맷팅 자동 검사 [3, 4]     |
| **Component**  | Storybook (Vite Builder) | 공유 UI 컴포넌트(`@together-dog/ui`) 격리 개발 및 문서화 |

## 📐 아키텍처 (Monorepo Structure)

모든 코드는 `apps`와 `packages`로 분리된 pnpm 워크스페이스 내에서 관리됩니다.

```
/together-dog
├── apps/
│   └── web/            # Next.js 메인 애플리케이션 (페이지 로직)
└── packages/
    └── ui/             # 공유 UI 컴포넌트, 테마 (Storybook 통합)
```

## 🚀 시작하는 방법 (Getting Started)

1.  **저장소 클론 및 이동:**

    ```bash
    git clone
    cd Together-Dog
    ```

2.  **의존성 설치:**

    ```bash
    pnpm install
    ```

3.  **개발 서버 실행:**

    ```bash
    # Next.js 앱 실행 (http://localhost:3000)
    pnpm --filter web dev

    # Storybook 실행 (http://localhost:6006)
    pnpm --filter @together-dog/ui storybook
    ```
