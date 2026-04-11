// apps/web/src/components/shared/PlaceInfoCard/index.tsx

import {
  CategoryBadge,
  iconPaths,
  LikeButton,
  PlaceInfoBadge,
  type PlaceInfoBadgeProps,
} from '@together-dog/ui';
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
}: PlaceInfoCardProps) => {
  return (
    <div
      className={`group relative w-full overflow-hidden rounded-xl bg-white shadow-md ${
        className || ''
      }`}
    >
      {/* 이미지 영역 */}
      <div className='relative aspect-[4/3] w-full overflow-hidden bg-gray-50'>
        <Image
          fill
          alt={name || 'Place Image'}
          className='object-cover transition-transform duration-300 group-hover:scale-110'
          priority={priority}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          src={imageSrc}
        />
        {/* 카테고리 뱃지 (좌측 상단) */}
        <div className='absolute left-3 top-3'>
          <CategoryBadge category={category} label={categoryLabel} />
        </div>
        {/* 좋아요 버튼 (우측 상단) */}
        <div className='absolute right-3 top-3 z-10'>
          <LikeButton
            disabled={disabled}
            isLike={isLike}
            size={20}
            onClick={onLikeClick}
          />
        </div>
      </div>

      {/* 정보 영역 */}
      <div className='flex flex-col gap-3 p-4'>
        <div className='flex items-end justify-between'>
          <div>
            <h3 className='text-lg font-bold text-gray-900'>{name}</h3>
            <p className='mt-1 line-clamp-1 text-sm text-gray-500'>{address}</p>
          </div>
          {onDetailClick && (
            <button
              className='mb-1 whitespace-nowrap text-xs font-bold text-orange-500 hover:text-orange-600 hover:underline'
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
        <div className='thin-scrollbar flex items-center gap-1.5 overflow-x-auto pb-2'>
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
