import { ReactNode } from 'react';
import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  title: ReactNode | null;
  content: ReactNode | null;
  /** Primary Action Button (Right side, usually 'Confirm') */
  primaryAction: {
    label: string;
    onClick: () => void;
  } | null;
  /** Secondary Action Button (Left side, usually 'Cancel') */
  secondaryAction: {
    label: string;
    onClick: () => void;
  } | null;
  /** Open the modal with specific content and actions */
  openModal: (params: {
    title?: ReactNode;
    content: ReactNode;
    primaryAction?: { label: string; onClick: () => void };
    secondaryAction?: { label: string; onClick: () => void };
  }) => void;
  /** Close the modal */
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  title: null,
  content: null,
  primaryAction: null,
  secondaryAction: null,

  openModal: ({ title, content, primaryAction, secondaryAction }) =>
    set({
      isOpen: true,
      title: title || null,
      content,
      primaryAction: primaryAction || null,
      secondaryAction: secondaryAction || null,
    }),

  closeModal: () =>
    set({
      isOpen: false,
      title: null,
      content: null,
      primaryAction: null,
      secondaryAction: null,
    }),
}));
