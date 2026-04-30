"use client";

import { useEffect } from "react";

/**
 * Qamr — Community Guidelines page.
 * Visual style mirrors the Terms of Service page (deep plum/black background,
 * gold accent, Playfair Display + DM Sans, sticky TOC).
 */

type Block = string | string[];
type Section = {
  title: string;
  body: Block[];
  contact?: "safety" | "general";
};

const GUIDELINES: Section[] = [
  {
    title: "Child Safety & CSAE",
    body: [
      "Qamr maintains a strict zero-tolerance policy for child sexual abuse and exploitation (CSAE) of any kind. The safety of minors on Qamr is non-negotiable.",
      "The following are absolutely prohibited on Qamr:",
      [
        "Child sexual abuse material (CSAM) in any form, including photographs, video, audio, text, drawings, animations, cartoons, or AI-generated or synthetic depictions of minors",
        "Grooming, including any conduct intended to build trust with a minor for sexual purposes",
        "Sexual exploitation of minors, including the production, possession, distribution, solicitation, advertising, or promotion of CSAM",
        "Sextortion, blackmail, or coercion of minors using sexual content or threats",
        "Child trafficking and any content that facilitates the sale, recruitment, transport, or exploitation of minors",
        "Attempts by adults to contact, message, or solicit minors for sexual or otherwise harmful purposes",
        "Content that sexualizes minors, normalizes child abuse, or expresses sexual interest in children",
      ],
      "Violations result in immediate content removal, permanent termination of all associated accounts, preservation of relevant evidence, and reporting to the U.S. National Center for Missing & Exploited Children (NCMEC) and to other law enforcement or regulatory authorities where required by applicable law.",
      "Qamr complies with applicable child safety laws and regulations in the jurisdictions where it operates, including reporting obligations under U.S. law (18 U.S.C. § 2258A), the EU Digital Services Act, and equivalent statutes elsewhere. Qamr cooperates with valid legal requests from authorities investigating child exploitation.",
      "If you encounter child sexual abuse material, suspected grooming, or any threat to a minor on Qamr, report it immediately:",
      [
        "In-app: open the post, profile, comment, or message, tap the menu, and select Report",
        "Email: safety@qamr.app for urgent or sensitive child-safety reports",
        "If a child is in immediate danger, contact local law enforcement first. In the United States, you may also report directly to the NCMEC CyberTipline at 1-800-843-5678 or report.cybertip.org",
      ],
    ],
    contact: "safety",
  },
  {
    title: "Harassment & Bullying",
    body: [
      "Qamr is built for genuine human connection. Behavior that targets, intimidates, or degrades another person is not tolerated.",
      "Prohibited:",
      [
        "Targeted harassment, repeated unwanted contact, or coordinated attacks against an individual",
        "Threats, intimidation, or doxxing — publishing private or identifying information without consent",
        "Sexual harassment, unwanted sexual advances, or sharing intimate content of another person without consent",
        "Mocking, shaming, or degrading individuals based on personal characteristics, appearance, or circumstances",
        "Encouraging, glorifying, or directing self-harm or suicide at another user",
      ],
    ],
  },
  {
    title: "Hate Speech",
    body: [
      "Qamr does not allow content that attacks people on the basis of who they are.",
      "Prohibited:",
      [
        "Slurs, dehumanizing language, or hateful stereotypes targeting protected groups",
        "Calls for violence, exclusion, segregation, or discrimination based on race, ethnicity, national origin, religion, gender, gender identity, sexual orientation, disability, or serious medical condition",
        "Affiliation with, propaganda for, or recruitment on behalf of hate groups or designated extremist organizations",
        "Content intended to incite hostility against religious communities, sacred figures, or sacred symbols",
      ],
    ],
  },
  {
    title: "Violence & Threats",
    body: [
      "Threats of violence and content that promotes harm have no place on Qamr.",
      "Prohibited:",
      [
        "Direct or implied threats of violence against individuals, groups, or property",
        "Glorification of violence, terrorism, or violent extremism",
        "Content from, supporting, or promoting designated terrorist or violent organizations",
        "Graphic gore or shock content posted without legitimate journalistic, educational, or documentary purpose",
        "Promotion of, or instructions for, weapons or methods used to cause mass harm",
      ],
    ],
  },
  {
    title: "Deception & Misinformation",
    body: [
      "Qamr is built around authentic, human content. Deliberate deception undermines the platform and harms users.",
      "Prohibited:",
      [
        "Coordinated inauthentic behavior, including fake accounts, sockpuppet networks, and manipulated engagement",
        "Synthetic, AI-generated, or manipulated media presented as real, especially involving real people, public figures, or news events",
        "Health, safety, or civic misinformation that could cause serious real-world harm",
        "Manufactured or fabricated quotes, screenshots, documents, or news stories presented as genuine",
        "Election interference, voter suppression content, or fabricated communications presented as official",
      ],
    ],
  },
  {
    title: "Impersonation",
    body: [
      "You may not pretend to be someone you are not in a way that misleads other users.",
      "Prohibited:",
      [
        "Accounts that impersonate real people, brands, organizations, or public figures",
        "Profiles using another person’s likeness, name, or identity without authorization",
        "Misleading verification claims, fake official badges, or implied endorsements",
      ],
      "Parody, fan, and commentary accounts are permitted only when clearly labeled as such and not designed to deceive.",
    ],
  },
  {
    title: "Spam & Manipulation",
    body: [
      "Behavior that degrades the experience for other users is not allowed.",
      "Prohibited:",
      [
        "Bulk, repetitive, or automated posting, commenting, or messaging",
        "Engagement manipulation: buying, selling, or trading likes, follows, comments, shares, or views",
        "Phishing, scams, fraudulent fundraising, and deceptive financial schemes",
        "Malware, malicious links, or unauthorized attempts to access accounts or systems",
        "Misuse of Qamr APIs, automation tools, or platform features in ways that violate these Guidelines or our Terms of Service",
      ],
    ],
  },
  {
    title: "Illegal Content & Activity",
    body: [
      "Content that violates the law, or that facilitates illegal acts, is not permitted on Qamr.",
      "Prohibited:",
      [
        "Sale, promotion, or trafficking of illegal drugs, weapons, stolen goods, or counterfeit items",
        "Promotion or facilitation of human trafficking, commercial sexual services, or other illegal exploitation",
        "Content that infringes the intellectual property rights of others",
        "Activities that violate applicable sanctions, export controls, or financial regulations",
        "Any conduct that violates applicable local, national, or international law",
      ],
    ],
  },
  {
    title: "Reporting Violations",
    body: [
      "Qamr provides in-app reporting tools so users can flag content, accounts, comments, and direct messages that violate these Guidelines. Reports are reviewed by our safety team and prioritized by severity, with child safety and imminent-harm reports handled first.",
      "How to report:",
      [
        "In-app: tap the menu on any post, profile, comment, or message and select Report, then choose the most accurate category",
        "Email: safety@qamr.app for child safety, imminent harm, or sensitive cases that require direct escalation",
        "Law enforcement: contact local authorities in emergencies. Qamr cooperates with valid legal requests from authorities",
      ],
      "We protect the identity of reporters wherever possible and prohibit retaliation against users who report in good faith.",
    ],
  },
  {
    title: "Enforcement",
    body: [
      "When Qamr determines that a violation has occurred, we may take any of the following actions, depending on severity, intent, and history:",
      [
        "Removing the violating content",
        "Issuing warnings or applying temporary feature restrictions",
        "Suspending the account",
        "Permanently terminating the account and any associated accounts",
        "Preserving relevant data and reporting to NCMEC, law enforcement, or other authorities where required by law",
      ],
      "Severe violations — particularly those involving child safety, credible threats of violence, or serious illegal activity — will result in immediate permanent termination without prior warning.",
      "Users may appeal an enforcement decision by contacting safety@qamr.app. Appeals are reviewed by a different member of the safety team where feasible.",
    ],
  },
  {
    title: "Contact",
    body: [
      "Questions about these Guidelines, or non-urgent reports and appeals, can be directed to the addresses below. For child safety or imminent-harm reports, please use the dedicated channels above.",
    ],
    contact: "general",
  },
];

