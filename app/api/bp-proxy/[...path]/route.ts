import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/** Build the upstream URL by stripping /api/bp-proxy from the incoming URL path */
function buildTargetURL(req: NextRequest) {
  const base = process.env.NEXT_PUBLIC_BP_SIM_URL;
  if (!base) throw new Error('NEXT_PUBLIC_BP_SIM_URL is not set');

  const incoming = new URL(req.url);                 // http://localhost:4000/api/bp-proxy/...
  const after = incoming.pathname.replace(/^\/api\/bp-proxy\/?/, ''); // remove the proxy prefix

  const target = new URL(base);                      // e.g. https://sim.execpartners.ch
  const basePath = target.pathname.replace(/\/+$/, '');
  const join = after ? `/${after}` : '';
  target.pathname = `${basePath}${join}`;
  target.search = incoming.search;                   // forward query string

  return target;
}

/** Absolute prefix we rewrite root-absolute URLs to (e.g. /api/bp-proxy/...) */
function getProxyBase(req: NextRequest) {
  const u = new URL(req.url);
  return `${u.origin}/api/bp-proxy/`;
}

async function forward(method: 'GET' | 'POST', req: NextRequest) {
  const url = buildTargetURL(req);

  const init: RequestInit = {
    method,
    body: method === 'POST' ? req.body : undefined,
    redirect: 'follow',
    cache: 'no-store',
    headers: {
      'User-Agent': req.headers.get('user-agent') ?? '',
      'Content-Type':
        req.headers.get('content-type') ?? (method === 'POST' ? 'application/octet-stream' : ''),
    },
  };

  const upstream = await fetch(url, init);
  const ct = upstream.headers.get('content-type') || '';
  const headers = new Headers(upstream.headers);

  // Allow embedding and avoid caching
  headers.delete('x-frame-options');
  headers.delete('content-security-policy');
  headers.set('access-control-allow-origin', '*');
  headers.set('cache-control', 'no-store');

  // HTML: inject <base> and rewrite root-absolute URLs to the proxy
  if (ct.includes('text/html')) {
    let html = await upstream.text();
    const base = getProxyBase(req);

    // Insert <base> after <head ...>
    html = html.replace(/<head(\s[^>]*)?>/i, (m) => `${m}<base href="${base}">`);

    // Rewrite root-absolute href/src/action/content="/..." → ".../api/bp-proxy/..."
    html = html.replace(
      /(\b(?:href|src|action|content)\s*=\s*["'])\//gi,
      `$1/api/bp-proxy/`
    );

    headers.set('content-type', 'text/html; charset=utf-8');
    return new Response(html, { status: upstream.status, headers });
  }

  // CSS: rewrite url(/...) → url(/api/bp-proxy/...)
  if (ct.includes('text/css')) {
    const css = await upstream.text();
    const out = css.replace(/url\(\s*\/(?!\/)/g, `url(/api/bp-proxy/`);
    headers.set('content-type', 'text/css; charset=utf-8');
    return new Response(out, { status: upstream.status, headers });
  }

  // Everything else: stream as-is
  return new Response(upstream.body, { status: upstream.status, headers });
}

export async function GET(req: NextRequest) {
  try {
    return await forward('GET', req);
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Proxy error', message: err?.message ?? 'Unknown' },
      { status: 502 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    return await forward('POST', req);
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Proxy error', message: err?.message ?? 'Unknown' },
      { status: 502 }
    );
  }
}

/** Optional: allow CORS preflight if the sim makes API calls */
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET,POST,OPTIONS',
      'access-control-allow-headers': '*',
      'cache-control': 'no-store',
    },
  });
}
