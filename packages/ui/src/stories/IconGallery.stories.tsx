import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '../components/Icon/Icon';
import { iconPaths } from '../tokens/iconPath';

// 스토리북 메타 설정
const meta: Meta<typeof Icon> = {
  title: 'Design System/IconGallery',
  component: Icon,
};
export default meta;

// ✅ 모든 아이콘을 한눈에 보는 기본 스토리
export const AllIcons: StoryObj = {
  render: () => (
    <div className='grid grid-cols-6 gap-8 bg-gray-50 p-8'>
      {Object.entries(iconPaths).flatMap(([group, icons]) =>
        Object.entries(icons).map(([key, src]) => (
          <div
            key={`${group}-${key}`}
            className='flex flex-col items-center text-sm text-gray-700'
          >
            <img alt={key} height={40} src={src} width={40} />
            <span className='mt-2 font-medium'>
              {group}/{key}
            </span>
          </div>
        )),
      )}
    </div>
  ),
};

// ✅ 주요 그룹별 섹션 나눈 버전
export const GroupedIcons: StoryObj = {
  render: () => (
    <div className='space-y-10 bg-white p-10'>
      {Object.entries(iconPaths).map(([group, icons]) => (
        <section key={group}>
          <h2 className='mb-4 text-lg font-bold text-gray-800'>{group}</h2>
          <div className='grid grid-cols-6 gap-8'>
            {Object.entries(icons).map(([key, src]) => (
              <div
                key={`${group}-${key}`}
                className='flex flex-col items-center text-sm text-gray-700'
              >
                <img alt={key} height={40} src={src} width={40} />
                <span className='mt-2'>{key}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};

// ✅ 제한사항 대표 아이콘만 예시로 보여주는 스토리
export const RestrictionExamples: StoryObj = {
  render: () => (
    <div className='grid grid-cols-5 gap-8 bg-gray-50 p-8'>
      <div className='flex flex-col items-center text-sm text-gray-700'>
        <Icon group='restriction' name='speciesMulti' size={48} />
        <span className='mt-2 font-medium text-green-600'>제한 없음</span>
      </div>
      <div className='flex flex-col items-center text-sm text-gray-700'>
        <Icon group='restriction' name='warning' size={48} />
        <span className='mt-2 font-medium text-yellow-600'>주의</span>
      </div>
      <div className='flex flex-col items-center text-sm text-gray-700'>
        <Icon group='restriction' name='ban' size={48} />
        <span className='mt-2 font-medium text-red-600'>출입 금지</span>
      </div>
      <div className='flex flex-col items-center text-sm text-gray-700'>
        <Icon group='restriction' name='leash' size={48} />
        <span className='mt-2 font-medium text-gray-800'>목줄 필수</span>
      </div>
      <div className='flex flex-col items-center text-sm text-gray-700'>
        <Icon group='restriction' name='terrace' size={48} />
        <span className='mt-2 font-medium text-gray-500'>야외/테라스 전용</span>
      </div>
    </div>
  ),
};
