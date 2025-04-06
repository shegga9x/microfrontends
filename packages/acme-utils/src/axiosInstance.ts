import axios from 'axios'

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // In browser environment, get token from cookies
    if (typeof window !== 'undefined') {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1]

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
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

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Get refresh token from cookies
        const refreshToken = document.cookie
          .split('; ')
          .find((row) => row.startsWith('refresh_token='))
          ?.split('=')[1]

        if (!refreshToken) {
          throw new Error('No refresh token')
        }

        // Refresh token
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
          { refresh_token: refreshToken }
        )

        // Update cookies
        document.cookie = `token=${data.token}; path=/`
        document.cookie = `refresh_token=${data.refresh_token}; path=/`

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${data.token}`
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        // Clear cookies on refresh failure
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
        document.cookie = 'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance