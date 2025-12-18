export const SuccessIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    viewBox='0 0 24 24'
  >
    <path d='M5 13l4 4L19 7' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

export const ErrorIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    viewBox='0 0 24 24'
  >
    <path
      d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export const InfoIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    viewBox='0 0 24 24'
  >
    <path
      d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
