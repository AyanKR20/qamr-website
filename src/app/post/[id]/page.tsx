import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coming soon · Qamr",
  description:
    "Post links aren't viewable on the web yet. Download Qamr to open this post inside the app.",
  robots: { index: false, follow: false },
};

export default function ComingSoonPost() {
  return (
    <>
      <style>{CSS}</style>
      <main className="qamr-soon">
        <nav className="qs-nav">
          <a href="/" className="qs-brand" aria-label="Qamr — back to home">
            <img src="/logo.png" alt="" />
            <span>Qamr</span>
          </a>
          <a href="/" className="qs-back">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            <span>Home</span>
          </a>
        </nav>

        <section className="qs-hero">
          <div className="qs-orb" aria-hidden="true" />
          <div className="qs-warm" aria-hidden="true" />

          <div className="qs-inner">
            <div className="qs-kicker">
              <span className="qs-dot" aria-hidden="true" />
              <span>Web previews not live yet</span>
            </div>

            <h1 className="qs-h1">
              Coming <em>soon.</em>
            </h1>

            <p className="qs-lead">
              Qamr posts open inside the app — web previews aren&rsquo;t available yet.
              We&rsquo;re building shareable post pages so anyone can preview before installing.
              For now, download Qamr to see this post and the rest of the feed.
            </p>

            <div className="qs-ctas">
              <a
                href="https://apps.apple.com/app/qamr/id6764144560"
                className="qs-btn"
                aria-label="Download Qamr on the App Store"
              >
                <span className="qs-btn-icon">
                  <svg width="22" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                </span>
                <span className="qs-btn-text">
                  <span className="qs-btn-small">Download on the</span>
                  <span className="qs-btn-big">App Store</span>
                </span>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.ayank.qamr"
                className="qs-btn"
                aria-label="Get Qamr on Google Play"
              >
                <span className="qs-btn-icon">
                  <svg width="20" height="22" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3.6 1.2a1.6 1.6 0 00-.6 1.3v19a1.6 1.6 0 00.6 1.3l11-11.3z" fill="currentColor" opacity=".95"/>
                    <path d="M14.6 11.5 17.8 8.3 5.2.8a1.4 1.4 0 00-1.6.4z" fill="currentColor" opacity=".8"/>
                    <path d="M14.6 12.5 3.6 23.5a1.4 1.4 0 001.6.3l12.6-7.4z" fill="currentColor" opacity=".62"/>
                    <path d="M20.8 10.4l-3-1.8-3.2 3.4 3.2 3.3 3-1.7a1.7 1.7 0 000-3.2z" fill="currentColor" opacity=".88"/>
                  </svg>
                </span>
                <span className="qs-btn-text">
                  <span className="qs-btn-small">Get it on</span>
                  <span className="qs-btn-big">Google Play</span>
                </span>
              </a>
            </div>

            <p className="qs-note">Free to download · No AI-generated media</p>
          </div>
        </section>
      </main>
    </>
  );
}

