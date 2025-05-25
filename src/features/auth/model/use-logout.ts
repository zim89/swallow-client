'use client'

import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi, authQueryKeys } from '@/entities/auth'
import { appRoutes } from '@/shared/constants'
import { useAuthStore } from './auth-store-provider'

export const useLogout = () => {
  const { resetAuth } = useAuthStore(store => store)
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation<void, Error, void>({
    mutationFn: () => authApi.logout(),

    onSuccess: () => {
      queryClient.removeQueries({ queryKey: authQueryKeys.root })
      resetAuth()
      router.push(appRoutes.auth.login.path)
    },
  })
}
