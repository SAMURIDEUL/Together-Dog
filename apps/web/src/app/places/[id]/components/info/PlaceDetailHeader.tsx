import { CategoryBadge, LikeButton } from '@together-dog/ui';
import { useRouter } from 'next/navigation';

import { CONSTANTS } from '@/shared/config/constants';
import { useModalStore } from '@/stores/useModalStore';
import { Place } from '@/types/place';
import { CATEGORY_LABEL_MAP } from '@/utils/pet/constants';
import { getCategoryIcon } from '@/utils/pet/resolvers';

interface PlaceDetailHeaderProps {
  place: Place;
  isLiked: boolean;
  onLikeToggle: () => void;
}

export const PlaceDetailHeader = ({
  place,
  isLiked,
  onLikeToggle,
}: PlaceDetailHeaderProps) => {
  const router = useRouter();
  const { openModal, closeModal } = useModalStore();

  const validCategory = getCategoryIcon(place.categoryId, place.category3);

  const displayLabel =
    CATEGORY_LABEL_MAP[validCategory] || place.category3 || '장소';

  const handleLikeClick = () => {
    const token = localStorage.getItem(CONSTANTS.STORAGE_KEYS.AUTH_TOKEN);

    if (!token) {
      openModal({
        title: '로그인 필요',
        content:
          '찜 기능은 로그인이 필요한 서비스입니다.\n로그인 하시겠습니까?',
        primaryAction: {
          label: '로그인 하러가기',
          onClick: () => {
            closeModal();
            router.push('/login'); // Assuming login page is /login
          },
        },
        secondaryAction: {
          label: '취소',
          onClick: () => closeModal(),
        },
      });
      return;
    }

    onLikeToggle();
  };

  return (
    <div className='border-b border-gray-100 bg-white px-4 py-6'>
      <div className='flex items-start justify-between'>
        <div className='flex flex-col items-start gap-2'>
          <CategoryBadge category={validCategory} label={displayLabel} />
          <h1 className='text-2xl font-bold text-gray-900'>{place.name}</h1>
          <div className='flex items-center gap-1 text-sm text-gray-500'>
            <svg
              className='h-4 w-4 text-yellow-400'
              fill='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                clipRule='evenodd'
                d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
                fillRule='evenodd'
              />
            </svg>
            <span className='font-medium text-gray-900'>
              {place.averageRating ? place.averageRating.toFixed(1) : '0.0'}
            </span>
          </div>
        </div>
        <LikeButton isLike={isLiked} size={24} onClick={handleLikeClick} />
      </div>
    </div>
  );
};
