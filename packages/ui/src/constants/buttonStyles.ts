import { cn } from '../utils/cn';

// 🔹 버튼 타입 정의
export type ButtonVariant = 'primary' | 'secondary' | 'kakao';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonRounded = '16' | '14' | '12' | '8';

// 🔸 비활성화 상태 클래스
const DISABLED_CLASSES = [
  'disabled:opacity-60',
  'disabled:cursor-not-allowed',
  'disabled:font-semibold',
];

// 🔸 Secondary 기본 상태
const SECONDARY_BASE = [
  'bg-[var(--color-surface)]',
  'text-[var(--color-text)]',
  'border',
  'border-[var(--color-border)]',
  'cursor-pointer',
  ...DISABLED_CLASSES,
];

// 🎨 버튼 Variant별 스타일 정의
export const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary: cn(
    'flex items-center justify-center',
    'bg-[var(--color-primary)]',
    'text-[var(--color-textPrimary)]',
    'hover:bg-[var(--color-secondary)]',
    'dark:bg-[var(--color-primary)]',
    'dark:text-[var(--color-textPrimary)]',
    'dark:hover:bg-[var(--color-accent)]',
    'cursor-pointer',
    ...DISABLED_CLASSES,
  ),

  secondary: cn(
    'flex items-center justify-center',
    'hover:bg-[var(--color-neutralLight)]',
    'dark:hover:bg-[var(--color-surface)]',
    ...SECONDARY_BASE,
  ),

  kakao: cn(
    'flex flex-row gap-2 items-center justify-center',
    'border',
    'border-[var(--color-border)]',
    'bg-[var(--color-surface)]',
    'text-[var(--color-text)]',
    'hover:bg-gray-100',
    ...DISABLED_CLASSES,
  ),
};

// 🔹 Rounded Pixel 값
export const BUTTON_ROUNDED: Record<ButtonRounded, string> = {
  '16': 'rounded-[16px]',
  '14': 'rounded-[14px]',
  '12': 'rounded-[12px]',
  '8': 'rounded-[8px]',
} as const;

// 🔹 사이즈별 크기
export const BUTTON_SIZE: Record<ButtonSize, string> = {
  xs: 'w-full max-w-[68px] h-[29px]',
  sm: 'w-full max-w-[120px] h-[41px]',
  md: 'w-full max-w-[135px] h-[47px]',
  lg: 'w-full max-w-[200px] h-[47px]',
  xl: 'w-full max-w-[640px] h-[54px]',
} as const;

// 🔹 사이즈별 기본 rounded 값
export const DEFAULT_BUTTON_ROUNDED: Record<ButtonSize, ButtonRounded> = {
  xl: '16',
  lg: '14',
  md: '12',
  sm: '12',
  xs: '8',
} as const;

// 🔹 variant + size 조합별 텍스트 크기
export const BUTTON_TEXT_SIZE = (
  variant: ButtonVariant,
  size?: ButtonSize,
): string => {
  if (variant === 'primary') {
    if (size === 'lg' || size === 'md') return 'text-[16px] font-bold';
    if (size === 'sm') return 'text-[14px] font-bold';
  }

  if (variant === 'secondary') {
    if (size === 'lg' || size === 'md') return 'text-[16px] font-medium';
    if (size === 'sm') return 'text-[14px] font-medium';
  }

  return 'text-[14px]';
};
