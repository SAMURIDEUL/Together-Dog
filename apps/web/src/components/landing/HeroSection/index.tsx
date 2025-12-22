'use client';

import { cn, Icon, type iconPaths, SearchIcon } from '@together-dog/ui';
import Image from 'next/image';
import type { ComponentProps } from 'react';

type CategoryKey = keyof typeof iconPaths.category;

const CATEGORIES: { label: string; id: CategoryKey }[] = [
  { label: '카페', id: 'cafe' },
  { label: '식당', id: 'restaurant' },
  { label: '숙소', id: 'pension' },
  { label: '여행지', id: 'travelSpot' },
  { label: '병원', id: 'petHospital' },
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
      <div className='absolute inset-0 z-0 bg-gradient-to-b from-orange-50 to-white' />

      {/* Dog Illustration */}
      <div className='absolute -left-10 bottom-10 z-0 w-32 opacity-20 md:left-10 md:w-48 lg:left-20 lg:w-64'>
        <Image
          priority
          alt='Dog illustration'
          className='h-auto w-full'
          height={300}
          src='/images/landing/dog.jpg'
          width={300}
        />
      </div>

      {/* Cat Illustration (Stretching) */}
      <div className='absolute -right-10 top-10 z-0 w-32 rotate-12 opacity-20 md:right-10 md:w-40 lg:right-20 lg:w-56'>
        <Image
          priority
          alt='Cat stretching illustration'
          className='h-auto w-full'
          height={200}
          src='/images/landing/cat-stretch.jpg'
          width={300}
        />
      </div>

      {/* Cat Illustration (Rolling) */}
      <div className='absolute bottom-20 right-10 z-0 hidden w-24 -rotate-12 opacity-15 md:block md:w-32 lg:right-40 lg:w-40'>
        <Image
          priority
          alt='Cat rolling illustration'
          className='h-auto w-full'
          height={300}
          src='/images/landing/cat-roll.jpg'
          width={300}
        />
      </div>

      {/* Content */}
      <div className='relative z-10 flex w-full max-w-3xl flex-col items-center gap-8 text-center'>
        <h1 className='font-dohyeon whitespace-pre-wrap text-4xl font-normal leading-tight text-gray-900 md:text-5xl lg:text-6xl'>
          {HERO_TITLE}
        </h1>
        <p className='text-lg text-gray-600 md:text-xl'>
          함께 갈 수 있는 모든 곳을 찾아보세요
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
