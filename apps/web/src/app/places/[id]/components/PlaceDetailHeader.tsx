import { CategoryBadge, iconPaths, LikeButton } from '@together-dog/ui';

import { Place } from '@/types/place';

interface PlaceDetailHeaderProps {
  place: Place;
}

export const PlaceDetailHeader = ({ place }: PlaceDetailHeaderProps) => {
  // TODO: Add category mapping logic or passed down prop if needed.
  // For now using safe default or mapping from categoryId if possible
  // Assuming 'cafe' as default or determined by backend category3 string if matches keys

  // Simple mapping helper - reuse from PlaceInfoCard logic or similar if available
  // For now, hardcoding or safe check.
  const categoryKey = place.category3
    ? (place.category3.toLowerCase() as keyof typeof iconPaths.category)
    : 'cafe';
  const validCategory = iconPaths.category[categoryKey] ? categoryKey : 'cafe';

  return (
    <div className='border-b border-gray-100 bg-white px-4 py-6'>
      <div className='flex items-start justify-between'>
        <div className='flex flex-col gap-2'>
          <CategoryBadge category={validCategory} label={place.category3} />
          <h1 className='text-2xl font-bold text-gray-900'>{place.name}</h1>
          <div className='flex items-center gap-1 text-sm text-gray-500'>
            <span>
              ⭐️ {place.averageRating ? place.averageRating.toFixed(1) : '0.0'}
            </span>
            {/* <span>• 리뷰 0</span> */}
          </div>
        </div>
        <LikeButton isLike={false} size={24} onClick={() => {}} />
      </div>
    </div>
  );
};
