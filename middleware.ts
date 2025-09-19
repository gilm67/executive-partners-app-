import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PREFIXED = [
  'markets','jobs','candidates','hiring-managers',
  'bp-simulator','portability','insights','about','contact'
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Pass through internal assets, api, already /en
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/en')) {
    return NextResponse.next();
  }
  if (pathname === '/') return NextResponse.next();

  const first = pathname.split('/').filter(Boolean)[0];
  if (first && PREFIXED.includes(first)) {
    const url = req.nextUrl.clone();
    url.pathname = `/en${pathname}`;
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)'],
};
