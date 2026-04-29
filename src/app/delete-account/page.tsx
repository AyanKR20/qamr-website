"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  sendEmailOtp,
  verifyEmailOtp,
  signOut,
  type Session,
} from "@/lib/supabase/auth";

type Step = "email" | "otp" | "confirm" | "success";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function DeleteAccountPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [session, setSession] = useState<Session | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  const cooldownTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (resendCooldown <= 0) return;
    cooldownTimer.current = setInterval(() => {
      setResendCooldown((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => {
      if (cooldownTimer.current) clearInterval(cooldownTimer.current);
    };
  }, [resendCooldown]);

  useEffect(() => {
    const l1 = document.createElement("link");
    l1.rel = "preconnect";
    l1.href = "https://fonts.googleapis.com";
    const l2 = document.createElement("link");
    l2.rel = "preconnect";
    l2.href = "https://fonts.gstatic.com";
    l2.crossOrigin = "";
    const l3 = document.createElement("link");
    l3.rel = "stylesheet";
    l3.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=Inter:wght@500;600;700&display=swap";
    document.head.append(l1, l2, l3);
  }, []);

  const canSendOtp = useMemo(() => EMAIL_RE.test(email.trim()) && !busy, [email, busy]);
  const canVerify = useMemo(() => /^\d{6,10}$/.test(otp.trim()) && !busy, [otp, busy]);
  const canDelete = useMemo(
    () => confirmText === "DELETE" && !!session && !busy,
    [confirmText, session, busy]
  );

  async function handleSendOtp(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    if (!EMAIL_RE.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    setBusy(true);
    const res = await sendEmailOtp(email.trim());
    setBusy(false);
    if (!res.ok) {
      setError(res.error.message);
      return;
    }
    setStep("otp");
    setResendCooldown(45);
  }

  async function handleVerifyOtp(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    setBusy(true);
    const res = await verifyEmailOtp(email.trim(), otp.trim());
    setBusy(false);
    if (!res.ok) {
      setError(res.error.message);
      return;
    }
    setSession(res.session);
    setStep("confirm");
  }

  async function handleResend() {
    if (resendCooldown > 0 || busy) return;
    setError(null);
    setBusy(true);
    const res = await sendEmailOtp(email.trim());
    setBusy(false);
    if (!res.ok) {
      setError(res.error.message);
      return;
    }
    setResendCooldown(45);
  }

  async function handleDelete(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    if (!session) {
      setError("Your session is missing. Please verify your email again.");
      setStep("email");
      return;
    }
    if (confirmText !== "DELETE") {
      setError("Type DELETE exactly to confirm.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/delete-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ confirm: "DELETE" }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok: true }
        | { ok: false; error: string }
        | null;
      if (!res.ok || !data || !("ok" in data) || !data.ok) {
        const msg =
          (data && "error" in data && typeof data.error === "string" && data.error) ||
          `Deletion failed (${res.status}). Please try again or contact support.`;
        setError(msg);
        setBusy(false);
        return;
      }
      await signOut(session.access_token);
      setSession(null);
      setBusy(false);
      setStep("success");
    } catch {
      setBusy(false);
      setError("Network error. Check your connection and try again.");
    }
  }

  function backToEmail() {
    setOtp("");
    setError(null);
    setStep("email");
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="qamr-delete">
        <nav>
          <div className="nav-row">
            <a href="/" className="nav-brand">
              <img src="/logo.png" alt="Qamr" className="brand-mark" />
              <span className="nav-brand-name">Qamr</span>
            </a>
            <a href="/" className="nav-back">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to site
            </a>
          </div>
        </nav>

        <section className="da-hero">
          <div className="da-orb" />
          <div className="da-warm" />
          <div className="da-hero-inner">
            <div className="da-kicker">
              <span className="k-dot" /> Account &middot; Deletion
            </div>
            <h1 className="da-h1">
              Delete your
              <br />
              <em>Qamr account.</em>
            </h1>
            <p className="da-lead">
              This page lets you permanently delete your Qamr account and the
              data tied to it. Verify your email, confirm, and it&rsquo;s done.
              No back-and-forth, no support tickets.
            </p>
          </div>
        </section>

        <div className="da-body">
          <main>
            <section className="da-info">
              <div className="da-section-num">
                <span /> What gets deleted
              </div>
              <ul className="da-list">
                <li>Your profile, username, display name, bio, and avatar.</li>
                <li>Your posts, reels, stories, highlights, and saved items.</li>
                <li>Your comments, likes, follows, and message history you sent.</li>
                <li>Uploaded media references and attached files.</li>
                <li>Your saved login session and authentication record.</li>
                <li>Push tokens, app settings, and notification preferences.</li>
              </ul>
            </section>

            <section className="da-info">
              <div className="da-section-num">
                <span /> What may be retained
              </div>
              <ul className="da-list">
                <li>
                  Aggregated, anonymized analytics that no longer identify you.
                </li>
                <li>
                  Records we are required to keep for legal, security, or
                  fraud-prevention reasons (e.g. abuse reports, law-enforcement
                  requests).
                </li>
                <li>
                  Backups may temporarily contain residual data and are purged
                  on our standard rotation.
                </li>
              </ul>
            </section>

            <section className="da-info da-warning">
              <div className="da-section-num warn">
                <span /> This is permanent
              </div>
              <p>
                Account deletion cannot be undone. You will lose access to your
                content and conversations, and your username may be released
                for reuse after a cooling-off period.
              </p>
            </section>

            <section className="da-card">
              {step === "email" && (
                <form onSubmit={handleSendOtp} noValidate>
                  <div className="da-step-num">Step 1 / 3</div>
                  <h2 className="da-h2">Verify your email</h2>
                  <p className="da-sub">
                    Enter the email tied to your Qamr account. We&rsquo;ll send
                    you a 6-digit code to confirm it&rsquo;s really you.
                  </p>
                  <label className="da-label" htmlFor="email">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    spellCheck={false}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="da-input"
                    disabled={busy}
                  />
                  {error && <div className="da-error">{error}</div>}
                  <button
                    type="submit"
                    className="da-btn da-btn-primary"
                    disabled={!canSendOtp}
                  >
                    {busy ? "Sending…" : "Send verification code"}
                  </button>
                </form>
              )}

              {step === "otp" && (
                <form onSubmit={handleVerifyOtp} noValidate>
                  <div className="da-step-num">Step 2 / 3</div>
                  <h2 className="da-h2">Enter the verification code</h2>
                  <p className="da-sub">
                    We sent a verification code to{" "}
                    <strong className="da-em">{email.trim()}</strong>. The code
                    expires in a few minutes. If you don&rsquo;t see it, check
                    your spam or promotions folder.
                  </p>
                  <label className="da-label" htmlFor="otp">
                    Verification code
                  </label>
                  <input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="\d{6,10}"
                    maxLength={10}
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    placeholder="••••••"
                    className="da-input da-input-otp"
                    disabled={busy}
                    aria-describedby="otp-hint"
                  />
                  <p id="otp-hint" className="da-hint">
                    Digits only, exactly as it appears in the email.
                  </p>
                  {error && <div className="da-error">{error}</div>}
                  <div className="da-row">
                    <button
                      type="submit"
                      className="da-btn da-btn-primary"
                      disabled={!canVerify}
                    >
                      {busy ? "Verifying…" : "Verify code"}
                    </button>
                    <button
                      type="button"
                      className="da-btn da-btn-ghost"
                      onClick={backToEmail}
                      disabled={busy}
                    >
                      Use a different email
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={handleResend}
                    className="da-link"
                    disabled={resendCooldown > 0 || busy}
                  >
                    {resendCooldown > 0
                      ? `Resend code in ${resendCooldown}s`
                      : "Resend code"}
                  </button>
                </form>
              )}

              {step === "confirm" && (
                <form onSubmit={handleDelete} noValidate>
                  <div className="da-step-num">Step 3 / 3</div>
                  <h2 className="da-h2">Final confirmation</h2>
                  <p className="da-sub">
                    You&rsquo;re signed in as{" "}
                    <strong className="da-em">
                      {session?.user.email ?? email.trim()}
                    </strong>
                    . Deleting will remove your account and the data above.
                    This cannot be undone.
                  </p>
                  <label className="da-label" htmlFor="confirm">
                    Type <span className="da-mono">DELETE</span> to confirm
                  </label>
                  <input
                    id="confirm"
                    type="text"
                    autoComplete="off"
                    spellCheck={false}
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder="DELETE"
                    className="da-input"
                    disabled={busy}
                  />
                  {error && <div className="da-error">{error}</div>}
                  <div className="da-row">
                    <button
                      type="submit"
                      className="da-btn da-btn-danger"
                      disabled={!canDelete}
                    >
                      {busy ? "Deleting…" : "Permanently delete my account"}
                    </button>
                    <a href="/" className="da-btn da-btn-ghost da-btn-link">
                      Cancel
                    </a>
                  </div>
                </form>
              )}

              {step === "success" && (
                <div className="da-success">
                  <div className="da-success-mark" aria-hidden="true">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5 9.5-10.5" />
                    </svg>
                  </div>
                  <h2 className="da-h2">Your account deletion has been completed.</h2>
                  <p className="da-sub">
                    The account and associated data have been removed. You can
                    safely close this page. If you change your mind, you&rsquo;re
                    always welcome to make a new Qamr account.
                  </p>
                  <a href="/" className="da-btn da-btn-primary da-btn-link">
                    Return to Qamr
                  </a>
                </div>
              )}
            </section>

            <p className="da-fineprint">
              Need help instead? Email{" "}
              <a href="mailto:qamrapp@gmail.com">qamrapp@gmail.com</a>.
            </p>
          </main>
        </div>

        <footer>
          <div className="foot-row">
            <a href="/" className="foot-brand">
              <img src="/logo.png" alt="Qamr" className="brand-mark sm" />
              <span>Qamr</span>
            </a>
            <div className="foot-links">
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
              <a href="mailto:qamrapp@gmail.com">Contact</a>
            </div>
            <p className="foot-copy">© 2026 Qamr. Built for humans.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

const CSS = `
.qamr-delete {
  --bg:#08040f; --fg:#ede8df; --muted:#6a6278; --muted-lt:#8a8298;
  --accent:#d4bf8a; --acc-lt:#e8d5a8;
  --surface:#0f0819; --surf-lt:#160e22;
  --border:#1e1530; --bord-lt:#2c1f46;
  --danger:#e26a6a; --danger-lt:#f08585;
  --hd:'Playfair Display', Georgia, serif;
  --bd:'DM Sans', system-ui, sans-serif;
  background: var(--bg); color: var(--fg);
  font-family: var(--bd); font-size: 16px; line-height: 1.7;
  -webkit-font-smoothing: antialiased; min-height: 100vh;
}
.qamr-delete *, .qamr-delete *::before, .qamr-delete *::after { box-sizing: border-box; margin: 0; padding: 0; }
.qamr-delete::after {
  content:''; position: fixed; inset: 0; pointer-events: none; z-index: 900; opacity: .018;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
.qamr-delete nav {
  position: sticky; top: 0; z-index: 800;
  background: rgba(8,4,15,.88);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(24px);
  padding: 18px 0;
}
.qamr-delete .nav-row { max-width: 880px; margin: 0 auto; padding: 0 32px; display: flex; align-items: center; justify-content: space-between; }
.qamr-delete .nav-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; color: var(--fg); }
.qamr-delete .brand-mark { width: 28px; height: 28px; border-radius: 7px; object-fit: cover; display: inline-block; }
.qamr-delete .brand-mark.sm { width: 22px; height: 22px; border-radius: 6px; }
.qamr-delete .nav-brand-name { font-family: 'Inter', system-ui, sans-serif; font-size: 19px; font-weight: 600; letter-spacing: -.02em; }
.qamr-delete .nav-back {
  font-size: 12px; color: var(--muted-lt); text-decoration: none;
  display: inline-flex; align-items: center; gap: 8px;
  padding: 9px 18px; border-radius: 100px;
  border: 1px solid var(--border); transition: border-color .2s, color .2s;
}
.qamr-delete .nav-back:hover { border-color: rgba(212,191,138,.3); color: var(--fg); }

.qamr-delete .da-hero {
  position: relative; overflow: hidden; padding: 110px 32px 70px; text-align: center;
  border-bottom: 1px solid var(--border);
}
.qamr-delete .da-orb {
  position: absolute; top: -20%; left: 50%; transform: translateX(-50%);
  width: 900px; height: 600px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(90,30,122,.18) 0%, rgba(45,10,62,.06) 45%, transparent 70%);
  pointer-events: none;
}
.qamr-delete .da-warm {
  position: absolute; top: 0; left: 50%; transform: translateX(-50%);
  width: 400px; height: 260px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(212,191,138,.05) 0%, transparent 70%);
  pointer-events: none;
}
.qamr-delete .da-hero-inner { position: relative; z-index: 2; max-width: 720px; margin: 0 auto; }
.qamr-delete .da-kicker {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 5px 16px; border-radius: 100px;
  border: 1px solid rgba(212,191,138,.14);
  background: rgba(212,191,138,.04);
  font-size: 11px; letter-spacing: .18em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 26px;
}
.qamr-delete .k-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--accent); opacity: .7; }
.qamr-delete .da-h1 {
  font-family: var(--hd); font-size: clamp(40px, 6vw, 76px);
  font-weight: 800; line-height: 1.04; letter-spacing: -.035em;
  margin-bottom: 22px; text-wrap: balance;
}
.qamr-delete .da-h1 em { font-style: italic; color: var(--accent); font-weight: 700; }
.qamr-delete .da-lead {
  font-size: 16px; color: var(--muted-lt); font-weight: 300;
  max-width: 560px; margin: 0 auto; line-height: 1.75;
}

.qamr-delete .da-body {
  max-width: 760px; margin: 0 auto; padding: 64px 32px 24px;
}
.qamr-delete main { display: flex; flex-direction: column; gap: 36px; }

.qamr-delete .da-info { padding: 26px 28px; border-radius: 16px; background: var(--surface); border: 1px solid var(--border); }
.qamr-delete .da-info p { color: var(--muted-lt); font-weight: 300; font-size: 15px; }
.qamr-delete .da-warning { border-color: rgba(226,106,106,.2); background: linear-gradient(180deg, rgba(226,106,106,.04), rgba(226,106,106,.02)); }
.qamr-delete .da-section-num {
  font-size: 10px; letter-spacing: .22em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 14px; font-weight: 500;
  display: flex; align-items: center; gap: 10px;
}
.qamr-delete .da-section-num span { width: 20px; height: 1px; background: var(--accent); opacity: .55; display: inline-block; }
.qamr-delete .da-section-num.warn { color: var(--danger-lt); }
.qamr-delete .da-section-num.warn span { background: var(--danger-lt); }

.qamr-delete .da-list {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-direction: column;
  border-top: 1px solid var(--border);
}
.qamr-delete .da-list li {
  padding: 13px 4px 13px 22px;
  border-bottom: 1px solid var(--border);
  color: var(--muted-lt); font-weight: 300; font-size: 14.5px;
  position: relative;
}
.qamr-delete .da-list li:last-child { border-bottom: none; }
.qamr-delete .da-list li::before {
  content:''; position: absolute; left: 0; top: 21px;
  width: 10px; height: 1px; background: var(--accent); opacity: .55;
}

.qamr-delete .da-card {
  padding: 32px; border-radius: 18px;
  background: var(--surf-lt); border: 1px solid var(--bord-lt);
  box-shadow: 0 30px 80px rgba(0,0,0,.35);
}
.qamr-delete .da-step-num {
  font-size: 10px; letter-spacing: .22em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 8px; font-weight: 500;
}
.qamr-delete .da-h2 {
  font-family: var(--hd); font-size: clamp(24px, 2.6vw, 30px);
  font-weight: 700; letter-spacing: -.02em;
  margin-bottom: 10px; line-height: 1.2;
}
.qamr-delete .da-sub { color: var(--muted-lt); font-weight: 300; font-size: 15px; margin-bottom: 22px; line-height: 1.7; }
.qamr-delete .da-em { color: var(--fg); font-weight: 500; }
.qamr-delete .da-mono { font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace; color: var(--accent); font-size: 13px; padding: 1px 6px; border-radius: 4px; background: rgba(212,191,138,.08); border: 1px solid rgba(212,191,138,.18); letter-spacing: .04em; }

.qamr-delete .da-label {
  display: block; font-size: 11px; letter-spacing: .14em;
  text-transform: uppercase; color: var(--muted-lt);
  margin-bottom: 10px; font-weight: 500;
}
.qamr-delete .da-input {
  width: 100%; padding: 14px 16px; border-radius: 12px;
  background: rgba(0,0,0,.28); border: 1px solid var(--border);
  color: var(--fg); font-family: var(--bd); font-size: 15px;
  outline: none; transition: border-color .2s, background .2s;
  -webkit-appearance: none; appearance: none;
}
.qamr-delete .da-input:focus { border-color: rgba(212,191,138,.5); background: rgba(0,0,0,.4); }
.qamr-delete .da-input:disabled { opacity: .5; cursor: not-allowed; }
.qamr-delete .da-input::placeholder { color: rgba(138,130,152,.45); }
.qamr-delete .da-input-otp {
  letter-spacing: .55em; font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
  font-size: 20px; text-align: center; padding-left: 18px;
}
.qamr-delete .da-hint { margin-top: 8px; font-size: 12px; color: var(--muted); }

.qamr-delete .da-error {
  margin-top: 14px; padding: 12px 14px; border-radius: 10px;
  background: rgba(226,106,106,.08); border: 1px solid rgba(226,106,106,.25);
  color: var(--danger-lt); font-size: 13.5px; line-height: 1.55;
}

.qamr-delete .da-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 14px 26px; border-radius: 100px;
  font-family: var(--bd); font-size: 14px; font-weight: 500;
  border: 1px solid transparent; cursor: pointer; text-decoration: none;
  transition: background .2s, border-color .2s, color .2s, transform .15s, box-shadow .25s;
  margin-top: 22px;
}
.qamr-delete .da-btn:disabled { opacity: .5; cursor: not-allowed; }
.qamr-delete .da-btn-link { display: inline-flex; }
.qamr-delete .da-btn-primary {
  background: var(--accent); color: #08040f;
}
.qamr-delete .da-btn-primary:hover:not(:disabled) {
  background: var(--acc-lt); transform: translateY(-1px);
  box-shadow: 0 14px 50px rgba(212,191,138,.22);
}
.qamr-delete .da-btn-danger {
  background: var(--danger); color: #1a0707;
}
.qamr-delete .da-btn-danger:hover:not(:disabled) {
  background: var(--danger-lt); transform: translateY(-1px);
  box-shadow: 0 14px 50px rgba(226,106,106,.28);
}
.qamr-delete .da-btn-ghost {
  background: transparent; color: var(--muted-lt);
  border-color: var(--border);
}
.qamr-delete .da-btn-ghost:hover:not(:disabled) {
  color: var(--fg); border-color: rgba(212,191,138,.3);
}

.qamr-delete .da-row { display: flex; flex-wrap: wrap; gap: 12px; }

.qamr-delete .da-link {
  display: inline-block; margin-top: 18px;
  background: none; border: none; padding: 0;
  font-family: var(--bd); font-size: 13px; color: var(--muted-lt);
  cursor: pointer; text-decoration: underline; text-underline-offset: 4px;
  transition: color .2s;
}
.qamr-delete .da-link:hover:not(:disabled) { color: var(--fg); }
.qamr-delete .da-link:disabled { opacity: .4; cursor: not-allowed; text-decoration: none; }

.qamr-delete .da-success { text-align: left; }
.qamr-delete .da-success-mark {
  width: 48px; height: 48px; border-radius: 12px;
  background: rgba(212,191,138,.1); color: var(--accent);
  display: inline-flex; align-items: center; justify-content: center;
  margin-bottom: 22px; border: 1px solid rgba(212,191,138,.25);
}

.qamr-delete .da-fineprint { font-size: 13px; color: var(--muted); text-align: center; }
.qamr-delete .da-fineprint a { color: var(--muted-lt); }
.qamr-delete .da-fineprint a:hover { color: var(--accent); }

.qamr-delete footer { padding: 36px 32px; border-top: 1px solid var(--border); margin-top: 60px; }
.qamr-delete .foot-row {
  max-width: 880px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px;
}
.qamr-delete .foot-brand { display: flex; align-items: center; gap: 9px; text-decoration: none; }
.qamr-delete .foot-brand span { font-family: 'Inter', system-ui, sans-serif; font-size: 14px; font-weight: 600; color: rgba(237,232,223,.45); letter-spacing: -.02em; }
.qamr-delete .foot-links { display: flex; gap: 24px; }
.qamr-delete .foot-links a { font-size: 12px; color: rgba(106,98,120,.6); text-decoration: none; transition: color .2s; }
.qamr-delete .foot-links a:hover { color: var(--muted-lt); }
.qamr-delete .foot-copy { font-size: 11px; color: rgba(106,98,120,.45); }

@media (max-width: 720px) {
  .qamr-delete .da-hero { padding: 80px 22px 56px; }
  .qamr-delete .da-body { padding: 44px 22px 20px; }
  .qamr-delete .da-card { padding: 26px 22px; border-radius: 16px; }
  .qamr-delete .da-info { padding: 22px 22px; }
  .qamr-delete .nav-row { padding: 0 20px; }
  .qamr-delete .da-btn { width: 100%; }
  .qamr-delete .da-row { flex-direction: column; }
  .qamr-delete .foot-row { flex-direction: column; align-items: flex-start; gap: 12px; }
}
`;
