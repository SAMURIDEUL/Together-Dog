'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { PlaceInfoCard } from '@/components/shared/PlaceInfoCard';
import { PlaceItem } from '@/types/place';
import { mapPlaceToCardProps } from '@/utils/petMapper';

import { DASHBOARD_SECTIONS } from '../constants';

interface DashboardSectionProps {
  section: (typeof DASHBOARD_SECTIONS)[number];
  places: PlaceItem[];
}

export const DashboardSection = ({
  section,
  places,
}: DashboardSectionProps) => {
  const router = useRouter();

  return (
    <section className='flex flex-col gap-4'>
      <div className='flex items-end justify-between px-1'>
        <div>
          <h2 className='flex items-center gap-2 text-xl font-bold text-gray-900'>
            {section.title}
          </h2>
          <p className='mt-1 text-sm text-gray-500'>{section.subtitle}</p>
        </div>
        <button
          className='flex items-center gap-1 text-xs font-medium text-orange-500 transition-colors hover:text-orange-600'
          onClick={() => router.push(`/places?category=${section.apiId}`)}
        >
          더보기 <span className='text-lg leading-none'>›</span>
        </button>
      </div>

      <div className='scrollbar-hide -mx-4 flex gap-4 overflow-x-auto px-4 pb-4'>
        {places?.length > 0 ? (
          places.map((place, index) => {
            const placeId = place?.placeInfo?.id;
            const card = (
              <PlaceInfoCard
                {...mapPlaceToCardProps(place, index)}
                isLike={false}
              />
            );

            return (
              <div
                key={placeId ?? `place-${index}`}
                className='w-[280px] flex-shrink-0'
              >
                {placeId ? (
                  <Link href={`/places/${placeId}`}>{card}</Link>
                ) : (
                  card
                )}
              </div>
            );
          })
        ) : (
          <div className='w-full rounded-xl border border-dashed border-gray-200 bg-white py-10 text-center text-sm text-gray-400'>
            주변에 등록된 장소가 없습니다.
          </div>
        )}
      </div>
    </section>
  );
};
