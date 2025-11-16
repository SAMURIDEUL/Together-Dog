import type { Meta, StoryObj } from '@storybook/react';

import { categoryLabels } from '../../tokens/categoryLabels';
import { iconPaths } from '../../tokens/iconPath';
import { CategoryBadge } from './CategoryBadge';

const meta: Meta<typeof CategoryBadge> = {
  title: 'Components/Badge/CategoryBadge',
  component: CategoryBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '카테고리별 뱃지를 보기 좋게 정렬한 전체 미리보기입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CategoryBadge>;

/* 🎨 전체 카테고리 보기 */
export const AllCategories: Story = {
  render: () => (
    <div className='flex min-h-screen w-full justify-center bg-[var(--color-background)] py-16'>
      <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
        {(
          Object.keys(iconPaths.category) as Array<
            keyof typeof iconPaths.category
          >
        ).map((key) => (
          <div key={key} className='flex justify-center'>
            <CategoryBadge
              category={key}
              icon={key}
              label={categoryLabels[key]}
            />
          </div>
        ))}
      </div>
    </div>
  ),
};

/* ✨ 단일 예시 */
export const Cafe: Story = {
  args: {
    category: 'cafe',
    label: '카페',
    icon: 'cafe',
  },
};

export const Restaurant: Story = {
  args: {
    category: 'restaurant',
    label: '식당',
    icon: 'restaurant',
  },
};
