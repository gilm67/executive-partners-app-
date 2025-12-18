// app/private/admin/requests/page.tsx
import { requireAdmin } from "@/app/private/lib/require-admin";

export default async function AdminRequestsPage() {
  // 🔐 Block non-admins
  await requireAdmin();

  return (
    <div style={{ padding: 24 }}>
      <h1>Admin Access Requests</h1>

      <p>This page will list admin access requests.</p>
      <p>Next step: fetch data from Supabase.</p>
    </div>
  );
}