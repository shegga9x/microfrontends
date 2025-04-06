import { NextResponse } from 'next/server'
import { keycloakConfig } from './config'
import axiosInstance from '@acme/utils/axiosInstance'
import axios, { AxiosError } from 'axios'

interface KeycloakErrorResponse {
  error: string;
  error_description: string;
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    const tokenEndpoint = `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`
    
    const formData = new URLSearchParams()
    formData.append('grant_type', 'password')
    formData.append('client_id', keycloakConfig.clientId)
    formData.append('scope', 'openid profile email')
    
    // For public clients, we don't need client_secret
    if (keycloakConfig.clientSecret) {
      formData.append('client_secret', keycloakConfig.clientSecret)
    }
    
    formData.append('username', username)
    formData.append('password', password)

    // Use axiosInstance for automatic token handling
    const { data: tokenData } = await axiosInstance.post(tokenEndpoint, formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    
    // Get user info
    const userInfoEndpoint = `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/userinfo`
    const { data: userInfo } = await axiosInstance.get(userInfoEndpoint, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    // Create response with user data
    const response = NextResponse.json({
      user: {
        id: userInfo.sub,
        email: userInfo.email,
        name: userInfo.name,
        token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
      },
    })

    // Set cookies
    response.cookies.set('token', tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    response.cookies.set('refresh_token', tokenData.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Authentication error:', error)
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<KeycloakErrorResponse>
      return NextResponse.json(
        { error: axiosError.response?.data?.error_description || 'Authentication failed' },
        { status: axiosError.response?.status || 401 }
      )
    }
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    )
  }
} 