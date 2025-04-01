import axios from 'axios'

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Only access localStorage on the client side
    if (typeof window !== 'undefined') {
      const authData = localStorage.getItem('auth-storage')
      if (authData) {
        try {
          const { state } = JSON.parse(authData)
          if (state.user?.token) {
            // Add token to headers
            config.headers.Authorization = `Bearer ${state.user.token}`
          }
        } catch (error) {
          console.error('Error parsing auth data:', error)
        }
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If error is 401 and we haven't tried to refresh token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Only access localStorage on the client side
        if (typeof window !== 'undefined') {
          const authData = localStorage.getItem('auth-storage')
          if (authData) {
            const { state } = JSON.parse(authData)
            if (state.user?.token) {
              // Here you would typically call your refresh token endpoint
              // For now, we'll just redirect to login
              window.location.href = '/login'
            }
          }
        }
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError)
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance 