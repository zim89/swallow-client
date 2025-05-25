import { QueryClient } from '@tanstack/react-query'

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // Данные остаются свежими 5 минут
        gcTime: 1000 * 60 * 10, // Кэшируется 10 минут
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
    },
  })

let browserQueryClient: QueryClient | undefined

export const getQueryClient = () => {
  if (typeof window === 'undefined') {
    return createQueryClient()
  }

  if (!browserQueryClient) {
    browserQueryClient = createQueryClient()
  }

  return browserQueryClient
}
