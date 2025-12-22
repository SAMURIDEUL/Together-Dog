'use client';

import { cn, Icon, type iconPaths, SearchIcon } from '@together-dog/ui';
import type { ComponentProps } from 'react';

type CategoryKey = keyof typeof iconPaths.category;

const CATEGORIES: { label: string; id: CategoryKey }[] = [
  { label: '카페', id: 'cafe' },
  { label: '식당', id: 'restaurant' },
  { label: '숙소', id: 'pension' },
  { label: '호텔', id: 'hotel' },
  { label: '여행지', id: 'travelSpot' },
  { label: '박물관', id: 'museum' },
  { label: '미술관', id: 'artGallery' },
  { label: '문화센터', id: 'culturalCenter' },
  { label: '용품', id: 'petSupplies' },
  { label: '미용', id: 'grooming' },
  { label: '유치원', id: 'entrustedCare' },
  { label: '병원', id: 'petHospital' },
  { label: '약국', id: 'petPharmacy' },
];

const HERO_TITLE = '반려동물과 함께\n떠나볼까요?';

export const HeroSection = ({
  className,
  ...props
}: ComponentProps<'section'>) => {
  return (
    <section
      className={cn(
        'relative flex min-h-[500px] w-full flex-col items-center justify-center overflow-hidden bg-orange-50 px-4 py-20',
        className,
      )}
      {...props}
    >
      {/* Background Patterns */}
      <div className='absolute inset-0 z-0 bg-gradient-to-b from-orange-50/0 to-[var(--color-background)]' />

      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 bg-[url('/images/landing/dog-pattern.svg')] opacity-[0.2] [background-size:240px_240px]" />

      {/* Content */}
      <div className='relative z-10 flex w-full max-w-3xl flex-col items-center gap-8 text-center'>
        <h1 className='font-dohyeon whitespace-pre-wrap text-4xl font-normal leading-tight text-gray-900 md:text-5xl lg:text-6xl'>
          {HERO_TITLE}
        </h1>
        <p className='text-lg text-gray-600 md:text-xl'>
          함께 갈 수 있는 모든 곳을 찾아보세요 🐶
        </p>

        {/* Search Bar */}
        <div className='relative w-full max-w-xl'>
          <div className='pointer-events-none absolute inset-y-0 left-4 flex items-center text-gray-400'>
            <SearchIcon className='h-6 w-6' />
          </div>
          <input
            className='w-full rounded-full border border-gray-200 bg-white py-4 pl-12 pr-6 text-lg shadow-lg outline-none transition-all placeholder:text-gray-400 hover:shadow-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100'
            placeholder='어디로 떠나시나요?'
            type='text'
          />
        </div>

        {/* Categories */}
        <div className='flex flex-wrap justify-center gap-3 md:gap-4'>
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              className='flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md active:translate-y-0'
              type='button'
            >
              <Icon group='category' name={category.id} size={20} />
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
