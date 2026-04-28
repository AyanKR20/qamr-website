// Server-only Supabase admin helpers.
// Uses the service role key — NEVER expose this to the browser.
//
// This module must only be imported from server code (route handlers,
// server components). The service role key has no NEXT_PUBLIC_ prefix
// so Next.js will not bundle it into the client; if this module were
// ever imported from a client component the env var read below would
// resolve to undefined and ensureConfigured() would throw.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function ensureConfigured() {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    throw new Error(
      "Supabase admin is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }
}

async function readJson(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/**
 * Validate an end-user access token by asking Supabase Auth who owns it.
 * Returns the user id, or null if the token is missing/expired/invalid.
 */
export async function getUserFromAccessToken(
  accessToken: string
): Promise<{ id: string; email: string | null } | null> {
  ensureConfigured();
  if (!accessToken) return null;
  const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    method: "GET",
    headers: {
      apikey: SERVICE_ROLE_KEY!,
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const body = (await readJson(res)) as Record<string, unknown> | null;
  if (!body || typeof body.id !== "string") return null;
  const email = typeof body.email === "string" ? (body.email as string) : null;
  return { id: body.id, email };
}

/**
 * Calls the public.delete_user_account_data RPC with service-role auth.
 * The RPC removes Qamr application rows owned by the user.
 */
export async function deleteUserAccountData(
  userId: string
): Promise<{ ok: true } | { ok: false; status: number; message: string }> {
  ensureConfigured();
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/delete_user_account_data`, {
    method: "POST",
    headers: {
      apikey: SERVICE_ROLE_KEY!,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ target_user_id: userId }),
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await readJson(res);
    const message =
      (body && typeof body === "object" && "message" in body && typeof (body as Record<string, unknown>).message === "string"
        ? ((body as Record<string, unknown>).message as string)
        : null) ||
      `Supabase RPC failed (${res.status})`;
    return { ok: false, status: res.status, message };
  }
  return { ok: true };
}

/**
 * Permanently delete the auth user via the Admin API.
 * This signs the user out everywhere by removing the auth.users row.
 */
export async function deleteAuthUser(
  userId: string
): Promise<{ ok: true } | { ok: false; status: number; message: string }> {
  ensureConfigured();
  const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${userId}`, {
    method: "DELETE",
    headers: {
      apikey: SERVICE_ROLE_KEY!,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
    },
    cache: "no-store",
  });
  if (!res.ok && res.status !== 404) {
    const body = await readJson(res);
    const message =
      (body && typeof body === "object" && "msg" in body && typeof (body as Record<string, unknown>).msg === "string"
        ? ((body as Record<string, unknown>).msg as string)
        : null) ||
      `Auth admin delete failed (${res.status})`;
    return { ok: false, status: res.status, message };
  }
  return { ok: true };
}
