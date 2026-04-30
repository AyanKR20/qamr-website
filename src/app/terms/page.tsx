"use client";

import { useEffect } from "react";

/**
 * Qamr — Terms of Service page as a single-file React (TSX) component.
 * Matches the Qamr landing theme (deep plum/black background, gold accent,
 * Playfair Display + DM Sans, grain overlay, sticky TOC).
 */

const TERMS: Section[] = [
  {
    title: "Eligibility",
    body: [
      "You must be at least 13 years old (or the minimum age required in your country) to use Qamr.",
      "By using Qamr, you confirm that:",
      [
        "You can form a legally binding agreement",
        "Your use complies with applicable laws",
      ],
    ],
  },
  {
    title: "User Accounts",
    body: [
      "You are responsible for:",
      [
        "Maintaining the security of your account",
        "All activity under your account",
      ],
      "You agree not to:",
      [
        "Impersonate others",
        "Use misleading identities",
        "Create accounts for abusive or harmful purposes",
      ],
    ],
  },
  {
    title: "Content Ownership",
    body: [
      "You retain ownership of content you post.",
      "By posting content on Qamr, you grant us a non-exclusive, worldwide, royalty-free license to:",
      ["Host", "Display", "Distribute", "Operate the Service"],
      "This is solely for providing and improving Qamr.",
    ],
  },
  {
    title: "Acceptable Use",
    body: [
      "You agree to use Qamr responsibly and not to:",
      [
        "Violate laws or regulations",
        "Harass, threaten, or harm others",
        "Spread misinformation or deceptive content",
        "Attempt to exploit or disrupt the platform",
      ],
      "All users must follow the Community Guidelines.",
    ],
  },
  {
    title: "AI-Generated and Synthetic Content",
    body: [
      "Qamr is built to prioritize authentic, human-created content.",
      "You agree that:",
      [
        "You will not upload or distribute AI-generated, synthetic, or manipulated media intended to mislead, spam, or imitate real people",
        "Content that resembles real individuals, events, or news must be authentic and not artificially generated",
      ],
      "We reserve the right to remove such content and restrict accounts that violate this principle.",
    ],
  },
  {
    title: "Content Moderation",
    body: [
      "We may:",
      [
        "Review, remove, or restrict content",
        "Suspend or terminate accounts",
      ],
      "This may occur if content:",
      [
        "Violates these Terms or Community Guidelines",
        "Is harmful, abusive, or misleading",
        "Poses risk to users or platform integrity",
      ],
      "Moderation decisions are at our discretion.",
    ],
  },
  {
    title: "Messaging and Interactions",
    body: [
      "Qamr provides messaging and interaction features.",
      "You agree not to:",
      [
        "Send spam, scams, or abusive messages",
        "Harass or intimidate other users",
        "Circumvent message request systems",
      ],
    ],
  },
  {
    title: "Termination",
    body: [
      "We may suspend or terminate your access if you violate these Terms.",
      "You may stop using Qamr at any time.",
    ],
  },
  {
    title: "Disclaimers",
    body: [
      'Qamr is provided "as is".',
      "We do not guarantee:",
      [
        "Continuous availability",
        "Error-free operation",
        "Accuracy of user-generated content",
      ],
    ],
  },
  {
    title: "Limitation of Liability",
    body: [
      "To the extent permitted by law, Qamr is not liable for:",
      [
        "User-generated content",
        "Loss of data",
        "Indirect or consequential damages",
      ],
    ],
  },
  {
    title: "Changes to Terms",
    body: [
      "We may update these Terms periodically. Continued use of Qamr means you accept the updated Terms.",
    ],
  },
  {
    title: "Contact",
    body: ["Questions about these Terms? Reach us directly."],
    contact: true,
  },
];

type Block = string | string[];
type Section = { title: string; body: Block[]; contact?: boolean };

