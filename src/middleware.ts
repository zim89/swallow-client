import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { appRoutes, storageKeys } from './shared/constants'

const JWT_SECRET = process.env.JWT_SECRET!

const protectedPaths = ['/categories', '/chats', '/profile']
const publicAuthPages = ['/auth/login', '/auth/register']

function isProtectedRoute(pathname: string): boolean {
  return protectedPaths.some(path => pathname.startsWith(path))
}

function isPublicAuthPage(pathname: string): boolean {
  return publicAuthPages.some(path => pathname === path)
}

async function verifyToken(token: string) {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET)

    const { payload } = await jwtVerify(token, secret)

    if (!payload?.userId) return null

    return payload
  } catch {
    return null
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accessToken = request.cookies.get(storageKeys.accessToken)?.value
  const hasToken = Boolean(accessToken)
  const isAuthPage = isPublicAuthPage(pathname)
  const isProtected = isProtectedRoute(pathname)

  // 🔁 Если пользователь уже авторизован и идет на /login или /register → редирект на /chats
  if (isAuthPage && hasToken) {
    const payload = await verifyToken(accessToken!)

    if (payload) {
      return NextResponse.redirect(
        new URL(appRoutes.chats.index.path, request.url),
      )
    }
  }

  // 🔒 Если идет на защищенную страницу без токена → редирект на /login
  if (isProtected && !hasToken) {
    return NextResponse.redirect(
      new URL(appRoutes.auth.login.path, request.url),
    )
  }

  // ✅ Проверка валидности accessToken для защищённых маршрутов
  if (isProtected && hasToken) {
    const payload = await verifyToken(accessToken!)
    if (!payload) {
      return NextResponse.redirect(
        new URL(appRoutes.auth.login.path, request.url),
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/chats/:path*',
    '/account/:path*',
    '/profile/:path*',
    '/auth/login',
    '/auth/register',
  ],
}
