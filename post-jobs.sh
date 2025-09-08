#!/bin/sh
set -eu

# ===== Config (override via env if needed) =====
ADMIN_TOKEN="${ADMIN_TOKEN:-ep_admin_2025_Qr7xN8wL3cV1zT6p}"
API_BASE="${API_BASE:-https://jobs.execpartners.ch}"

# Choose the auth header your API expects:
AUTH_HEADER_NAME="${AUTH_HEADER_NAME:-x-admin-token}"   # or "Authorization"
AUTH_HEADER_VALUE="${AUTH_HEADER_VALUE:-$ADMIN_TOKEN}"  # or "Bearer $ADMIN_TOKEN"

post_job() {
  file="$1"
  if [ ! -f "$file" ]; then
    echo "❌ Missing file: $file" >&2
    return 1
  fi
  echo "➡️  Posting $file ..."
  http_code="$(curl -sS -o /tmp/resp.json -w '%{http_code}' \
    -X POST "$API_BASE/api/jobs/create" \
    -H 'Content-Type: application/json' \
    -H "$AUTH_HEADER_NAME: $AUTH_HEADER_VALUE" \
    --data-binary @"$file")" || { echo "❌ curl failed"; cat /tmp/resp.json || true; exit 1; }

  echo "HTTP $http_code"
  if command -v jq >/dev/null 2>&1; then jq . /tmp/resp.json || cat /tmp/resp.json; else cat /tmp/resp.json; fi
  echo "✅ Done: $file"
  echo "----------------------------------------"
}

# Only the 4 files you need to post (others already live)
post_job "job-mea-zurich.json"
post_job "job-ch-onshore-zurich.json"
post_job "job-ch-onshore-lausanne.json"
post_job "job-portugal-geneva.json"

echo "🎉 All requested jobs posted."
