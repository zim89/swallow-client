import axios, {
  CreateAxiosDefaults,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios'
import { getTokenFromStorage, removeTokenFromStorage } from '../utils'

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    _isRetry?: boolean
  }
}

interface ApiErrorResponse {
  message?: string | string[]
}

const getContentType = () => ({
  'Content-Type': 'application/json',
})

const errorCatch = (error: AxiosError<ApiErrorResponse>): string => {
  const message = error?.response?.data?.message

  return message
    ? Array.isArray(message)
      ? message[0]
      : message
    : error.message
}

const options: CreateAxiosDefaults = {
  // todo: fix baseURL
  baseURL: 'https://back-dev2.fdout.com',
  headers: getContentType(),
  withCredentials: false,
}

export const axiosBase = axios.create(options)
export const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(config => {
  const accessToken = getTokenFromStorage()

  if (config?.headers && accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`

  return config
})

axiosWithAuth.interceptors.response.use(
  config => config,
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig

    if (
      (error?.response?.status === 401 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt must be provided') &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true

      try {
        // todo: Implement getNewTokens() method
        // await authService.getNewTokens()
        return axiosWithAuth.request(originalRequest)
      } catch (error) {
        if (axios.isAxiosError<ApiErrorResponse>(error)) {
          if (
            errorCatch(error) === 'jwt expired' ||
            errorCatch(error) === 'Refresh token not passed'
          ) {
            removeTokenFromStorage()
          }
        } else {
          console.error('Unknown error:', error)
        }
      }
    }

    throw error
  },
)
