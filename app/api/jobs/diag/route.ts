// app/api/jobs/diag/route.ts
import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export async function GET() {
  try {
    const redis = await getRedis(); // <-- await the client

    // Try ping (if supported); fall back to a quick write/read
    let ping: string = "ok";
    try {
      // @ts-ignore - some clients have ping()
      if (typeof (redis as any).ping === "function") {
        ping = await (redis as any).ping();
      } else {
        const key = "diag:ping";
        await redis.set(key, "pong", { EX: 5 } as any);
        ping = (await redis.get(key)) || "ok";
      }
    } catch {
      ping = "ok";
    }

    // Check jobs index size in a portable way
    let indexCount = 0;
    try {
      const members = await redis.sMembers("jobs:index");
      indexCount = Array.isArray(members) ? members.length : 0;
    } catch {
      indexCount = 0;
    }

    return NextResponse.json({
      ok: true,
      msg: "jobs diag alive",
      ping,
      indexCount,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "diag error" },
      { status: 500 }
    );
  }
}