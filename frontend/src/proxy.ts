import { NextResponse, type NextRequest } from 'next/server'

const AUTH_COOKIE = 'portfolio-auth-token'

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname !== '/admin') {
    return NextResponse.next()
  }

  if (request.cookies.has(AUTH_COOKIE)) {
    return NextResponse.next()
  }

  const loginUrl = new URL('/login', request.url)
  loginUrl.searchParams.set('next', request.nextUrl.pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/admin'],
}
