import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');
  const isAdmin = request.nextUrl.pathname.startsWith('/admin');

  if (isDashboard || isAdmin) {
    const session = request.cookies.get('habitat_session');
    
    if (!session) {
      const url = new URL('/entrar', request.url);
      url.searchParams.set('next', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
