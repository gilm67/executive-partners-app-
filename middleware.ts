import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const p = req.nextUrl.pathname;
  if (p.startsWith('/bp-simulator') || p.startsWith('/business-plan-simulator')) {
    const res = NextResponse.next();
    res.cookies.set('ep-sim', '1', { path: '/', httpOnly: false, sameSite: 'Lax', maxAge: 3600 });
    return res;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/bp-simulator/:path*', '/business-plan-simulator/:path*'],
};
