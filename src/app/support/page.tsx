import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support Qamr",
  description: "Support Qamr, an independent Muslim app built for the Ummah.",
  openGraph: {
    title: "Support Qamr",
    description: "Support Qamr, an independent Muslim app built for the Ummah.",
    type: "website",
  },
};

const AMOUNTS = [
  { label: "$5",  href: "https://buy.stripe.com/6oU14m9yAd4K456adj3oA00" },
  { label: "$10", href: "https://buy.stripe.com/7sY8wOaCEfcSgRSadj3oA01" },
  { label: "$25", href: "https://buy.stripe.com/9B6eVcfWY1m2bxygBH3oA02" },
  { label: "$50", href: "https://buy.stripe.com/eVqdR8fWY7Kq7hiclr3oA03" },
] as const;

const USES = [
  { emoji: "🖥", label: "Servers & Infrastructure", desc: "Keep Qamr online and fast." },
  { emoji: "🚀", label: "Development",              desc: "Build new features and improve existing ones." },
  { emoji: "🛡", label: "Moderation & Safety",      desc: "Help maintain a healthy Muslim community." },
  { emoji: "🌍", label: "Growth",                   desc: "Reach more Muslims around the world." },
] as const;

const STATS = [
  { num: "2,000+",  label: "Downloads"    },
  { num: "20+",     label: "Countries"    },
  { num: "100%",    label: "Independent"  },
] as const;

const FAQS = [
  {
    q: "Is Qamr free?",
    a: "Yes. Qamr is completely free and will always remain so.",
  },
  {
    q: "Do I get extra features for supporting?",
    a: "No. This is voluntary support only. It does not unlock features, content, or badges.",
  },
  {
    q: "Is payment secure?",
    a: "Yes. Payments are processed securely through Stripe.",
  },
] as const;

export default function SupportPage() {
  return (
    <>
      <style>{CSS}</style>
      <div className="qamr-support">

        {/* ── Nav ── */}
        <nav className="sp-nav">
          <div className="sp-nav-row">
            <a href="/" className="sp-brand">
              <img src="/logo.png" alt="Qamr" className="sp-brand-mark" />
              <span className="sp-brand-name">Qamr</span>
            </a>
            <a href="/" className="sp-back-link" aria-label="Back to Qamr homepage">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back
            </a>
          </div>
        </nav>

        {/* ── Section 1: Above the fold ── */}
        <section className="sp-hero">
          <div className="sp-orb-purple" aria-hidden="true" />
          <div className="sp-orb-gold"   aria-hidden="true" />
          <div className="sp-hero-inner">
            <div className="sp-badge" aria-hidden="true">
              <span className="sp-badge-dot" />
              For the Ummah
            </div>
            <h1 className="sp-h1">Support <em>Qamr</em></h1>
            <p className="sp-sub">
              Qamr is an independent platform built to help Muslims connect,
              learn, and grow together. Your support helps keep it free and
              continue improving for the global Ummah.
            </p>

            <div className="sp-btn-grid" role="list">
              {AMOUNTS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="sp-btn"
                  role="listitem"
                  aria-label={`Support Qamr with ${label}`}
                  rel="noopener noreferrer"
                >
                  {label}
                </a>
              ))}
            </div>

            <div className="sp-trust-row">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              Secure payments powered by Stripe
            </div>
            <p className="sp-disclaimer">
              Support is completely optional. Qamr remains free for everyone.
            </p>
          </div>
        </section>

        {/* ── Section 2: Where support goes ── */}
        <section className="sp-section" aria-labelledby="uses-heading">
          <div className="sp-inner">
            <h2 className="sp-section-h" id="uses-heading">Where your support goes</h2>
            <div className="sp-uses-grid" role="list">
              {USES.map(({ emoji, label, desc }) => (
                <div className="sp-use-card" key={label} role="listitem">
                  <span className="sp-use-emoji" aria-hidden="true">{emoji}</span>
                  <div>
                    <span className="sp-use-label">{label}</span>
                    <span className="sp-use-desc">{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 3: Built for the Ummah ── */}
        <section className="sp-section" aria-labelledby="mission-heading">
          <div className="sp-inner">
            <h2 className="sp-section-h" id="mission-heading">Built for the Ummah</h2>
            <p className="sp-mission-body">
              Qamr is built independently — no venture funding, no large team.
              Just a genuine effort to create a better space for Muslims online.
              Every contribution directly helps improve the platform and allows us
              to serve more of the global Ummah.
            </p>
          </div>
        </section>

        {/* ── Section 4: Social proof ── */}
        <section className="sp-section sp-stats-section" aria-label="Community stats">
          <div className="sp-stats" role="list">
            {STATS.map(({ num, label }) => (
              <div className="sp-stat" key={label} role="listitem">
                <span className="sp-stat-num">{num}</span>
                <span className="sp-stat-label">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 5: FAQ ── */}
        <section className="sp-section" aria-labelledby="faq-heading">
          <div className="sp-inner">
            <h2 className="sp-section-h" id="faq-heading">Common questions</h2>
            <div className="sp-faq-list">
              {FAQS.map(({ q, a }) => (
                <details className="sp-faq-item" key={q}>
                  <summary className="sp-faq-q">
                    <span>{q}</span>
                    <span className="sp-faq-chevron" aria-hidden="true">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </summary>
                  <p className="sp-faq-a">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="sp-footer">
          <div className="sp-foot-row">
            <a href="/" className="sp-foot-brand">
              <img src="/logo.png" alt="Qamr" className="sp-foot-mark" />
              <span>Qamr</span>
            </a>
            <nav className="sp-foot-links" aria-label="Footer navigation">
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
              <a href="/community-guidelines">Community</a>
              <a href="mailto:qamrapp@gmail.com">Contact</a>
            </nav>
            <p className="sp-foot-copy">© 2026 Qamr. Built for humans.</p>
          </div>
        </footer>

      </div>
    </>
  );
}

const CSS = `
.qamr-support {
  --bg: #08040f;
  --fg: #ede8df;
  --muted: #6a6278;
  --muted-lt: #9088a0;
  --accent: #edd46e;
  --acc-lt: #f6e9a0;
  --surface: #110a1c;
  --surf-lt: #1a1028;
  --border: #251a38;
  --bord-lt: #3a2850;
  --hd: 'DM Sans', system-ui, sans-serif;
  --bd: 'DM Sans', system-ui, sans-serif;
  background: var(--bg);
  color: var(--fg);
  font-family: var(--bd);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
}
.qamr-support *, .qamr-support *::before, .qamr-support *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.qamr-support::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 999;
  opacity: .022;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ── Nav ── */
.sp-nav {
  position: sticky;
  top: 0;
  z-index: 800;
  background: rgba(8, 4, 15, .88);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
.sp-nav-row {
  max-width: 560px;
  margin: 0 auto;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.sp-brand {
  display: flex;
  align-items: center;
  gap: 9px;
  text-decoration: none;
  color: var(--fg);
}
.sp-brand-mark {
  width: 26px;
  height: 26px;
  border-radius: 7px;
  object-fit: cover;
  display: block;
}
.sp-brand-name {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -.02em;
}
.sp-back-link {
  font-size: 12px;
  color: var(--muted-lt);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 100px;
  border: 1px solid var(--border);
  transition: border-color .2s, color .2s;
}
.sp-back-link:hover {
  border-color: rgba(237, 212, 110, .35);
  color: var(--fg);
}

/* ── Hero ── */
.sp-hero {
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--border);
  padding: 52px 24px 44px;
}
/* Large purple atmospheric orb — matches homepage hero-orb */
.sp-orb-purple {
  position: absolute;
  top: -30%;
  left: 50%;
  transform: translateX(-50%);
  width: 900px;
  height: 640px;
  border-radius: 50%;
  background: radial-gradient(ellipse,
    rgba(90, 30, 122, .22) 0%,
    rgba(61, 18, 82,  .10) 42%,
    transparent 70%);
  pointer-events: none;
}
/* Warm gold orb — matches homepage hero-orb-warm */
.sp-orb-gold {
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  width: 560px;
  height: 340px;
  border-radius: 50%;
  background: radial-gradient(ellipse,
    rgba(255, 217, 125, .18) 0%,
    rgba(240, 180, 120, .07) 42%,
    transparent 70%);
  pointer-events: none;
}
.sp-hero-inner {
  position: relative;
  z-index: 2;
  max-width: 480px;
  margin: 0 auto;
  text-align: center;
}

/* Kicker badge */
.sp-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 14px;
  border-radius: 100px;
  border: 1px solid rgba(237, 212, 110, .18);
  background: rgba(237, 212, 110, .06);
  font-size: 10px;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 18px;
  font-weight: 500;
}
.sp-badge-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px rgba(237, 212, 110, .65);
  flex-shrink: 0;
  animation: sp-pulse 2.4s ease-in-out infinite;
}
@keyframes sp-pulse {
  0%, 100% { opacity: .9; }
  50%       { opacity: .35; }
}

/* Headline */
.sp-h1 {
  font-family: var(--hd);
  font-size: clamp(42px, 7.5vw, 62px);
  font-weight: 500;
  letter-spacing: -.02em;
  line-height: 1.04;
  margin-bottom: 16px;
  color: var(--fg);
}
/* "Qamr" gets light golden gradient */
.sp-h1 em {
  font-style: normal;
  font-weight: 500;
  background: linear-gradient(180deg, var(--acc-lt) 0%, var(--accent) 60%, #c8a430 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.sp-sub {
  font-size: 15px;
  color: var(--muted-lt);
  font-weight: 300;
  line-height: 1.72;
  margin-bottom: 30px;
}

/* ── Support buttons — premium store-badge style ── */
.sp-btn-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 18px;
}
.sp-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 72px;
  border-radius: 16px;
  border: 1px solid var(--bord-lt);
  background: linear-gradient(180deg, #1c1030 0%, #0c0618 100%);
  text-decoration: none;
  color: var(--accent);
  font-family: var(--bd);
  font-size: 26px;
  font-weight: 500;
  letter-spacing: -.01em;
  overflow: hidden;
  box-shadow:
    0 2px 0 rgba(0, 0, 0, .4),
    0 6px 20px rgba(0, 0, 0, .35),
    inset 0 1px 0 rgba(255, 255, 255, .05);
  transition: transform .2s, box-shadow .25s, border-color .2s, background .2s, color .2s;
  -webkit-tap-highlight-color: transparent;
}
/* Gradient border shimmer — matches homepage store-badge::before */
.sp-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(160deg,
    rgba(237, 212, 110, .52) 0%,
    rgba(237, 212, 110, .06) 45%,
    rgba(237, 212, 110, .26) 100%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  transition: opacity .2s;
}
.sp-btn:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: #07030d;
  transform: translateY(-2px);
  box-shadow:
    0 12px 36px rgba(237, 212, 110, .28),
    0 4px 12px rgba(0, 0, 0, .3);
}
.sp-btn:hover::before {
  opacity: 0;
}
.sp-btn:active {
  transform: translateY(0);
}

/* ── Trust signals ── */
.sp-trust-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  color: var(--muted-lt);
  margin-bottom: 7px;
}
.sp-disclaimer {
  font-size: 12px;
  color: var(--muted);
}

/* ── Shared section ── */
.sp-section {
  border-bottom: 1px solid var(--border);
}
.sp-inner {
  max-width: 560px;
  margin: 0 auto;
  padding: 40px 24px;
}
.sp-section-h {
  font-family: var(--hd);
  font-size: clamp(18px, 2.8vw, 23px);
  font-weight: 500;
  letter-spacing: -.01em;
  margin-bottom: 20px;
  color: var(--fg);
  line-height: 1.25;
}

/* ── Uses grid ── */
.sp-uses-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
}
.sp-use-card {
  background: var(--surface);
  padding: 20px 18px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  transition: background .18s;
}
.sp-use-card:hover {
  background: var(--surf-lt);
}
.sp-use-emoji {
  font-size: 20px;
  line-height: 1;
  flex-shrink: 0;
  margin-top: 1px;
}
.sp-use-label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: var(--fg);
  margin-bottom: 4px;
  line-height: 1.3;
}
.sp-use-desc {
  display: block;
  font-size: 12px;
  color: var(--muted-lt);
  font-weight: 300;
  line-height: 1.5;
}

/* ── Mission ── */
.sp-mission-body {
  font-size: 15px;
  color: var(--muted-lt);
  font-weight: 300;
  line-height: 1.82;
  padding-left: 16px;
  border-left: 2px solid rgba(237, 212, 110, .3);
}

/* ── Stats ── */
.sp-stats {
  max-width: 560px;
  margin: 0 auto;
  display: flex;
}
.sp-stat {
  flex: 1;
  padding: 32px 16px;
  text-align: center;
  border-right: 1px solid var(--border);
}
.sp-stat:last-child {
  border-right: none;
}
.sp-stat-num {
  display: block;
  font-family: var(--bd);
  font-size: 26px;
  font-weight: 500;
  letter-spacing: -.015em;
  margin-bottom: 5px;
  line-height: 1;
  background: linear-gradient(180deg, var(--acc-lt) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.sp-stat-label {
  display: block;
  font-size: 11px;
  color: var(--muted-lt);
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: .1em;
}

/* ── FAQ ── */
.sp-faq-list {
  border-top: 1px solid var(--border);
}
.sp-faq-item {
  border-bottom: 1px solid var(--border);
}
.sp-faq-q {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 17px 0;
  font-size: 14px;
  font-weight: 400;
  color: var(--fg);
  cursor: pointer;
  list-style: none;
  user-select: none;
  transition: color .18s;
}
.sp-faq-q::-webkit-details-marker {
  display: none;
}
.sp-faq-item[open] .sp-faq-q {
  color: var(--accent);
}
.sp-faq-chevron {
  color: var(--muted-lt);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  transition: transform .22s, color .18s;
}
.sp-faq-item[open] .sp-faq-chevron {
  transform: rotate(180deg);
  color: var(--accent);
}
.sp-faq-a {
  font-size: 14px;
  color: var(--muted-lt);
  font-weight: 300;
  line-height: 1.7;
  padding: 0 20px 16px 0;
}

/* ── Footer ── */
.sp-footer {
  padding: 26px 24px;
}
.sp-foot-row {
  max-width: 560px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
}
.sp-foot-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}
.sp-foot-mark {
  width: 20px;
  height: 20px;
  border-radius: 5px;
  object-fit: cover;
}
.sp-foot-brand span {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: rgba(237, 232, 223, .36);
  letter-spacing: -.02em;
}
.sp-foot-links {
  display: flex;
  gap: 18px;
}
.sp-foot-links a {
  font-size: 12px;
  color: rgba(106, 98, 120, .5);
  text-decoration: none;
  transition: color .18s;
}
.sp-foot-links a:hover {
  color: var(--muted-lt);
}
.sp-foot-copy {
  font-size: 11px;
  color: rgba(106, 98, 120, .36);
}

/* ── Responsive ── */
@media (max-width: 400px) {
  .sp-btn {
    font-size: 24px;
    min-height: 64px;
  }
  .sp-stats {
    flex-direction: column;
  }
  .sp-stat {
    border-right: none;
    border-bottom: 1px solid var(--border);
    padding: 18px 24px;
    text-align: left;
    display: flex;
    align-items: baseline;
    gap: 10px;
  }
  .sp-stat:last-child {
    border-bottom: none;
  }
}
@media (max-width: 360px) {
  .sp-foot-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  .sp-foot-links {
    flex-wrap: wrap;
    gap: 10px;
  }
}
`;
