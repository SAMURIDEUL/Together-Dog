export const iconPaths = {
  // 🏷️ 카테고리 아이콘
  category: {
    cafe: '/icons/category/cafe.svg',
    restaurant: '/icons/category/restaurant.svg',
    hotel: '/icons/category/hotel.svg',
    museum: '/icons/category/museum.svg',
    artGallery: '/icons/category/art-gallery.svg',
    pension: '/icons/category/pension.svg',
    travelSpot: '/icons/category/travel-spot.svg',
    petPharmacy: '/icons/category/pet-pharmacy.svg',
    petHospital: '/icons/category/pet-hospital.svg',
    petSupplies: '/icons/category/pet-supplies.svg',
    grooming: '/icons/category/grooming.svg',
    culturalCenter: '/icons/category/cultural-center.svg',
    entrustedCare: '/icons/category/entrusted-care.svg',
  },

  // 🚫 반려동물 제한사항 아이콘
  restriction: {
    ban: '/icons/restriction/ban.svg',
    leash: '/icons/restriction/leash.svg',
    vaccination: '/icons/restriction/vaccination.svg',
    bark: '/icons/restriction/bark.svg',
    cleaning: '/icons/restriction/cleaning.svg',
    document: '/icons/restriction/document.svg',
    diaper: '/icons/restriction/diaper.svg',
    warning: '/icons/restriction/dog-warning.svg',
    terrace: '/icons/restriction/terrace.svg',
    floor: '/icons/restriction/floor.svg',
    muzzle: '/icons/restriction/muzzle.svg',
    catsOnly: '/icons/restriction/cats-only.svg',
    dogsOnly: '/icons/restriction/dogs-only.svg',
    sizeS: '/icons/restriction/size-s.svg',
    sizeM: '/icons/restriction/size-m.svg',
    sizeL: '/icons/restriction/size-l.svg',
    speciesMulti: '/icons/restriction/species-multi.svg',
    pets: '/icons/restriction/pets.svg',
    noCats: '/icons/restriction/no-cats.svg',
    noMarking: '/icons/restriction/no-marking.svg',
    carrier: '/icons/restriction/pet-carrier.svg',
    stroller: '/icons/restriction/pet-stroller.svg',
    noEntry: '/icons/restriction/no-entry.svg',
    poopBag: '/icons/restriction/poop-bag.svg',
    timeLimit: '/icons/restriction/time-limit.svg',
  },

  // 🌐 일반 정보용 아이콘
  general: {
    mapPin: '/icons/general/map-pin.svg',
    map: '/icons/general/map.svg',
    clock: '/icons/general/clock.svg',
    parking: '/icons/general/parking.svg',
    direction: '/icons/general/direction.svg',
    phone: '/icons/general/phone.svg',
    website: '/icons/general/website.svg',
    info: '/icons/general/info.svg',
    heart: '/icons/general/heart.svg',
    heartFilled: '/icons/general/heart-filled.svg',
  },
} as const;

export type IconGroup = keyof typeof iconPaths;
