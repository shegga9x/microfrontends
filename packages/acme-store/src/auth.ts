import { create } from 'zustand'
import axiosInstance from '@acme/utils/axios'

interface User {
  id: string
  username: string
  email: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: async (username: string, password: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axiosInstance.post('/api/auth/keycloak', {
        username,
        password,
      })
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      })
    } catch (error) {
      set({
        error: 'Invalid credentials',
        isLoading: false,
      })
      throw error
    }
  },
  logout: async () => {
    set({ isLoading: true, error: null })
    try {
      await axiosInstance.post('/api/auth/logout')
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      })
    } catch (error) {
      set({
        error: 'Failed to logout',
        isLoading: false,
      })
      throw error
    }
  },
})) 