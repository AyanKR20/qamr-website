// Minimal Supabase Auth client for the browser using fetch.
// Avoids pulling in @supabase/supabase-js for a single-flow page.
//
// Uses public env vars only:
//   NEXT_PUBLIC_SUPABASE_URL
//   NEXT_PUBLIC_SUPABASE_ANON_KEY
//
// Never imports or references SUPABASE_SERVICE_ROLE_KEY here.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function ensureConfigured() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }
}

type SupabaseError = { message: string; status?: number };

async function readJson(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function extractMessage(body: unknown, status: number, fallback: string): string {
  let base = fallback;
  if (body && typeof body === "object") {
    const b = body as Record<string, unknown>;
    base =
      (typeof b.error_description === "string" && b.error_description) ||
      (typeof b.msg === "string" && b.msg) ||
      (typeof b.message === "string" && b.message) ||
      (typeof b.error === "string" && b.error) ||
      fallback;
    const code = typeof b.code === "string" ? b.code : null;
    if (code === "otp_disabled" || /signups\s+not\s+allowed/i.test(base)) {
      return "No Qamr account is registered with that email.";
    }
    if (code === "over_email_send_rate_limit" || /rate\s*limit/i.test(base)) {
      return "Too many requests. Wait a minute and try again.";
    }
  }
  if (status === 429) return "Too many requests. Wait a minute and try again.";
  if (status === 0) return "Network error. Check your connection and try again.";
  return `${base} (${status})`;
}

export type Session = {
  access_token: string;
  refresh_token: string;
  user: { id: string; email: string | null };
  expires_at?: number;
};

/**
 * Send a one-time email code to an existing user.
 * shouldCreateUser=false guarantees this never creates an account here.
 */
export async function sendEmailOtp(
  email: string
): Promise<{ ok: true } | { ok: false; error: SupabaseError }> {
  ensureConfigured();
  let res: Response;
  try {
    res = await fetch(`${SUPABASE_URL}/auth/v1/otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY!,
      },
      body: JSON.stringify({ email, create_user: false }),
    });
  } catch {
    return {
      ok: false,
      error: { status: 0, message: extractMessage(null, 0, "Network error.") },
    };
  }
  if (!res.ok) {
    const body = await readJson(res);
    return {
      ok: false,
      error: {
        status: res.status,
        message: extractMessage(body, res.status, "Could not send code. Try again."),
      },
    };
  }
  return { ok: true };
}

/**
 * Verify the 6-digit email OTP and return a session.
 */
export async function verifyEmailOtp(
  email: string,
  token: string
): Promise<{ ok: true; session: Session } | { ok: false; error: SupabaseError }> {
  ensureConfigured();
  let res: Response;
  try {
    res = await fetch(`${SUPABASE_URL}/auth/v1/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY!,
      },
      body: JSON.stringify({ email, token, type: "email" }),
    });
  } catch {
    return {
      ok: false,
      error: { status: 0, message: extractMessage(null, 0, "Network error.") },
    };
  }
  const body = await readJson(res);
  if (!res.ok) {
    return {
      ok: false,
      error: {
        status: res.status,
        message: extractMessage(body, res.status, "Invalid or expired code."),
      },
    };
  }
  const data = body as Record<string, unknown> | null;
  const access_token = data && typeof data.access_token === "string" ? data.access_token : "";
  const refresh_token =
    data && typeof data.refresh_token === "string" ? data.refresh_token : "";
  const userObj = (data?.user as Record<string, unknown> | undefined) ?? null;
  const userId = userObj && typeof userObj.id === "string" ? userObj.id : "";
  const userEmail =
    userObj && typeof userObj.email === "string" ? (userObj.email as string) : null;

  if (!access_token || !userId) {
    return { ok: false, error: { message: "Verification did not return a valid session." } };
  }
  return {
    ok: true,
    session: {
      access_token,
      refresh_token,
      user: { id: userId, email: userEmail },
    },
  };
}

/**
 * Best-effort sign-out from Supabase to invalidate the access token after deletion.
 */
export async function signOut(accessToken: string): Promise<void> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return;
  try {
    await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch {
    // ignore
  }
}
