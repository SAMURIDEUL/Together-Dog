import { CONSTANTS } from '@shared/config/constants';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { User } from '@/types/user';

/**
 * AuthState
 * isLoggedIn : 로그인 상태
 * user : 사용자 정보
 * isLoading : 로딩 상태 (로그인, 회원가입, 로그아웃 중)
 * error : 에러 메시지
 */
interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;

  // 상태 변경 액션들
  setLogin: (user: User) => void;
  setLogout: () => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

// 초기 상태
const initialState = {
  isLoggedIn: false,
  user: null,
  isLoading: false,
  error: null,
};

/**
 * Global Auth Store (전역 인증 상태 관리)
 *
 * @example
 * const { isLoggedIn, user, isLoading, error } = useAuthStore();
 * const { setLogin, setLogout, setIsLoading, setError } = useAuthStore();
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,

      // 상태 변경 액션들
      setLogin: (user: User) => set({ isLoggedIn: true, user }),
      setLogout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem(CONSTANTS.STORAGE_KEYS.AUTH_TOKEN);
          localStorage.removeItem(CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN);
        }
        set({ ...initialState });
      },
      setIsLoading: (isLoading: boolean) => set({ isLoading }),
      setError: (error: string | null) => set({ error }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
      }),
      onRehydrateStorage: () => (state) => {
        if (state && !state.isLoggedIn && typeof window !== 'undefined') {
          localStorage.removeItem(CONSTANTS.STORAGE_KEYS.AUTH_TOKEN);
          localStorage.removeItem(CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN);
        }
      },
    },
  ),
);
