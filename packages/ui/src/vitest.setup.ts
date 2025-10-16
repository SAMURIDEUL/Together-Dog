import '@testing-library/jest-dom';

import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { afterEach, expect } from 'vitest';

// jest-dom의 matchers를 vitest의 expect에 연결
expect.extend(matchers);

// 각 테스트가 끝난 후 DOM 정리
afterEach(() => {
  cleanup();
});
