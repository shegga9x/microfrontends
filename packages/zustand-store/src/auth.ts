import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// import { axiosInstance } from '@acme/utils';

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  // initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: (userData) => set({ user: userData, isAuthenticated: true, isLoading: false }),
      logout: () => set({ user: null, isAuthenticated: false, isLoading: false }),
      // initialize: async () => {
      //   try {
      //     // Try to get user info from the backend
      //     const { data } = await axiosInstance.get('/api/auth/me');
      //     set({ user: data, isAuthenticated: true, isLoading: false });
      //   } catch (error) {
      //     // If the request fails, user is not authenticated
      //     set({ user: null, isAuthenticated: false, isLoading: false });
      //   }
      // },
    }),
    {
      name: 'auth-storage',
    }
  )
); 