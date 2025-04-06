import { NextResponse } from 'next/server'
import { keycloakConfig } from '../keycloak/config'
import axiosInstance from '@acme/utils/axiosInstance'

export async function GET(request: Request) {
  try {
    // Get user info from Keycloak
    const userInfoEndpoint = `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/userinfo`
    const { data: userInfo } = await axiosInstance.get(userInfoEndpoint)

    return NextResponse.json({
      id: userInfo.sub,
      email: userInfo.email,
      name: userInfo.name,
    })
  } catch (error) {
    console.error('Error fetching user info:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user info' },
      { status: 401 }
    )
  }
} 