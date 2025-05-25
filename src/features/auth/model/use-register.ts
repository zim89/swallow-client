'use client'

import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  authApi,
  authQueryKeys,
  type AuthDto,
  type AuthResponse,
} from '@/entities/auth'
import { appRoutes } from '@/shared/constants'
import { useAuthStore } from './auth-store-provider'

export const useRegister = () => {
  const { setAuth } = useAuthStore(store => store)
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation<AuthResponse, Error, AuthDto>({
    mutationFn: (dto: AuthDto) => authApi.register(dto),

    onSuccess: data => {
      const userKey = authQueryKeys.user()
      const tokenKey = authQueryKeys.token()

      queryClient.setQueryData(userKey, data.user)
      queryClient.setQueryData(tokenKey, data.token)

      setAuth(data.token, data.user)
      toast.success('Registration successful!')
      router.push(appRoutes.categories.path)
    },
  })
}
