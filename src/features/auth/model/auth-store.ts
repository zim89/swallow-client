'use client'

import Cookies from 'js-cookie'
import { createJSONStorage, persist } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'
import type { PublicUser } from '@/entities/auth'
import { storageKeys } from '@/shared/constants'

const cookieOptions = {
  sameSite: 'strict' as const,
  expires: 1,
}
export type AuthState = {
  user: PublicUser | null
  token: string | null
}

export type AuthActions = {
  setAuth: (token: string, user: PublicUser) => void
  resetAuth: () => void
}

export type AuthStore = AuthState & AuthActions

const defaultAuthState: AuthState = {
  user: null,
  token: null,
}

export const createAuthStore = (initState: AuthState = defaultAuthState) => {
  return createStore<AuthStore>()(
    persist(
      set => ({
        ...initState,
        setAuth: (token, user) => {
          Cookies.set(storageKeys.accessToken, token, cookieOptions)
          set({ token: token, user: user })
        },
        resetAuth: () => {
          Cookies.remove(storageKeys.accessToken)
          set(defaultAuthState)
        },
      }),
      {
        name: storageKeys.auth,
        storage: createJSONStorage(() => localStorage),
      },
    ),
  )
}
