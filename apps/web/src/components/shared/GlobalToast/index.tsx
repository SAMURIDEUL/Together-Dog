'use client';

import { Toast } from '@together-dog/ui';

import { useToastStore } from '@/stores/useToastStore';

/**
 * Global Toast Container
 *
 * 전역 상태(`useToastStore`)에 저장된 토스트 메시지들을 실제로 화면에 렌더링하는 컨테이너입니다.
 * - `layout.tsx` 최상단에 배치되어 앱의 어느 페이지에서든 토스트가 보이도록 합니다.
 * - 화면 하단 중앙(Bottom-Center)에 고정 위치하며, 여러 개의 토스트가 쌓일 수 있습니다.
 */
export const GlobalToast = () => {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className='pointer-events-none fixed bottom-4 left-1/2 z-[9999] flex -translate-x-1/2 flex-col items-center gap-2'>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          className='pointer-events-auto'
          id={toast.id}
          message={toast.message}
          variant={toast.variant}
          onClose={removeToast}
        />
      ))}
    </div>
  );
};
