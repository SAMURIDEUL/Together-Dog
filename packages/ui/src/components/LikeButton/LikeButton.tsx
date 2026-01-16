import { Icon } from '../Icon/Icon';

interface LikeButtonProps {
  isLike: boolean;
  onClick?: (e: React.MouseEvent) => void;
  size?: number;
  className?: string; // 위치 조정 등을 위한 className
  disabled?: boolean;
}

export const LikeButton = ({
  isLike,
  onClick,
  size = 20,
  className,
  disabled = false,
}: LikeButtonProps) => {
  return (
    <button
      className={`flex items-center justify-center rounded-full bg-white/80 p-1.5 backdrop-blur-sm transition-transform active:scale-95 ${
        disabled ? 'cursor-not-allowed opacity-50' : ''
      } ${className || ''}`}
      disabled={disabled}
      type='button'
      onClick={(e) => {
        // 부모의 클릭 이벤트(예: 카드 클릭)로 전파되지 않도록 방지
        e.stopPropagation();
        if (!disabled) {
          onClick?.(e);
        }
      }}
    >
      <Icon
        group='general'
        name={isLike ? 'heartFilled' : 'heart'}
        size={size}
      />
    </button>
  );
};
