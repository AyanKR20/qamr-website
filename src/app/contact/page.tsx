"use client";

/**
 * Qamr — Contact page (single-file React/TSX).
 * Refined: tighter type scale, improved rhythm, calmer surfaces, better hierarchy.
 */
export default function QamrContact() {
  return (
    <>
      <style>{CSS}</style>
      <div className="qamr-contact">
        <FontLoader />

        <nav>
          <div className="nav-row">
            <a href="/" className="nav-brand">
              <img src="/logo.png" alt="Qamr" className="brand-mark" />
              <span className="nav-brand-name">Qamr</span>
            </a>
            <a href="/" className="nav-back">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              <span>Back to site</span>
            </a>
          </div>
        </nav>

        <section className="c-hero">
          <div className="c-orb" />
          <div className="c-warm" />

          <div className="c-hero-inner">
            <div className="c-kicker">
              <span className="k-dot" />
              <span>Get in touch</span>
            </div>
            <h1 className="c-h1">
              Say <em>salaam.</em>
            </h1>
            <p className="c-lead">
              Questions, feedback, press, partnerships. We read every message —
              pick whichever channel feels right.
            </p>
          </div>

          {/* Contact cards */}
          <div className="c-grid">

            <a href="mailto:qamrapp@gmail.com" className="c-card">
              <div className="c-card-top">
                <div className="c-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <path d="M2 7l10 7 10-7" />
                  </svg>
                </div>
                <span className="c-tag">Email</span>
              </div>
              <div className="c-body">
                <div className="c-body-text">
                  <div className="c-label">Write us anything</div>
                  <div className="c-value">qamrapp@gmail.com</div>
                </div>
                <div className="c-arrow" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>

            <a href="https://instagram.com/qamr.app" target="_blank" rel="noopener noreferrer" className="c-card">
              <div className="c-card-top">
                <div className="c-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
                  </svg>
                </div>
                <span className="c-tag">Instagram</span>
              </div>
              <div className="c-body">
                <div className="c-body-text">
                  <div className="c-label">Follow along</div>
                  <div className="c-value">@qamr.app</div>
                </div>
                <div className="c-arrow" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </div>
              </div>
            </a>

          </div>

          {/* Subtle meta-line under the cards */}
          <div className="c-meta">
            <span className="dot" />
            <span>Typically respond within a couple of days</span>
            <span className="dot" />
          </div>
        </section>

        {/* Small "what to expect" strip */}
        <section className="c-ribbon">
          <div className="rib-head">
            <span className="rib-eyebrow">What to write about</span>
          </div>
          <div className="rib-row">
            <RibbonItem n="01" title="Feedback" desc="Bugs, ideas, things you wish Qamr did differently." />
            <RibbonItem n="02" title="Press & partnerships" desc="Media, interviews, or working together." />
            <RibbonItem n="03" title="Support" desc="Account help, report a problem, request deletion." />
          </div>
        </section>

        <footer>
          <div className="foot-row">
            <a href="/" className="foot-brand">
              <img src="/logo.png" alt="Qamr" className="brand-mark sm" />
              <span>Qamr</span>
            </a>
            <div className="foot-links">
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
              <a href="/community-guidelines">Community Guidelines</a>
              <a href="/contact">Contact</a>
            </div>
            <p className="foot-copy">© 2026 Qamr. Built for humans.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

function RibbonItem({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="rib-item">
      <span className="rib-num">{n}</span>
      <div className="rib-text">
        <div className="rib-title">{title}</div>
        <div className="rib-desc">{desc}</div>
      </div>
    </div>
  );
}

function FontLoader() {
  // Injects Google Fonts on mount (runs only on client)
  if (typeof document !== "undefined" && !document.getElementById("qamr-fonts")) {
    const link = document.createElement("link");
    link.id = "qamr-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500;1,9..144,600&family=Geist:wght@300;400;500;600&family=Geist+Mono:wght@400;500&family=Inter:wght@500;600;700&display=swap";
    document.head.appendChild(link);
  }
  return null;
}

const CSS = `
.qamr-contact {
  --bg:#08040f; --fg:#ede8df; --fg-dim:#c9c2b6;
  --muted:#5e576b; --muted-lt:#857d92;
  --accent:#d4bf8a; --acc-lt:#ecd9a8;
  --surface:#0f0819; --surf-lt:#160e22;
  --border:rgba(212,191,138,.08); --bord-lt:rgba(212,191,138,.16);
  --hd:'Fraunces', 'Playfair Display', Georgia, serif;
  --bd:'Geist', 'Inter', system-ui, sans-serif;
  --mn:'Geist Mono', ui-monospace, monospace;
  background: var(--bg); color: var(--fg);
  font-family: var(--bd); font-size: 16px; line-height: 1.55;
  font-feature-settings: "ss01", "cv11";
  -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}
.qamr-contact *, .qamr-contact *::before, .qamr-contact *::after { box-sizing: border-box; margin: 0; padding: 0; }
.qamr-contact::after {
  content:''; position: fixed; inset: 0; pointer-events: none; z-index: 900; opacity: .022;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* Nav */
.qamr-contact nav {
  position: sticky; top: 0; z-index: 800;
  background: rgba(8,4,15,.78);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(28px) saturate(1.2);
  -webkit-backdrop-filter: blur(28px) saturate(1.2);
  padding: 16px 0;
}
.qamr-contact .nav-row {
  max-width: 1120px; margin: 0 auto; padding: 0 40px;
  display: flex; align-items: center; justify-content: space-between; gap: 24px;
}
.qamr-contact .nav-brand { display: inline-flex; align-items: center; gap: 11px; text-decoration: none; color: var(--fg); }
.qamr-contact .brand-mark { width: 26px; height: 26px; border-radius: 7px; object-fit: cover; display: inline-block; }
.qamr-contact .brand-mark.sm { width: 20px; height: 20px; border-radius: 5px; }
.qamr-contact .nav-brand-name {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 19px; font-weight: 600;
  letter-spacing: -.02em; line-height: 1;
}
.qamr-contact .nav-back {
  font-size: 13px; color: var(--muted-lt); text-decoration: none;
  display: inline-flex; align-items: center; gap: 8px;
  padding: 9px 16px 9px 14px; border-radius: 100px;
  border: 1px solid var(--border);
  transition: border-color .25s ease, color .25s ease, background .25s ease;
}
.qamr-contact .nav-back:hover {
  border-color: var(--bord-lt);
  color: var(--fg);
  background: rgba(212,191,138,.03);
}
.qamr-contact .nav-back svg { transition: transform .25s ease; }
.qamr-contact .nav-back:hover svg { transform: translateX(-2px); }

/* Hero */
.qamr-contact .c-hero {
  position: relative; overflow: hidden;
  padding: 128px 40px 96px;
  text-align: center;
}
.qamr-contact .c-orb {
  position:absolute; top:-12%; left:50%; transform: translateX(-50%);
  width: 1100px; height: 720px; border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(90,30,122,.20) 0%, rgba(45,10,62,.07) 45%, transparent 70%);
  pointer-events: none;
  animation: orb 14s ease-in-out infinite;
  filter: blur(8px);
}
.qamr-contact .c-warm {
  position:absolute; top: 14%; left:50%; transform: translateX(-50%);
  width: 560px; height: 320px; border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(212,191,138,.07) 0%, transparent 70%);
  pointer-events: none;
}
@keyframes orb {
  0%, 100% { opacity: .9; transform: translateX(-50%) scale(1); }
  50%      { opacity: .72; transform: translateX(-50%) scale(1.05); }
}

.qamr-contact .c-hero-inner {
  position: relative; z-index: 2;
  max-width: 720px; margin: 0 auto 72px;
}
.qamr-contact .c-kicker {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 6px 14px 6px 12px; border-radius: 100px;
  border: 1px solid rgba(212,191,138,.16);
  background: rgba(212,191,138,.04);
  font-family: var(--mn);
  font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 32px;
}
.qamr-contact .k-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px rgba(212,191,138,.6);
}
.qamr-contact .c-h1 {
  font-family: var(--hd);
  font-size: clamp(64px, 9vw, 128px);
  font-weight: 500;
  line-height: .98; letter-spacing: -.04em;
  margin-bottom: 28px;
  text-wrap: balance;
  font-variation-settings: "opsz" 144;
}
.qamr-contact .c-h1 em {
  font-style: italic; color: var(--accent);
  font-weight: 500;
  font-variation-settings: "opsz" 144;
}
.qamr-contact .c-lead {
  font-size: 18px;
  color: var(--fg-dim);
  font-weight: 300;
  max-width: 480px; margin: 0 auto;
  line-height: 1.6;
  text-wrap: balance;
}

/* Grid */
.qamr-contact .c-grid {
  position: relative; z-index: 2;
  max-width: 880px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
}

.qamr-contact .c-card {
  position: relative;
  display: flex; flex-direction: column;
  justify-content: space-between;
  padding: 28px 30px;
  min-height: 220px;
  text-align: left;
  text-decoration: none; color: var(--fg);
  background: linear-gradient(180deg, rgba(22,14,34,.7) 0%, rgba(12,7,22,.85) 100%);
  border: 1px solid var(--border);
  border-radius: 20px;
  overflow: hidden;
  transition: transform .4s cubic-bezier(.16,1,.3,1),
              border-color .4s ease,
              box-shadow .4s ease,
              background .4s ease;
}
.qamr-contact .c-card::before {
  content:''; position: absolute; inset: 0;
  border-radius: inherit; padding: 1px;
  background: linear-gradient(155deg, rgba(212,191,138,.32), rgba(212,191,138,.02) 50%, rgba(212,191,138,.14) 100%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  pointer-events: none; opacity: .5; transition: opacity .4s ease;
}
.qamr-contact .c-card::after {
  content:''; position: absolute;
  top: -45%; right: -32%;
  width: 380px; height: 380px; border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(212,191,138,.11) 0%, transparent 65%);
  pointer-events: none;
  transition: transform .8s cubic-bezier(.16,1,.3,1), opacity .5s ease;
  opacity: .55;
}
.qamr-contact .c-card:hover {
  transform: translateY(-3px);
  border-color: rgba(212,191,138,.18);
  background: linear-gradient(180deg, rgba(28,18,42,.75) 0%, rgba(16,9,28,.88) 100%);
  box-shadow: 0 24px 60px -12px rgba(0,0,0,.6), 0 0 0 1px rgba(212,191,138,.06);
}
.qamr-contact .c-card:hover::before { opacity: 1; }
.qamr-contact .c-card:hover::after { transform: translate(-30px, 24px) scale(1.18); opacity: 1; }

.qamr-contact .c-card-top {
  display: flex; align-items: center; justify-content: space-between;
  position: relative; z-index: 1;
}
.qamr-contact .c-icon {
  width: 42px; height: 42px; border-radius: 11px;
  border: 1px solid rgba(212,191,138,.18);
  background: rgba(212,191,138,.05);
  color: var(--accent);
  display: flex; align-items: center; justify-content: center;
  transition: border-color .35s ease, background .35s ease, transform .35s ease;
  flex: none;
}
.qamr-contact .c-card:hover .c-icon {
  border-color: rgba(212,191,138,.42);
  background: rgba(212,191,138,.1);
}
.qamr-contact .c-tag {
  font-family: var(--mn);
  font-size: 10.5px; letter-spacing: .2em; text-transform: uppercase;
  color: var(--muted-lt); font-weight: 500;
}

.qamr-contact .c-body {
  position: relative; z-index: 1;
  display: flex; align-items: flex-end; justify-content: space-between;
  gap: 20px;
}
.qamr-contact .c-body-text { min-width: 0; flex: 1; }
.qamr-contact .c-label {
  font-size: 12px;
  color: var(--muted-lt);
  letter-spacing: .005em;
  margin-bottom: 10px;
  font-weight: 400;
}
.qamr-contact .c-value {
  font-family: var(--hd);
  font-size: clamp(22px, 2.4vw, 28px);
  font-weight: 500; letter-spacing: -.022em;
  color: var(--fg); line-height: 1.1;
  font-variation-settings: "opsz" 72;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.qamr-contact .c-arrow {
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(212,191,138,.06); color: var(--accent);
  border: 1px solid rgba(212,191,138,.18);
  display: flex; align-items: center; justify-content: center;
  transition: background .35s ease, transform .35s ease,
              border-color .35s ease, color .35s ease;
  z-index: 2;
  flex: none;
  margin-bottom: 2px;
}
.qamr-contact .c-card:hover .c-arrow {
  background: var(--accent); color: #08040f; border-color: var(--accent);
  transform: translate(2px, -2px);
}

/* Meta under cards */
.qamr-contact .c-meta {
  position: relative; z-index: 2;
  display: flex; align-items: center; justify-content: center; gap: 14px;
  margin-top: 64px;
  font-family: var(--mn);
  font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
  color: var(--muted);
}
.qamr-contact .c-meta .dot {
  width: 4px; height: 4px; border-radius: 50%;
  background: var(--accent); opacity: .4;
}

/* Ribbon / what to expect */
.qamr-contact .c-ribbon {
  padding: 96px 40px 112px;
  border-top: 1px solid var(--border);
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(212,191,138,.012) 100%);
}
.qamr-contact .rib-head {
  max-width: 1120px; margin: 0 auto 40px;
}
.qamr-contact .rib-eyebrow {
  font-family: var(--mn);
  font-size: 11px; letter-spacing: .18em; text-transform: uppercase;
  color: var(--muted-lt);
}
.qamr-contact .rib-row {
  max-width: 1120px; margin: 0 auto;
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px;
  background: var(--border);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.qamr-contact .rib-item {
  display: flex; gap: 18px; align-items: flex-start;
  padding: 28px 28px 32px 0;
  background: var(--bg);
}
.qamr-contact .rib-item:not(:first-child) { padding-left: 28px; }
.qamr-contact .rib-num {
  font-family: var(--mn);
  font-size: 11px; font-weight: 500;
  color: var(--accent); opacity: .7;
  letter-spacing: .04em;
  margin-top: 4px;
  flex: none;
}
.qamr-contact .rib-text { flex: 1; }
.qamr-contact .rib-title {
  font-family: var(--hd);
  font-size: 19px; font-weight: 500;
  letter-spacing: -.015em;
  margin-bottom: 6px;
  color: var(--fg);
  font-variation-settings: "opsz" 72;
}
.qamr-contact .rib-desc {
  font-size: 14px; color: var(--muted-lt);
  font-weight: 300; line-height: 1.6;
  max-width: 32ch;
}

/* Footer */
.qamr-contact footer {
  padding: 32px 40px 36px;
  border-top: 1px solid var(--border);
}
.qamr-contact .foot-row {
  max-width: 1120px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 20px;
}
.qamr-contact .foot-brand {
  display: inline-flex; align-items: center; gap: 9px;
  text-decoration: none;
}
.qamr-contact .foot-brand span {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 14px; font-weight: 600;
  color: rgba(237,232,223,.5); letter-spacing: -.02em;
}
.qamr-contact .foot-links { display: flex; gap: 24px; flex-wrap: wrap; }
.qamr-contact .foot-links a {
  font-size: 12px; color: rgba(133,125,146,.6);
  text-decoration: none; transition: color .2s ease;
  letter-spacing: .005em;
}
.qamr-contact .foot-links a:hover { color: var(--fg-dim); }
.qamr-contact .foot-copy {
  font-family: var(--mn);
  font-size: 11px; color: rgba(106,98,120,.5);
  letter-spacing: .02em;
}

/* Responsive */
@media (max-width: 880px) {
  .qamr-contact .c-hero { padding: 88px 24px 72px; }
  .qamr-contact .c-hero-inner { margin-bottom: 48px; }
  .qamr-contact .c-grid { grid-template-columns: 1fr; gap: 14px; }
  .qamr-contact .c-card { min-height: 200px; padding: 26px; }
  .qamr-contact .c-meta { margin-top: 48px; }
  .qamr-contact .c-ribbon { padding: 72px 24px 80px; }
  .qamr-contact .rib-row { grid-template-columns: 1fr; gap: 1px; }
  .qamr-contact .rib-item { padding: 22px 0 26px 0 !important; }
  .qamr-contact .nav-row { padding: 0 24px; }
  .qamr-contact footer { padding: 28px 24px; }
  .qamr-contact .foot-row { justify-content: flex-start; gap: 16px; }
}
@media (max-width: 480px) {
  .qamr-contact .nav-back span { display: none; }
  .qamr-contact .nav-back { padding: 9px 12px; }
}
`;
