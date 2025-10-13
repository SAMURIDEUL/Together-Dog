// app/MyClientButton.tsx
'use client'; // 👈 핵심 지시문

import { Button } from '@together-dog/ui';

type Props = {
  children?: React.ReactNode;
  onClick: () => void;
  // 다른 props가 있다면 여기에 추가
};

export default function MyClientButton({ children, onClick }: Props) {
  return <Button onClick={onClick}>{children}</Button>;
}
