// packages/ui/vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths'; // TS 경로 인식 플러그인

export default defineConfig({
  // [수정된 부분] plugins 배열에 플러그인들을 추가하여 활성화
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom', // 브라우저 환경 에뮬레이션
    setupFiles: './vitest.setup.ts', // 테스트 전 실행할 파일
  },
});
