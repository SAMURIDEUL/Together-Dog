import { IconGroup, iconPaths } from '../../tokens/iconPath';

export interface IconProps {
  group: IconGroup;
  name: string;
  size?: number;
  alt?: string;
  className?: string;
}

export const Icon = ({ group, name, size = 24, alt, className }: IconProps) => {
  const src =
    iconPaths[group]?.[name as keyof (typeof iconPaths)[typeof group]];
  if (!src) return null;

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
