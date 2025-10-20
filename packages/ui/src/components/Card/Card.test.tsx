import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Card } from './Card';

describe('Card Component', () => {
  it('children이 올바르게 렌더링된다', () => {
    render(<Card>라이트 모드</Card>);
    expect(screen.getByText('라이트 모드')).toBeInTheDocument();
  });

  it('light 모드일 때 배경 색상이 적용된다', () => {
    render(<Card>라이트 모드</Card>);
    const card = screen.getByText('라이트 모드').parentElement;
    expect(card).toHaveStyle('background: rgb(255, 249, 232)');
  });

  it('dark 모드일 때 배경 색상이 적용된다', () => {
    render(<Card darkMode>다크 모드</Card>);
    const card = screen.getByText('다크 모드').parentElement;
    expect(card).toHaveStyle('background: rgb(44, 44, 44)');
  });
});
