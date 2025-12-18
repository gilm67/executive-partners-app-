// app/private/config/mail.ts

/**
 * 🔒 SINGLE SOURCE OF TRUTH — OUTBOUND EMAIL IDENTITY
 *
 * This is the ONLY mailbox ever exposed to candidates, clients, or third parties.
 * Personal emails (e.g. gmail) must NEVER appear in emails.
 */

// ✅ literal is fine with `as const`
export const RECRUITER_MAILBOX = "recruiter@execpartners.ch" as const;

// ❌ do NOT use `as const` on computed template strings
export const MAIL_FROM = `Executive Partners <${RECRUITER_MAILBOX}>`;

// ❌ do NOT use `as const` on variable references
export const MAIL_REPLY_TO = RECRUITER_MAILBOX;