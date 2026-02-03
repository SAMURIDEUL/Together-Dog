import { Button, Input } from '@together-dog/ui';
import type { ChangeEvent, ComponentProps } from 'react';

interface AuthInputProps extends ComponentProps<typeof Input> {
  onCheck?: () => void;
  checkButtonLabel?: string;
  successMessage?: string;
  label?: string;
  // useAuthField 및 useInputValidate에서 넘어올 수 있는 로직용 props
  isChecked?: boolean;
  value?: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  errorMsg?: string;
  isValid?: boolean;
  handleCheck?: () => void;
  setValue?: (value: string) => void;
  validate?: () => boolean;
  isDirty?: boolean;
  reset?: () => void;
}

export const AuthInput = ({
  onCheck,
  checkButtonLabel = '중복 확인',
  className,
  successMessage,
  label,
  id,
  // 아래 항목들은 DOM에 전달되지 않도록 따로 추출합니다.
  isChecked,
  value,
  handleChange,
  errorMsg,
  isValid,
  handleCheck,
  setValue,
  validate,
  isDirty,
  reset,
  // errorMessage와 error는 Input 컴포넌트에서 이미 처리하므로 props에서 가져옵니다.
  errorMessage,
  error,
  ...props
}: AuthInputProps) => {
  // Input 컴포넌트에 전달할 props 구성
  // handleChange가 있으면 onChange로 변환해줍니다.
  const inputProps = {
    ...props,
    value,
    onChange: props.onChange ?? handleChange,
  };

  if (onCheck) {
    return (
      <div className={`flex flex-col gap-1 ${className ?? ''}`}>
        {label && (
          <label className='ml-1 text-sm font-bold' htmlFor={id}>
            {label}
          </label>
        )}
        <div className='flex gap-2'>
          <div className='flex-1'>
            <Input
              className='h-12'
              error={error}
              errorMessage={errorMessage}
              id={id}
              {...inputProps}
            />
          </div>
          <Button
            className='w-18 h-12 whitespace-nowrap text-xs md:w-24 md:text-sm'
            type='button'
            onClick={onCheck}
          >
            {checkButtonLabel}
          </Button>
        </div>
        {!errorMessage && successMessage && (
          <p className='pl-1 text-xs text-blue-500'>{successMessage}</p>
        )}
      </div>
    );
  }

  return (
    <div className={`space-y-1 ${className ?? ''}`}>
      {label && (
        <label className='ml-1 text-sm font-bold' htmlFor={id}>
          {label}
        </label>
      )}
      <Input
        className='h-12'
        error={error}
        errorMessage={errorMessage}
        id={id}
        {...inputProps}
      />
    </div>
  );
};
