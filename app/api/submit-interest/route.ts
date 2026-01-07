import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

function err(message: string, status = 500, details?: unknown) {
  const body =
    process.env.NODE_ENV === "production"
      ? { error: message }
      : { error: message, details };
  return NextResponse.json(body, { status });
}

export async function POST(req: NextRequest) {
  try {
    if (!SUPABASE_URL) return err("SUPABASE_URL is missing", 500);
    if (!SUPABASE_SERVICE_ROLE_KEY) return err("SUPABASE_SERVICE_ROLE_KEY is missing", 500);

    const data = await req.json();

    // minimal validation
    if (!data?.email || !data?.fullName || !data?.phone) {
      return err("Missing required fields", 400, {
        email: !!data?.email,
        fullName: !!data?.fullName,
        phone: !!data?.phone,
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });

    // Map to DB columns (snake_case)
    const payload = {
      full_name: String(data.fullName),
      email: String(data.email),
      phone: String(data.phone),

      portable_aum: data.portableAUM ? String(data.portableAUM) : null,
      location_status: data.locationStatus ? String(data.locationStatus) : null,
      compensation: data.compensation ? String(data.compensation) : null,
      contact_method: data.contactMethod ? String(data.contactMethod) : null,

      job_id: data.jobId ? String(data.jobId) : null,
      job_title: data.jobTitle ? String(data.jobTitle) : null,
      market: data.market ? String(data.market) : null,

      user_agent: req.headers.get("user-agent"),
      source: req.headers.get("referer") || "execpartners.ch",
    };

    const { error } = await supabase.from("express_interest").insert(payload);

    if (error) return err("Supabase insert failed", 500, error);

    return NextResponse.json({ success: true });
  } catch (e) {
    return err("Failed to process submission", 500, e);
  }
}