import { cn } from '../../utils/cn';
import { CloseIcon } from '../Icon/CloseIcons';
import { ErrorIcon, InfoIcon, SuccessIcon } from '../Icon/StatusIcons';
import { ToastProps, ToastVariant } from './Toast.types';

const variantStyles: Record<ToastVariant, string> = {
  default: 'bg-gray-800 text-white border-gray-700',
  success: 'bg-green-50 text-green-800 border-green-200',
  error: 'bg-red-50 text-red-800 border-red-200',
};

const iconMap: Record<ToastVariant, React.ReactNode> = {
  default: <InfoIcon className='h-5 w-5 text-gray-400' />,
  success: <SuccessIcon className='h-5 w-5 text-green-500' />,
  error: <ErrorIcon className='h-5 w-5 text-red-500' />,
};

/**
 * Toast 컴포넌트
 *
 * 사용자에게 피드백 메시지(성공, 실패, 정보)를 시각적으로 전달하는 UI 컴포넌트입니다.
 * - `variant` prop을 통해 스타일(배경색, 아이콘)을 변경할 수 있습니다.
 * - `GlobalToast` 컨테이너 내부에서 렌더링되어 사용됩니다.
 */
export const Toast = ({
  id,
  message,
  variant = 'default',
  onClose,
  className,
}: ToastProps) => {
  return (
    <div
      className={cn(
        'pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-lg border p-4 shadow-lg transition-all md:max-w-md',
        variantStyles[variant],
        className,
      )}
      role='alert'
    >
      <div className='flex-shrink-0'>{iconMap[variant]}</div>
      <p className='flex-1 text-sm font-medium'>{message}</p>
      {onClose && (
        <button
          aria-label='Close'
          className='flex-shrink-0 rounded-lg p-1.5 opacity-70 transition-opacity hover:bg-black/5 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-300'
          onClick={() => onClose(id)}
        >
          <CloseIcon className='h-4 w-4' />
        </button>
      )}
    </div>
  );
};
