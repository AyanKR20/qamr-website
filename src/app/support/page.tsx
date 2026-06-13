import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support Qamr",
  description:
    "Support Qamr, an independent Muslim app built for the Ummah.",
  openGraph: {
    title: "Support Qamr",
    description: "Support Qamr, an independent Muslim app built for the Ummah.",
    type: "website",
  },
};

const STRIPE = {
  five:   "https://buy.stripe.com/6oU14m9yAd4K456adj3oA00",
  ten:    "https://buy.stripe.com/7sY8wOaCEfcSgRSadj3oA01",
  twenty: "https://buy.stripe.com/9B6eVcfWY1m2bxygBH3oA02",
  fifty:  "https://buy.stripe.com/eVqdR8fWY7Kq7hiclr3oA03",
} as const;

const AMOUNTS = [
  { label: "$5",  href: STRIPE.five   },
  { label: "$10", href: STRIPE.ten    },
  { label: "$25", href: STRIPE.twenty },
  { label: "$50", href: STRIPE.fifty  },
] as const;

const USES = [
  {
    label: "Servers & infrastructure",
    desc: "Keeping Qamr fast and available for everyone.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
  },
  {
    label: "App development",
    desc: "Building and improving features the Ummah needs.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    label: "Moderation & safety",
    desc: "Keeping Qamr a trustworthy, human-first space.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    label: "New Muslim-focused features",
    desc: "Quran, Hadith, prayer tools, nasheeds, and more.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
] as const;

const FAQS = [
  {
    q: "Is Qamr still free?",
    a: "Yes. Support is completely optional and Qamr remains free to use.",
  },
  {
    q: "Do I get extra features for supporting?",
    a: "No. This is voluntary support only and does not unlock digital features, content, or badges.",
  },
  {
    q: "Is payment secure?",
    a: "Yes. Payments are processed securely through Stripe.",
  },
  {
    q: "Can I support monthly?",
    a: "Yes, use the monthly supporter option above.",
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
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to site
            </a>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section className="sp-hero">
          <div className="sp-orb" aria-hidden="true" />
          <div className="sp-warm" aria-hidden="true" />
          <div className="sp-hero-inner">
            <div className="sp-kicker" aria-hidden="true">
              <span className="sp-k-dot" />
              For the Ummah
            </div>
            <h1 className="sp-h1">
              Support<br />
              <em>Qamr</em>
            </h1>
            <p className="sp-lead">
              Built by people who love this Ummah. Whatever you can give
              helps Qamr stay free, independent, and growing for every Muslim who uses it.
            </p>
          </div>
        </section>

        {/* ── Amounts (first) ── */}
        <section className="sp-section sp-amounts-section" aria-labelledby="amounts-heading">
          <div className="sp-inner">
            <div className="sp-label" aria-hidden="true">Choose what feels right</div>
            <h2 className="sp-h2" id="amounts-heading">Every bit helps</h2>
            <p className="sp-amounts-intro">
              No pressure. No perks. Just your support.
            </p>

            <div className="sp-pills" role="list">
              {AMOUNTS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="sp-pill"
                  role="listitem"
                  aria-label={`Support Qamr with ${label}`}
                  rel="noopener noreferrer"
                >
                  <span className="sp-pill-amount">{label}</span>
                </a>
              ))}
            </div>

            <p className="sp-stripe-note">
              Payments secured by Stripe · No account needed
            </p>
          </div>
        </section>

        {/* ── Mission (second) ── */}
        <section className="sp-section sp-mission" aria-labelledby="why-heading">
          <div className="sp-inner sp-mission-inner">
            <div className="sp-label" aria-hidden="true">Our mission</div>
            <h2 className="sp-h2" id="why-heading">Why support Qamr?</h2>
            <p className="sp-body">
              Qamr is built with the goal of creating a better online space for
              Muslims — with features like Quran, Hadith, prayer tools, nasheeds,
              Muslim news, and a community feed. Every contribution helps cover
              development, servers, moderation, and new features.
            </p>
          </div>
        </section>

        {/* ── Transparency ── */}
        <section className="sp-section sp-uses-section" aria-labelledby="uses-heading">
          <div className="sp-inner">
            <div className="sp-label" aria-hidden="true">Transparency</div>
            <h2 className="sp-h2" id="uses-heading">What your support goes towards</h2>
            <div className="sp-uses-grid" role="list">
              {USES.map(({ icon, label, desc }) => (
                <div className="sp-use-card" key={label} role="listitem">
                  <div className="sp-use-icon">{icon}</div>
                  <div>
                    <span className="sp-use-label">{label}</span>
                    <span className="sp-use-desc">{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="sp-section sp-faq-section" aria-labelledby="faq-heading">
          <div className="sp-inner sp-faq-inner">
            <div className="sp-label" aria-hidden="true">FAQ</div>
            <h2 className="sp-h2" id="faq-heading">Common questions</h2>
            <div className="sp-faq-list">
              {FAQS.map(({ q, a }) => (
                <details className="sp-faq-item" key={q}>
                  <summary className="sp-faq-q">
                    <span>{q}</span>
                    <span className="sp-faq-chevron" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

        {/* ── Footer CTA ── */}
        <section className="sp-cta" aria-label="Call to action">
          <div className="sp-cta-orb" aria-hidden="true" />
          <div className="sp-cta-inner">
            <h2 className="sp-cta-h">
              Help Qamr reach<br />
              <em>more Muslims</em>
            </h2>
            <p className="sp-cta-body">
              Even a small contribution helps keep Qamr growing.
            </p>
            <a
              href="#amounts-heading"
              className="sp-cta-btn"
              aria-label="Support Qamr — choose an amount"
            >
              Support Qamr
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
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
              <a href="/community-guidelines">Community Guidelines</a>
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
  --surface: #0f0819;
  --surf-lt: #160e22;
  --border: #1e1530;
  --bord-lt: #2c1f46;
  --hd: 'Playfair Display', Georgia, serif;
  --bd: 'DM Sans', system-ui, sans-serif;
  background: var(--bg);
  color: var(--fg);
  font-family: var(--bd);
  font-size: 16px;
  line-height: 1.7;
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
  z-index: 900;
  opacity: .018;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ── Nav ── */
.sp-nav {
  position: sticky;
  top: 0;
  z-index: 800;
  background: rgba(8, 4, 15, .88);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  padding: 18px 0;
}
.sp-nav-row {
  max-width: 1040px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.sp-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--fg);
}
.sp-brand-mark {
  width: 28px;
  height: 28px;
  border-radius: 7px;
  object-fit: cover;
  display: block;
}
.sp-brand-name {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 19px;
  font-weight: 600;
  letter-spacing: -.02em;
}
.sp-back-link {
  font-size: 12px;
  color: var(--muted-lt);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 18px;
  border-radius: 100px;
  border: 1px solid var(--border);
  transition: border-color .2s, color .2s;
}
.sp-back-link:hover {
  border-color: rgba(212, 191, 138, .3);
  color: var(--fg);
}

/* ── Hero ── */
.sp-hero {
  position: relative;
  overflow: hidden;
  padding: 130px 32px 110px;
  text-align: center;
  border-bottom: 1px solid var(--border);
}
.sp-orb {
  position: absolute;
  top: -30%;
  left: 50%;
  transform: translateX(-50%);
  width: 1000px;
  height: 700px;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(90, 30, 122, .16) 0%, rgba(45, 10, 62, .05) 50%, transparent 72%);
  pointer-events: none;
}
.sp-warm {
  position: absolute;
  top: -10%;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(212, 191, 138, .07) 0%, transparent 70%);
  pointer-events: none;
}
.sp-hero-inner {
  position: relative;
  z-index: 2;
  max-width: 640px;
  margin: 0 auto;
}
.sp-kicker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 18px;
  border-radius: 100px;
  border: 1px solid rgba(212, 191, 138, .14);
  background: rgba(212, 191, 138, .04);
  font-size: 11px;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 32px;
}
.sp-k-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--accent);
  opacity: .65;
}
.sp-h1 {
  font-family: var(--hd);
  font-size: clamp(56px, 7.5vw, 100px);
  font-weight: 800;
  line-height: .98;
  letter-spacing: -.04em;
  margin-bottom: 28px;
}
.sp-h1 em {
  font-style: italic;
  color: var(--accent);
  font-weight: 700;
}
.sp-lead {
  font-size: 18px;
  color: var(--muted-lt);
  font-weight: 300;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.78;
}

/* ── Shared section ── */
.sp-section {
  border-bottom: 1px solid var(--border);
}
.sp-inner {
  max-width: 1040px;
  margin: 0 auto;
  padding: 80px 32px;
}
.sp-label {
  font-size: 10px;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
}
.sp-label::before {
  content: '';
  width: 20px;
  height: 1px;
  background: var(--accent);
  opacity: .45;
}
.sp-h2 {
  font-family: var(--hd);
  font-size: clamp(28px, 3vw, 40px);
  font-weight: 700;
  letter-spacing: -.025em;
  margin-bottom: 8px;
  line-height: 1.15;
}
.sp-body {
  font-size: 17px;
  color: var(--muted-lt);
  font-weight: 300;
  line-height: 1.82;
  max-width: 620px;
}

/* ── Amounts ── */
.sp-amounts-intro {
  font-size: 15px;
  color: var(--muted);
  font-weight: 300;
  margin-bottom: 36px;
  margin-top: 2px;
}
.sp-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 14px;
}
.sp-pill {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 13px 22px;
  border-radius: 100px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, .018);
  text-decoration: none;
  color: var(--fg);
  transition: border-color .2s, background .2s, transform .18s, box-shadow .25s;
}
.sp-pill:hover {
  border-color: rgba(212, 191, 138, .32);
  background: rgba(212, 191, 138, .05);
  transform: translateY(-1px);
  box-shadow: 0 6px 24px rgba(0, 0, 0, .2);
}
.sp-pill-amount {
  font-size: 16px;
  font-weight: 500;
  color: var(--fg);
  letter-spacing: -.015em;
}
.sp-stripe-note {
  font-size: 12px;
  color: var(--muted);
  margin-top: 18px;
  letter-spacing: .01em;
}

