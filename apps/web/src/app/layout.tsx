// apps/web/src/app/layout.tsx

import '@together-dog/ui/globals.css';
import './globals.css';

import type { Metadata } from 'next';
import { Do_Hyeon } from 'next/font/google';
import localFont from 'next/font/local';

import {
  Footer,
  GlobalModal,
  GlobalToast,
  GNB,
  QueryProvider,
  ThemeProvider,
} from '@/components/shared';

// Pretendard 폰트 설정
const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2', // 폰트 파일 실제 경로
  display: 'swap',
  weight: '45 920',
  variable: '--font-primary', // CSS 변수 이름 지정
});

// Do Hyeon 폰트 설정
const dohyeon = Do_Hyeon({
  weight: '400',
  preload: true,
  variable: '--font-dohyeon',
});

// NanumSquareNeo 폰트 설정 (여러 웨이트를 배열로 관리)
const nanumSquareNeo = localFont({
  src: [
    {
      path: '../../public/fonts/NanumSquareNeoTTF-aLt.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NanumSquareNeoTTF-bRg.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NanumSquareNeoTTF-cBd.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-secondary',
});

export const metadata: Metadata = {
  title: '함께하개',
  description: '반려동물과 함께 다닐 수 있는 장소를 찾아보세요!',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang='ko'>
      <body
        suppressHydrationWarning
        className={`${pretendard.variable} ${nanumSquareNeo.variable} ${dohyeon.variable} bg-white text-gray-900 antialiased`}
      >
        <ThemeProvider>
          <QueryProvider>
            <div className='flex min-h-screen flex-col'>
              <GNB />
              <main className='flex-1'>{children}</main>
              <Footer />
            </div>
            <GlobalModal />
            <GlobalToast />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