export default function QamrTerms() {
  useEffect(() => {
    // Fonts
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

    // Sticky TOC highlight
    const tocLinks = document.querySelectorAll<HTMLAnchorElement>(".pp-toc a");
    const sections = Array.from(document.querySelectorAll(".pp-section"));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.id;
            tocLinks.forEach((l) => {
              const active = l.getAttribute("href") === "#" + id;
              l.style.color = active ? "var(--fg)" : "";
              l.style.borderLeftColor = active
                ? "rgba(212,191,138,.5)"
                : "";
            });
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <div className="qamr-terms">
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

        <section className="pp-hero">
          <div className="pp-orb" />
          <div className="pp-warm" />
          <div className="pp-hero-inner">
            <div className="pp-kicker">
              <span className="k-dot" /> Legal &middot; Terms
            </div>
            <h1 className="pp-h1">
              The rules of the
              <br />
              <em>house.</em>
            </h1>
            <p className="pp-lead">
              Welcome to Qamr. By accessing or using Qamr ("the Service"), you
              agree to these Terms of Service. If you do not agree, please do
              not use the Service.
            </p>
            <div className="pp-meta">
              <span>
                Effective <strong>April 20, 2026</strong>
              </span>
              <span className="divider" />
              <span>
                Version <strong>1.0</strong>
              </span>
            </div>
          </div>
        </section>

        <div className="pp-body">
          <aside className="pp-toc">
            <div className="toc-label">Contents</div>
            <ol>
              {TERMS.map((s, i) => (
                <li key={i}>
                  <a href={`#s${i + 1}`}>{s.title}</a>
                </li>
              ))}
            </ol>
          </aside>

          <main>
            <p className="pp-intro">
              These Terms govern your use of Qamr, including our app, website,
              and related services. They cover your account, your content, and
              the shared responsibilities that keep Qamr <strong>real</strong>,{" "}
              <strong>human</strong>, and <strong>safe</strong>.
            </p>

            {TERMS.map((s, i) => (
              <section className="pp-section" id={`s${i + 1}`} key={i}>
                <div className="pp-section-num">
                  Section {String(i + 1).padStart(2, "0")}
                </div>
                <h2 className="pp-h2">{s.title}</h2>
                {s.body.map((block, j) =>
                  Array.isArray(block) ? (
                    <ul key={j}>
                      {block.map((item, k) => (
                        <li key={k}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p key={j}>{block}</p>
                  )
                )}
                {s.contact && (
                  <div className="contact-card">
                    <div className="contact-row">
                      <div className="ci">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </div>
                      <div>
                        <span className="lbl">Email</span>
                        <a href="mailto:qamrapp@gmail.com">qamrapp@gmail.com</a>
                      </div>
                    </div>
                    <div className="contact-row">
                      <div className="ci">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                        </svg>
                      </div>
                      <div>
                        <span className="lbl">Web</span>
                        <a
                          href="https://qamr.app"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          qamr.app
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            ))}
          </main>
        </div>

        <section className="pp-end">
          <h3>
            Real people.
            <br />
            <em>Real rules.</em>
          </h3>
          <p>Questions, concerns, or feedback? We actually read them.</p>
          <a href="/" className="pp-back-home">
            Return to Qamr
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
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
.qamr-terms {
  --bg:#08040f; --fg:#ede8df; --muted:#6a6278; --muted-lt:#8a8298;
  --accent:#d4bf8a; --acc-lt:#e8d5a8;
  --surface:#0f0819; --surf-lt:#160e22;
  --border:#1e1530; --bord-lt:#2c1f46;
  --hd:'Playfair Display', Georgia, serif;
  --bd:'DM Sans', system-ui, sans-serif;
  background: var(--bg); color: var(--fg);
  font-family: var(--bd); font-size: 16px; line-height: 1.7;
  -webkit-font-smoothing: antialiased; min-height: 100vh;
}
.qamr-terms *, .qamr-terms *::before, .qamr-terms *::after { box-sizing: border-box; margin: 0; padding: 0; }
.qamr-terms::after {
  content:''; position: fixed; inset: 0; pointer-events: none; z-index: 900; opacity: .018;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
.qamr-terms nav {
  position: sticky; top: 0; z-index: 800;
  background: rgba(8,4,15,.88);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(24px);
  padding: 18px 0;
}
.qamr-terms .nav-row { max-width: 1040px; margin: 0 auto; padding: 0 32px; display: flex; align-items: center; justify-content: space-between; }
.qamr-terms .nav-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; color: var(--fg); }
.qamr-terms .brand-mark { width: 28px; height: 28px; border-radius: 7px; object-fit: cover; display: inline-block; }
.qamr-terms .brand-mark.sm { width: 22px; height: 22px; border-radius: 6px; }
.qamr-terms .nav-brand-name { font-family: 'Inter', system-ui, sans-serif; font-size: 19px; font-weight: 600; letter-spacing: -.02em; }
.qamr-terms .nav-back {
  font-size: 12px; color: var(--muted-lt); text-decoration: none;
  display: inline-flex; align-items: center; gap: 8px;
  padding: 9px 18px; border-radius: 100px;
  border: 1px solid var(--border); transition: border-color .2s, color .2s;
}
.qamr-terms .nav-back:hover { border-color: rgba(212,191,138,.3); color: var(--fg); }

.qamr-terms .pp-hero {
  position: relative; overflow: hidden; padding: 120px 32px 80px; text-align: center;
  border-bottom: 1px solid var(--border);
}
.qamr-terms .pp-orb {
  position: absolute; top: -20%; left: 50%; transform: translateX(-50%);
  width: 900px; height: 600px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(90,30,122,.18) 0%, rgba(45,10,62,.06) 45%, transparent 70%);
  pointer-events: none;
}
.qamr-terms .pp-warm {
  position: absolute; top: 0; left: 50%; transform: translateX(-50%);
  width: 400px; height: 260px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(212,191,138,.05) 0%, transparent 70%);
  pointer-events: none;
}
.qamr-terms .pp-hero-inner { position: relative; z-index: 2; max-width: 760px; margin: 0 auto; }
.qamr-terms .pp-kicker {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 5px 16px; border-radius: 100px;
  border: 1px solid rgba(212,191,138,.14);
  background: rgba(212,191,138,.04);
  font-size: 11px; letter-spacing: .18em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 28px;
}
.qamr-terms .k-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--accent); opacity: .7; }
.qamr-terms .pp-h1 {
  font-family: var(--hd); font-size: clamp(44px, 6.5vw, 84px);
  font-weight: 800; line-height: 1.02; letter-spacing: -.035em;
  margin-bottom: 22px; text-wrap: balance;
}
.qamr-terms .pp-h1 em { font-style: italic; color: var(--accent); font-weight: 700; }
.qamr-terms .pp-lead {
  font-size: 17px; color: var(--muted-lt); font-weight: 300;
  max-width: 560px; margin: 0 auto 24px; line-height: 1.75;
}
.qamr-terms .pp-meta {
  display: inline-flex; align-items: center; gap: 14px;
  font-size: 12px; color: var(--muted); letter-spacing: .06em;
  padding: 8px 18px; border-radius: 100px;
  background: rgba(255,255,255,.02); border: 1px solid var(--border);
}
.qamr-terms .pp-meta strong { color: var(--accent); font-weight: 500; letter-spacing: .01em; }
.qamr-terms .pp-meta .divider { width: 1px; height: 10px; background: var(--border); }

.qamr-terms .pp-body {
  max-width: 1040px; margin: 0 auto; padding: 80px 32px 40px;
  display: grid; grid-template-columns: 240px 1fr; gap: 60px; align-items: flex-start;
}
.qamr-terms .pp-toc { position: sticky; top: 90px; font-size: 13px; }
.qamr-terms .toc-label {
  font-size: 10px; letter-spacing: .22em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 18px; font-weight: 500;
  display: flex; align-items: center; gap: 10px;
}
.qamr-terms .toc-label::before { content:''; width: 20px; height: 1px; background: var(--accent); opacity: .5; }
.qamr-terms .pp-toc ol { list-style: none; counter-reset: toc; }
.qamr-terms .pp-toc li { counter-increment: toc; margin-bottom: 10px; position: relative; }
.qamr-terms .pp-toc a {
  display: block; color: var(--muted-lt); text-decoration: none;
  font-size: 13px; line-height: 1.4; padding: 6px 0 6px 28px;
  border-left: 1px solid var(--border);
  transition: color .2s, border-color .2s, padding-left .25s;
  position: relative;
}
.qamr-terms .pp-toc a::before {
  content: counter(toc, decimal-leading-zero);
  position: absolute; left: 10px; top: 6px;
  font-size: 10px; color: var(--muted); letter-spacing: .05em;
  font-variant-numeric: tabular-nums; transition: color .2s;
}
.qamr-terms .pp-toc a:hover { color: var(--fg); border-left-color: rgba(212,191,138,.4); padding-left: 32px; }
.qamr-terms .pp-toc a:hover::before { color: var(--accent); }

.qamr-terms .pp-intro {
  font-size: 16px; color: var(--muted-lt); font-weight: 300;
  line-height: 1.85; margin-bottom: 48px;
  padding-bottom: 40px; border-bottom: 1px solid var(--border);
}
.qamr-terms .pp-intro strong { color: var(--fg); font-weight: 500; }

.qamr-terms .pp-section { margin-bottom: 56px; }
.qamr-terms .pp-section-num {
  font-size: 10px; letter-spacing: .22em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 10px; font-weight: 500;
  display: flex; align-items: center; gap: 10px;
}
.qamr-terms .pp-section-num::before { content:''; width: 20px; height: 1px; background: var(--accent); opacity: .5; }
.qamr-terms .pp-h2 {
  font-family: var(--hd); font-size: clamp(26px, 2.6vw, 34px);
  font-weight: 700; letter-spacing: -.02em;
  margin-bottom: 18px; line-height: 1.2;
}
.qamr-terms .pp-section p { color: var(--muted-lt); font-weight: 300; margin-bottom: 14px; }
.qamr-terms .pp-section p strong { color: var(--fg); font-weight: 500; }
.qamr-terms .pp-section ul {
  list-style: none; padding: 0; margin: 6px 0 18px;
  display: flex; flex-direction: column;
  border-top: 1px solid var(--border);
}
.qamr-terms .pp-section ul li {
  padding: 14px 4px 14px 24px;
  border-bottom: 1px solid var(--border);
  color: var(--muted-lt); font-weight: 300; font-size: 15px;
  position: relative;
}
.qamr-terms .pp-section ul li::before {
  content:''; position: absolute; left: 0; top: 22px;
  width: 10px; height: 1px; background: var(--accent); opacity: .55;
}

.qamr-terms .contact-card {
  margin-top: 8px; padding: 28px 32px; border-radius: 16px;
  background: var(--surface); border: 1px solid var(--border);
  display: flex; flex-direction: column; gap: 16px;
}
.qamr-terms .contact-row { display: flex; align-items: center; gap: 14px; font-size: 15px; color: var(--fg); }
.qamr-terms .contact-row .ci {
  width: 36px; height: 36px; border-radius: 10px;
  border: 1px solid var(--border); color: var(--accent);
  display: flex; align-items: center; justify-content: center; flex: none;
}
.qamr-terms .contact-row a { color: var(--fg); text-decoration: none; transition: color .2s; }
.qamr-terms .contact-row a:hover { color: var(--accent); }
.qamr-terms .contact-row .lbl {
  font-size: 10px; letter-spacing: .18em; text-transform: uppercase;
  color: var(--muted); display: block; margin-bottom: 2px;
}

.qamr-terms .pp-end { max-width: 860px; margin: 40px auto 0; padding: 60px 32px 100px; text-align: center; }
.qamr-terms .pp-end h3 {
  font-family: var(--hd); font-size: clamp(28px, 3.2vw, 40px);
  font-weight: 800; letter-spacing: -.025em; margin-bottom: 12px;
}
.qamr-terms .pp-end h3 em { font-style: italic; color: var(--accent); font-weight: 700; }
.qamr-terms .pp-end p { color: var(--muted-lt); font-weight: 300; margin-bottom: 28px; }
.qamr-terms .pp-back-home {
  display: inline-flex; align-items: center; gap: 9px;
  padding: 14px 32px; border-radius: 100px;
  background: var(--accent); color: #08040f;
  font-size: 14px; font-weight: 500; text-decoration: none;
  transition: background .25s, transform .2s, box-shadow .3s;
}
.qamr-terms .pp-back-home:hover {
  background: var(--acc-lt); transform: translateY(-2px);
  box-shadow: 0 14px 50px rgba(212,191,138,.24);
}

.qamr-terms footer { padding: 36px 32px; border-top: 1px solid var(--border); }
.qamr-terms .foot-row {
  max-width: 1040px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px;
}
.qamr-terms .foot-brand { display: flex; align-items: center; gap: 9px; text-decoration: none; }
.qamr-terms .foot-brand span { font-family: 'Inter', system-ui, sans-serif; font-size: 14px; font-weight: 600; color: rgba(237,232,223,.45); letter-spacing: -.02em; }
.qamr-terms .foot-links { display: flex; gap: 24px; }
.qamr-terms .foot-links a { font-size: 12px; color: rgba(106,98,120,.5); text-decoration: none; transition: color .2s; }
.qamr-terms .foot-links a:hover { color: var(--muted-lt); }
.qamr-terms .foot-copy { font-size: 11px; color: rgba(106,98,120,.4); }

@media (max-width: 820px) {
  .qamr-terms .pp-body { grid-template-columns: 1fr; gap: 40px; padding: 60px 24px 30px; }
  .qamr-terms .pp-toc { position: static; margin-bottom: 12px; }
  .qamr-terms .pp-hero { padding: 80px 24px 60px; }
  .qamr-terms .pp-end { padding: 40px 24px 80px; }
  .qamr-terms .nav-row { padding: 0 20px; }
}
`;
