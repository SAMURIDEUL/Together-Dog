// apps/web/src/components/shared/PlaceInfoCard/index.tsx

import {
  CategoryBadge,
  iconPaths,
  LikeButton,
  PlaceInfoBadge,
  type PlaceInfoBadgeProps,
} from '@together-dog/ui';
import clsx from 'clsx';
import Image from 'next/image';

export interface PlaceInfoCardProps {
  id?: number;
  imageSrc: string;
  category: keyof (typeof iconPaths)['category'];
  categoryLabel: string;
  name: string;
  address: string;
  badges: Array<PlaceInfoBadgeProps & { key?: string | number }>;
  isLike?: boolean;
  onLikeClick?: (e: React.MouseEvent) => void;
  className?: string;
  disabled?: boolean;
  priority?: boolean;
  onDetailClick?: (e: React.MouseEvent) => void;
  layout?: 'vertical' | 'horizontal';
}

export const PlaceInfoCard = ({
  imageSrc,
  category,
  categoryLabel,
  name,
  address,
  badges,
  isLike = false,
  onLikeClick,
  className,
  disabled = false,
  priority = false,
  onDetailClick,
  layout = 'vertical',
}: PlaceInfoCardProps) => {
  const isHorizontal = layout === 'horizontal';

  return (
    <div
      className={clsx(
        'group relative w-full overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg',
        isHorizontal ? 'flex flex-row gap-0' : 'flex flex-col',
        className,
      )}
    >
      {/* 이미지 영역 */}
      <div
        className={clsx(
          'relative shrink-0 overflow-hidden bg-gray-50',
          isHorizontal ? 'w-32 sm:w-40' : 'aspect-[4/3] w-full',
        )}
      >
        <Image
          fill
          alt={name || 'Place Image'}
          className='object-cover transition-transform duration-300 group-hover:scale-110'
          priority={priority}
          sizes={
            isHorizontal
              ? '(max-width: 768px) 120px, 160px'
              : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          }
          src={imageSrc}
        />
        {/* 카테고리 뱃지 (좌측 상단) */}
        {!isHorizontal && (
          <div className='absolute left-3 top-3'>
            <CategoryBadge category={category} label={categoryLabel} />
          </div>
        )}
        {/* 좋아요 버튼 (우측 상단) - 가로형에서는 정보 영역으로 이동 가능하지만 일단 유지 */}
        <div className='absolute right-3 top-3 z-10'>
          <LikeButton
            disabled={disabled}
            isLike={isLike}
            size={isHorizontal ? 16 : 20}
            onClick={onLikeClick}
          />
        </div>
      </div>

      {/* 정보 영역 */}
      <div
        className={clsx(
          'flex flex-1 flex-col justify-between overflow-hidden',
          isHorizontal ? 'p-3' : 'gap-3 p-4',
        )}
      >
        <div className='flex items-start justify-between gap-2'>
          <div className='min-w-0 flex-1'>
            {isHorizontal && (
              <span className='mb-1 text-[10px] font-semibold text-orange-500'>
                {categoryLabel}
              </span>
            )}
            <h3
              className={clsx(
                'truncate font-bold text-gray-900',
                isHorizontal ? 'text-base' : 'text-lg',
              )}
            >
              {name}
            </h3>
            <p className='mt-0.5 truncate text-[12px] text-gray-500'>
              {address}
            </p>
          </div>
          {onDetailClick && (
            <button
              className={clsx(
                'whitespace-nowrap font-bold text-orange-500 hover:text-orange-600 hover:underline',
                isHorizontal ? 'text-[11px]' : 'mb-1 text-xs',
              )}
              type='button'
              onClick={(e) => {
                e.stopPropagation();
                onDetailClick(e);
              }}
            >
              상세보기 ›
            </button>
          )}
        </div>

        {/* 뱃지 영역 (가로 스크롤 가능) */}
        <div
          className={clsx(
            'thin-scrollbar flex items-center gap-1.5 overflow-x-auto',
            isHorizontal ? 'mt-auto pt-2' : 'pb-2',
          )}
        >
          {badges.map(({ key, ...badgeProps }, index) => (
            <PlaceInfoBadge
              key={key || index}
              {...badgeProps}
              className='flex-shrink-0'
            />
          ))}
        </div>
      </div>
    </div>
  );
};
