// packages/ui/tailwind.config.js (ES Module 형식으로 수정 완료)

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      //... (공유 테마)
    },
  },
  // 문법적 오류를 피하기 위해 빈 배열 추가
  plugins: [],
};

export default config; // <--- ES 모듈 내보내기 방식
