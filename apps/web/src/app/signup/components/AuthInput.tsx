import { Button, Input } from '@together-dog/ui';
import { ComponentProps } from 'react';

interface AuthInputProps extends ComponentProps<typeof Input> {
  onCheck?: () => void;
  checkButtonLabel?: string;
  successMessage?: string;
  label?: string;
}

export const AuthInput = ({
  onCheck,
  checkButtonLabel = '중복 확인',
  className,
  successMessage,
  label,
  ...props
}: AuthInputProps) => {
  if (onCheck) {
    return (
      <div className={`flex flex-col gap-1 ${className ?? ''}`}>
        {label && <label className='text-sm font-bold ml-1'>{label}</label>}
        <div className='flex gap-2'>
          <div className='flex-1'>
            <Input className='h-12' {...props} />
          </div>
          <Button
            className='w-18 md:w-24 whitespace-nowrap text-xs md:text-sm h-12'
            type='button'
            onClick={onCheck}
          >
            {checkButtonLabel}
          </Button>
        </div>
        {!props.errorMessage && successMessage && (
          <p className='text-xs text-blue-500 pl-1'>{successMessage}</p>
        )}
      </div>
    );
  }

  return (
    <div className={`space-y-1 ${className ?? ''}`}>
      {label && <label className='text-sm font-bold ml-1'>{label}</label>}
      <Input className='h-12' {...props} />
    </div>
  );
};
