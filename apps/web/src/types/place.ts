export interface ApiPlaceResponse {
  status: number;
  message: string;
  data: Place[];
  path: string;
  timestamp: string;
}

export interface PlaceItem {
  placeInfo: Place;
  thumbnail?: string;
  top3photos?: string[];
}

export interface RandomPlaceResponse {
  status: number;
  message: string;
  data: PlaceItem[];
  path: string;
  timestamp: string;
}

export interface PetPolicy {
  placeId?: number;
  petAllowed: boolean;
  petSizeLimit: string;
  indoorFlag: boolean;
  outdoorFlag: boolean;
  petRestrictions: string;
}

export interface Place {
  id: number;
  name: string;
  category3: string;
  city: string;
  district: string;
  subdistrict: string;
  roadAddress: string;
  postalCode: string; // string in JSON "12790"
  phone: string;
  lat: number;
  lon: number;
  updatedAt: string;
  categoryId: number;
  petPolicy: PetPolicy;
  averageRating?: number;
  isLiked?: boolean;
}

export interface PlaceDetail {
  placeInfo: Place;
  top3photos: string[];
}

export interface PlaceDetailResponse {
  status: number;
  message: string;
  data: PlaceDetail;
  path: string;
  timestamp: string;
}

export interface PlaceReviewPhoto {
  id: number;
  photoUrl: string;
}

export interface PlaceReview {
  id: number;
  placeId: number;
  userId: number;
  rating: number;
  content: string;
  visitDate: string;
  createdAt: string;
  photos: PlaceReviewPhoto[] | string[];
  nickname?: string;
}

export interface PlaceReviewResponse {
  reviews: PlaceReview[];
  hasNext: boolean;
}

export interface ApiPlaceReviewResponse {
  status: number;
  message: string;
  data: PlaceReviewResponse;
  path: string;
  timestamp: string;
}
