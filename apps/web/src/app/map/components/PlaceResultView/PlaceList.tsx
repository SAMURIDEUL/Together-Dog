'use client';

import { PlaceInfoCard } from '@/components/shared/PlaceInfoCard';
import { PlaceItem } from '@/types/place';
import { getAmenityBadges, getPetSizeBadge } from '@/utils/pet/parsers';

interface PlaceListProps {
  places: PlaceItem[];
  loading: boolean;
  likedPlaceIds?: number[];
  onPlaceClick: (place: PlaceItem) => void;
  onNavigate: (place: PlaceItem) => void;
  onLikeClick: (e: React.MouseEvent, item: PlaceItem) => void;
  getCategoryKey: (id: number) => any;
  layout?: 'vertical' | 'horizontal';
}

export const PlaceList = ({
  places,
  loading,
  likedPlaceIds,
  onPlaceClick,
  onNavigate,
  onLikeClick,
  getCategoryKey,
  layout = 'vertical',
}: PlaceListProps) => {
  if (loading) {
    return (
      <div className='flex h-40 items-center justify-center text-gray-400'>
        불러오는 중...
      </div>
    );
  }

  if (places.length === 0) {
    return (
      <div className='flex h-40 items-center justify-center text-gray-400'>
        일치하는 장소가 없습니다.
      </div>
    );
  }

  return places.map((item, index) => (
    <div
      key={item.placeInfo.id}
      className='cursor-pointer focus:outline-none'
      role='button'
      tabIndex={0}
      onClick={() => onPlaceClick(item)}
      onKeyDown={(e) => e.key === 'Enter' && onPlaceClick(item)}
    >
      <PlaceInfoCard
        address={item.placeInfo.roadAddress}
        badges={[
          ...(item.placeInfo.petPolicy?.petSizeLimit
            ? [getPetSizeBadge(item.placeInfo.petPolicy.petSizeLimit)!]
            : []),
          ...getAmenityBadges(
            item.placeInfo.petPolicy?.indoorFlag,
            item.placeInfo.petPolicy?.outdoorFlag,
            item.placeInfo.parkingAvailable,
          ),
        ].filter(Boolean)}
        category={getCategoryKey(item.placeInfo.categoryId)}
        categoryLabel={item.placeInfo.category3}
        imageSrc={item.thumbnail || '/images/logo.png'}
        isLike={likedPlaceIds?.includes(item.placeInfo.id)}
        layout={layout}
        name={item.placeInfo.name}
        priority={index < 2} // 첫 2개 카드에 priority 부여
        onDetailClick={(e) => {
          e.stopPropagation();
          onNavigate(item);
        }}
        onLikeClick={(e) => onLikeClick(e, item)}
      />
    </div>
  ));
};
