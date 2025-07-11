import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// Define protected routes that require authentication
const PROTECTED_ROUTES = ['/member']
// Define routes that should redirect to member if already authenticated
const AUTH_ROUTES = ['/login', '/register', '/forgot-password', '/reset-password']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('payload-token')?.value
  const user = request.cookies.get('payload-user')?.value

  // Check if the route is protected and user is not authenticated
  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route)) && !token) {
    // Store the original URL to redirect back after login
    const url = new URL('/login', request.url)
    url.searchParams.set('from', pathname)
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users away from auth pages
  if (AUTH_ROUTES.includes(pathname) && user) {
    // If user is adminUser, redirect to /admin, else to /member
    if (
      (user as any)?.collection === 'adminUsers' ||
      (user as any)?.role?.toLowerCase() === 'admin'
    ) {
      if (pathname !== '/admin') {
        return NextResponse.redirect(new URL('/admin', request.url))
      }
    } else {
      if (pathname !== '/member') {
        return NextResponse.redirect(new URL('/member', request.url))
      }
    }
  }

  return NextResponse.next()
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: [
    // Match all protected routes
    '/member/:path*',
    // Match auth routes
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
  ],
}
