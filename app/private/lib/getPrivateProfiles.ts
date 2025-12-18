import { getSupabaseAdmin } from "@/lib/supabase-server";

export async function getPrivateProfiles() {
  const supabaseAdmin = await getSupabaseAdmin();

  const { data, error } = await supabaseAdmin
    .from("private_profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}