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

// ── Replace these with your real Stripe Payment Links ──────────────────────
const STRIPE = {
  five:    "https://buy.stripe.com/PLACEHOLDER_5",
  ten:     "https://buy.stripe.com/PLACEHOLDER_10",
  twenty:  "https://buy.stripe.com/PLACEHOLDER_25",
  fifty:   "https://buy.stripe.com/PLACEHOLDER_50",
  custom:  "https://buy.stripe.com/PLACEHOLDER_CUSTOM",
  monthly: "https://buy.stripe.com/PLACEHOLDER_MONTHLY",
} as const;

const AMOUNTS = [
  { label: "$5",      sub: "One-time",   href: STRIPE.five,    featured: false },
  { label: "$10",     sub: "One-time",   href: STRIPE.ten,     featured: false },
  { label: "$25",     sub: "One-time",   href: STRIPE.twenty,  featured: false },
  { label: "$50",     sub: "One-time",   href: STRIPE.fifty,   featured: false },
  { label: "Custom",  sub: "Any amount", href: STRIPE.custom,  featured: false },
  { label: "Monthly", sub: "Recurring",  href: STRIPE.monthly, featured: true  },
] as const;

const USES = [
  {
    label: "Servers & infrastructure",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
  },
  {
    label: "App development",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    label: "Moderation & safety",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    label: "New Muslim-focused features",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
              Community
            </div>
            <h1 className="sp-h1">
              Support<br />
              <em>Qamr</em>
            </h1>
            <p className="sp-lead">
              Qamr is an independent Muslim app built to help the Ummah connect,
              learn, and grow. Your support helps keep it free and improving.
            </p>
            <p className="sp-note">
              Support is completely optional. Qamr remains free to use.
            </p>
          </div>
        </section>

        {/* ── Mission ── */}
        <section className="sp-section sp-mission" aria-labelledby="why-heading">
          <div className="sp-inner">
            <div className="sp-label" aria-hidden="true">Our mission</div>
            <h2 className="sp-h2" id="why-heading">Why support Qamr?</h2>
            <p className="sp-body">
              Qamr is built with the goal of creating a better online space for
              Muslims, with features like Quran, Hadith, prayer tools, nasheeds,
              Muslim news, and a community feed. Every contribution helps cover
              development, servers, moderation, and new features.
            </p>
          </div>
        </section>

        {/* ── Support options ── */}
        <section className="sp-section sp-amounts-section" aria-labelledby="amounts-heading">
          <div className="sp-inner">
            <div className="sp-label" aria-hidden="true">Choose an amount</div>
            <h2 className="sp-h2" id="amounts-heading">Support Qamr</h2>
            <div className="sp-grid" role="list">
              {AMOUNTS.map(({ label, sub, href, featured }) => (
                <a
                  key={label}
                  href={href}
                  className={`sp-card${featured ? " sp-card-featured" : ""}`}
                  role="listitem"
                  aria-label={`Support Qamr — ${label} ${sub.toLowerCase()}`}
                  rel="noopener noreferrer"
                >
                  <span className="sp-card-val">{label}</span>
                  <span className="sp-card-sub">{sub}</span>
                  <span className="sp-card-cta">
                    {featured ? "Become a supporter" : "Support now"}
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
            <p className="sp-stripe-note">
              No account is required. Payments are handled securely by Stripe.
            </p>
          </div>
        </section>

        {/* ── Transparency ── */}
        <section className="sp-section sp-uses-section" aria-labelledby="uses-heading">
          <div className="sp-inner">
            <div className="sp-label" aria-hidden="true">Transparency</div>
            <h2 className="sp-h2" id="uses-heading">What your support helps with</h2>
            <div className="sp-uses-grid" role="list">
              {USES.map(({ icon, label }) => (
                <div className="sp-use-card" key={label} role="listitem">
                  <div className="sp-use-icon">{icon}</div>
                  <span className="sp-use-label">{label}</span>
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
  padding: 120px 32px 100px;
  text-align: center;
  border-bottom: 1px solid var(--border);
}
.sp-orb {
  position: absolute;
  top: -20%;
  left: 50%;
  transform: translateX(-50%);
  width: 900px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(90, 30, 122, .18) 0%, rgba(45, 10, 62, .06) 45%, transparent 70%);
  pointer-events: none;
}
.sp-warm {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: 260px;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(212, 191, 138, .06) 0%, transparent 70%);
  pointer-events: none;
}
.sp-hero-inner {
  position: relative;
  z-index: 2;
  max-width: 680px;
  margin: 0 auto;
}
.sp-kicker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 16px;
  border-radius: 100px;
  border: 1px solid rgba(212, 191, 138, .14);
  background: rgba(212, 191, 138, .04);
  font-size: 11px;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 28px;
}
.sp-k-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--accent);
  opacity: .7;
}
.sp-h1 {
  font-family: var(--hd);
  font-size: clamp(52px, 7vw, 96px);
  font-weight: 800;
  line-height: 1.0;
  letter-spacing: -.04em;
  margin-bottom: 24px;
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
  max-width: 520px;
  margin: 0 auto 20px;
  line-height: 1.75;
}
.sp-note {
  display: inline-block;
  font-size: 13px;
  color: var(--muted);
  font-weight: 400;
  padding: 8px 20px;
  border-radius: 100px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, .015);
  letter-spacing: .01em;
}

/* ── Shared section layout ── */
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
  margin-bottom: 14px;
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
  opacity: .5;
}
.sp-h2 {
  font-family: var(--hd);
  font-size: clamp(30px, 3.2vw, 44px);
  font-weight: 700;
  letter-spacing: -.025em;
  margin-bottom: 20px;
  line-height: 1.15;
}
.sp-body {
  font-size: 17px;
  color: var(--muted-lt);
  font-weight: 300;
  line-height: 1.8;
  max-width: 680px;
}