export default function CommunityGuidelinesView() {
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
              l.style.borderLeftColor = active ? "rgba(212,191,138,.5)" : "";
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
      <div className="qamr-guidelines">
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
              <span className="k-dot" /> Policy &middot; Community Guidelines
            </div>
            <h1 className="pp-h1">Qamr Community Guidelines</h1>
            <p className="pp-lead">
              These Guidelines describe the conduct expected of everyone who
              uses Qamr. They apply to all content, accounts, and interactions
              on the platform, and they exist to keep Qamr safe, authentic, and
              worth being part of.
            </p>
            <div className="pp-meta">
              <span>
                Effective <strong>April 30, 2026</strong>
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
              {GUIDELINES.map((s, i) => (
                <li key={i}>
                  <a href={`#s${i + 1}`}>{s.title}</a>
                </li>
              ))}
            </ol>
          </aside>

          <main>
            <p className="pp-intro">
              Qamr is a social platform for real people and authentic content.
              These Guidelines define what is and is not permitted on Qamr, how
              we enforce them, and how to report violations. They apply
              alongside our <a href="/terms">Terms of Service</a> and any
              applicable laws. Violations may result in content removal,
              account suspension, or permanent termination.
            </p>

            {GUIDELINES.map((s, i) => (
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
                {s.contact === "safety" && (
                  <div className="contact-card">
                    <div className="card-header">
                      <span className="card-tag">Child Safety Contact</span>
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
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </div>
                      <div>
                        <span className="lbl">Email (Child Safety)</span>
                        <a href="mailto:safety@qamr.app">safety@qamr.app</a>
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
                          <path d="M12 22s-8-4.5-8-12a8 8 0 1 1 16 0c0 7.5-8 12-8 12z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </div>
                      <div>
                        <span className="lbl">In-App Reporting</span>
                        <span className="val">
                          Report any post, profile, comment, or message via the
                          menu &gt; Report
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {s.contact === "general" && (
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
                        <span className="lbl">Child Safety</span>
                        <a href="mailto:safety@qamr.app">safety@qamr.app</a>
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
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </div>
                      <div>
                        <span className="lbl">General</span>
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
            <em>Real standards.</em>
          </h3>
          <p>
            Qamr only works if everyone here keeps it real, kind, and safe. Thank
            you for helping protect this community.
          </p>
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
.qamr-guidelines {
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
.qamr-guidelines *, .qamr-guidelines *::before, .qamr-guidelines *::after { box-sizing: border-box; margin: 0; padding: 0; }
.qamr-guidelines::after {
  content:''; position: fixed; inset: 0; pointer-events: none; z-index: 900; opacity: .018;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
.qamr-guidelines nav {
  position: sticky; top: 0; z-index: 800;
  background: rgba(8,4,15,.88);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(24px);
  padding: 18px 0;
}
.qamr-guidelines .nav-row { max-width: 1040px; margin: 0 auto; padding: 0 32px; display: flex; align-items: center; justify-content: space-between; }
.qamr-guidelines .nav-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; color: var(--fg); }
.qamr-guidelines .brand-mark { width: 28px; height: 28px; border-radius: 7px; object-fit: cover; display: inline-block; }
.qamr-guidelines .brand-mark.sm { width: 22px; height: 22px; border-radius: 6px; }
.qamr-guidelines .nav-brand-name { font-family: 'Inter', system-ui, sans-serif; font-size: 19px; font-weight: 600; letter-spacing: -.02em; }
.qamr-guidelines .nav-back {
  font-size: 12px; color: var(--muted-lt); text-decoration: none;
  display: inline-flex; align-items: center; gap: 8px;
  padding: 9px 18px; border-radius: 100px;
  border: 1px solid var(--border); transition: border-color .2s, color .2s;
}
.qamr-guidelines .nav-back:hover { border-color: rgba(212,191,138,.3); color: var(--fg); }

.qamr-guidelines .pp-hero {
  position: relative; overflow: hidden; padding: 120px 32px 80px; text-align: center;
  border-bottom: 1px solid var(--border);
}
.qamr-guidelines .pp-orb {
  position: absolute; top: -20%; left: 50%; transform: translateX(-50%);
  width: 900px; height: 600px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(90,30,122,.18) 0%, rgba(45,10,62,.06) 45%, transparent 70%);
  pointer-events: none;
}
.qamr-guidelines .pp-warm {
  position: absolute; top: 0; left: 50%; transform: translateX(-50%);
  width: 400px; height: 260px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(212,191,138,.05) 0%, transparent 70%);
  pointer-events: none;
}
.qamr-guidelines .pp-hero-inner { position: relative; z-index: 2; max-width: 760px; margin: 0 auto; }
.qamr-guidelines .pp-kicker {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 5px 16px; border-radius: 100px;
  border: 1px solid rgba(212,191,138,.14);
  background: rgba(212,191,138,.04);
  font-size: 11px; letter-spacing: .18em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 28px;
}
.qamr-guidelines .k-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--accent); opacity: .7; }
.qamr-guidelines .pp-h1 {
  font-family: var(--hd); font-size: clamp(40px, 5.6vw, 72px);
  font-weight: 800; line-height: 1.04; letter-spacing: -.03em;
  margin-bottom: 22px; text-wrap: balance;
}
.qamr-guidelines .pp-h1 em { font-style: italic; color: var(--accent); font-weight: 700; }
.qamr-guidelines .pp-lead {
  font-size: 17px; color: var(--muted-lt); font-weight: 300;
  max-width: 600px; margin: 0 auto 24px; line-height: 1.75;
}
.qamr-guidelines .pp-meta {
  display: inline-flex; align-items: center; gap: 14px;
  font-size: 12px; color: var(--muted); letter-spacing: .06em;
  padding: 8px 18px; border-radius: 100px;
  background: rgba(255,255,255,.02); border: 1px solid var(--border);
}
.qamr-guidelines .pp-meta strong { color: var(--accent); font-weight: 500; letter-spacing: .01em; }
.qamr-guidelines .pp-meta .divider { width: 1px; height: 10px; background: var(--border); }

.qamr-guidelines .pp-body {
  max-width: 1040px; margin: 0 auto; padding: 80px 32px 40px;
  display: grid; grid-template-columns: 240px 1fr; gap: 60px; align-items: flex-start;
}
.qamr-guidelines .pp-toc { position: sticky; top: 90px; font-size: 13px; }
.qamr-guidelines .toc-label {
  font-size: 10px; letter-spacing: .22em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 18px; font-weight: 500;
  display: flex; align-items: center; gap: 10px;
}
.qamr-guidelines .toc-label::before { content:''; width: 20px; height: 1px; background: var(--accent); opacity: .5; }
.qamr-guidelines .pp-toc ol { list-style: none; counter-reset: toc; }
.qamr-guidelines .pp-toc li { counter-increment: toc; margin-bottom: 10px; position: relative; }
.qamr-guidelines .pp-toc a {
  display: block; color: var(--muted-lt); text-decoration: none;
  font-size: 13px; line-height: 1.4; padding: 6px 0 6px 28px;
  border-left: 1px solid var(--border);
  transition: color .2s, border-color .2s, padding-left .25s;
  position: relative;
}
.qamr-guidelines .pp-toc a::before {
  content: counter(toc, decimal-leading-zero);
  position: absolute; left: 10px; top: 6px;
  font-size: 10px; color: var(--muted); letter-spacing: .05em;
  font-variant-numeric: tabular-nums; transition: color .2s;
}
.qamr-guidelines .pp-toc a:hover { color: var(--fg); border-left-color: rgba(212,191,138,.4); padding-left: 32px; }
.qamr-guidelines .pp-toc a:hover::before { color: var(--accent); }

.qamr-guidelines .pp-intro {
  font-size: 16px; color: var(--muted-lt); font-weight: 300;
  line-height: 1.85; margin-bottom: 48px;
  padding-bottom: 40px; border-bottom: 1px solid var(--border);
}
.qamr-guidelines .pp-intro strong { color: var(--fg); font-weight: 500; }
.qamr-guidelines .pp-intro a { color: var(--accent); text-decoration: none; border-bottom: 1px solid rgba(212,191,138,.3); transition: border-color .2s; }
.qamr-guidelines .pp-intro a:hover { border-bottom-color: var(--accent); }

.qamr-guidelines .pp-section { margin-bottom: 56px; scroll-margin-top: 90px; }
.qamr-guidelines .pp-section-num {
  font-size: 10px; letter-spacing: .22em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 10px; font-weight: 500;
  display: flex; align-items: center; gap: 10px;
}
.qamr-guidelines .pp-section-num::before { content:''; width: 20px; height: 1px; background: var(--accent); opacity: .5; }
.qamr-guidelines .pp-h2 {
  font-family: var(--hd); font-size: clamp(26px, 2.6vw, 34px);
  font-weight: 700; letter-spacing: -.02em;
  margin-bottom: 18px; line-height: 1.2;
}
.qamr-guidelines .pp-section p { color: var(--muted-lt); font-weight: 300; margin-bottom: 14px; }
.qamr-guidelines .pp-section p strong { color: var(--fg); font-weight: 500; }
.qamr-guidelines .pp-section ul {
  list-style: none; padding: 0; margin: 6px 0 18px;
  display: flex; flex-direction: column;
  border-top: 1px solid var(--border);
}
.qamr-guidelines .pp-section ul li {
  padding: 14px 4px 14px 24px;
  border-bottom: 1px solid var(--border);
  color: var(--muted-lt); font-weight: 300; font-size: 15px;
  position: relative;
}
.qamr-guidelines .pp-section ul li::before {
  content:''; position: absolute; left: 0; top: 22px;
  width: 10px; height: 1px; background: var(--accent); opacity: .55;
}

.qamr-guidelines .contact-card {
  margin-top: 16px; padding: 28px 32px; border-radius: 16px;
  background: var(--surface); border: 1px solid var(--border);
  display: flex; flex-direction: column; gap: 16px;
}
.qamr-guidelines .card-header { margin-bottom: 4px; }
.qamr-guidelines .card-tag {
  display: inline-block; padding: 4px 12px;
  border-radius: 100px; background: rgba(212,191,138,.08);
  border: 1px solid rgba(212,191,138,.18);
  font-size: 10px; letter-spacing: .18em; text-transform: uppercase;
  color: var(--accent); font-weight: 500;
}
.qamr-guidelines .contact-row { display: flex; align-items: center; gap: 14px; font-size: 15px; color: var(--fg); }
.qamr-guidelines .contact-row .ci {
  width: 36px; height: 36px; border-radius: 10px;
  border: 1px solid var(--border); color: var(--accent);
  display: flex; align-items: center; justify-content: center; flex: none;
}
.qamr-guidelines .contact-row a { color: var(--fg); text-decoration: none; transition: color .2s; }
.qamr-guidelines .contact-row a:hover { color: var(--accent); }
.qamr-guidelines .contact-row .val { color: var(--muted-lt); font-weight: 300; font-size: 14px; line-height: 1.5; display: block; }
.qamr-guidelines .contact-row .lbl {
  font-size: 10px; letter-spacing: .18em; text-transform: uppercase;
  color: var(--muted); display: block; margin-bottom: 2px;
}

.qamr-guidelines .pp-end { max-width: 860px; margin: 40px auto 0; padding: 60px 32px 100px; text-align: center; }
.qamr-guidelines .pp-end h3 {
  font-family: var(--hd); font-size: clamp(28px, 3.2vw, 40px);
  font-weight: 800; letter-spacing: -.025em; margin-bottom: 12px;
}
.qamr-guidelines .pp-end h3 em { font-style: italic; color: var(--accent); font-weight: 700; }
.qamr-guidelines .pp-end p { color: var(--muted-lt); font-weight: 300; margin-bottom: 28px; max-width: 540px; margin-left: auto; margin-right: auto; }
.qamr-guidelines .pp-back-home {
  display: inline-flex; align-items: center; gap: 9px;
  padding: 14px 32px; border-radius: 100px;
  background: var(--accent); color: #08040f;
  font-size: 14px; font-weight: 500; text-decoration: none;
  transition: background .25s, transform .2s, box-shadow .3s;
}
.qamr-guidelines .pp-back-home:hover {
  background: var(--acc-lt); transform: translateY(-2px);
  box-shadow: 0 14px 50px rgba(212,191,138,.24);
}

.qamr-guidelines footer { padding: 36px 32px; border-top: 1px solid var(--border); }
.qamr-guidelines .foot-row {
  max-width: 1040px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px;
}
.qamr-guidelines .foot-brand { display: flex; align-items: center; gap: 9px; text-decoration: none; }
.qamr-guidelines .foot-brand span { font-family: 'Inter', system-ui, sans-serif; font-size: 14px; font-weight: 600; color: rgba(237,232,223,.45); letter-spacing: -.02em; }
.qamr-guidelines .foot-links { display: flex; gap: 24px; flex-wrap: wrap; }
.qamr-guidelines .foot-links a { font-size: 12px; color: rgba(106,98,120,.5); text-decoration: none; transition: color .2s; }
.qamr-guidelines .foot-links a:hover { color: var(--muted-lt); }
.qamr-guidelines .foot-copy { font-size: 11px; color: rgba(106,98,120,.4); }

@media (max-width: 820px) {
  .qamr-guidelines .pp-body { grid-template-columns: 1fr; gap: 40px; padding: 60px 24px 30px; }
  .qamr-guidelines .pp-toc { position: static; margin-bottom: 12px; }
  .qamr-guidelines .pp-hero { padding: 80px 24px 60px; }
  .qamr-guidelines .pp-end { padding: 40px 24px 80px; }
  .qamr-guidelines .nav-row { padding: 0 20px; }
  .qamr-guidelines .contact-card { padding: 22px 20px; }
}
`;