/* ── Mission ── */
.sp-mission-inner {
  max-width: 780px;
}

/* ── Transparency ── */
.sp-uses-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2px;
  margin-top: 36px;
  border: 1px solid var(--border);
  border-radius: 18px;
  overflow: hidden;
}
.sp-use-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 28px 26px;
  background: var(--surface);
  transition: background .2s;
}
.sp-use-card:hover {
  background: var(--surf-lt);
}
.sp-use-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: 1px solid var(--bord-lt);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  background: rgba(212, 191, 138, .04);
  flex-shrink: 0;
  margin-top: 2px;
}
.sp-use-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--fg);
  margin-bottom: 4px;
  line-height: 1.3;
}
.sp-use-desc {
  display: block;
  font-size: 13px;
  color: var(--muted);
  font-weight: 300;
  line-height: 1.55;
}

/* ── FAQ ── */
.sp-faq-inner {
  max-width: 680px;
}
.sp-faq-list {
  margin-top: 36px;
  border-top: 1px solid var(--border);
}
.sp-faq-item {
  border-bottom: 1px solid var(--border);
}
.sp-faq-q {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 0;
  font-size: 15px;
  font-weight: 400;
  color: var(--fg);
  cursor: pointer;
  list-style: none;
  user-select: none;
  transition: color .2s;
}
.sp-faq-q::-webkit-details-marker {
  display: none;
}
.sp-faq-item[open] .sp-faq-q {
  color: var(--acc-lt);
}
.sp-faq-chevron {
  color: var(--muted);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  transition: transform .25s, color .2s;
}
.sp-faq-item[open] .sp-faq-chevron {
  transform: rotate(180deg);
  color: var(--accent);
}
.sp-faq-a {
  font-size: 14px;
  color: var(--muted-lt);
  font-weight: 300;
  line-height: 1.75;
  padding: 0 0 20px;
  max-width: 540px;
}

