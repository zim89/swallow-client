const publicRoute = (path: string) => ({ path, protected: false })
// const protectedRoute = (path: string) => ({ path, protected: true })

export const appRoutes = {
  base: {
    home: publicRoute('/'),
  },
  auth: {
    login: publicRoute('/login'),
    register: publicRoute('/register'),
  },
}
