import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'], // 진입점
  format: ['esm', 'cjs'], // ES module + CommonJS 빌드
  dts: true, // 타입 선언 파일 (.d.ts) 생성
  sourcemap: true, // 디버깅용 소스맵
  clean: true, // 빌드 시 dist 비우기
  minify: false,
  onSuccess: 'cpx src/globals.css dist/', // CSS 자동 복사
});
