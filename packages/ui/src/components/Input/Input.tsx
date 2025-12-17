import { forwardRef, InputHTMLAttributes, useState } from 'react';

import { cn } from '../../utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
}

import { EyeIcon, EyeOffIcon } from '../Icon/EyeIcons';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error, errorMessage, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (isVisible ? 'text' : 'password') : type;

    return (
      <div className='relative w-full'>
        <input
          ref={ref}
          className={cn(
            'h-13 ring-offset-background flex w-full rounded-md border border-gray-300 bg-[var(--color-surface)] px-3 py-2 text-base text-[var(--color-textPrimary)] transition-colors file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-gray-400 hover:border-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            (error || errorMessage) &&
              'border-red-500 hover:border-red-500 focus:border-red-500',
            isPassword && 'pr-10', // 비밀번호일 때 아이콘 공간 확보
            className,
          )}
          type={inputType}
          {...props}
        />
        {isPassword && (
          <button
            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none'
            type='button'
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? (
              <EyeIcon className='h-6 w-6' />
            ) : (
              <EyeOffIcon className='h-6 w-6' />
            )}
          </button>
        )}
        {errorMessage && (
          <p className='animate-fade-in mt-1 text-xs text-red-500'>
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';
