import axios from 'axios'

// Create axios instance with default config
const axiosInstance: any = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: any) => {
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
  (error: any) => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: any) => response,
  async (error: any) => {
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
            if (state.user?.refresh_token) {
              // Call refresh token endpoint
              const refreshResponse = await axios.post(
                `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/token`,
                new URLSearchParams({
                  grant_type: 'refresh_token',
                  client_id: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID!,
                  refresh_token: state.user.refresh_token,
                }),
                {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                  },
                }
              )

              // Update tokens in storage
              const newAuthData = {
                ...state,
                user: {
                  ...state.user,
                  token: refreshResponse.data.access_token,
                  refresh_token: refreshResponse.data.refresh_token,
                },
              }
              localStorage.setItem('auth-storage', JSON.stringify(newAuthData))

              // Retry the original request with new token
              originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.access_token}`
              return axiosInstance(originalRequest)
            }
          }
        }
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError)
        // If refresh fails, redirect to login
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