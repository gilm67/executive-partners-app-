// app/api/jobs/create/route.ts
import { NextResponse } from "next/server";
import { createJob, type NewJobInput } from "@/lib/sheets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    // Accept both camelCase and Sheet-style Title/Description field names
    const data = (await req.json().catch(() => ({}))) as Record<string, unknown>;

    const title = String(data.title ?? data.Title ?? "").trim();
    const description = String(data.description ?? data.Description ?? "").trim();
    const locationRaw = data.location ?? data.Location;
    const location =
      typeof locationRaw === "string" && locationRaw.trim()
        ? locationRaw.trim()
        : undefined;

    if (!title || !description) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields: title and description" },
        { status: 400 }
      );
    }

    const input: NewJobInput = { title, description, location };

    await createJob(input);

    return NextResponse.json({ ok: true, job: input });
  } catch (err: any) {
    console.error("jobs/create error:", err?.message || err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // This endpoint is write-only
  return NextResponse.json(
    { ok: false, error: "Method not allowed. Use POST." },
    { status: 405 }
  );
}

