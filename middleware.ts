// middleware.ts
import { NextResponse } from "next/server";

export const config = {
  // Only protect admin (mutating) routes
  matcher: [
    "/api/jobs/create",
    "/api/jobs/activate",
    "/api/jobs/reindex",
  ],
};

export default async function middleware(req: Request) {
  const url = new URL(req.url);
  const token = req.headers.get("x-admin-token") || "";
  const expected = process.env.JOBS_ADMIN_TOKEN || "";

  if (!expected || token !== expected) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.next();
}
