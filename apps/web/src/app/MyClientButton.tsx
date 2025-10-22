/* apps/web/src/app/MyClientButton.tsx */
'use client';

import { Button } from '@together-dog/ui';

export default function MyClientButton() {
  const handleClick = () => {
    alert('버튼이 클릭되었습니다!'); // 클라이언트 측에서 실행
  };

  return <Button onClick={handleClick}>클릭하세요</Button>;
}
