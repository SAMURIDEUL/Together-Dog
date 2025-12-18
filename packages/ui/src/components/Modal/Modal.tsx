'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '../../utils/cn';
import { Button } from '../Button/Button';
import { CloseIcon } from '../Icon/CloseIcons';
import { ModalProps } from './Modal.types';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  primaryAction,
  secondaryAction,
  width = 'max-w-[400px]',
  className,
}: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ESC 키로 닫기
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const content = (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-black/50 transition-opacity'
        role='button'
        tabIndex={0}
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClose();
          }
        }}
      />

      {/* Container */}
      <div
        className={cn(
          'relative z-50 flex w-full flex-col gap-4 rounded-2xl bg-white p-6 shadow-xl transition-all',
          width,
          className,
        )}
      >
        {/* Header */}
        <div className='flex items-center justify-between'>
          {title ? (
            <h2 className='text-lg font-bold text-neutral-900'>{title}</h2>
          ) : (
            <div /> // Spacer if needed, or just justify-between handles it
          )}
          {showCloseButton && (
            <button
              className='-mr-2 -mt-2 rounded-full p-1 text-neutral-400 transition-colors'
              type='button'
              onClick={onClose}
            >
              <CloseIcon className='h-5 w-5' />
            </button>
          )}
        </div>

        {/* Content */}
        <div className='text-neutral-600'>{children}</div>

        {/* Footer (Buttons) */}
        {(primaryAction || secondaryAction) && (
          <div className='flex gap-3 text-base font-[550]'>
            {secondaryAction && (
              <Button
                className='flex-1 rounded-sm border border-gray-300 p-2 text-red-500'
                isDisabled={secondaryAction.isDisabled}
                size='lg'
                variant='secondary'
                onClick={() => secondaryAction.onClick()}
              >
                {secondaryAction.label}
              </Button>
            )}
            {primaryAction && (
              <Button
                className='flex-1 rounded-sm border border-gray-300 p-2'
                isDisabled={primaryAction.isDisabled}
                size='lg'
                variant='secondary'
                onClick={() => primaryAction.onClick()}
              >
                {primaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(content, document.body);
};
