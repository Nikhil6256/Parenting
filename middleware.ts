import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Admin routes: owner only
    if (pathname.startsWith('/admin')) {
      if (!token || token.role !== 'owner') {
        if (pathname.startsWith('/api/')) {
          return new NextResponse(
            JSON.stringify({ error: 'Forbidden: Owner access required' }),
            { status: 403, headers: { 'Content-Type': 'application/json' } }
          );
        }
        const url = req.nextUrl.clone();
        url.pathname = '/login';
        url.searchParams.set('callbackUrl', pathname);
        url.searchParams.set('error', 'AccessDenied');
        return NextResponse.redirect(url);
      }
    }

    // Customer protected routes
    if (
      pathname.startsWith('/my-courses') ||
      pathname.startsWith('/profile') ||
      pathname.startsWith('/checkout')
    ) {
      if (!token) {
        const url = req.nextUrl.clone();
        url.pathname = '/login';
        url.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  },
  {
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      authorized({ token, req }) {
        const { pathname } = req.nextUrl;
        if (
          pathname.startsWith('/admin') ||
          pathname.startsWith('/my-courses') ||
          pathname.startsWith('/profile') ||
          pathname.startsWith('/checkout')
        ) {
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    '/admin/:path*',
    '/my-courses/:path*',
    '/profile/:path*',
    '/checkout/:path*',
    '/api/admin/:path*',
  ],
};
