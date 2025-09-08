import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Slugs to erase permanently
const GONE = new Set<string>([
  '/jobs/senior-relationship-manager-ch-onshore-4',
  '/jobs/senior-relationship-manager-brazil-2',
  '/jobs/private-banker-mea-2',
]);

export function middleware(req: NextRequest) {
  const { pathname } = new URL(req.url);

  if (GONE.has(pathname)) {
    // 410 Gone + noindex so search engines drop it quickly
    return new NextResponse('Gone', {
      status: 410,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'x-robots-tag': 'noindex, nofollow',
        'cache-control': 'no-store',
      },
    });
  }

  return NextResponse.next();
}

// Only run middleware on /jobs/* routes
export const config = {
  matcher: ['/jobs/:path*'],
};
