"use client";

/**
 * Qamr — Contact page (single-file React/TSX).
 * Matches the Qamr theme (plum/gold, Playfair Display + DM Sans, grain overlay).
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
              <span className="brand-mark">Q</span>
              <span className="nav-brand-name">Qamr</span>
            </a>
            <a href="/" className="nav-back">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back to site
            </a>
          </div>
        </nav>

        <section className="c-hero">
          <div className="c-orb" />
          <div className="c-warm" />

          <div className="c-hero-inner">
            <div className="c-kicker">
              <span className="k-dot" /> Get in touch
            </div>
            <h1 className="c-h1">
              Say <em>salaam.</em>
            </h1>
            <p className="c-lead">
              Questions, feedback, press, partnerships — we actually read every message.
              Pick whichever channel feels right.
            </p>
          </div>

          {/* Contact cards */}
          <div className="c-grid">

            <a href="mailto:qamrapp@gmail.com" className="c-card">
              <div className="c-card-top">
                <div className="c-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <path d="M2 7l10 7 10-7" />
                  </svg>
                </div>
                <span className="c-tag">Email</span>
              </div>
              <div className="c-body">
                <div className="c-label">Write us anything</div>
                <div className="c-value">qamrapp@gmail.com</div>
              </div>
              <div className="c-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </a>

            <a href="https://instagram.com/qamrapp" target="_blank" rel="noopener noreferrer" className="c-card">
              <div className="c-card-top">
                <div className="c-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
                  </svg>
                </div>
                <span className="c-tag">Instagram</span>
              </div>
              <div className="c-body">
                <div className="c-label">Follow along</div>
                <div className="c-value">@qamrapp</div>
              </div>
              <div className="c-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
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
          <div className="rib-row">
            <RibbonItem title="Feedback" desc="Bugs, ideas, things you wish Qamr did." />
            <RibbonItem title="Press & partnerships" desc="Media, interviews, or working together." />
            <RibbonItem title="Support" desc="Account help, report a problem, request deletion." />
          </div>
        </section>

        <footer>
          <div className="foot-row">
            <a href="/" className="foot-brand">
              <span className="brand-mark sm">Q</span>
              <span>Qamr</span>
            </a>
            <div className="foot-links">
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
              <a href="/contact">Contact</a>
            </div>
            <p className="foot-copy">© 2026 Qamr. Built for humans.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

function RibbonItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rib-item">
      <div className="rib-num" />
      <div>
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
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap";
    document.head.appendChild(link);
  }
  return null;
}

