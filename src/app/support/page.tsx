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
  {
    q: "Can I support monthly?",
    a: "Yes, through our monthly supporter option.",
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
          <div className="sp-hero-inner">
            <div className="sp-badge" aria-hidden="true">
              <span className="sp-badge-dot" />
              For the Ummah
            </div>
            <h1 className="sp-h1">Support Qamr</h1>
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
  --muted-lt: #8a8298;
  --accent: #d4bf8a;
  --acc-lt: #e8d5a8;
  --surface: #0d0718;
  --surf-lt: #150d24;
  --border: #1c1428;
  --bord-lt: #2a1d40;
  --hd: 'Playfair Display', Georgia, serif;
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
  opacity: .014;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ── Nav ── */
.sp-nav {
  position: sticky;
  top: 0;
  z-index: 800;
  background: rgba(8, 4, 15, .92);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
.sp-nav-row {
  max-width: 560px;
  margin: 0 auto;
  padding: 13px 24px;
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
  border-color: rgba(212, 191, 138, .28);
  color: var(--fg);
}

/* ── Hero ── */
.sp-hero {
  border-bottom: 1px solid var(--border);
  padding: 48px 24px 40px;
}
.sp-hero-inner {
  max-width: 480px;
  margin: 0 auto;
  text-align: center;
}
.sp-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 4px 12px;
  border-radius: 100px;
  border: 1px solid rgba(212, 191, 138, .15);
  background: rgba(212, 191, 138, .06);
  font-size: 10px;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 16px;
}
.sp-badge-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--accent);
  opacity: .65;
  flex-shrink: 0;
}
.sp-h1 {
  font-family: var(--hd);
  font-size: clamp(40px, 7vw, 56px);
  font-weight: 800;
  letter-spacing: -.035em;
  line-height: 1.0;
  margin-bottom: 14px;
  color: var(--fg);
}
.sp-sub {
  font-size: 15px;
  color: var(--muted-lt);
  font-weight: 300;
  line-height: 1.72;
  margin-bottom: 28px;
}

/* ── Support buttons ── */
.sp-btn-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 18px;
}
.sp-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 68px;
  border-radius: 14px;
  border: 1.5px solid rgba(212, 191, 138, .24);
  background: rgba(212, 191, 138, .07);
  text-decoration: none;
  color: var(--accent);
  font-family: var(--hd);
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -.02em;
  transition: background .18s, border-color .18s, color .18s, transform .15s, box-shadow .2s;
  -webkit-tap-highlight-color: transparent;
}
.sp-btn:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: #07030d;
  transform: translateY(-1px);
  box-shadow: 0 8px 28px rgba(212, 191, 138, .2);
}
.sp-btn:active {
  transform: translateY(0);
  box-shadow: none;
}

/* ── Trust signals ── */
.sp-trust-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  color: var(--muted);
  margin-bottom: 7px;
}
.sp-disclaimer {
  font-size: 12px;
  color: var(--muted);
  opacity: .65;
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
  font-size: clamp(20px, 3vw, 26px);
  font-weight: 700;
  letter-spacing: -.02em;
  margin-bottom: 18px;
  color: var(--fg);
  line-height: 1.2;
}

/* ── Uses grid ── */
.sp-uses-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  background: var(--border);
  border-radius: 14px;
  overflow: hidden;
}
.sp-use-card {
  background: var(--surface);
  padding: 18px 18px;
  display: flex;
  align-items: flex-start;
  gap: 11px;
  transition: background .18s;
}
.sp-use-card:hover {
  background: var(--surf-lt);
}
.sp-use-emoji {
  font-size: 19px;
  line-height: 1;
  flex-shrink: 0;
  margin-top: 1px;
}
.sp-use-label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: var(--fg);
  margin-bottom: 3px;
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
  line-height: 1.8;
}

/* ── Stats ── */
.sp-stats-section {
  /* override sp-inner padding — stats fill full width of container */
}
.sp-stats {
  max-width: 560px;
  margin: 0 auto;
  display: flex;
}
.sp-stat {
  flex: 1;
  padding: 30px 16px;
  text-align: center;
  border-right: 1px solid var(--border);
}
.sp-stat:last-child {
  border-right: none;
}
.sp-stat-num {
  display: block;
  font-family: var(--hd);
  font-size: 26px;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: -.025em;
  margin-bottom: 4px;
  line-height: 1;
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
  padding: 16px 0;
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
  color: var(--muted);
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
  color: rgba(106, 98, 120, .48);
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
    min-height: 62px;
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
