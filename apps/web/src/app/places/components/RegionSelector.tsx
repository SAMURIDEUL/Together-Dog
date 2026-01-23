'use client';

import { cn } from '@together-dog/ui';
import { useState } from 'react';

import { REGION_DATA } from '../data/regionData';

interface RegionSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (regionName: string) => void;
}

export const RegionSelector = ({ isOpen, onClose, onComplete }: RegionSelectorProps) => {
  const [selectedSido, setSelectedSido] = useState<string>('서울');
  const [selectedSigungu, setSelectedSigungu] = useState<string>('');
  const [selectedDong, setSelectedDong] = useState<string>('');

  if (!isOpen) return null;

  const sidos = Object.keys(REGION_DATA);
  const sigungus = selectedSido ? Object.keys(REGION_DATA[selectedSido]) : [];
  const dongs = (selectedSido && selectedSigungu) ? REGION_DATA[selectedSido][selectedSigungu] : [];

  const handleComplete = (dong: string) => {
    setSelectedDong(dong);
    onComplete(`${selectedSido} ${selectedSigungu} ${dong}`);
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm'>
      <div className='relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl transition-all'>
        {/* 헤더 */}
        <div className='flex items-center justify-between border-b px-6 py-4'>
          <h3 className='text-xl font-bold text-gray-900'>지역 검색</h3>
          <button className='text-gray-400 hover:text-gray-600' onClick={onClose}>✕</button>
        </div>

        {/* 선택 영역 */}
        <div className='grid grid-cols-3 divide-x h-[400px]'>
          {/* 1. 시/도 */}
          <div className='overflow-y-auto p-2 scrollbar-thin'>
            <div className='mb-2 px-3 text-xs font-semibold text-gray-400 uppercase'>시/도</div>
            {sidos.map((sido) => (
              <button
                key={sido}
                className={cn(
                  'w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors',
                  selectedSido === sido ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'
                )}
                onClick={() => { setSelectedSido(sido); setSelectedSigungu(''); setSelectedDong(''); }}
              >
                {sido}
              </button>
            ))}
          </div>

          {/* 2. 시/군/구 */}
          <div className='overflow-y-auto p-2 scrollbar-thin bg-gray-50/50'>
            <div className='mb-2 px-3 text-xs font-semibold text-gray-400 uppercase'>시/군/구</div>
            {sigungus.map((sigungu) => (
              <button
                key={sigungu}
                className={cn(
                  'w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors',
                  selectedSigungu === sigungu ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600 hover:bg-white/50'
                )}
                onClick={() => { setSelectedSigungu(sigungu); setSelectedDong(''); }}
              >
                {sigungu}
              </button>
            ))}
          </div>

          {/* 3. 읍/면/동 */}
          <div className='overflow-y-auto p-2 scrollbar-thin'>
            <div className='mb-2 px-3 text-xs font-semibold text-gray-400 uppercase'>읍/면/동</div>
            {dongs.map((dong) => (
              <button
                key={dong}
                className={cn(
                  'w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors',
                  selectedDong === dong ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'
                )}
                onClick={() => handleComplete(dong)}
              >
                {dong}
              </button>
            ))}
            {dongs.length === 0 && (
              <div className='flex h-full items-center justify-center p-8 text-center text-sm text-gray-400'>
                시/군/구를<br />선택해주세요
              </div>
            )}
          </div>
        </div>

        {/* 푸터 */}
        <div className='bg-gray-50 px-6 py-4 text-xs text-gray-500'>
          원하시는 지역의 &apos;동&apos;을 클릭하면 해당 위치로 지도가 이동합니다.
        </div>
      </div>
    </div>
  );
};
