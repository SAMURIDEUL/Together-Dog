import { ToastVariant } from '@together-dog/ui';
import { create } from 'zustand';

interface ToastMessage {
  id: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
}

interface ToastStore {
  toasts: ToastMessage[];
  addToast: (
    message: string,
    variant?: ToastVariant,
    duration?: number,
  ) => void;
  removeToast: (id: string) => void;
}

/**
 * Global Toast Store (전역 토스트 상태 관리)
 *
 * 애플리케이션 전역에서 발생하는 토스트 알림을 관리하는 Zustand 스토어입니다.
 * - `addToast`: 새로운 토스트 메시지를 추가하고, 일정 시간 후 자동으로 제거합니다.
 * - `removeToast`: 특정 ID의 토스트를 즉시 제거합니다.
 *
 * @example
 * const { addToast } = useToastStore();
 * addToast("저장이 완료되었습니다.", "success");
 */
export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (message, variant = 'default', duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      toasts: [...state.toasts, { id, message, variant, duration }],
    }));

    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, duration);
    }
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
