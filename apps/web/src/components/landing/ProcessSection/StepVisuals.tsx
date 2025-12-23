import { Icon, SearchIcon } from '@together-dog/ui';

export const SearchStepVisual = () => (
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
);

export const FilterStepVisual = () => (
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
      <span className='text-[10px] font-bold text-gray-700'>대형견 가능</span>
    </div>
  </div>
);

export const ReviewStepVisual = () => (
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
      "우리 아이가 정원에서 너무 신나게 놀았어요! 재방문 의사 200% 입니다 🐶"
    </p>
  </div>
);
