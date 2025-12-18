'use client';

import { Modal } from '@together-dog/ui';

import { useModalStore } from '../stores/useModalStore';

const GlobalModal = () => {
  const { isOpen, title, content, primaryAction, secondaryAction, closeModal } =
    useModalStore();

  return (
    <Modal
      isOpen={isOpen}
      primaryAction={
        primaryAction
          ? {
              label: primaryAction.label,
              onClick: () => {
                primaryAction.onClick();
                // Optionally close modal automatically?
                // Currently keeping it manual control unless 'onClick' closes it.
                // But usually global modals auto-close after action.
                // Let's stick to simple proxying first.
                // Actually, for user convenience, often we want auto-close.
                // But let's let the passed callback decide or just proxy it.
                // The prompt didn't specify auto-close logic here.
                // Let's just pass it through.
              },
            }
          : undefined
      }
      secondaryAction={
        secondaryAction
          ? {
              label: secondaryAction.label,
              onClick: secondaryAction.onClick,
            }
          : undefined
      }
      title={title}
      onClose={closeModal}
    >
      {content}
    </Modal>
  );
};

export default GlobalModal;
