import {
  BUTTON_ROUNDED,
  BUTTON_SIZE,
  BUTTON_TEXT_SIZE,
  BUTTON_VARIANTS,
  ButtonRounded,
  ButtonSize,
  ButtonVariant,
  DEFAULT_BUTTON_ROUNDED,
} from '../../constants/buttonStyles';
import { cn } from '../../utils/cn';

/**
 * 🎨 공통 Button 컴포넌트
 *
 * - variant, size, rounded를 props로 받아 Tailwind + design token 기반 스타일을 적용합니다.
 * - 라이트 / 다크 모드 자동 대응.
 */

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼의 스타일 종류 (색상, 배경 등) */
  variant?: ButtonVariant;
  /** 버튼 크기 */
  size?: ButtonSize;
  /** 버튼 둥근 정도 (px 단위) */
  rounded?: ButtonRounded;
  /** 비활성화 여부 */
  isDisabled?: boolean;
  /** 클릭 이벤트 핸들러 */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  rounded,
  isDisabled = false,
  onClick,
  ...props
}: ButtonProps) => {
  const roundClass = BUTTON_ROUNDED[rounded ?? DEFAULT_BUTTON_ROUNDED[size]];
  const textClass = BUTTON_TEXT_SIZE(variant, size);

  return (
    <button
      className={cn(
        'p-5 font-sans transition-colors duration-200',
        BUTTON_VARIANTS[variant],
        BUTTON_SIZE[size],
        roundClass,
        textClass,
      )}
      disabled={isDisabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
