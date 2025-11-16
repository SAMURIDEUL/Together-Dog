import { categoryColors } from '../../tokens/categoryColors';
import { iconPaths } from '../../tokens/iconPath';
import { Icon } from '../Icon/Icon';

interface CategoryBadgeProps {
  category: keyof (typeof iconPaths)['category'];
  label: string;
  icon: keyof (typeof iconPaths)['category'];
}

export const CategoryBadge = ({
  category,
  label,
  icon,
}: CategoryBadgeProps) => {
  const bg = categoryColors[category];

  return (
    <div
      className='inline-flex h-8 items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium shadow-sm'
      style={{
        backgroundColor: bg,
        color: 'var(--color-textPrimary)',
      }}
    >
      <Icon className='align-middle' group='category' name={icon} size={14} />
      <span className='align-middle'>{label}</span>
    </div>
  );
};
