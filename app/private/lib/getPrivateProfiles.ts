import { supabaseAdmin } from "@/lib/supabase-server";

export async function getPrivateProfiles() {
  const { data, error } = await supabaseAdmin
    .from("private_profiles")
    .select(`
      id,
      headline,
      market,
      seniority,
      languages,
      aum_band,
      book_type,
      portability,
      availability,
      notes_public
    `)
    .eq("is_live", true)
    .order("market", { ascending: true });

  if (error) {
    console.error("getPrivateProfiles error:", error);
    return [];
  }

  return data ?? [];
}