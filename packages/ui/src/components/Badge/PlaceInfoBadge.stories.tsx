import type { Meta, StoryObj } from '@storybook/react';

import { iconPaths } from '../../tokens/iconPath';
import { PlaceInfoBadge } from './PlaceInfoBadge';

const meta: Meta<typeof PlaceInfoBadge> = {
  title: 'Components/Badge/PlaceInfoBadge',
  component: PlaceInfoBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PlaceInfoBadge>;

export const Default: Story = {
  args: {
    text: '주차 가능',
    group: 'general',
    name: 'parking',
  },
};

export const WithRestriction: Story = {
  args: {
    text: '대형견 불가',
    group: 'restriction',
    name: 'sizeL',
    variant: 'warning',
  },
};

export const LargeDogAllowed: Story = {
  args: {
    text: '대형견 가능',
    group: 'restriction', // 아이콘은 같지만
    name: 'sizeL',
    variant: 'positive', // 긍정의 의미 (초록)
  },
};

export const LongText: Story = {
  args: {
    text: '이곳은 주차 공간이 매우 협소합니다',
    group: 'general',
    name: 'info',
  },
};

/* 🎨 전체 뱃지 모아보기 */
export const AllBadges: Story = {
  render: () => (
    <div className='flex flex-col gap-8 p-8'>
      {/* General Icons */}
      <section>
        <h3 className='mb-4 text-lg font-bold'>General</h3>
        <div className='flex flex-wrap gap-4'>
          {(
            Object.keys(iconPaths.general) as Array<
              keyof typeof iconPaths.general
            >
          ).map((key) => (
            <PlaceInfoBadge
              key={key}
              group='general'
              name={key}
              text={key} // 임시로 키 이름을 텍스트로 사용
            />
          ))}
        </div>
      </section>

      {/* Restriction Icons */}
      <section>
        <h3 className='mb-4 text-lg font-bold'>Restriction</h3>
        <div className='flex flex-wrap gap-4'>
          {(
            Object.keys(iconPaths.restriction) as Array<
              keyof typeof iconPaths.restriction
            >
          ).map((key) => (
            <PlaceInfoBadge
              key={key}
              group='restriction'
              name={key}
              text={key} // 임시로 키 이름을 텍스트로 사용
            />
          ))}
        </div>
      </section>
    </div>
  ),
};
