import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getPlaceDetail, likePlace, unlikePlace } from '@/api/place';

export const placeKeys = {
  all: ['places'] as const,
  lists: () => [...placeKeys.all, 'list'] as const,
  list: (filters: string) => [...placeKeys.lists(), { filters }] as const,
  details: () => [...placeKeys.all, 'detail'] as const,
  detail: (id: number) => [...placeKeys.details(), id] as const,
  random: () => [...placeKeys.all, 'random'] as const,
  reviews: (id: number) => [...placeKeys.all, 'reviews', id] as const,
};

// 장소 상세 조회
export const usePlaceDetailQuery = (placeId: number) => {
  return useQuery({
    queryKey: placeKeys.detail(placeId),
    queryFn: () => getPlaceDetail(placeId),
    enabled: placeId > 0 && !Number.isNaN(placeId),
    staleTime: 1000 * 60 * 5, // 5분
  });
};

// ─── 찜 토글 Mutation ───
interface LikeToggleParams {
  placeId: number;
  isCurrentlyLiked: boolean;
}

export const useLikeToggleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ placeId, isCurrentlyLiked }: LikeToggleParams) =>
      isCurrentlyLiked ? unlikePlace(placeId) : likePlace(placeId),
    onSettled: (_data, _error, { placeId }) => {
      // 성공/실패 무관하게 관련 캐시 갱신
      queryClient.invalidateQueries({ queryKey: ['user', 'likedPlaceIds'] });
      queryClient.invalidateQueries({ queryKey: ['user', 'likedPlaces'] });
      queryClient.invalidateQueries({ queryKey: placeKeys.detail(placeId) });
    },
  });
};
