// packages/ui/src/Button.test.tsx
import { fireEvent,render, screen } from '@testing-library/react';
import { jsx as _jsx } from "react/jsx-runtime";
import { describe, expect, it, vi } from 'vitest';

import { Button } from './Button';
describe('Button', () => {
    it('children이 렌더링된다', () => {
        render(_jsx(Button, { onClick: () => { }, children: "\uBC84\uD2BC" }));
        expect(screen.getByText('버튼')).toBeInTheDocument();
    });
    it('onClick이 정상적으로 호출된다', () => {
        const handleClick = vi.fn();
        render(_jsx(Button, { onClick: handleClick, children: "\uB20C\uB7EC\uC694" }));
        fireEvent.click(screen.getByText('눌러요'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
