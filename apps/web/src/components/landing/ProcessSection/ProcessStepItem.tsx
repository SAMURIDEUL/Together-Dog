import { cn } from '@together-dog/ui';

import { STEPS } from './constants';

interface ProcessStepItemProps {
  step: (typeof STEPS)[number];
  index: number;
  isLast: boolean;
}

export const ProcessStepItem = ({
  step,
  index,
  isLast,
}: ProcessStepItemProps) => {
  return (
    <div className='group relative flex flex-col items-center'>
      {/* Step Content */}
      <div className='mb-8 flex flex-col items-center text-nowrap text-center'>
        <div className='mb-4 text-xs font-black uppercase tracking-widest text-orange-500'>
          Step {index + 1}
        </div>
        <h3 className='mb-3 text-2xl font-bold text-gray-900'>{step.title}</h3>
        <p className='text-nowrap text-base leading-relaxed text-gray-500'>
          {step.description}
        </p>
      </div>

      {/* Stylized UI Fragment Visual */}
      <div
        className={cn(
          'relative flex h-48 w-full max-w-[240px] items-center justify-center rounded-3xl p-8 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl',
          step.bgColor,
        )}
      >
        {step.uiFragment}

        {/* Decorative Circle */}
        <div className='absolute -bottom-2 -right-2 h-16 w-16 rounded-full bg-white/50 blur-2xl transition-opacity group-hover:opacity-0' />
      </div>

      {/* Arrow (Desktop only) */}
      {!isLast && (
        <div className='absolute left-[calc(100%+1.5rem)] top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-orange-200 md:block'>
          <svg
            fill='none'
            height='40'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'
            width='40'
          >
            <path d='M5 12h14M12 5l7 7-7 7' />
          </svg>
        </div>
      )}
    </div>
  );
};
