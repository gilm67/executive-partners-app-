#!/usr/bin/env bash
set -euo pipefail

# 1) ensure ONLY a route exists at /bp-simulator
git rm -f app/bp-simulator/page.tsx app/bp-simulator/page.tsx.save app/bp-simulator/metadata.ts 2>/dev/null || true
mkdir -p app/bp-simulator
cat > app/bp-simulator/route.ts <<'TS'
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"; // ensure no static prerender
export function GET() {
  return NextResponse.redirect("https://executive-partners-bp-simulator.streamlit.app", 308);
}
TS
cat > vercel.json <<'JSON'
{
  "redirects": [
    {
      "source": "/bp-simulator",
      "destination": "https://executive-partners-bp-simulator.streamlit.app",
      "permanent": true
    }
  ]
}
JSON
git add -A
git commit -m "BP Simulator: CDN redirect + route; remove stale page/metadata" || true
git push
vercel deploy --force --prod
