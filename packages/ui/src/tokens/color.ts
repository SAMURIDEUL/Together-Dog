// packages/ui/tokens/color.ts

/**
 * 🎨 Warm Pastel Yellow 팔레트
 *
 * 라이트 모드 / 다크 모드 기반 디자인 토큰입니다.
 * 모든 컴포넌트와 페이지 스타일에서 공통으로 사용할 색상 기준을 정의합니다.
 */

export const lightPalette = {
  // 🌞 라이트 모드 색상
  primary: '#FFE08C', // 메인 컬러 (따뜻한 파스텔 옐로)
  secondary: '#C7A061', // 보조 컬러 (편안한 브라운)
  accent: '#FFB6A1', // 강조 컬러 (부드러운 코랄 핑크)

  neutralLight: '#FFF9E8', // 배경용 아이보리 베이지
  neutralDark: '#1E1E1E', // 기본 텍스트용 거의 블랙

  background: '#FFF9E8', // 전체 페이지 배경
  surface: '#FFFFFF', // 카드, 모달 등 컨테이너 배경

  textPrimary: '#1E1E1E', // 기본 텍스트 색상
  textSecondary: '#3A2F2F', // 보조 텍스트 색상
  textAccent: '#C7A061', // 강조 텍스트 색상 (링크 등)

  border: 'rgba(0, 0, 0, 0.05)',
  shadow: 'rgba(0, 0, 0, 0.05)',
};

export const darkPalette = {
  // 🌙 다크 모드 색상
  primary: '#FFD670', // 메인 컬러 (밝은 옐로)
  neutralDark: '#1E1E1E', // 기본 텍스트용 거의 블랙
};

// 전체 테마를 한 번에 관리하기 위한 객체
export const palette = {
  light: lightPalette,
  dark: darkPalette,
};

// 타입 정의 (선택적으로 사용 가능)
export type Palette = typeof lightPalette;
export type ThemeMode = keyof typeof palette;