/* ── Footer CTA ── */
.sp-cta {
  padding: 110px 32px;
  text-align: center;
  border-bottom: 1px solid var(--border);
  position: relative;
  overflow: hidden;
}
.sp-cta-orb {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 450px;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(90, 30, 122, .12) 0%, transparent 68%);
  pointer-events: none;
}
.sp-cta-inner {
  position: relative;
  z-index: 2;
  max-width: 560px;
  margin: 0 auto;
}
.sp-cta-h {
  font-family: var(--hd);
  font-size: clamp(36px, 4.2vw, 56px);
  font-weight: 800;
  letter-spacing: -.03em;
  line-height: 1.08;
  margin-bottom: 16px;
}
.sp-cta-h em {
  font-style: italic;
  color: var(--accent);
  font-weight: 700;
}
.sp-cta-body {
  font-size: 16px;
  color: var(--muted-lt);
  font-weight: 300;
  margin-bottom: 36px;
}
.sp-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 16px 36px;
  border-radius: 100px;
  background: var(--accent);
  color: #08040f;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  transition: background .25s, transform .2s, box-shadow .3s;
}
.sp-cta-btn:hover {
  background: var(--acc-lt);
  transform: translateY(-2px);
  box-shadow: 0 16px 50px rgba(212, 191, 138, .22);
}

/* ── Footer ── */
.sp-footer {
  padding: 36px 32px;
}
.sp-foot-row {
  max-width: 1040px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}
.sp-foot-brand {
  display: flex;
  align-items: center;
  gap: 9px;
  text-decoration: none;
}
.sp-foot-mark {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  object-fit: cover;
}
.sp-foot-brand span {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: rgba(237, 232, 223, .4);
  letter-spacing: -.02em;
}
.sp-foot-links {
  display: flex;
  gap: 24px;
}
.sp-foot-links a {
  font-size: 12px;
  color: rgba(106, 98, 120, .5);
  text-decoration: none;
  transition: color .2s;
}
.sp-foot-links a:hover {
  color: var(--muted-lt);
}
.sp-foot-copy {
  font-size: 11px;
  color: rgba(106, 98, 120, .38);
}

/* ── Responsive ── */
@media (max-width: 720px) {
  .sp-uses-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 640px) {
  .sp-hero {
    padding: 90px 24px 80px;
  }
  .sp-inner {
    padding: 60px 24px;
  }
  .sp-cta {
    padding: 80px 24px;
  }
  .sp-nav-row {
    padding: 0 20px;
  }
  .sp-foot-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  .sp-foot-links {
    flex-wrap: wrap;
    gap: 14px;
  }
}
@media (max-width: 480px) {
  .sp-pills {
    gap: 8px;
  }
  .sp-pill {
    padding: 12px 18px;
  }
}
`;
