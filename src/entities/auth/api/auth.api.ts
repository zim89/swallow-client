import { apiRoutes, axiosBase, axiosWithAuth } from '@/shared/api'
import type { AuthDto, AuthResponse } from '../auth.types'

class AuthApi {
  async login(data: AuthDto) {
    const response = await axiosBase.post<AuthResponse>(
      apiRoutes.auth.login,
      data,
    )
    return response.data
  }

  async register(data: AuthDto) {
    const response = await axiosBase.post<AuthResponse>(
      apiRoutes.auth.register,
      data,
    )
    return response.data
  }

  async logout() {
    const response = await axiosWithAuth.get(apiRoutes.auth.logout)
    return response.data
  }
}

export const authApi = new AuthApi()
