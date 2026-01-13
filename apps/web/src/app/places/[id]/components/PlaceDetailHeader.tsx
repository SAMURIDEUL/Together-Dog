import { CategoryBadge, LikeButton } from '@together-dog/ui';
import { useRouter } from 'next/navigation';

import { CONSTANTS } from '@/shared/config/constants';
import { useModalStore } from '@/stores/useModalStore';
import { Place } from '@/types/place';

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

  // Map backend Korean category names to Icon keys
  const getCategoryIconKey = (categoryName: string) => {
    if (!categoryName) return 'cafe';

    // Normalize string just in case
    const name = categoryName.trim();

    if (name.includes('카페')) return 'cafe';
    if (name.includes('음식점') || name.includes('식당')) return 'restaurant';
    if (name.includes('숙소') || name.includes('펜션') || name.includes('호텔'))
      return 'hotel'; // Check specific types if needed
    if (name.includes('미술관')) return 'artGallery';
    if (name.includes('박물관')) return 'museum';
    if (name.includes('여행') || name.includes('관광')) return 'travelSpot';
    if (name.includes('약국')) return 'petPharmacy';
    if (name.includes('동물병원') || name.includes('병원'))
      return 'petHospital';
    if (name.includes('용품') || name.includes('샵')) return 'petSupplies';
    if (name.includes('미용')) return 'grooming';
    // Add more mappings as needed based on actual data

    return 'cafe'; // Default fallback
  };

  const validCategory = getCategoryIconKey(place.category3);

  const categoryLabels: Record<string, string> = {
    cafe: '카페',
    restaurant: '식당',
    hotel: '숙소',
    museum: '박물관',
    artGallery: '미술관',
    pension: '숙소',
    travelSpot: '여행지',
    petPharmacy: '동물약국',
    petHospital: '동물병원',
    petSupplies: '용품점',
    grooming: '미용',
    culturalCenter: '문화센터',
    entrustedCare: '위탁관리',
  };

  const displayLabel =
    categoryLabels[validCategory] || place.category3 || '장소';

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
            <span>
              ⭐️ {place.averageRating ? place.averageRating.toFixed(1) : '0.0'}
            </span>
          </div>
        </div>
        <LikeButton isLike={isLiked} size={24} onClick={handleLikeClick} />
      </div>
    </div>
  );
};
