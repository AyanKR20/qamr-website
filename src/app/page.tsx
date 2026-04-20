"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        });
      },
      { threshold: 0.1 },
    );
    document.querySelectorAll(".landing-v2 .rv").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="landing-v2">
      {/* ─── NAV ─── */}
      <nav id="nav" className={`l-nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-row">
          <a href="#" className="nav-brand">
            <img src="/logo.png" alt="Qamr" />
            <span className="nav-brand-name">Qamr</span>
          </a>
          <ul className="nav-links">
            <li>
              <a href="#contrast">Why Qamr</a>
            </li>
            <li>
              <a href="#showcase">Platform</a>
            </li>
            <li>
              <a href="#trust">Our Promise</a>
            </li>
          </ul>
          <a href="#cta" className="nav-cta">
            Get Early Access
          </a>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section id="hero">
        <div className="hero-orb" />
        <div className="hero-orb-warm" />

        <div className="hero-text">
          <div className="hero-kicker rv">
            <span className="kicker-dot" />
            Now in Beta
          </div>
          <h1 className="hero-h1 rv d1">
            Your feed is
            <br />
            <em>full of ghosts.</em>
          </h1>
          <p className="hero-sub rv d2">
            Bots. Ads. AI slop. Nobody asked for any of it.
            <br />
            Qamr is the alternative.
          </p>
          <div className="ctas rv d3">
            <a href="#cta" className="btn-gold">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              App Store
            </a>
            <a
              href="#cta"
              className="btn-gold"
              style={{
                background: "var(--surf-lt)",
                color: "var(--fg)",
                border: "1px solid var(--bord-lt)",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76c.3.17.65.19.96.06l13.2-7.62-2.83-2.83-11.33 10.39zm15.51-9.57L5.08.8C4.77.62 4.42.62 4.12.8L4 .86l13.07 13.57 1.62-.24zM20.65 10.29l-2.88-1.66-3.08 2.82 3.15 3.15 2.81-1.62a1.9 1.9 0 000-2.69zM4.12 1.14L4 1.06c-.3-.17-.65-.17-.96 0C2.77 1.23 2.62 1.56 2.62 2l.01 20c0 .44.15.77.41.94.3.17.66.15.96-.01L4.12 22.8 17.19 13.8 4.12 1.14z" />
              </svg>
              Google Play
            </a>
            <a href="#contrast" className="btn-outline">
              See why it matters
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
          </div>
        </div>

        <div className="hero-phone-wrap rv d4">
          <div className="hero-phone-side hero-phone-l">
            <img src="/screenshots/pulse.jpg" alt="" />
          </div>
          <div className="hero-phone">
            <img src="/screenshots/feed.jpg" alt="Qamr Feed" />
          </div>
          <div className="hero-phone-side hero-phone-r">
            <img src="/screenshots/hub.jpg" alt="" />
          </div>
        </div>
        <div className="hero-floor-grad" />
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="marquee-section">
        <div className="marquee-track">
          <span className="marquee-item">No Data Selling</span>
          <span className="marquee-item">No AI-Generated Media</span>
          <span className="marquee-item">Real People Only</span>
          <span className="marquee-item">High Signal News</span>
          <span className="marquee-item">Built for Depth</span>
          <span className="marquee-item">Quran & Hadith Built In</span>
          <span className="marquee-item">Human First</span>
          <span className="marquee-item">No Data Selling</span>
          <span className="marquee-item">No AI-Generated Media</span>
          <span className="marquee-item">Real People Only</span>
          <span className="marquee-item">High Signal News</span>
          <span className="marquee-item">Built for Depth</span>
          <span className="marquee-item">Quran & Hadith Built In</span>
          <span className="marquee-item">Human First</span>
        </div>
      </div>

      {/* ─── CONTRAST ─── */}
      <section id="contrast">
        <div className="contrast-header rv">
          <div className="section-eye">The Difference</div>
          <h2>
            The internet got <em>loud.</em>
            <br />
            We went the other way.
          </h2>
        </div>

        <div className="split rv d1">
          {/* LEFT: chaos */}
          <div className="split-side s-chaos">
            <div className="split-label">
              <span>Everywhere else</span>
              <span
                style={{
                  fontSize: 9,
                  letterSpacing: ".16em",
                  color: "#35303e",
                  textTransform: "uppercase",
                }}
              >
                AI · Bots · Noise
              </span>
            </div>
            <div className="chaos-post">
              <span className="chaos-badge badge-ad">Sponsored</span>
              <div className="chaos-avrow">
                <div className="chaos-av" />
                <span className="chaos-nm">Brand_XY_Official</span>
              </div>
              <div className="chaos-lines">
                <div className="chaos-line" style={{ width: "90%" }} />
                <div className="chaos-line" style={{ width: "70%" }} />
                <div className="chaos-line" style={{ width: "80%" }} />
              </div>
            </div>
            <div className="chaos-post">
              <span className="chaos-badge badge-ai">AI Generated</span>
              <div className="chaos-avrow">
                <div className="chaos-av" />
                <span className="chaos-nm">ContentBot_4421</span>
              </div>
              <div className="chaos-lines">
                <div className="chaos-line" style={{ width: "95%" }} />
                <div className="chaos-line" style={{ width: "60%" }} />
              </div>
            </div>
            <div className="chaos-post">
              <span className="chaos-badge badge-spam">Promoted</span>
              <div className="chaos-avrow">
                <div className="chaos-av" />
                <span className="chaos-nm">Influencer_Promo99</span>
              </div>
              <div className="chaos-lines">
                <div className="chaos-line" style={{ width: "85%" }} />
                <div className="chaos-line" style={{ width: "72%" }} />
                <div className="chaos-line" style={{ width: "55%" }} />
              </div>
            </div>
            <div className="chaos-post" style={{ opacity: 0.45 }}>
              <span className="chaos-badge badge-ai">AI Generated</span>
              <div className="chaos-lines">
                <div className="chaos-line" style={{ width: "75%" }} />
                <div className="chaos-line" style={{ width: "50%" }} />
              </div>
            </div>
          </div>

          {/* RIGHT: clean */}
          <div className="split-side s-clean">
            <div className="split-label">
              <span>Qamr</span>
              <span
                style={{
                  fontSize: 9,
                  color: "rgba(212,191,138,.45)",
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                }}
              >
                Real people · Real talk
              </span>
            </div>

            <CleanPost
              avClass="a1"
              name="Ahmad Suleiman"
              handle="@ahmad.s"
              text="Spent the morning hiking with no phone. It was the clearest I've thought in months."
              likes="84"
              comments="12"
            />
            <CleanPost
              avClass="a2"
              name="Layla Mohammed"
              handle="@layla.m"
              text="The AI content flood is real. I barely see actual people anymore on other apps. This is why Qamr matters."
              likes="231"
              comments="47"
            />
            <CleanPost
              avClass="a3"
              name="Omar Khalid"
              handle="@omar.k"
              text="Real conversation is a rare thing now. Keep showing up."
              likes="519"
              comments="88"
            />
          </div>
        </div>
      </section>

      {/* ─── SHOWCASE ─── */}
      <section id="showcase">
        <div className="showcase-hd rv">
          <div className="section-eye">The Platform</div>
          <h2>
            One platform.
            <br />
            <em>Everything you need.</em>
          </h2>
        </div>

        {/* FEED */}
        <div className="feature rv">
          <div className="feat-text">
            <p className="feat-eyebrow">Feed</p>
            <h3 className="feat-h3">
              Your people.
              <br />
              <em>Nothing else.</em>
            </h3>
            <p className="feat-desc">
              A clean, human feed — free of AI-generated media and fake engagement. Real posts from
              real people, surfaced without manipulation or slop.
            </p>
            <div className="feat-pill">
              <span className="pill-live" />
              Zero AI-generated media
            </div>
          </div>
          <div className="feat-visual">
            <div
              className="feat-glow"
              style={{
                background:
                  "radial-gradient(ellipse,rgba(90,30,122,.25) 0%,transparent 70%)",
              }}
            />
            <div className="feat-phone">
              <img src="/screenshots/feed.jpg" alt="Feed" />
            </div>
            <div className="feat-float tr">
              <div className="ff-label">AI Media</div>
              <div
                className="ff-val"
                style={{ color: "#ef4444", fontSize: 15, letterSpacing: ".01em" }}
              >
                Blocked
              </div>
              <div className="ff-sub">Humans only</div>
            </div>
          </div>
        </div>

        {/* PULSE */}
        <div className="feature rev rv">
          <div className="feat-text">
            <p className="feat-eyebrow">Pulse</p>
            <h3 className="feat-h3">
              High signal.
              <br />
              <em>Zero noise.</em>
            </h3>
            <p className="feat-desc">
              Verified, high-impact news — curated by community signal, not engagement bait. Know
              what actually matters, every single day.
            </p>
            <div className="feat-pill">
              <span className="pill-live" />
              Updated continuously
            </div>
          </div>
          <div className="feat-visual">
            <div
              className="feat-glow"
              style={{
                background:
                  "radial-gradient(ellipse,rgba(60,40,140,.2) 0%,transparent 70%)",
              }}
            />
            <div className="feat-phone">
              <img src="/screenshots/pulse.jpg" alt="Pulse" />
            </div>
            <div className="feat-float bl">
              <div className="ff-label">Signal Rate</div>
              <div className="ff-val">
                94<span style={{ fontSize: 12, color: "var(--muted)" }}>%</span>
              </div>
              <div className="ff-sub">Human-sourced</div>
            </div>
          </div>
        </div>

        {/* WORLD — dual phone pair */}
        <div
          className="rv"
          style={{ maxWidth: 1280, margin: "6px auto", padding: "0 48px" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 3,
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            {/* Text side */}
            <div
              style={{
                background: "var(--surface)",
                padding: "80px 60px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <p className="feat-eyebrow">Qamr World</p>
              <h3 className="feat-h3">
                Your Ummah,
                <br />
                <em>everywhere.</em>
              </h3>
              <p className="feat-desc">
                Explore Muslim communities across the globe. Ask questions, offer help, and discuss
                what matters — at the country level, with people who actually live it.
              </p>
              <div className="feat-pill" style={{ marginTop: 36 }}>
                <span className="pill-live" />
                Forum-style · Country communities
              </div>
            </div>

            {/* Two phones side by side */}
            <div
              style={{
                background: "var(--surf-lt)",
                padding: "60px 40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                position: "relative",
                minHeight: 540,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  width: 300,
                  height: 300,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(ellipse,rgba(90,30,122,.2) 0%,transparent 70%)",
                  pointerEvents: "none",
                }}
              />
              <div className="world-phone up">
                <img src="/screenshots/world.jpg" alt="Qamr World map" />
              </div>
              <div className="world-phone dn">
                <img src="/screenshots/country.jpg" alt="Country community" />
              </div>
            </div>
          </div>
        </div>

        {/* HUB */}
        <div className="feature rv">
          <div className="feat-text">
            <p className="feat-eyebrow">Hub</p>
            <h3 className="feat-h3">
              Everything
              <br />
              <em>you need.</em>
            </h3>
            <p className="feat-desc">
              Quran. Hadith. Prayer times. Qibla. Global Muslim communities. All in one place —
              built with the care it deserves.
            </p>
            <div className="feat-pill">
              <span className="pill-live" />
              Qamr Hub — your companion
            </div>
          </div>
          <div className="feat-visual">
            <div
              className="feat-glow"
              style={{
                background:
                  "radial-gradient(ellipse,rgba(212,191,138,.08) 0%,transparent 70%)",
              }}
            />
            <div className="feat-phone">
              <img src="/screenshots/hub.jpg" alt="Hub" />
            </div>
            <div className="feat-float tr">
              <div className="ff-label">Tools</div>
              <div className="ff-val">8+</div>
              <div className="ff-sub">Islamic essentials</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST ─── */}
      <section id="trust">
        <div className="trust-container">
          <div className="trust-top rv">
            <div className="section-eye">Our Promise</div>
            <h2>
              Built on trust.
              <br />
              <em>Not attention.</em>
            </h2>
          </div>
          <div className="trust-grid">
            <div className="trust-cell rv">
              <div className="tc-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
              </div>
              <div className="tc-title">Ad-free to start.</div>
              <div className="tc-desc">
                We launch without ads. Your early experience is clean, uninterrupted, and completely
                yours.
              </div>
            </div>
            <div className="trust-cell rv d1">
              <div className="tc-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="tc-title">Your data stays yours.</div>
              <div className="tc-desc">
                We don&apos;t sell, trade, or share your personal data with anyone. Full stop.
              </div>
            </div>
            <div className="trust-cell rv d2">
              <div className="tc-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87" />
                  <path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              <div className="tc-title">Real community.</div>
              <div className="tc-desc">
                Country rooms, forum-style discussion, and global Muslim communities — all human,
                all signal.
              </div>
            </div>
            <div className="trust-cell rv d3">
              <div className="tc-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12l3 3 5-5" />
                </svg>
              </div>
              <div className="tc-title">No AI-generated media.</div>
              <div className="tc-desc">
                Images, videos, and posts created by AI are detected and filtered. What you see is
                made by humans.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOR MUSLIMS ─── */}
      <section
        id="for-muslims"
        style={{
          padding: "120px 0",
          borderTop: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 700,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse,rgba(212,191,138,.07) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 48px",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Header */}
          <div className="rv" style={{ marginBottom: 80 }}>
            <div className="section-eye">Qamr Hub</div>
            <h2
              style={{
                fontFamily: "var(--hd)",
                fontSize: "clamp(40px,5.5vw,72px)",
                fontWeight: 800,
                letterSpacing: "-.035em",
                lineHeight: 1.04,
                maxWidth: 700,
              }}
            >
              Built for the
              <br />
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--accent)",
                  fontWeight: 700,
                }}
              >
                global Muslim.
              </em>
            </h2>
            <p
              style={{
                marginTop: 20,
                fontSize: 17,
                color: "var(--muted-lt)",
                fontWeight: 300,
                maxWidth: 520,
                lineHeight: 1.75,
              }}
            >
              Qamr is a premium social platform for everyone — and inside it lives everything a
              Muslim needs for daily life, all in one place.
            </p>
          </div>

          {/* Grid of hub features */}
          <div
            className="rv d1"
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 3 }}
          >
            {/* Quran card */}
            <HubCard
              title="Quran"
              desc="Full text with audio recitation, translation, and personal bookmarks. Always with you."
              firstRadius
              bg="linear-gradient(135deg,var(--surface) 40%,rgba(212,191,138,.04) 100%)"
              decoration={
                <svg
                  viewBox="0 0 400 200"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ position: "absolute", bottom: -10, right: -10, width: "75%", opacity: 0.06 }}
                >
                  <text
                    x="50%"
                    y="70%"
                    textAnchor="middle"
                    fontSize="96"
                    fill="#d4bf8a"
                    fontFamily="serif"
                    dominantBaseline="middle"
                  >
                    ﷲ
                  </text>
                </svg>
              }
            />
            {/* Hadith card */}
            <HubCard
              title="Hadith Collections"
              desc="Kutub al-Sittah, 40 Nawawi, and more — searchable, readable, shareable."
              bg="linear-gradient(135deg,var(--surface) 30%,rgba(90,30,122,.06) 100%)"
              decoration={
                <>
                  <svg
                    viewBox="0 0 100 100"
                    style={{
                      position: "absolute",
                      top: -10,
                      right: -10,
                      width: 180,
                      height: 180,
                      opacity: 0.04,
                    }}
                  >
                    <polygon
                      points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35"
                      fill="#d4bf8a"
                    />
                  </svg>
                  <svg
                    viewBox="0 0 400 120"
                    style={{
                      position: "absolute",
                      bottom: 10,
                      right: 0,
                      width: "70%",
                      opacity: 0.05,
                    }}
                  >
                    <text
                      x="50%"
                      y="80%"
                      textAnchor="middle"
                      fontSize="52"
                      fill="#d4bf8a"
                      fontFamily="serif"
                      dominantBaseline="middle"
                    >
                      حديث
                    </text>
                  </svg>
                </>
              }
            />
            {/* Prayer Times card */}
            <HubCard
              title="Prayer Times"
              desc="Daily salah times with Adhan for your exact location. Qibla direction included."
              lastRadius
              bg="linear-gradient(135deg,var(--surface) 30%,rgba(45,10,62,.1) 100%)"
              decoration={
                <svg
                  viewBox="0 0 120 120"
                  style={{
                    position: "absolute",
                    bottom: -20,
                    right: -20,
                    width: 180,
                    height: 180,
                    opacity: 0.06,
                  }}
                >
                  <path
                    d="M60,10 A50,50 0 1,1 10,60 A38,38 0 1,0 60,10 Z"
                    fill="#d4bf8a"
                  />
                  <polygon
                    points="88,16 91,27 102,24 94,32 100,43 89,37 82,47 82,36 71,32 82,27"
                    fill="#d4bf8a"
                  />
                </svg>
              }
            />
          </div>

          {/* Second row */}
          <div
            className="rv d2"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 3,
              marginTop: 3,
            }}
          >
            <div
              style={{
                padding: "48px 40px",
                background: "var(--surf-lt)",
                borderRadius: "20px 4px 4px 20px",
                display: "flex",
                alignItems: "center",
                gap: 32,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--hd)",
                    fontSize: "clamp(48px,5vw,72px)",
                    fontWeight: 800,
                    letterSpacing: "-.04em",
                    color: "var(--accent)",
                    lineHeight: 1,
                  }}
                >
                  40+
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--muted-lt)",
                    marginTop: 4,
                    fontWeight: 300,
                  }}
                >
                  Countries with active
                  <br />
                  Muslim communities
                </div>
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                {[78, 62, 89].map((w, i) => (
                  <div
                    key={i}
                    style={{
                      height: 4,
                      borderRadius: 2,
                      background: "rgba(212,191,138,.15)",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${w}%`,
                        borderRadius: 2,
                        background:
                          "linear-gradient(90deg,var(--accent),var(--acc-lt))",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                padding: "48px 40px",
                background: "var(--surf-lt)",
                borderRadius: "4px 20px 20px 4px",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: 16,
                  fontWeight: 400,
                }}
              >
                بِسْمِ اللَّهِ
              </div>
              <div
                style={{
                  fontFamily: "var(--hd)",
                  fontSize: "clamp(20px,2.5vw,28px)",
                  fontWeight: 700,
                  letterSpacing: "-.02em",
                  marginBottom: 12,
                  lineHeight: 1.2,
                }}
              >
                Your Islamic
                <br />
                companion.
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "var(--muted-lt)",
                  fontWeight: 300,
                  lineHeight: 1.7,
                  maxWidth: 360,
                }}
              >
                Social connection and spiritual practice, together in one thoughtfully built space.
                Not an afterthought — a foundation.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section id="cta">
        <div className="cta-orb" />
        <div className="cta-warm" />
        <div className="cta-inner rv">
          <h2 className="cta-h2">
            Take back
            <br />
            <em>your feed.</em>
          </h2>
          <p className="cta-sub">
            Join thousands choosing real over algorithmic.
            <br />
            Human over generated.
          </p>
          <div className="ctas">
            <a href="#" className="btn-gold">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              App Store
            </a>
            <a
              href="#"
              className="btn-gold"
              style={{
                background: "var(--surf-lt)",
                color: "var(--fg)",
                border: "1px solid var(--bord-lt)",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76c.3.17.65.19.96.06l13.2-7.62-2.83-2.83-11.33 10.39zm15.51-9.57L5.08.8C4.77.62 4.42.62 4.12.8L4 .86l13.07 13.57 1.62-.24zM20.65 10.29l-2.88-1.66-3.08 2.82 3.15 3.15 2.81-1.62a1.9 1.9 0 000-2.69zM4.12 1.14L4 1.06c-.3-.17-.65-.17-.96 0C2.77 1.23 2.62 1.56 2.62 2l.01 20c0 .44.15.77.41.94.3.17.66.15.96-.01L4.12 22.8 17.19 13.8 4.12 1.14z" />
              </svg>
              Google Play
            </a>
          </div>
          <p className="cta-note">Free to download · No data harvesting · No AI slop</p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="l-footer">
        <div className="foot-row">
          <a href="#" className="foot-brand">
            <img src="/logo.png" alt="Qamr" />
            <span>Qamr</span>
          </a>
          <div className="foot-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
          <p className="foot-copy">© 2026 Qamr. Built for humans.</p>
        </div>
      </footer>
    </div>
  );
}

