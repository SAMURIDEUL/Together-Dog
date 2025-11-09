import { iconPaths } from '../../tokens/iconPath';

type IconPropsBase = {
  size?: number;
  alt?: string;
  className?: string;
};

export type IconProps =
  | (IconPropsBase & {
      group: 'category';
      name: keyof typeof iconPaths.category;
    })
  | (IconPropsBase & {
      group: 'restriction';
      name: keyof typeof iconPaths.restriction;
    })
  | (IconPropsBase & {
      group: 'general';
      name: keyof typeof iconPaths.general;
    });

export const Icon = ({ group, name, size = 24, alt, className }: IconProps) => {
  const src =
    iconPaths[group]?.[name as keyof (typeof iconPaths)[typeof group]];
  if (!src) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Icon not found: group="${group}", name="${name}"`);
    }
    return null;
  }

  return (
    <img
      alt={alt || name}
      className={className}
      height={size}
      src={src}
      width={size}
    />
  );
};
