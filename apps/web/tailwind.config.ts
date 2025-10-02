// apps/web/tailwind.config.ts (Next.js 앱 설정 - 최종 완성)

// 1. packages/ui에 정의된 공유 설정을 가져옵니다. (ES Module 참조)
import sharedConfig from "../../packages/ui/tailwind.config";

/** @type {import('tailwindcss').Config} */
const config: import("tailwindcss").Config = {
  // 2. [모노레포 핵심] 공유 설정을 프리셋으로 가져와 확장/병합합니다.
  presets: [sharedConfig],

  content: [
    // Next.js 앱 내부 경로
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      // 앱 특화된 테마를 여기에 추가
    },
  },
  plugins: [],
};

export default config;
