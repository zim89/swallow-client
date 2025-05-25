'use client'

import { createContext, useContext, useRef, type ReactNode } from 'react'
import { useStore } from 'zustand'
import { createAuthStore, type AuthStore } from './auth-store'

type AuthStoreApi = ReturnType<typeof createAuthStore>

const AuthStoreContext = createContext<AuthStoreApi | undefined>(undefined)

interface Props {
  children?: ReactNode
}

export const AuthStoreProvider = ({ children }: Props) => {
  const storeRef = useRef<AuthStoreApi | null>(null)

  if (storeRef.current === null) {
    storeRef.current = createAuthStore()
  }

  return (
    <AuthStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthStoreContext.Provider>
  )
}

export const useAuthStore = <T,>(selector: (store: AuthStore) => T): T => {
  const authStoreContext = useContext(AuthStoreContext)

  if (!authStoreContext) {
    throw new Error('useAuthStore must be used within AuthStoreProvider')
  }

  return useStore(authStoreContext, selector)
}
