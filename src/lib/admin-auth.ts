/** Stub admin auth; always returns true. Replace with real checks. */
export async function checkAdminAuth(): Promise<boolean> { return true; }
export async function requireAdmin(): Promise<boolean> { return true; }
export default { checkAdminAuth, requireAdmin };
