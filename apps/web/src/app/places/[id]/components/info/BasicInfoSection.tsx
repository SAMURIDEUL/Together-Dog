'use client';

import { Place } from '@/types/place';
import { formatDisplayAddress } from '@/utils/pet/parsers';

interface BasicInfoSectionProps {
  place: Place;
}

export const BasicInfoSection = ({ place }: BasicInfoSectionProps) => {
  const displayAddress = formatDisplayAddress(place);

  const copyAddress = () => {
    if (!displayAddress) return;
    navigator.clipboard.writeText(displayAddress);
    alert('주소가 복사되었습니다.');
  };

  return (
    <>
      <h2 className='mb-4 text-lg font-bold text-gray-900'>장소 정보</h2>
      <div className='mb-8 flex flex-col gap-4'>
        <div className='flex items-start gap-3'>
          <span className='w-16 shrink-0 text-gray-500'>주소</span>
          <div className='flex flex-row items-center gap-2'>
            <span className='text-gray-900'>
              {displayAddress || '주소 정보 없음'}
            </span>
            {displayAddress && (
              <button
                className='whitespace-nowrap text-xs text-gray-400 underline'
                onClick={copyAddress}
              >
                주소 복사
              </button>
            )}
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <span className='w-16 shrink-0 text-gray-500'>전화번호</span>
          <span className='text-gray-900'>{place.phone || '정보 없음'}</span>
        </div>

        <div className='flex items-center gap-3'>
          <span className='w-16 shrink-0 text-gray-500'>주차</span>
          <span className='text-gray-900'>
            {place.parkingAvailable ? '가능' : '불가'}
          </span>
        </div>
      </div>
    </>
  );
};