/* ─── Small sub-components ─── */

function CleanPost({
  avClass,
  name,
  handle,
  text,
  likes,
  comments,
}: {
  avClass: "a1" | "a2" | "a3";
  name: string;
  handle: string;
  text: string;
  likes: string;
  comments: string;
}) {
  return (
    <div className="clean-post">
      <div className="cprow">
        <div className={`cpav ${avClass}`} />
        <div>
          <div className="cpname">{name}</div>
          <div className="cphandle">{handle}</div>
        </div>
        <div className="cp-check" />
      </div>
      <div className="cptext">{text}</div>
      <div className="cpactions">
        <span className="cpa">
          <svg
            width="11"
            height="11"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>{" "}
          {likes}
        </span>
        <span className="cpa">
          <svg
            width="11"
            height="11"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>{" "}
          {comments}
        </span>
      </div>
    </div>
  );
}

function HubCard({
  title,
  desc,
  firstRadius,
  lastRadius,
  bg,
  decoration,
}: {
  title: string;
  desc: string;
  firstRadius?: boolean;
  lastRadius?: boolean;
  bg: string;
  decoration: React.ReactNode;
}) {
  const radius = firstRadius
    ? "20px 4px 4px 20px"
    : lastRadius
      ? "4px 20px 20px 4px"
      : undefined;
  return (
    <div
      style={{
        gridColumn: "span 1",
        background: "var(--surface)",
        borderRadius: radius,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        minHeight: 280,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {decoration}
        <div style={{ position: "absolute", inset: 0, background: bg }} />
      </div>
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "48px 40px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          flex: 1,
        }}
      >
        <div
          style={{
            fontFamily: "var(--hd)",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "-.02em",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 14,
            color: "var(--muted-lt)",
            fontWeight: 300,
            lineHeight: 1.7,
          }}
        >
          {desc}
        </div>
      </div>
    </div>
  );
}
