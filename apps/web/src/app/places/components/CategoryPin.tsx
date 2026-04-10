'use client';

import Image from 'next/image';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';

import { CATEGORY_IMAGE_MAP } from '@/utils/pet/constants';
import { getCategoryIcon } from '@/utils/pet/resolvers';

interface CategoryPinProps {
  position: { lat: number; lng: number };
  categoryId: number;
  category3: string;
  name: string;
  onClick: () => void;
}

export const CategoryPin = ({
  position,
  categoryId,
  category3,
  name,
  onClick,
}: CategoryPinProps) => {
  const iconName = getCategoryIcon(categoryId, category3);
  const iconFilename = CATEGORY_IMAGE_MAP[iconName] || 'travelSpot.png';
  const iconUrl = `/images/category/${iconFilename}`;

  return (
    <CustomOverlayMap position={position} yAnchor={1}>
      <div
        className='relative flex cursor-pointer flex-col items-center transition-transform hover:scale-110 active:scale-95'
        title={name}
        onClick={onClick}
      >
        {/* Pin Shape */}
        <div className='relative h-12 w-10'>
          <svg
            className='drop-shadow-md'
            fill='none'
            height='48'
            viewBox='0 0 40 48'
            width='40'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M20 48C20 48 40 31.5 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.5 20 48 20 48Z'
              fill='#FF8A00'
            />
            {/* 흰색 배경을 여유있게 키움 (15.5 -> 17) */}
            <circle cx='20' cy='20' fill='white' r='17' />
          </svg>

          {/* Category Icon - 컨테이너에 rounded-full, overflow-hidden을 추가하여 사각형이 삐져나오지 않게 함 */}
          <div className='absolute inset-x-0 top-[2px] flex h-[36px] items-center justify-center'>
            <div className='relative h-[30px] w-[30px] overflow-hidden rounded-full bg-white'>
              <Image
                fill
                priority
                alt={iconName}
                className='object-contain p-0.5'
                sizes='30px'
                src={iconUrl}
              />
            </div>
          </div>
        </div>
      </div>
    </CustomOverlayMap>
  );
};
