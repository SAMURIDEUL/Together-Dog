'use client';

import { useState } from 'react';

import { useLikeToggleMutation } from '@/hooks/queries/usePlaceQuery';
import { useLikedPlaceIdsQuery } from '@/hooks/queries/useUserQuery';
import { useAuthStore } from '@/stores/useAuthStore';
import { useToastStore } from '@/stores/useToastStore';
import { PlaceItem } from '@/types/place';

import { SortOrder } from '../../hooks/useMapSearch';
import { DesktopSidebar } from './DesktopSidebar';
import { MobileBottomSheet } from './MobileBottomSheet';
import { PlaceList } from './PlaceList';
import { SortOptions } from './SortOptions';

interface PlaceResultViewProps {
  places: PlaceItem[];
  loading: boolean;
  onPlaceClick: (place: PlaceItem) => void;
  getCategoryKey: (id: number) => any;
  sortBy: SortOrder;
  onSortChange: (sort: SortOrder) => void;
  onNavigate: (place: PlaceItem) => void;
}

export const PlaceResultView = ({
  places,
  loading,
  onPlaceClick,
  getCategoryKey,
  sortBy,
  onSortChange,
  onNavigate,
}: PlaceResultViewProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const { isLoggedIn } = useAuthStore();
  const { data: likedPlaceIds } = useLikedPlaceIdsQuery(isLoggedIn);
  const { mutate: toggleLike, isPending: isLikeToggling } =
    useLikeToggleMutation();
  const { addToast } = useToastStore();

  const handleLikeClick = (e: React.MouseEvent, item: PlaceItem) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      addToast('로그인이 필요한 서비스입니다.', 'default');
      return;
    }

    const isCurrentlyLiked =
      likedPlaceIds?.includes(item.placeInfo.id) ?? false;
    if (isLikeToggling) return;

    toggleLike(
      { placeId: item.placeInfo.id, isCurrentlyLiked },
      {
        onSuccess: () => {
          addToast(
            isCurrentlyLiked
              ? '찜 목록에서 제외되었습니다.'
              : '찜 목록에 추가되었습니다.',
            isCurrentlyLiked ? 'default' : 'success',
          );
        },
        onError: () =>
          addToast('요청에 실패했습니다. 다시 시도해 주세요.', 'error'),
      },
    );
  };

  const sortOptions = (
    <SortOptions sortBy={sortBy} onSortChange={onSortChange} />
  );

  return (
    <>
      <DesktopSidebar
        headerContent={sortOptions}
        isVisible={isVisible}
        resultCount={places.length}
        onClose={() => setIsVisible(false)}
      >
        <PlaceList
          getCategoryKey={getCategoryKey}
          layout='horizontal'
          likedPlaceIds={likedPlaceIds}
          loading={loading}
          places={places}
          onLikeClick={handleLikeClick}
          onNavigate={onNavigate}
          onPlaceClick={onPlaceClick}
        />
      </DesktopSidebar>

      <MobileBottomSheet
        headerContent={sortOptions}
        isExpanded={isExpanded}
        resultCount={places.length}
        setIsExpanded={setIsExpanded}
      >
        <PlaceList
          getCategoryKey={getCategoryKey}
          layout='horizontal'
          likedPlaceIds={likedPlaceIds}
          loading={loading}
          places={places}
          onLikeClick={handleLikeClick}
          onNavigate={onNavigate}
          onPlaceClick={onPlaceClick}
        />
      </MobileBottomSheet>
    </>
  );
};
