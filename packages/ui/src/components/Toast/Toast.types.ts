export type ToastVariant = 'default' | 'success' | 'error';

export interface ToastProps {
  id: string; // Required for key and removal
  message: string;
  variant?: ToastVariant;
  isVisible?: boolean; // Optional, mostly for animation control if needed internal to item
  onClose?: (id: string) => void;
  className?: string;
  duration?: number;
}
