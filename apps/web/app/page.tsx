// apps/web/app/page.tsx

// 1. "@together-dog/ui" 패키지에서 Button 컴포넌트를 가져옵니다.
//    (tsconfig.json의 paths 및 package.json의 workspace:* 링크 테스트)
import { Button } from "@together-dog/ui";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">
        함께하개 웹사이트 초기 화면
      </h1>

      {/* 2. 공유 컴포넌트 사용 (next.config.ts의 transpilePackages 테스트) */}
      <Button onClick={() => alert("공유 컴포넌트 테스트 성공!")}>
        공유 버튼 클릭
      </Button>

      {/* 3. Next.js 앱 내에서 Tailwind 클래스 테스트 (tailwind.config.ts의 content 스캔 테스트) */}
      <div className="mt-8 p-4 bg-yellow-100 border border-yellow-400 rounded-md">
        이 텍스트의 배경색은 Tailwind CSS를 통해 적용되었습니다.
      </div>
    </main>
  );
}
