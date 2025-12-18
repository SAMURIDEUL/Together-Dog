// apps/web/src/app/layout.tsx

import './globals.css';
import '@together-dog/ui/globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import GlobalModal from '../components/GlobalModal';
import Header from './Header';

// Pretendard 폰트 설정
const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2', // 폰트 파일 실제 경로
  display: 'swap',
  weight: '45 920',
  variable: '--font-primary', // CSS 변수 이름 지정
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
    <html lang='ko'>
      <body
        className={`${pretendard.variable} ${nanumSquareNeo.variable} antialiased`}
      >
        <Header />
        {children}
        <GlobalModal />
      </body>
    </html>
  );
}
