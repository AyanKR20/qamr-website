// Server-only Supabase admin helpers.
// Uses the service role key — NEVER expose this to the browser.
//
// This module must only be imported from server code (route handlers,
// server components). The service role key has no NEXT_PUBLIC_ prefix
// so Next.js will not bundle it into the client; if this module were
// ever imported from a client component the env var read below would
// resolve to undefined and ensureConfigured() would throw.
//
// The service role key is NEVER logged. Only the resolved base URL is.

const IS_DEV = process.env.NODE_ENV !== "production";

function resolveSupabaseUrl(
  raw: string | undefined
): { url: string; error?: undefined } | { url?: undefined; error: string } {
  const trimmed = (raw ?? "").trim().replace(/^['"]|['"]$/g, "");
  if (!trimmed) return { error: "NEXT_PUBLIC_SUPABASE_URL is empty or unset." };
  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return { error: `NEXT_PUBLIC_SUPABASE_URL is not a valid URL: "${trimmed}"` };
  }
  if (parsed.protocol !== "https:") {
    return { error: `NEXT_PUBLIC_SUPABASE_URL must use https. Got: "${trimmed}"` };
  }
  if (parsed.hostname.endsWith(".supabase.com")) {
    return {
      error: `NEXT_PUBLIC_SUPABASE_URL points at supabase.com (the dashboard host). Use your project URL ending in ".supabase.co". Got: "${trimmed}"`,
    };
  }
  const path = parsed.pathname.replace(/\/+$/, "");
  if (path) {
    if (/\/rest\/v1$/.test(path) || /\/auth\/v1$/.test(path)) {
      return {
        error: `NEXT_PUBLIC_SUPABASE_URL must be the bare project URL, not "${path}". Set it to: ${parsed.origin}`,
      };
    }
    return {
      error: `NEXT_PUBLIC_SUPABASE_URL must have no path. Got: "${trimmed}". Set it to: ${parsed.origin}`,
    };
  }
  return { url: parsed.origin };
}

const URL_RESULT = resolveSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
const SUPABASE_URL = URL_RESULT.url ?? "";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function ensureConfigured() {
  if (URL_RESULT.error) throw new Error(URL_RESULT.error);
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    throw new Error(
      "Supabase admin is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }
}

function devLogFetchFailure(targetUrl: string, err: unknown) {
  if (!IS_DEV) return;
  const name = err instanceof Error ? err.name : "Error";
  const msg = err instanceof Error ? err.message : String(err);
  // eslint-disable-next-line no-console
  console.error(
    `[supabase admin] fetch failed for ${targetUrl}: ${name}: ${msg}`,
    err
  );
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
  const target = `${SUPABASE_URL}/auth/v1/user`;
  let res: Response;
  try {
    res = await fetch(target, {
      method: "GET",
      headers: {
        apikey: SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });
  } catch (err) {
    devLogFetchFailure(target, err);
    return null;
  }
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
  const target = `${SUPABASE_URL}/rest/v1/rpc/delete_user_account_data`;
  let res: Response;
  try {
    res = await fetch(target, {
      method: "POST",
      headers: {
        apikey: SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ target_user_id: userId }),
      cache: "no-store",
    });
  } catch (err) {
    devLogFetchFailure(target, err);
    return {
      ok: false,
      status: 0,
      message: IS_DEV
        ? `Network error contacting ${target}: ${err instanceof Error ? err.message : String(err)}`
        : "Network error contacting Supabase.",
    };
  }
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
  const target = `${SUPABASE_URL}/auth/v1/admin/users/${userId}`;
  let res: Response;
  try {
    res = await fetch(target, {
      method: "DELETE",
      headers: {
        apikey: SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      },
      cache: "no-store",
    });
  } catch (err) {
    devLogFetchFailure(target, err);
    return {
      ok: false,
      status: 0,
      message: IS_DEV
        ? `Network error contacting ${target}: ${err instanceof Error ? err.message : String(err)}`
        : "Network error contacting Supabase.",
    };
  }
  if (!res.ok && res.status !== 404) {
    const body = await readJson(res);
    if (IS_DEV) {
      // eslint-disable-next-line no-console
      console.error(
        `[supabase admin] auth admin delete ${res.status} body:`,
        body
      );
    }
    const b =
      body && typeof body === "object" ? (body as Record<string, unknown>) : null;
    const pick = (k: string) => (b && typeof b[k] === "string" ? (b[k] as string) : null);
    const message =
      pick("error_description") ||
      pick("msg") ||
      pick("message") ||
      pick("error") ||
      `Auth admin delete failed (${res.status})`;
    return { ok: false, status: res.status, message };
  }
  return { ok: true };
}
