#!/usr/bin/env bash
set -euo pipefail

# --- Settings (change if needed) ---
GOOD_DEP="https://executive-partners-7vlrehfls-gil-malalel-s-projects.vercel.app"
# If you have a different Streamlit URL, set STREAMLIT_URL in the shell before running this script.
STREAMLIT_URL="${STREAMLIT_URL:-https://executive-partners-bp-simulator.streamlit.app}"

echo "→ Rolling back prod to good deployment..."
vercel rollback "$GOOD_DEP"

echo "→ Resolving Git SHA used by that deployment..."
GOOD_SHA=$(vercel inspect "$GOOD_DEP" --json | jq -r '.meta.gitCommitSha // .meta.commitSha // empty')
echo "GOOD_SHA=$GOOD_SHA"
[ -z "$GOOD_SHA" ] && { echo "ERROR: Could not resolve GOOD_SHA. Stop here."; exit 1; }

echo "→ Safety snapshot of current files..."
git checkout -b backup/today-state || true

echo "→ Resetting main to the good SHA..."
git checkout main
git fetch origin
git reset --hard "$GOOD_SHA"
git push --force

echo "→ Deploying exactly that code to prod..."
vercel deploy --prod

echo "→ Creating redirect for /bp-simulator to Streamlit..."
mkdir -p app/bp-simulator
cat > app/bp-simulator/route.ts <<'TS'
import { NextResponse } from "next/server";
export function GET() {
  const url = process.env.NEXT_PUBLIC_BP_SIM_URL || "STREAMLIT_URL_PLACEHOLDER";
  return NextResponse.redirect(url, 308);
}
TS
# Bake your URL into the file so it works without extra env var setup.
perl -0777 -pe "s|STREAMLIT_URL_PLACEHOLDER|$STREAMLIT_URL|g" -i app/bp-simulator/route.ts

echo "→ Commit & deploy redirect..."
git add app/bp-simulator/route.ts
git commit -m "BP Simulator: redirect /bp-simulator to Streamlit (no layout changes)"
git push
vercel deploy --prod

echo "✅ Done. If your Streamlit URL is different, rerun with:  STREAMLIT_URL='https://your-app.streamlit.app' ./fix-layout.sh"