const CSS = `
.qamr-soon {
  --bg:#06030c; --bg-2:#0a0518;
  --fg:#ede8df; --fg-dim:#c9c2b6;
  --muted:#6a6278; --muted-lt:#8a8298;
  --accent:#d4bf8a; --acc-lt:#e8d5a8;
  --border:rgba(212,191,138,.08); --bord-lt:rgba(212,191,138,.16);
  --ease: cubic-bezier(.16,1,.3,1);
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font-bd, 'DM Sans', system-ui, sans-serif);
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex; flex-direction: column;
}
.qamr-soon *, .qamr-soon *::before, .qamr-soon *::after { box-sizing: border-box; margin: 0; padding: 0; }
.qamr-soon::before {
  content: '';
  position: fixed; inset: 0;
  pointer-events: none; z-index: 0;
  background:
    radial-gradient(ellipse 80% 50% at 50% 0%, rgba(45,10,62,.35) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 100% 30%, rgba(20,30,80,.18) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 0% 60%, rgba(60,20,90,.15) 0%, transparent 60%),
    linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 50%, var(--bg) 100%);
}
.qamr-soon::after {
  content: '';
  position: fixed; inset: 0;
  pointer-events: none; z-index: 900; opacity: .022;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* Nav */
.qamr-soon .qs-nav {
  position: relative; z-index: 10;
  display: flex; align-items: center; justify-content: space-between;
  padding: 22px 40px;
  max-width: 1120px;
  width: 100%;
  margin: 0 auto;
}
.qamr-soon .qs-brand {
  display: inline-flex; align-items: center; gap: 10px;
  text-decoration: none; color: var(--fg);
  transition: opacity .25s var(--ease);
}
.qamr-soon .qs-brand:hover { opacity: .85; }
.qamr-soon .qs-brand img { width: 28px; height: 28px; border-radius: 8px; }
.qamr-soon .qs-brand span {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 19px; font-weight: 600;
  letter-spacing: -.02em;
}
.qamr-soon .qs-back {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 9px 16px 9px 14px;
  border-radius: 100px;
  border: 1px solid var(--border);
  color: var(--muted-lt); text-decoration: none;
  font-size: 13px;
  transition: color .25s var(--ease), border-color .25s var(--ease), background .25s var(--ease);
}
.qamr-soon .qs-back:hover {
  color: var(--fg);
  border-color: var(--bord-lt);
  background: rgba(212,191,138,.03);
}
.qamr-soon .qs-back svg { transition: transform .25s var(--ease); }
.qamr-soon .qs-back:hover svg { transform: translateX(-2px); }

/* Hero */
.qamr-soon .qs-hero {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex; align-items: center; justify-content: center;
  padding: 48px 32px 96px;
  overflow: hidden;
}
.qamr-soon .qs-orb {
  position: absolute; top: 8%; left: 50%; transform: translateX(-50%);
  width: 1000px; height: 660px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(120,40,160,.22) 0%, rgba(45,10,62,.10) 40%, transparent 70%);
  pointer-events: none;
  filter: blur(8px);
}
.qamr-soon .qs-warm {
  position: absolute; top: 26%; left: 50%; transform: translateX(-50%);
  width: 540px; height: 320px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(212,191,138,.08) 0%, transparent 70%);
  pointer-events: none;
  filter: blur(20px);
}

.qamr-soon .qs-inner {
  position: relative; z-index: 2;
  text-align: center;
  max-width: 640px;
}

.qamr-soon .qs-kicker {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 16px; border-radius: 100px;
  border: 1px solid rgba(212,191,138,.16);
  background: rgba(212,191,138,.04);
  font-size: 11px; letter-spacing: .18em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 32px;
  font-weight: 500;
}
.qamr-soon .qs-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 10px rgba(212,191,138,.7);
}

.qamr-soon .qs-h1 {
  font-family: var(--font-hd, 'Playfair Display', Georgia, serif);
  font-size: clamp(56px, 8vw, 104px);
  font-weight: 700; line-height: .98;
  letter-spacing: -.04em;
  margin-bottom: 26px;
  text-wrap: balance;
  color: var(--fg);
}
.qamr-soon .qs-h1 em {
  font-style: italic; font-weight: 600;
  background: linear-gradient(180deg, var(--acc-lt) 0%, var(--accent) 60%, #c2a86a 100%);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
}

.qamr-soon .qs-lead {
  font-size: 17px;
  color: var(--fg-dim);
  font-weight: 300;
  line-height: 1.65;
  max-width: 520px;
  margin: 0 auto 44px;
  text-wrap: balance;
}

/* Dark-glass store CTAs — matches the landing hero */
.qamr-soon .qs-ctas {
  display: flex; flex-wrap: wrap; justify-content: center;
  gap: 14px;
  margin: 0 auto;
}
.qamr-soon .qs-btn {
  position: relative;
  display: inline-flex; align-items: center; gap: 13px;
  padding: 14px 26px 14px 22px;
  min-width: 204px;
  border-radius: 18px;
  background:
    radial-gradient(ellipse at top right, rgba(120,60,160,.16) 0%, transparent 60%),
    linear-gradient(180deg, rgba(24,14,38,.82) 0%, rgba(10,6,20,.92) 100%);
  color: var(--fg);
  text-decoration: none;
  border: 1px solid rgba(212,191,138,.22);
  box-shadow:
    0 14px 36px rgba(0,0,0,.55),
    0 0 0 1px rgba(212,191,138,.06),
    0 0 32px rgba(212,191,138,.06),
    inset 0 1px 0 rgba(255,255,255,.05),
    inset 0 -1px 0 rgba(0,0,0,.3);
  backdrop-filter: blur(14px) saturate(1.2);
  -webkit-backdrop-filter: blur(14px) saturate(1.2);
  transition: transform .4s var(--ease), box-shadow .45s var(--ease), border-color .35s var(--ease);
  overflow: hidden;
  will-change: transform;
}
.qamr-soon .qs-btn::before {
  content: '';
  position: absolute; inset: 0;
  border-radius: inherit; padding: 1px;
  background: linear-gradient(160deg, rgba(212,191,138,.55), rgba(212,191,138,.04) 42%, rgba(212,191,138,.3) 100%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  pointer-events: none; opacity: .8;
  transition: opacity .4s var(--ease);
}
.qamr-soon .qs-btn::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(110deg, transparent 42%, rgba(212,191,138,.16) 50%, transparent 58%);
  transform: translateX(-130%);
  transition: transform 1s var(--ease);
  pointer-events: none;
}
.qamr-soon .qs-btn:hover {
  transform: translateY(-3px);
  border-color: rgba(212,191,138,.38);
  box-shadow:
    0 22px 52px rgba(0,0,0,.65),
    0 0 0 1px rgba(212,191,138,.18),
    0 0 48px rgba(212,191,138,.12),
    inset 0 1px 0 rgba(255,255,255,.07),
    inset 0 -1px 0 rgba(0,0,0,.32);
}
.qamr-soon .qs-btn:hover::before { opacity: 1; }
.qamr-soon .qs-btn:hover::after { transform: translateX(130%); }
.qamr-soon .qs-btn:active {
  transform: translateY(0) scale(.985);
  transition: transform .15s var(--ease);
}
.qamr-soon .qs-btn-icon {
  flex: none; width: 28px; height: 28px;
  display: flex; align-items: center; justify-content: center;
  color: var(--fg);
  position: relative; z-index: 1;
}
.qamr-soon .qs-btn-icon svg {
  display: block;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,.5));
}
.qamr-soon .qs-btn-text {
  display: flex; flex-direction: column;
  line-height: 1.08; text-align: left;
  position: relative; z-index: 1;
}
.qamr-soon .qs-btn-small {
  font-size: 10px; letter-spacing: .16em; text-transform: uppercase;
  color: rgba(212,191,138,.72); font-weight: 500; margin-bottom: 3px;
}
.qamr-soon .qs-btn-big {
  font-size: 17px; font-weight: 600; letter-spacing: -.01em;
  color: var(--fg);
}

.qamr-soon .qs-note {
  margin-top: 28px;
  font-size: 11px;
  letter-spacing: .1em;
  color: var(--muted);
  text-transform: uppercase;
}

@media (max-width: 720px) {
  .qamr-soon .qs-nav { padding: 18px 20px; }
  .qamr-soon .qs-hero { padding: 32px 20px 64px; }
  .qamr-soon .qs-kicker { margin-bottom: 22px; font-size: 10px; padding: 5px 14px; }
  .qamr-soon .qs-h1 { font-size: clamp(40px, 11vw, 64px); margin-bottom: 18px; line-height: 1.02; letter-spacing: -.03em; }
  .qamr-soon .qs-lead { font-size: 14.5px; margin-bottom: 32px; line-height: 1.6; }
  .qamr-soon .qs-ctas {
    flex-direction: column; align-items: stretch;
    gap: 16px; max-width: 360px;
  }
  .qamr-soon .qs-btn {
    width: 100%; flex: 0 0 auto; min-width: 0;
    justify-content: center;
    padding: 17px 24px; gap: 13px;
    border-radius: 20px;
    background:
      radial-gradient(ellipse at top right, rgba(120,60,160,.18) 0%, transparent 60%),
      linear-gradient(180deg, rgba(26,16,42,.85) 0%, rgba(10,6,20,.94) 100%);
    border: 1px solid rgba(212,191,138,.24);
    box-shadow:
      0 18px 44px rgba(0,0,0,.6),
      0 0 0 1px rgba(212,191,138,.08),
      0 0 40px rgba(212,191,138,.08),
      inset 0 1px 0 rgba(255,255,255,.05),
      inset 0 -1px 0 rgba(0,0,0,.32);
  }
  .qamr-soon .qs-btn-icon { width: 28px; height: 28px; }
  .qamr-soon .qs-btn-icon svg { height: 24px; width: auto; }
  .qamr-soon .qs-btn-small { font-size: 10px; margin-bottom: 3px; letter-spacing: .16em; }
  .qamr-soon .qs-btn-big { font-size: 17px; }
  .qamr-soon .qs-note { font-size: 10px; margin-top: 22px; }
}

@media (max-width: 380px) {
  .qamr-soon .qs-ctas { max-width: 100%; gap: 12px; }
  .qamr-soon .qs-btn { padding: 15px 20px; border-radius: 17px; }
  .qamr-soon .qs-btn-big { font-size: 15.5px; }
}
`;
