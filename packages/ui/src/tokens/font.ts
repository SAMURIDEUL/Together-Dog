export const font = {
  primary: 'var(--font-primary)', // Pretendard Variable
  secondary: 'var(--font-secondary)', // NanumSquareNeo
  weight: {
    light: 300,
    regular: 400,
    bold: 700,
  },
  size: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;
