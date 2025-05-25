export const authQueryKeys = {
  root: ['auth'] as const,
  user: () => [...authQueryKeys.root, 'user'] as const,
  token: () => [...authQueryKeys.root, 'token'] as const,
  tokenStatus: () => [...authQueryKeys.root, 'tokenStatus'] as const,
}
