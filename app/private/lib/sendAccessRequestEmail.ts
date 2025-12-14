import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAccessRequestEmail(params: {
  requesterEmail: string;
  requesterOrg?: string | null;
  profileId: string;
  message?: string | null;
}) {
  const to = process.env.ACCESS_REQUEST_NOTIFY_TO;
  const from = process.env.RESEND_FROM;

  if (!to || !from || !process.env.RESEND_API_KEY) return;

  const subject = `New Private Profile Access Request — ${params.requesterEmail}`;

  const text = [
    `Requester: ${params.requesterEmail}`,
    `Organisation: ${params.requesterOrg ?? "-"}`,
    `Profile ID: ${params.profileId}`,
    `Message: ${params.message ?? "-"}`,
    "",
    `Supabase: private_profile_access_requests (latest row)`,
  ].join("\n");

  await resend.emails.send({
    from,
    to,
    subject,
    text,
  });
}