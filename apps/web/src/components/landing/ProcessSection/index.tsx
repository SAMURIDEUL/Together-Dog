import { cn } from '@together-dog/ui';
import type { ComponentProps } from 'react';

import { STEPS } from './constants';
import { ProcessStepItem } from './ProcessStepItem';

export const ProcessSection = ({
  className,
  ...props
}: ComponentProps<'section'>) => {
  return (
    <section
      className={cn(
        'mx-auto w-full max-w-screen-xl px-4 py-24 md:px-8',
        className,
      )}
      {...props}
    >
      <div className='mb-16 text-center'>
        <h2 className='font- text-3xl font-normal text-gray-900 md:text-5xl'>
          함께하개 이용 가이드
        </h2>
        <p className='mt-6 text-lg text-gray-500'>
          우리 아이와 함께하는 소중한 시간, 더 쉽고 완벽하게.
        </p>
      </div>

      <div className='grid grid-cols-1 gap-12 md:grid-cols-3'>
        {STEPS.map((step, index) => (
          <ProcessStepItem
            key={step.id}
            index={index}
            isLast={index === STEPS.length - 1}
            step={step}
          />
        ))}
      </div>
    </section>
  );
};
