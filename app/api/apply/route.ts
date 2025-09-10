// app/api/apply/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  role?: string;
  market?: string;
  jobId?: string;
  notes?: string;
  // If a file is ever sent, we’ll serialize its meta safely:
  cvFile?: { name: string; type: string; size: number } | null;
  _meta?: Record<string, unknown>;
};

async function parseRequest(req: Request): Promise<Payload> {
  const ct = (req.headers.get("content-type") || "").toLowerCase();

  // --- JSON body ---
  if (ct.includes("application/json")) {
    const json = (await req.json()) as Record<string, unknown>;
    return {
      name: String(json.name ?? ""),
      email: String(json.email ?? ""),
      role: String(json.role ?? json.job ?? ""),
      market: String(json.market ?? ""),
      jobId: String(json.jobId ?? ""),
      notes: String(json.notes ?? ""),
      cvFile: null,
      _meta: { contentType: ct, transport: "json" },
    };
  }

  // --- Form submissions (multipart or urlencoded) ---
  if (
    ct.includes("multipart/form-data") ||
    ct.includes("application/x-www-form-urlencoded")
  ) {
    const form = await req.formData();

    // If a file is present, capture lightweight meta (don’t forward raw bytes here)
    const file = form.get("cv") as File | null;
    const cvFile =
      file instanceof File
        ? { name: file.name, type: file.type, size: file.size }
        : null;

    const get = (k: string) => {
      const v = form.get(k);
      return typeof v === "string" ? v : "";
    };

    return {
      name: get("name"),
      email: get("email"),
      role: get("role") || get("job"),
      market: get("market"),
      jobId: get("jobId"),
      notes: get("notes"),
      cvFile,
      _meta: { contentType: ct, transport: "form" },
    };
  }

  // --- Fallback: try JSON first, then form ---
  try {
    const json = (await req.json()) as Record<string, unknown>;
    return {
      name: String(json.name ?? ""),
      email: String(json.email ?? ""),
      role: String(json.role ?? json.job ?? ""),
      market: String(json.market ?? ""),
      jobId: String(json.jobId ?? ""),
      notes: String(json.notes ?? ""),
      cvFile: null,
      _meta: { contentType: ct, transport: "fallback-json" },
    };
  } catch {
    const form = await req.formData().catch(() => null);
    if (form) {
      const get = (k: string) => {
        const v = form.get(k);
        return typeof v === "string" ? v : "";
      };
      return {
        name: get("name"),
        email: get("email"),
        role: get("role") || get("job"),
        market: get("market"),
        jobId: get("jobId"),
        notes: get("notes"),
        cvFile: null,
        _meta: { contentType: ct, transport: "fallback-form" },
      };
    }
  }

  // If truly unknown content-type:
  throw new Error(
    'Unsupported Content-Type. Send JSON (application/json) or form data (multipart/form-data or application/x-www-form-urlencoded).'
  );
}

export async function POST(req: Request) {
  try {
    const payload = await parseRequest(req);

    // Basic sanity (optional — keeps UX nice)
    if (!payload.name || !payload.email) {
      return NextResponse.json(
        { ok: false, error: "Name and email are required." },
        { status: 400 }
      );
    }

    // OPTIONAL: Forward to your webhook (Google Apps Script / Zapier / Manatal)
    const url = process.env.APPLICANT_WEBHOOK_URL;
    if (url) {
      // We forward as JSON; receivers can parse the fields they need
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          receivedAt: new Date().toISOString(),
          source: "execpartners.ch/apply",
        }),
      }).catch(() => {
        /* mute downstream errors to not break UX */
      });
    }

    return NextResponse.json({ ok: true, received: payload });
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        error:
          err?.message ||
          "Apply endpoint failed. Please retry or email info@execpartners.ch.",
      },
      { status: 500 }
    );
  }
}