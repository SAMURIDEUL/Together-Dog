import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.spec.{ts,tsx}',
    '!src/setupTests.ts',
    '!src/vitest.setup.ts',
    '!src/jest-dom.d.ts',
    '!src/vite-env.d.ts',
    '!src/**/__tests__/**',
  ],
  bundle: false, // 번들링 하지 않음 (Tree Shaking 지원)
  splitting: false,
  format: ['esm', 'cjs'], // ES module + CommonJS 빌드
  dts: true, // 타입 선언 파일 (.d.ts) 생성
  sourcemap: true, // 디버깅용 소스맵
  clean: true, // 빌드 시 dist 비우기
  minify: false,
  onSuccess: 'cpx src/globals.css dist/', // CSS 자동 복사
});
