import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";
import { assertAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const auth = await assertAdmin(req);
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: auth.message }, { status: auth.status });
  }

  const redis = await getRedis();
  const toAdd = new Set<string>();

  // scan job:* hashes
  // @ts-ignore
  for await (const k of redis.scanIterator({ match: "job:*" }) as AsyncIterable<string>) {
    toAdd.add(k);
  }
  // scan jobs:by-slug:* pointers
  // @ts-ignore
  for await (const k of redis.scanIterator({ match: "jobs:by-slug:*" }) as AsyncIterable<string>) {
    const id = await redis.get(k);
    if (id) toAdd.add(String(id));
  }

  let added = 0;
  if (toAdd.size) {
    const ids = Array.from(toAdd);
    const CHUNK = 500;
    for (let i = 0; i < ids.length; i += CHUNK) {
      const slice = ids.slice(i, i + CHUNK);
      // @ts-ignore
      const n = await redis.sAdd("jobs:index", ...slice);
      added += Number(n) || 0;
    }
  }

  const count = await redis.sCard("jobs:index");
  return NextResponse.json({ ok: true, added, total: count });
}
