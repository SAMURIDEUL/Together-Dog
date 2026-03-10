import { useQuery } from '@tanstack/react-query';

import { getPlaceDetail } from '@/api/place';

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
