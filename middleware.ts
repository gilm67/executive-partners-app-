import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // When users are on the simulator paths, set a short-lived cookie.
  if (
    pathname.startsWith('/bp-simulator') ||
    pathname.startsWith('/business-plan-simulator')
  ) {
    const res = NextResponse.next();
    res.cookies.set('ep-sim', '1', {
      path: '/',
      httpOnly: false,
      sameSite: 'Lax',
      maxAge: 60 * 60, // 1 hour is plenty
    });
    return res;
  }

  return NextResponse.next();
}

// Only run for simulator routes.
export const config = {
  matcher: ['/bp-simulator/:path*', '/business-plan-simulator/:path*'],
};
