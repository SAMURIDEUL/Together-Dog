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
              },
              isDisabled: primaryAction.isDisabled,
            }
          : undefined
      }
      secondaryAction={
        secondaryAction
          ? {
              label: secondaryAction.label,
              onClick: secondaryAction.onClick,
              isDisabled: secondaryAction.isDisabled,
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