const CSS = `
.qamr-contact {
  --bg:#08040f; --fg:#ede8df; --muted:#6a6278; --muted-lt:#8a8298;
  --accent:#d4bf8a; --acc-lt:#e8d5a8;
  --surface:#0f0819; --surf-lt:#160e22;
  --border:#1e1530; --bord-lt:#2c1f46;
  --hd:'Playfair Display', Georgia, serif;
  --bd:'DM Sans', system-ui, sans-serif;
  background: var(--bg); color: var(--fg);
  font-family: var(--bd); font-size: 16px; line-height: 1.6;
  -webkit-font-smoothing: antialiased; min-height: 100vh;
}
.qamr-contact *, .qamr-contact *::before, .qamr-contact *::after { box-sizing: border-box; margin: 0; padding: 0; }
.qamr-contact::after {
  content:''; position: fixed; inset: 0; pointer-events: none; z-index: 900; opacity: .018;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.qamr-contact nav {
  position: sticky; top: 0; z-index: 800;
  background: rgba(8,4,15,.88);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(24px);
  padding: 18px 0;
}
.qamr-contact .nav-row { max-width: 1040px; margin: 0 auto; padding: 0 32px; display:flex; align-items:center; justify-content:space-between; }
.qamr-contact .nav-brand { display:flex; align-items:center; gap:10px; text-decoration:none; color:var(--fg); }
.qamr-contact .brand-mark {
  width: 28px; height: 28px; border-radius: 7px;
  background: linear-gradient(135deg, var(--accent), #b89a55);
  color: #08040f; display:inline-flex; align-items:center; justify-content:center;
  font-family: var(--hd); font-weight: 800; font-size: 15px;
}
.qamr-contact .brand-mark.sm { width: 22px; height: 22px; font-size: 12px; border-radius: 6px; }
.qamr-contact .nav-brand-name { font-family: var(--hd); font-size: 19px; font-weight: 700; letter-spacing: -.02em; }
.qamr-contact .nav-back {
  font-size: 12px; color: var(--muted-lt); text-decoration:none;
  display:inline-flex; align-items:center; gap: 8px;
  padding: 9px 18px; border-radius: 100px;
  border: 1px solid var(--border); transition: border-color .2s, color .2s;
}
.qamr-contact .nav-back:hover { border-color: rgba(212,191,138,.3); color: var(--fg); }

/* Hero */
.qamr-contact .c-hero {
  position: relative; overflow: hidden;
  padding: 110px 32px 100px;
  text-align: center;
}
.qamr-contact .c-orb {
  position:absolute; top:-10%; left:50%; transform: translateX(-50%);
  width: 1000px; height: 700px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(90,30,122,.18) 0%, rgba(45,10,62,.08) 45%, transparent 70%);
  pointer-events: none;
  animation: orb 10s ease-in-out infinite;
}
.qamr-contact .c-warm {
  position:absolute; top: 18%; left:50%; transform: translateX(-50%);
  width: 500px; height: 300px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(212,191,138,.06) 0%, transparent 70%);
  pointer-events: none;
}
@keyframes orb { 0%,100%{opacity:.9;transform:translateX(-50%) scale(1)} 50%{opacity:.75;transform:translateX(-50%) scale(1.04)} }

.qamr-contact .c-hero-inner { position: relative; z-index: 2; max-width: 760px; margin: 0 auto 56px; }
.qamr-contact .c-kicker {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 5px 16px; border-radius: 100px;
  border: 1px solid rgba(212,191,138,.14);
  background: rgba(212,191,138,.04);
  font-size: 11px; letter-spacing: .18em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 28px;
}
.qamr-contact .k-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--accent); opacity: .7; }
.qamr-contact .c-h1 {
  font-family: var(--hd);
  font-size: clamp(56px, 8vw, 116px);
  font-weight: 800; line-height: 1.02; letter-spacing: -.035em;
  margin-bottom: 22px; text-wrap: balance;
}
.qamr-contact .c-h1 em { font-style: italic; color: var(--accent); font-weight: 700; }
.qamr-contact .c-lead {
  font-size: 17px; color: var(--muted-lt); font-weight: 300;
  max-width: 540px; margin: 0 auto; line-height: 1.75;
}

/* Grid */
.qamr-contact .c-grid {
  position: relative; z-index: 2;
  max-width: 980px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr; gap: 18px;
}

.qamr-contact .c-card {
  position: relative;
  display: flex; flex-direction: column; gap: 56px;
  padding: 32px;
  min-height: 240px;
  text-decoration: none; color: var(--fg);
  background: linear-gradient(180deg, rgba(22,14,34,.9) 0%, rgba(12,7,22,.92) 100%);
  border: 1px solid var(--border);
  border-radius: 22px;
  overflow: hidden;
  transition: transform .35s cubic-bezier(.16,1,.3,1), border-color .35s, box-shadow .4s;
}
.qamr-contact .c-card::before {
  content:''; position: absolute; inset: 0;
  border-radius: inherit; padding: 1px;
  background: linear-gradient(160deg, rgba(212,191,138,.35), rgba(212,191,138,.04) 45%, rgba(212,191,138,.18) 100%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  pointer-events: none; opacity: .55; transition: opacity .35s;
}
.qamr-contact .c-card::after {
  content:''; position: absolute;
  top: -40%; right: -30%;
  width: 360px; height: 360px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(212,191,138,.1) 0%, transparent 65%);
  pointer-events: none;
  transition: transform .6s cubic-bezier(.16,1,.3,1), opacity .4s;
  opacity: .6;
}
.qamr-contact .c-card:hover {
  transform: translateY(-4px);
  border-color: rgba(212,191,138,.22);
  box-shadow: 0 30px 80px rgba(0,0,0,.55), 0 0 0 1px rgba(212,191,138,.08);
}
.qamr-contact .c-card:hover::before { opacity: 1; }
.qamr-contact .c-card:hover::after { transform: translate(-20px, 20px) scale(1.15); opacity: .95; }

.qamr-contact .c-card-top { display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 1; }
.qamr-contact .c-icon {
  width: 48px; height: 48px; border-radius: 12px;
  border: 1px solid rgba(212,191,138,.18);
  background: rgba(212,191,138,.05);
  color: var(--accent);
  display: flex; align-items: center; justify-content: center;
  transition: border-color .3s, background .3s;
}
.qamr-contact .c-card:hover .c-icon { border-color: rgba(212,191,138,.4); background: rgba(212,191,138,.1); }
.qamr-contact .c-tag {
  font-size: 10px; letter-spacing: .22em; text-transform: uppercase;
  color: var(--muted); font-weight: 500;
}

.qamr-contact .c-body { position: relative; z-index: 1; }
.qamr-contact .c-label { font-size: 12px; color: var(--muted); letter-spacing: .05em; margin-bottom: 8px; }
.qamr-contact .c-value {
  font-family: var(--hd);
  font-size: clamp(22px, 2.4vw, 32px);
  font-weight: 700; letter-spacing: -.02em;
  color: var(--fg); line-height: 1.1;
}

.qamr-contact .c-arrow {
  position: absolute; right: 28px; bottom: 28px;
  width: 38px; height: 38px; border-radius: 50%;
  background: rgba(212,191,138,.08); color: var(--accent);
  border: 1px solid rgba(212,191,138,.2);
  display: flex; align-items: center; justify-content: center;
  transition: background .3s, transform .3s, border-color .3s, color .3s;
  z-index: 1;
}
.qamr-contact .c-card:hover .c-arrow {
  background: var(--accent); color: #08040f; border-color: var(--accent);
  transform: translate(3px, -3px);
}

/* Meta under cards */
.qamr-contact .c-meta {
  position: relative; z-index: 2;
  display: flex; align-items: center; justify-content: center; gap: 14px;
  margin-top: 56px;
  font-size: 11px; letter-spacing: .18em; text-transform: uppercase;
  color: var(--muted);
}
.qamr-contact .c-meta .dot { width: 4px; height: 4px; border-radius: 50%; background: var(--accent); opacity: .45; }

/* Ribbon / what to expect */
.qamr-contact .c-ribbon {
  padding: 60px 32px 80px;
  border-top: 1px solid var(--border);
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(212,191,138,.015) 100%);
}
.qamr-contact .rib-row {
  max-width: 1040px; margin: 0 auto;
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px;
}
.qamr-contact .rib-item {
  display: flex; gap: 18px; align-items: flex-start;
  padding-top: 20px; border-top: 1px solid var(--border);
}
.qamr-contact .rib-num {
  flex: none; width: 6px; height: 6px; border-radius: 50%;
  background: var(--accent); opacity: .6; margin-top: 8px;
}
.qamr-contact .rib-title {
  font-family: var(--hd); font-size: 17px; font-weight: 700;
  letter-spacing: -.01em; margin-bottom: 4px;
}
.qamr-contact .rib-desc {
  font-size: 13px; color: var(--muted-lt); font-weight: 300; line-height: 1.65;
}

/* Footer */
.qamr-contact footer { padding: 36px 32px; border-top: 1px solid var(--border); }
.qamr-contact .foot-row {
  max-width: 1040px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px;
}
.qamr-contact .foot-brand { display:flex; align-items:center; gap:9px; text-decoration:none; }
.qamr-contact .foot-brand span { font-family: var(--hd); font-size: 14px; font-weight: 700; color: rgba(237,232,223,.45); letter-spacing: -.02em; }
.qamr-contact .foot-links { display:flex; gap:24px; }
.qamr-contact .foot-links a { font-size:12px; color: rgba(106,98,120,.5); text-decoration:none; transition: color .2s; }
.qamr-contact .foot-links a:hover { color: var(--muted-lt); }
.qamr-contact .foot-copy { font-size: 11px; color: rgba(106,98,120,.4); }

@media (max-width: 820px) {
  .qamr-contact .c-hero { padding: 80px 20px 70px; }
  .qamr-contact .c-grid { grid-template-columns: 1fr; padding: 0 4px; }
  .qamr-contact .rib-row { grid-template-columns: 1fr; gap: 24px; }
  .qamr-contact .nav-row { padding: 0 20px; }
}
`;
