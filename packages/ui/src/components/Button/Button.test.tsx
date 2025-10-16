// packages/ui/src/Button.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  it('children이 렌더링된다', () => {
    render(<Button onClick={() => {}}>버튼</Button>);
    expect(screen.getByText('버튼')).toBeInTheDocument();
  });

  it('onClick이 정상적으로 호출된다', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>눌러요</Button>);
    fireEvent.click(screen.getByText('눌러요'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
