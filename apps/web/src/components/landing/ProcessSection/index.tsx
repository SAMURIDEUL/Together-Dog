'use client';

import { cn, Icon, SearchIcon } from '@together-dog/ui';
import type { ComponentProps } from 'react';

const STEPS = [
  {
    title: '우리 아이와 갈 곳 찾기',
    description: (
      <>
        가고 싶은 지역이나 장소명을
        <br />
        자유롭게 검색해보세요.
      </>
    ),
    bgColor: 'bg-orange-50',
    // Stylized UI: Search Bar Fragment
    uiFragment: (
      <div className='flex w-full flex-col gap-2 rounded-xl border border-gray-100 bg-white p-3 shadow-sm'>
        <div className='flex items-center gap-2 rounded-full bg-gray-50 px-3 py-2'>
          <SearchIcon className='h-4 w-4 text-gray-400' />
          <div className='h-2 w-20 rounded-full bg-gray-200' />
        </div>
        <div className='flex gap-1.5'>
          {['성수동', '카페'].map((tag) => (
            <div
              key={tag}
              className='rounded-full bg-orange-100 px-2 py-1 text-[10px] font-bold text-orange-600'
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: '맞춤 필터 적용하기',
    description: (
      <>
        반려견 크기나 필요한 편의시설,
        <br />
        조건에 딱 맞는 장소를 찾아보세요.
      </>
    ),
    bgColor: 'bg-orange-100/50',
    // Stylized UI: Map & Filter Fragment
    uiFragment: (
      <div className='relative flex h-24 w-full items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-emerald-50 shadow-sm'>
        {/* Mock Map Background */}
        <div className='absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] opacity-20 [background-size:16px_16px]' />
        {/* Map Pin */}
        <div className='relative flex flex-col items-center'>
          <div className='flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg'>
            <Icon group='category' name='cafe' size={16} />
          </div>
          <div className='-mt-1 h-2 w-2 bg-orange-500 [clip-path:polygon(50%_100%,0_0,100%_0)]' />
        </div>
        {/* Floating Badge */}
        <div className='absolute bottom-2 right-2 flex items-center gap-1 rounded-lg border border-orange-100 bg-white px-2 py-1 shadow-md'>
          <div className='h-1.5 w-1.5 rounded-full bg-orange-500' />
          <span className='text-[10px] font-bold text-gray-700'>
            대형견 가능
          </span>
        </div>
      </div>
    ),
  },
  {
    title: '방문 및 후기 남기기',
    description: (
      <>
        다녀온 뒤 다른 반려인들을 위해
        <br />
        생생한 방문 후기를 남겨주세요.
      </>
    ),
    bgColor: 'bg-orange-50',
    // Stylized UI: Review Card Fragment
    uiFragment: (
      <div className='flex w-full flex-col gap-2 rounded-xl border border-gray-100 bg-white p-3 shadow-sm'>
        <div className='flex items-center gap-2'>
          <div className='h-6 w-6 rounded-full bg-gray-200' />
          <div className='h-2 w-12 rounded-full bg-gray-200' />
        </div>
        <div className='flex gap-0.5 text-orange-400'>
          {[...Array(5)].map((_, i) => (
            <Icon key={i} group='general' name='heartFilled' size={10} />
          ))}
        </div>
        <p className='text-[10px] leading-tight text-gray-600'>
          "우리 아이가 정원에서 너무 신나게 놀았어요! 재방분 의사 200% 입니다
          🐶"
        </p>
      </div>
    ),
  },
];

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
        <h2 className='font-dohyeon text-3xl font-normal text-gray-900 md:text-5xl'>
          함께하개 이용 가이드
        </h2>
        <p className='mt-6 text-lg text-gray-500'>
          우리 아이와 함께하는 소중한 시간, 더 쉽고 완벽하게.
        </p>
      </div>

      <div className='grid grid-cols-1 gap-12 md:grid-cols-3'>
        {STEPS.map((step, index) => (
          <div
            key={index}
            className='group relative flex flex-col items-center'
          >
            {/* Step Content */}
            <div className='mb-8 flex flex-col items-center text-nowrap text-center'>
              <div className='mb-4 text-xs font-black uppercase tracking-widest text-orange-500'>
                Step {index + 1}
              </div>
              <h3 className='mb-3 text-2xl font-bold text-gray-900'>
                {step.title}
              </h3>
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
            {index < STEPS.length - 1 && (
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
        ))}
      </div>
    </section>
  );
};
