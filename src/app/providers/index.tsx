'use client'

import type { ReactNode } from 'react'
import { AuthStoreProvider } from '@/features/auth'
import { Toaster } from '@/shared/components/ui/sonner'
import { QueryProvider } from './query-provider'

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <AuthStoreProvider>
      <QueryProvider>{children}</QueryProvider>
      <Toaster
        position='top-right'
        toastOptions={{
          style: {
            width: '250px',
            maxWidth: '90vw',
            boxSizing: 'border-box',
          },
        }}
      />
    </AuthStoreProvider>
  )
}
