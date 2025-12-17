import { categoryColors } from '../../tokens/categoryColors';
import { iconPaths } from '../../tokens/iconPath';
import { Icon } from '../Icon/Icon';

interface CategoryBadgeProps {
  category: keyof (typeof iconPaths)['category'];
  label: string;
}

export const CategoryBadge = ({ category, label }: CategoryBadgeProps) => {
  const bg = categoryColors[category];

  return (
    <div
      className='inline-flex h-7 items-center gap-1 rounded-md px-2 py-1 text-xs font-medium'
      style={{
        backgroundColor: bg,
        color: 'var(--color-textPrimary)',
      }}
    >
      <Icon
        className='align-middle'
        group='category'
        name={category}
        size={14}
      />
      <span className='align-middle'>{label}</span>
    </div>
  );
};
