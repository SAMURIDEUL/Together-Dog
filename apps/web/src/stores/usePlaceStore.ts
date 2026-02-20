import { create } from 'zustand';

import { getPlaces } from '@/api/place';
import { DASHBOARD_SECTIONS } from '@/app/places/constants';
import { PlaceItem } from '@/types/place';

interface PlaceState {
  userLocation: { lat: number; lng: number } | null;
  locationStatus: 'loading' | 'granted' | 'denied';
  sectionData: Record<string, PlaceItem[]>;
  allPlaces: PlaceItem[];
  categoryPlaces: PlaceItem[];
  loading: boolean;
  categoryLoading: boolean;
  error: string | null;

  // Actions
  setUserLocation: (location: { lat: number; lng: number } | null) => void;
  setLocationStatus: (status: 'loading' | 'granted' | 'denied') => void;
  initLocation: () => void;
  fetchDashboardData: (location: { lat: number; lng: number }) => Promise<void>;
  fetchCategoryData: (
    categoryId: number,
    location: { lat: number; lng: number },
  ) => Promise<void>;
}

export const usePlaceStore = create<PlaceState>((set) => ({
  userLocation: null,
  locationStatus: 'loading',
  sectionData: {},
  allPlaces: [],
  categoryPlaces: [],
  loading: false,
  categoryLoading: false,
  error: null,

  setUserLocation: (userLocation) => set({ userLocation }),
  setLocationStatus: (locationStatus) => set({ locationStatus }),

  initLocation: () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          set({ userLocation: loc, locationStatus: 'granted' });
        },
        (error) => {
          console.warn('Location permission denied:', error);
          set({
            userLocation: { lat: 37.5665, lng: 126.978 },
            locationStatus: 'denied',
          });
        },
      );
    } else {
      set({
        userLocation: { lat: 37.5665, lng: 126.978 },
        locationStatus: 'denied',
      });
    }
  },

  fetchDashboardData: async (location) => {
    set({ loading: true, error: null });
    try {
      const results = await Promise.all(
        DASHBOARD_SECTIONS.map((section) =>
          getPlaces(section.apiId, {
            size: 10,
            lat: location.lat,
            lon: location.lng,
          }).then((res) => ({
            id: section.id,
            data: res.data.places,
          })),
        ),
      );

      const sectionData: Record<string, PlaceItem[]> = {};
      let collectedPlaces: PlaceItem[] = [];

      results.forEach(({ id, data }) => {
        sectionData[id] = data;
        collectedPlaces = [...collectedPlaces, ...data];
      });

      set({ sectionData, allPlaces: collectedPlaces, loading: false });
    } catch {
      set({ error: '장소 정보를 불러오는데 실패했습니다.', loading: false });
    }
  },

  fetchCategoryData: async (categoryId, location) => {
    set({ categoryLoading: true, error: null });
    try {
      const res = await getPlaces(categoryId, {
        size: 50,
        lat: location.lat,
        lon: location.lng,
      });
      set({ categoryPlaces: res.data.places, categoryLoading: false });
    } catch {
      set({
        error: '장소 정보를 불러오는데 실패했습니다.',
        categoryLoading: false,
      });
    }
  },
}));
