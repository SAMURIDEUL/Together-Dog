// packages/ui/vitest.setup.ts
import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// 각 테스트가 끝난 후 DOM을 정리
afterEach(() => {
  cleanup();
});
