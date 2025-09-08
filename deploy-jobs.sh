#!/usr/bin/env bash
set -euo pipefail

FILES=( job-*.json )

for f in "${FILES[@]}"; do
  echo "➡️  Deploying $f ..."
  http_code=$(curl -sS -o /tmp/resp.json -w "%{http_code}" \
    -X POST "$API_BASE/api/jobs/create" \
    -H "Content-Type: application/json" \
    -H "$AUTH_HEADER_NAME: $AUTH_HEADER_VALUE" \
    --data-binary @"$f" || true)

  echo "HTTP $http_code"
  cat /tmp/resp.json
  echo "----------------------------------------"
done

echo "🎉 All jobs deployed."
