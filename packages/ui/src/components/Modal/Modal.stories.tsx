import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../Button/Button';
import { Modal } from './Modal';
import { ModalProps } from './Modal.types';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
    children: { control: 'text' },
    showCloseButton: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalWithHooks = (args: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export const Default: Story = {
  render: (args) => <ModalWithHooks {...args} />,
  args: {
    title: '모달 제목',
    children: '모달 내용이 들어갑니다. 두 줄 이상일 경우 자동으로 늘어납니다.',
    primaryAction: {
      label: '확인',
      onClick: () => alert('확인 클릭'),
    },
    secondaryAction: {
      label: '취소',
      onClick: () => alert('취소 클릭'),
    },
  },
};

export const OneButton: Story = {
  render: (args) => <ModalWithHooks {...args} />,
  args: {
    title: '알림',
    children: '작업이 성공적으로 완료되었습니다.',
    primaryAction: {
      label: '확인',
      onClick: () => alert('확인 클릭'),
    },
  },
};

export const NoTitle: Story = {
  render: (args) => <ModalWithHooks {...args} />,
  args: {
    children: '제목 없이 내용만 있는 모달입니다.',
    primaryAction: {
      label: '닫기',
      onClick: () => alert('닫기 클릭'),
    },
  },
};
