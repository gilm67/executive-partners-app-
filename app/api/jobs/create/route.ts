// app/api/jobs/create/route.ts
import { NextResponse } from "next/server";
import { createJob, type NewJobInput } from "@/lib/sheets";

/** Env helpers */
function hasAdminToken() {
  return !!process.env.APP_ADMIN_TOKEN;
}

function getAuthToken(req: Request) {
  // 1) Authorization: Bearer <token>
  const auth = req.headers.get("authorization") || "";
  if (auth.toLowerCase().startsWith("bearer ")) {
    return auth.slice(7).trim();
  }
  // 2) ?token=<token>
  const url = new URL(req.url);
  const q = url.searchParams.get("token");
  return q ? q.trim() : "";
}

function toHex(s: string) {
  return Buffer.from(s, "utf8").toString("hex");
}

/** GET — small diagnostics so you don’t see 405 */
export async function GET(req: Request) {
  return NextResponse.json({
    ok: true,
    diag: "jobs/create",
    hasEnv: hasAdminToken(),
    tokenLen: (process.env.APP_ADMIN_TOKEN || "").length,
    echoHint: "POST with Authorization: Bearer <APP_ADMIN_TOKEN> or ?token=...",
  });
}

/** POST — secured create */
export async function POST(req: Request) {
  const url = new URL(req.url);
  const wantDebug = url.searchParams.get("debug") === "1";

  if (!hasAdminToken()) {
    return NextResponse.json(
      { ok: false, error: "Server missing APP_ADMIN_TOKEN" },
      { status: 500 }
    );
  }

  const supplied = getAuthToken(req);
  const server = process.env.APP_ADMIN_TOKEN as string;

  if (supplied !== server) {
    if (wantDebug) {
      return NextResponse.json(
        {
          ok: false,
          error: "Unauthorized",
          why: {
            eq: supplied === server,
            suppliedLen: supplied.length,
            serverLen: server.length,
            suppliedFirstLast: [supplied.slice(0, 4), supplied.slice(-4)],
            serverFirstLast: [server.slice(0, 4), server.slice(-4)],
            suppliedHex: toHex(supplied).slice(0, 40) + "...",
            serverHex: toHex(server).slice(0, 40) + "...",
          },
        },
        { status: 401 }
      );
    }
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let body: NewJobInput;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!body?.title) {
    return NextResponse.json({ ok: false, error: "Missing 'title'" }, { status: 400 });
  }

  await createJob(body);
  return NextResponse.json({ ok: true });
}

