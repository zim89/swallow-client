import Cookies from 'js-cookie'
import { storageKeys } from '../constants'

export const getTokenFromStorage = () => {
  const accessToken = Cookies.get(storageKeys.accessToken)
  return accessToken || null
}

export const saveTokenToStorage = (accessToken: string) => {
  Cookies.set(storageKeys.accessToken, accessToken, {
    domain: 'localhost',
    sameSite: 'strict',
    expires: 1,
  })
}

export const removeTokenFromStorage = () => {
  Cookies.remove(storageKeys.accessToken)
}
