import { Icon, type IconProps } from '../Icon/Icon';

export type PlaceInfoBadgeProps = IconProps & {
  text: string;
  className?: string;
  variant?: 'default' | 'positive' | 'warning';
};

const variantStyles = {
  default: 'bg-gray-100 text-gray-600',
  positive: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-red-100 text-red-700',
};

export const PlaceInfoBadge = ({
  text,
  className,
  variant = 'default',
  ...iconProps
}: PlaceInfoBadgeProps) => {
  return (
    <div
      className={`inline-flex h-7 items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${
        variantStyles[variant]
      } ${className || ''}`}
    >
      <Icon {...iconProps} size={14} />
      <span>{text}</span>
    </div>
  );
};