/* ── Mission ── */
.sp-mission .sp-inner {
  max-width: 860px;
}

/* ── Amount cards ── */
.sp-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 44px 0 24px;
}
.sp-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  padding: 28px 24px 24px;
  border-radius: 18px;
  border: 1px solid var(--border);
  background: var(--surface);
  text-decoration: none;
  color: var(--fg);
  transition: border-color .25s, background .25s, transform .2s, box-shadow .3s;
  position: relative;
  overflow: hidden;
}
.sp-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at top left, rgba(212, 191, 138, .05) 0%, transparent 60%);
  opacity: 0;
  transition: opacity .3s;
  pointer-events: none;
}
.sp-card:hover {
  border-color: rgba(212, 191, 138, .25);
  background: var(--surf-lt);
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, .3);
}
.sp-card:hover::before {
  opacity: 1;
}
.sp-card-featured {
  border-color: rgba(212, 191, 138, .22);
  background: linear-gradient(135deg, rgba(212, 191, 138, .06) 0%, var(--surface) 60%);
}
.sp-card-featured:hover {
  border-color: rgba(212, 191, 138, .42);
  box-shadow: 0 16px 50px rgba(212, 191, 138, .12);
}
.sp-card-val {
  font-family: var(--hd);
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -.03em;
  color: var(--fg);
  line-height: 1;
}
.sp-card-featured .sp-card-val {
  color: var(--accent);
}
.sp-card-sub {
  font-size: 11px;
  color: var(--muted);
  letter-spacing: .08em;
  text-transform: uppercase;
  font-weight: 400;
  margin-bottom: 10px;
}
.sp-card-cta {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  font-weight: 500;
  color: var(--accent);
  transition: gap .2s;
}
.sp-card:hover .sp-card-cta {
  gap: 10px;
}
.sp-stripe-note {
  font-size: 13px;
  color: var(--muted);
  margin-top: 4px;
}

/* ── Transparency cards ── */
.sp-uses-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 40px;
}
.sp-use-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  padding: 28px 24px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: var(--surface);
}
.sp-use-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid var(--bord-lt);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  background: rgba(212, 191, 138, .04);
  flex-shrink: 0;
}
.sp-use-label {
  font-size: 14px;
  font-weight: 400;
  color: var(--fg);
  line-height: 1.45;
}

/* ── FAQ ── */
.sp-faq-inner {
  max-width: 720px;
}
.sp-faq-list {
  margin-top: 40px;
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
  padding: 22px 0;
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
.sp-faq-item:hover .sp-faq-q {
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
  font-size: 15px;
  color: var(--muted-lt);
  font-weight: 300;
  line-height: 1.75;
  padding: 0 40px 24px 0;
  max-width: 580px;
}

/* ── Footer CTA ── */
.sp-cta {
  padding: 100px 32px;
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
  width: 700px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(90, 30, 122, .13) 0%, transparent 70%);
  pointer-events: none;
}
.sp-cta-inner {
  position: relative;
  z-index: 2;
  max-width: 600px;
  margin: 0 auto;
}
.sp-cta-h {
  font-family: var(--hd);
  font-size: clamp(34px, 4vw, 52px);
  font-weight: 800;
  letter-spacing: -.03em;
  line-height: 1.1;
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
  box-shadow: 0 16px 50px rgba(212, 191, 138, .24);
}

/* ── Footer ── */
.sp-footer {
  padding: 36px 32px;
  border-top: 1px solid var(--border);
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
  color: rgba(237, 232, 223, .45);
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
  color: rgba(106, 98, 120, .4);
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .sp-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .sp-uses-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 640px) {
  .sp-hero {
    padding: 80px 24px 70px;
  }
  .sp-inner {
    padding: 60px 24px;
  }
  .sp-grid {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .sp-card {
    padding: 22px 18px 20px;
  }
  .sp-card-val {
    font-size: 26px;
  }
  .sp-cta {
    padding: 70px 24px;
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
@media (max-width: 420px) {
  .sp-grid {
    grid-template-columns: 1fr;
  }
  .sp-uses-grid {
    grid-template-columns: 1fr;
  }
}
`;
