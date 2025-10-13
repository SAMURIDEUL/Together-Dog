// app/page.tsx (서버 컴포넌트)

import MyClientButton from './MyClientButton';

function handleClick() {
  console.log('버튼이 클릭되었습니다!'); // 이 함수는 prop으로 전달됩니다.
}

export default function HomePage() {
  return (
    <main>
      {/* 다른 서버 렌더링된 콘텐츠 */}
      <MyClientButton onClick={handleClick}>클릭하세요</MyClientButton>
    </main>
  );
}
