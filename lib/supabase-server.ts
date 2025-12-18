// lib/supabase-server.ts
import { createRequire } from "module";
import type { SupabaseClient } from "@supabase/supabase-js";

let _admin: SupabaseClient | null = null;

export async function getSupabaseAdmin() {
  if (_admin) return _admin;

  const supabaseUrl = process.env.SUPABASE_URL || "";
  const serviceRole =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE ||
    process.env.SUPABASE_SERVICE_KEY ||
    "";

  if (!supabaseUrl || !serviceRole) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY on server");
  }

  // ✅ CJS require avoids Next/webpack ESM wrapper issue
  const require = createRequire(import.meta.url);
  const { createClient } = require("@supabase/supabase-js") as typeof import("@supabase/supabase-js");

  _admin = createClient(supabaseUrl, serviceRole, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return _admin;
}