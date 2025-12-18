'use client';

import { Toast } from '@together-dog/ui';

import { useToastStore } from '../stores/useToastStore';

export const GlobalToast = () => {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className='pointer-events-none fixed bottom-4 right-4 z-[9999] flex flex-col gap-2'>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          className='animate-in slide-in-from-bottom-5 fade-in duration-300'
          id={toast.id}
          message={toast.message}
          variant={toast.variant}
          onClose={removeToast}
        />
      ))}
    </div>
  );
};
