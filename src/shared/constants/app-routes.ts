const publicRoute = (path: string) => ({ path, protected: false })
const protectedRoute = (path: string) => ({ path, protected: true })

export const appRoutes = {
  home: publicRoute('/'),
  categories: protectedRoute('/categories'),
  chats: {
    index: protectedRoute('/chats'),
  },
  auth: {
    login: publicRoute('/auth/login'),
    register: publicRoute('/auth/register'),
  },
} as const
