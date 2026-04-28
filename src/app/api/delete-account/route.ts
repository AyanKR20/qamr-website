import type { NextRequest } from "next/server";
import {
  deleteAuthUser,
  deleteUserAccountData,
  getUserFromAccessToken,
} from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SuccessBody = { ok: true };
type ErrorBody = { ok: false; error: string };

function json(body: SuccessBody | ErrorBody, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function getBearer(req: NextRequest): string | null {
  const h = req.headers.get("authorization") ?? req.headers.get("Authorization");
  if (!h) return null;
  const m = /^Bearer\s+(.+)$/i.exec(h.trim());
  return m ? m[1] : null;
}

export async function POST(req: NextRequest) {
  let bodyJson: unknown = null;
  try {
    bodyJson = await req.json();
  } catch {
    return json({ ok: false, error: "Invalid request body." }, 400);
  }

  const body = (bodyJson ?? {}) as Record<string, unknown>;
  const confirm = typeof body.confirm === "string" ? body.confirm : "";
  const tokenFromBody = typeof body.access_token === "string" ? body.access_token : "";
  const tokenFromHeader = getBearer(req) ?? "";
  const accessToken = tokenFromHeader || tokenFromBody;

  if (confirm !== "DELETE") {
    return json(
      { ok: false, error: "Confirmation text did not match." },
      400
    );
  }

  if (!accessToken) {
    return json({ ok: false, error: "Not authenticated." }, 401);
  }

  const user = await getUserFromAccessToken(accessToken);
  if (!user) {
    return json(
      { ok: false, error: "Your session is invalid or has expired. Sign in again." },
      401
    );
  }

  const dataResult = await deleteUserAccountData(user.id);
  if (!dataResult.ok) {
    return json(
      { ok: false, error: `Could not delete account data: ${dataResult.message}` },
      500
    );
  }

  const authResult = await deleteAuthUser(user.id);
  if (!authResult.ok) {
    return json(
      {
        ok: false,
        error: `Account data was removed but the login could not be deleted: ${authResult.message}`,
      },
      500
    );
  }

  return json({ ok: true }, 200);
}

export async function GET() {
  return json({ ok: false, error: "Method not allowed." }, 405);
}
