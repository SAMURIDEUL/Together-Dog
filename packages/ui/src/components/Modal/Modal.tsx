'use client';

import { useEffect, useRef, useState } from 'react';
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
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    previousFocusRef.current = document.activeElement as HTMLElement;

    return () => {
      previousFocusRef.current?.focus();
    };
  }, []);

  // ESC 키 핸들러 & 스크롤 방지
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // 초기 포커스 (첫 번째 요소)
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      const modal = modalRef.current;
      if (modal) {
        const focusableElements = modal.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]):not([data-focus-guard])',
        );
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
      }
    }, 10);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const getFocusableElements = () => {
    if (!modalRef.current) return [];
    return modalRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]):not([data-focus-guard])',
    );
  };

  const handleFocusFirst = () => {
    const elements = getFocusableElements();
    if (elements.length > 0) {
      elements[0].focus();
    }
  };

  const handleFocusLast = () => {
    const elements = getFocusableElements();
    if (elements.length > 0) {
      elements[elements.length - 1].focus();
    }
  };

  if (!mounted || !isOpen) return null;

  const content = (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-black/50 transition-opacity'
        role='button'
        onClick={onClose}
      />

      {/* Container */}
      <div
        ref={modalRef}
        aria-label={!title ? '모달' : undefined}
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-modal='true'
        className={cn(
          'relative z-50 flex w-full flex-col gap-4 rounded-2xl bg-white p-6 shadow-xl transition-all',
          width,
          className,
        )}
        role='dialog'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Sentinel (Focus Guard) */}
        <div
          className='absolute h-[1px] w-[1px] overflow-hidden opacity-0'
          data-focus-guard='true'
          tabIndex={0}
          onFocus={handleFocusLast}
        />

        {/* Header */}
        <div className='flex items-center justify-between'>
          {title ? (
            <h2 className='text-lg font-bold text-neutral-900'>{title}</h2>
          ) : (
            <div /> // Spacer if needed, or just justify-between handles it
          )}
          {showCloseButton && (
            <button
              aria-label='모달 닫기'
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

        {/* Bottom Sentinel (Focus Guard) */}
        <div
          className='absolute h-[1px] w-[1px] overflow-hidden opacity-0'
          data-focus-guard='true'
          tabIndex={0}
          onFocus={handleFocusFirst}
        />
      </div>
    </div>
  );

  return createPortal(content, document.body);
};
