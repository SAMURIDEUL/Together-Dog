import { ReactNode } from 'react';

import { palette } from '../../tokens/color';

interface CardProps {
  darkMode?: boolean;
  children?: ReactNode;
}

export const Card = ({ children }: CardProps) => {
  const color = palette.light;

  return (
    <div
      style={{
        background: color.surface,
        color: color.textPrimary,
        border: `1px solid ${color.border}`,
        boxShadow: `0 2px 6px ${color.shadow}`,
        borderRadius: 12,
        padding: 16,
      }}
    >
      {children}
    </div>
  );
};
