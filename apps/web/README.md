# 🐾 함께하개 (Together-Dog) 프로젝트 README

## 📌 1. 프로젝트 개요: '함께하개'

'함께하개'는 반려동물 동반이 가능한 카페, 음식점, 숙소 정보를 지도 기반으로 제공하고, 반려인들의 신뢰도 높은 방문 후기(UGC)를 공유하는 플랫폼입니다.

- **서비스 목표:** 반려인들이 외출 시 겪는 '반려동물 허용 여부'에 대한 불확실성을 해소하고, 상세 태그 정보(크기 제한, 펫 메뉴 유무 등)를 제공하여 안전하고 즐거운 반려 생활을 지원합니다.
- **핵심 기능 (MVP):**
  - 지도 기반 장소 검색 및 카테고리 필터링.
  - 장소별 상세 정보 및 아이콘 태그(`🐕L`, `🐾🍴` 등).
  - 사용자 후기 작성 및 별점 시스템.
  - 마이페이지: 찜 목록 및 활동 내역 관리.
- **데이터 소스:** 한국관광공사 반려동물 동반여행 서비스 오픈API [1] 및 사용자 생성 콘텐츠(UGC) 결합.

## 🛠️ 2. 기술 스택 (The Monorepo Stack)

확장성과 유지보수성, 그리고 성능(SEO)을 최우선 목표로 하여 Next.js 15 기반의 pnpm 모노레포 아키텍처를 구축했습니다.

| 영역                | 기술 스택                 | 버전/도구            | 선택 이유                                                         |
| :------------------ | :------------------------ | :------------------- | :---------------------------------------------------------------- |
| **Monorepo**        | pnpm Workspaces           | Next.js 15           | 효율적인 의존성 관리 및 격리, 빠른 설치 속도 [2]                  |
| **Frontend**        | Next.js (App Router)      | TypeScript, React 19 | 동적 콘텐츠(리뷰)에 대한 SSR을 통한 SEO 최적화                    |
| **Styling**         | Tailwind CSS v4           | PostCSS              | 빠른 디자인 시스템 구축 및 유틸리티 기반 스타일링                 |
| **Code Quality**    | **Biome**                 | v2.2.0               | ESLint/Prettier 대비 압도적인 포맷팅 및 린팅 속도 (DX 최적화) [3] |
| **Component Dev**   | Storybook                 | Vite Builder         | 공유 UI 컴포넌트(`@together-dog/ui`) 격리 개발 및 문서화 [4, 5]   |
| **Pre-commit Hook** | **Husky** + `lint-staged` | pnpm exec            | 커밋 전 Biome 포맷팅/린팅을 강제하여 코드 품질 자동 확보 [6]      |

## 📐 3. 모노레포 구조 및 패키지

```
/together-dog (Root)
├── apps/
│   └── web/            # Next.js Application (앱 로직, 페이지, SSR)
├── packages/
│   └── ui/             # Shared UI Components (@together-dog/ui)
├──.gitignore          # Git 무시 목록
├── pnpm-workspace.yaml # 워크스페이스 정의
└── package.json        # 루트 개발 도구 및 스크립트 관리
```

## 🚨 4. 주요 트러블 슈팅 및 설정 해결 (핵심 기록)

모노레포 환경에서 Tailwind, Storybook, pnpm, Biome을 결합할 때 발생했던 핵심적인 충돌 문제와 그 해결책을 정리합니다. 이 과정은 모노레포 구축 시 발생하는 가장 흔하고 까다로운 에러들을 해결했습니다.

### A. Git/pnpm Long Path & 추적 문제 해결

| 문제                       | 원인                                                        | 해결책                                                                                                                                                                       |
| :------------------------- | :---------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Filename too long` 오류   | Windows OS의 경로 제한(259자)과 pnpm의 긴 경로명이 충돌 [7] | 1. **Git Config 수정:** `git config --global core.longpaths true` 설정. 2. **Git Index 정리:** `git rm -r --cached.`를 통해 추적 인덱스를 초기화하고 `.gitignore` 강제 적용. |
| `node_modules` 추적 잔여물 | `git rm` 명령 후에도 Git 캐시에 잔여 추적 정보가 남음.      | `git rm -r --cached --ignore-unmatch node_modules` 명령을 모든 워크스페이스에 적용하여 인덱스를 완전히 정리함.                                                               |

### B. Storybook/Tailwind v4 통합 문제 해결

Storybook 환경에서 공유 컴포넌트(`@together-dog/ui`)가 Tailwind 스타일을 로드하지 못하고 빌드가 실패했던 문제입니다.

| 문제                                                    | 원인                                                                                                                                              | 해결책                                                                                                                                                      |
| :------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Module not found: globals.css`                         | `.storybook/preview.ts` 파일에서 Next.js 앱의 CSS 경로를 **`../../../apps/web/styles/globals.css`** 와 같이 정확한 상대 경로로 지정하여 해결. [8] |
| `SyntaxError: Package path./components is not exported` | Tailwind CSS v4가 PostCSS 플러그인과 모듈 경로를 해석하는 방식 충돌.                                                                              | **`apps/web/styles/globals.css` 파일 수정:** Tailwind v4 표준에 맞게 `@import "tailwindcss/components";`를 제거하고 `@tailwind utilities;`만 사용하여 해결. |

### C. Biome 린팅/Husky 커밋 오류 해결

`git commit` 시 Husky가 Biome을 호출했을 때 린팅이 실패했던 문제입니다.

| 문제                                  | 원인                                                                   | 해결책                                                                                                   |
| :------------------------------------ | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| `Biome version does not match schema` | `biome.json`의 `$schema` 버전(`1.8.3`)이 CLI 버전(`2.2.0`)과 불일치.   | `pnpm exec biome migrate --write` 명령으로 설정 파일을 최신 구문으로 자동 업데이트.                      |
| `useButtonType` 오류                  | `<button>` 태그에 `type` 속성이 없어 Biome이 접근성(A11y) 오류를 반환. | `packages/ui/src/Button.tsx` 파일에 `type="button"` 속성을 수동으로 추가하여 A11y 오류 해결.             |
| `noSvgWithoutTitle` 오류              | Storybook 예시 파일의 SVG 아이콘에 접근성 `title` 속성이 없음.         | 오류가 발생하는 **Storybook 예시 파일(`.stories/`)들을 모두 삭제**하여 린팅 범위에서 제외하고 문제 해결. |

## 🚀 5. 시작하는 방법 (Getting Started)

1.  **클론 및 설치:**
    ```bash
    git clone
    cd together-dog
    pnpm install
    ```
2.  **Next.js 앱 실행:**
    ```bash
    pnpm --filter web dev
    # 또는 루트에서 모든 워크스페이스 동시 실행: pnpm dev
    ```
3.  **Storybook 실행:**
    ```bash
    pnpm --filter @together-dog/ui storybook
    ```
    (http://localhost:6006에서 공유 컴포넌트 확인 가능)
