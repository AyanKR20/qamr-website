"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

const APPSTORE = "https://apps.apple.com/app/qamr/id6764144560";
const PLAYSTORE = "https://play.google.com/store/apps/details?id=com.ayank.qamr";

export default function QamrLanding() {
  useEffect(() => {
    const preconnect1 = document.createElement("link");
    preconnect1.rel = "preconnect";
    preconnect1.href = "https://fonts.googleapis.com";

    const preconnect2 = document.createElement("link");
    preconnect2.rel = "preconnect";
    preconnect2.href = "https://fonts.gstatic.com";
    preconnect2.crossOrigin = "";

    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700;9..144,800&family=Inter:wght@400;500;600;700;800&display=swap";

    document.head.appendChild(preconnect1);
    document.head.appendChild(preconnect2);
    document.head.appendChild(fontLink);

    const nav = document.getElementById("nav");
    const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).classList.add("in");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -48px 0px" }
    );
    document.querySelectorAll(".rv").forEach((el) => obs.observe(el));

    const onTrackClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest("[data-track]") as HTMLElement | null;
      if (!target?.dataset.track) return;
      try {
        track(target.dataset.track, { location: target.dataset.location || "unknown" });
      } catch {
        /* analytics best-effort */
      }
    };
    document.addEventListener("click", onTrackClick, true);

    const ua = (navigator.userAgent || "").toLowerCase();
    const isAndroid = /android/.test(ua);
    const primaryHref = isAndroid ? PLAYSTORE : APPSTORE;
    const floatDl = document.querySelector(".float-dl") as HTMLAnchorElement | null;
    if (floatDl) {
      floatDl.href = primaryHref;
      floatDl.dataset.track = isAndroid ? "playstore_click" : "appstore_click";
    }

    const hero = document.getElementById("hero");
    let raf: number | null = null;
    const onScrollFloat = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        if (!floatDl || !hero) return;
        floatDl.classList.toggle("show", window.scrollY > hero.offsetHeight * 0.62);
      });
    };
    window.addEventListener("scroll", onScrollFloat, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScrollFloat);
      document.removeEventListener("click", onTrackClick, true);
      obs.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <style>{`
:root {
  --cream: #fff8ea;
  --cream-2: #f8ead0;
  --sand: #e4cc9b;
  --gold: #b8893f;
  --gold-2: #d7b46f;
  --navy: #101c35;
  --navy-2: #1a2b4e;
  --ink: #172033;
  --muted: #687287;
  --plum: #745a96;
  --rose: #dfb4a8;
  --mint: #afcdbb;
  --card: rgba(255, 252, 244, .78);
  --line: rgba(25, 34, 53, .11);
  --shadow: 0 24px 70px rgba(37, 38, 60, .13);
  --soft: 0 16px 38px rgba(72, 54, 93, .12);
  --hd: 'Fraunces', Georgia, serif;
  --bd: 'Inter', system-ui, sans-serif;
  --ease: cubic-bezier(.16,1,.3,1);
}

*,
*::before,
*::after { box-sizing: border-box; }

html { scroll-behavior: smooth; overflow-x: hidden; }

body {
  margin: 0;
  background:
    radial-gradient(circle at 16% 8%, rgba(255, 223, 174, .56) 0 18%, transparent 36%),
    radial-gradient(circle at 88% 4%, rgba(180, 146, 218, .28) 0 17%, transparent 34%),
    linear-gradient(180deg, #fff7e8 0%, #f8ead0 45%, #fff8ea 100%);
  color: var(--ink);
  font-family: var(--bd);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

a { color: inherit; }
button, a { -webkit-tap-highlight-color: transparent; }

.page {
  position: relative;
  min-height: 100vh;
  isolation: isolate;
}

.page::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: .34;
  background-image:
    linear-gradient(rgba(22, 32, 51, .045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(22, 32, 51, .045) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: linear-gradient(180deg, #000 0%, transparent 72%);
  z-index: -2;
}

.container {
  width: min(1160px, calc(100% - 40px));
  margin: 0 auto;
}

.rv {
  opacity: 0;
  transform: translateY(26px);
  transition: opacity .8s var(--ease), transform .8s var(--ease);
}

.rv.in { opacity: 1; transform: none; }
.d1 { transition-delay: .08s; }
.d2 { transition-delay: .16s; }
.d3 { transition-delay: .24s; }

#nav {
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  right: 0;
  padding: 18px 0;
  transition: background .3s var(--ease), border-color .3s var(--ease), padding .3s var(--ease);
}

#nav.scrolled {
  padding: 12px 0;
  background: rgba(255, 249, 236, .78);
  border-bottom: 1px solid rgba(22, 32, 51, .08);
  backdrop-filter: blur(22px);
}

.nav-row {
  width: min(1160px, calc(100% - 32px));
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-weight: 800;
  color: var(--navy);
}

.brand img {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  box-shadow: 0 8px 18px rgba(19, 28, 51, .14);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 26px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: rgba(23, 32, 51, .68);
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
}

.nav-links a:hover { color: var(--navy); }

.nav-download {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 18px;
  border-radius: 999px;
  background: var(--navy);
  color: #fff8ea;
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;
  box-shadow: 0 12px 28px rgba(16, 28, 53, .18);
}

#hero {
  position: relative;
  min-height: 100svh;
  padding: 124px 0 70px;
  overflow: hidden;
}

.hero-wash,
.hero-crescent,
.cta-wash {
  position: absolute;
  pointer-events: none;
  z-index: -1;
}

.hero-wash {
  inset: -180px -80px auto;
  height: 640px;
  background:
    radial-gradient(ellipse at 50% 18%, rgba(255, 251, 238, .92) 0 34%, transparent 62%),
    radial-gradient(ellipse at 72% 20%, rgba(137, 100, 185, .22) 0 18%, transparent 46%),
    radial-gradient(ellipse at 18% 32%, rgba(216, 167, 93, .27) 0 18%, transparent 44%);
  filter: blur(2px);
}

.hero-crescent {
  width: 250px;
  height: 250px;
  right: 5vw;
  top: 110px;
  border-radius: 50%;
  border: 1px solid rgba(184, 137, 63, .15);
  box-shadow:
    inset -34px 16px 0 rgba(255, 248, 234, .96),
    0 0 72px rgba(215, 180, 111, .22);
  opacity: .66;
  transform: rotate(-24deg);
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.02fr) minmax(330px, .98fr);
  gap: 64px;
  align-items: center;
}

.kicker {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  border: 1px solid rgba(184, 137, 63, .2);
  border-radius: 999px;
  background: rgba(255, 252, 244, .7);
  color: #8b6834;
  font-size: 12px;
  font-weight: 800;
  box-shadow: var(--soft);
}

.live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #5da577;
  box-shadow: 0 0 0 6px rgba(93, 165, 119, .13);
}

.hero h1,
.section-title,
.cta-title {
  margin: 0;
  font-family: var(--hd);
  color: var(--navy);
  letter-spacing: 0;
}

.hero h1 {
  max-width: 720px;
  margin-top: 22px;
  font-size: clamp(54px, 8.4vw, 104px);
  line-height: .94;
  text-wrap: balance;
}

.hero h1 span {
  display: block;
  color: #7b5e93;
}

.hero-copy {
  max-width: 620px;
  margin: 24px 0 0;
  color: rgba(23, 32, 51, .72);
  font-size: clamp(18px, 2.4vw, 22px);
  line-height: 1.55;
}

.hero-actions,
.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 32px;
}

.store-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-width: 184px;
  min-height: 58px;
  padding: 10px 18px;
  border: 1px solid rgba(16, 28, 53, .1);
  border-radius: 18px;
  background: rgba(255, 255, 255, .78);
  color: var(--navy);
  text-decoration: none;
  box-shadow: 0 18px 38px rgba(39, 36, 54, .14), inset 0 1px 0 rgba(255,255,255,.78);
  transition: transform .25s var(--ease), box-shadow .25s var(--ease);
  backdrop-filter: blur(16px);
}

.store-badge:hover {
  transform: translateY(-3px);
  box-shadow: 0 24px 48px rgba(39, 36, 54, .18), inset 0 1px 0 rgba(255,255,255,.86);
}

.store-badge svg { flex: 0 0 auto; }
.store-text { display: grid; gap: 1px; }
.store-small { color: rgba(23, 32, 51, .62); font-size: 11px; font-weight: 700; }
.store-big { color: var(--navy); font-size: 18px; font-weight: 900; line-height: 1; }

.trust-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
}

.trust-chip {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(255, 252, 244, .62);
  border: 1px solid rgba(22, 32, 51, .08);
  color: rgba(23, 32, 51, .66);
  font-size: 12px;
  font-weight: 800;
}

.phone-scene {
  position: relative;
  min-height: 650px;
}

.phone-stack {
  position: absolute;
  inset: 28px 28px auto auto;
  width: min(350px, 72vw);
  aspect-ratio: 9 / 18.5;
  border-radius: 48px;
  padding: 12px;
  background: linear-gradient(145deg, #fffffb, #ead3a6 58%, #9f7f4b);
  box-shadow: 0 42px 80px rgba(34, 32, 56, .25);
  transform: rotate(3deg);
}

.phone-stack::before {
  content: "";
  position: absolute;
  inset: 20px 34% auto;
  height: 6px;
  border-radius: 999px;
  background: rgba(16, 28, 53, .7);
  z-index: 3;
}

.phone-screen {
  width: 100%;
  height: 100%;
  border-radius: 38px;
  overflow: hidden;
  background: #101828;
  border: 1px solid rgba(255,255,255,.58);
}

.phone-screen img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mini-phone {
  position: absolute;
  left: 16px;
  bottom: 26px;
  width: min(210px, 44vw);
  aspect-ratio: 9 / 18.5;
  border-radius: 34px;
  padding: 8px;
  background: linear-gradient(150deg, #fffefa, #dbc08a);
  box-shadow: 0 30px 70px rgba(53, 42, 78, .18);
  transform: rotate(-8deg);
}

.mini-phone img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 28px;
  display: block;
}

.float-card {
  position: absolute;
  border: 1px solid rgba(16, 28, 53, .09);
  border-radius: 22px;
  background: rgba(255, 252, 244, .82);
  box-shadow: var(--shadow);
  backdrop-filter: blur(18px);
}

.story-strip {
  left: 0;
  top: 88px;
  display: flex;
  gap: 9px;
  padding: 10px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  padding: 3px;
  background: linear-gradient(135deg, #d7b46f, #8a6bb0 54%, #5da577);
  box-shadow: 0 10px 24px rgba(37, 38, 60, .12);
}

.avatar span {
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  border-radius: 50%;
  background: var(--navy);
  color: #fff8ea;
  font-size: 13px;
  font-weight: 900;
}

.bubble {
  right: 0;
  bottom: 160px;
  max-width: 235px;
  padding: 15px 16px;
}

.bubble strong,
.social-card strong,
.community-card strong {
  display: block;
  color: var(--navy);
  font-size: 14px;
}

.bubble span,
.social-card span {
  display: block;
  margin-top: 4px;
  color: rgba(23, 32, 51, .62);
  font-size: 13px;
  line-height: 1.35;
}

.reaction-chip {
  right: 22px;
  top: 34px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  border-radius: 999px;
  color: var(--navy);
  font-size: 13px;
  font-weight: 900;
}

.sparkles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    radial-gradient(circle, rgba(184,137,63,.34) 0 2px, transparent 3px),
    radial-gradient(circle, rgba(116,90,150,.22) 0 1.5px, transparent 2.5px);
  background-position: 9% 30%, 85% 72%;
  background-size: 170px 170px, 128px 128px;
  opacity: .72;
}

section {
  position: relative;
  padding: 92px 0;
}

.section-head {
  display: grid;
  gap: 14px;
  max-width: 720px;
  margin-bottom: 34px;
}

.eyebrow {
  color: #8b6834;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.section-title {
  font-size: clamp(38px, 5.6vw, 70px);
  line-height: 1;
  text-wrap: balance;
}

.section-copy {
  margin: 0;
  color: rgba(23, 32, 51, .68);
  font-size: 18px;
  line-height: 1.6;
}

.proof-grid {
  display: grid;
  grid-template-columns: 1.05fr .95fr;
  gap: 22px;
  align-items: stretch;
}

.conversation-wall,
.pulse-card,
.deen-card,
.visual-community {
  border: 1px solid rgba(16, 28, 53, .09);
  border-radius: 30px;
  background: rgba(255, 252, 244, .68);
  box-shadow: var(--soft);
  backdrop-filter: blur(18px);
}

.conversation-wall {
  padding: 18px;
  display: grid;
  gap: 12px;
}

.post-row {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 12px;
  padding: 16px;
  border-radius: 22px;
  background: rgba(255,255,255,.58);
  border: 1px solid rgba(16, 28, 53, .06);
}

.post-row p {
  margin: 5px 0 12px;
  color: rgba(23, 32, 51, .72);
  font-size: 14px;
  line-height: 1.45;
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  color: rgba(23, 32, 51, .52);
  font-size: 12px;
  font-weight: 800;
}

.proof-side {
  display: grid;
  gap: 22px;
}

.social-card {
  min-height: 180px;
  padding: 22px;
  overflow: hidden;
  position: relative;
}

.social-card .big-stat {
  display: block;
  margin-top: 18px;
  color: var(--navy);
  font-family: var(--hd);
  font-size: 60px;
  line-height: 1;
}

.social-card::after {
  content: "";
  position: absolute;
  width: 230px;
  height: 230px;
  right: -90px;
  bottom: -120px;
  border-radius: 48%;
  background: conic-gradient(from 90deg, rgba(215,180,111,.42), rgba(116,90,150,.24), rgba(93,165,119,.22), rgba(215,180,111,.42));
  filter: blur(18px);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.feature-card {
  min-height: 270px;
  padding: 22px;
  border: 1px solid rgba(16, 28, 53, .09);
  border-radius: 28px;
  background: rgba(255, 252, 244, .68);
  box-shadow: var(--soft);
  backdrop-filter: blur(18px);
}

.feature-icon {
  display: grid;
  width: 46px;
  height: 46px;
  place-items: center;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(215,180,111,.28), rgba(116,90,150,.2));
  color: var(--navy);
}

.feature-card h3 {
  margin: 22px 0 10px;
  color: var(--navy);
  font-size: 20px;
  line-height: 1.12;
}

.feature-card p {
  margin: 0;
  color: rgba(23, 32, 51, .66);
  font-size: 14px;
  line-height: 1.55;
}

.visual-community {
  padding: 22px;
  overflow: hidden;
}

.community-layout {
  display: grid;
  grid-template-columns: .85fr 1.15fr;
  gap: 26px;
  align-items: center;
}

.community-phone {
  width: min(300px, 100%);
  margin: 0 auto;
  border-radius: 42px;
  padding: 10px;
  background: linear-gradient(145deg, #fffffb, #ddc18c);
  box-shadow: var(--shadow);
}

.community-phone img {
  display: block;
  width: 100%;
  border-radius: 32px;
}

.community-cards {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.community-card {
  padding: 18px;
  min-height: 132px;
  border-radius: 24px;
  border: 1px solid rgba(16, 28, 53, .08);
  background: rgba(255,255,255,.54);
}

.community-card span {
  display: block;
  margin-top: 7px;
  color: rgba(23, 32, 51, .58);
  font-size: 13px;
  line-height: 1.4;
}

.community-tag {
  display: inline-flex;
  margin-bottom: 18px;
  padding: 7px 10px;
  border-radius: 999px;
  background: rgba(16, 28, 53, .07);
  color: rgba(16, 28, 53, .66);
  font-size: 12px;
  font-weight: 900;
}

.showcase {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.show-card {
  min-height: 570px;
  position: relative;
  overflow: hidden;
  padding: 24px;
  border-radius: 32px;
  background: linear-gradient(180deg, rgba(255,252,244,.76), rgba(245,228,197,.64));
  border: 1px solid rgba(16, 28, 53, .09);
  box-shadow: var(--soft);
}

.show-card h3 {
  margin: 0;
  color: var(--navy);
  font-size: 24px;
}

.show-card p {
  margin: 8px 0 0;
  color: rgba(23, 32, 51, .64);
  font-size: 14px;
  line-height: 1.45;
}

.show-phone {
  position: absolute;
  width: 76%;
  left: 12%;
  bottom: -104px;
  border-radius: 36px;
  padding: 8px;
  background: linear-gradient(145deg, #fffefa, #d7b46f);
  box-shadow: 0 28px 64px rgba(37, 38, 60, .2);
}

.show-phone img {
  display: block;
  width: 100%;
  border-radius: 28px;
}

#cta {
  padding-bottom: 104px;
}

.cta-panel {
  position: relative;
  overflow: hidden;
  min-height: 430px;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 56px 24px;
  border-radius: 36px;
  background:
    linear-gradient(135deg, rgba(16,28,53,.97), rgba(37,45,78,.95) 52%, rgba(90,67,121,.9)),
    radial-gradient(circle at 28% 18%, rgba(215,180,111,.32), transparent 38%);
  color: #fff8ea;
  box-shadow: 0 34px 88px rgba(16, 28, 53, .24);
}

.cta-panel::before {
  content: "";
  position: absolute;
  width: 360px;
  height: 360px;
  left: -130px;
  bottom: -160px;
  border-radius: 50%;
  background: rgba(215, 180, 111, .22);
  filter: blur(34px);
}

.cta-title {
  color: #fff8ea;
  font-size: clamp(44px, 7vw, 82px);
  line-height: .96;
}

.cta-panel p {
  max-width: 560px;
  margin: 18px auto 0;
  color: rgba(255, 248, 234, .76);
  font-size: 18px;
  line-height: 1.55;
}

.cta-actions {
  justify-content: center;
}

.cta-panel .store-badge {
  background: rgba(255, 252, 244, .92);
}

footer {
  padding: 30px 0 42px;
  color: rgba(23, 32, 51, .56);
}

.foot-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.foot-links {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
}

.foot-links a {
  color: rgba(23, 32, 51, .6);
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
}

.float-dl {
  position: fixed;
  z-index: 40;
  left: 50%;
  bottom: 18px;
  display: none;
  transform: translate(-50%, 18px);
  align-items: center;
  justify-content: center;
  min-width: min(320px, calc(100vw - 32px));
  min-height: 54px;
  border-radius: 999px;
  background: var(--navy);
  color: #fff8ea;
  font-size: 15px;
  font-weight: 900;
  text-decoration: none;
  opacity: 0;
  box-shadow: 0 20px 52px rgba(16, 28, 53, .28);
  transition: transform .3s var(--ease), opacity .3s var(--ease);
}

.float-dl.show {
  transform: translate(-50%, 0);
  opacity: 1;
}

@media (max-width: 980px) {
  .container { width: min(100% - 28px, 720px); }
  .nav-links { display: none; }
  .hero-grid,
  .proof-grid,
  .community-layout {
    grid-template-columns: 1fr;
  }
  #hero { padding-top: 104px; }
  .hero h1 { font-size: clamp(58px, 14vw, 88px); }
  .hero-copy { font-size: 19px; }
  .phone-scene { min-height: 620px; margin-top: 16px; }
  .phone-stack { right: 4px; }
  .feature-grid,
  .showcase {
    grid-template-columns: 1fr 1fr;
  }
  .show-card { min-height: 520px; }
}

@media (max-width: 660px) {
  .nav-row { width: min(100% - 24px, 520px); }
  .nav-download { display: none; }
  .brand img { width: 32px; height: 32px; }
  #hero { padding: 96px 0 40px; }
  .hero-crescent { right: -92px; top: 72px; opacity: .5; }
  .hero-actions,
  .cta-actions {
    display: grid;
    grid-template-columns: 1fr;
  }
  .store-badge { width: 100%; justify-content: center; }
  .trust-chip { font-size: 11px; }
  .phone-scene { min-height: 570px; }
  .phone-stack { width: min(305px, 72vw); top: 18px; }
  .mini-phone { width: min(180px, 42vw); left: 0; bottom: 40px; }
  .story-strip { top: 28px; left: -4px; }
  .avatar { width: 42px; height: 42px; }
  .bubble { right: 0; bottom: 122px; max-width: 205px; }
  .reaction-chip { right: 0; top: 0; }
  section { padding: 66px 0; }
  .section-head { margin-bottom: 24px; }
  .section-title { font-size: 43px; }
  .section-copy { font-size: 16px; }
  .feature-grid,
  .showcase,
  .community-cards {
    grid-template-columns: 1fr;
  }
  .feature-card { min-height: 220px; }
  .show-card { min-height: 500px; }
  .show-phone { width: 72%; left: 14%; }
  .conversation-wall { padding: 12px; }
  .post-row { padding: 13px; }
  .cta-panel {
    border-radius: 28px;
    min-height: 420px;
  }
  .foot-row {
    align-items: flex-start;
    flex-direction: column;
  }
  .float-dl { display: flex; }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: .001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: .001ms !important;
  }
}
      `}</style>

      <main className="page">
        <nav id="nav" aria-label="Main navigation">
          <div className="nav-row">
            <a className="brand" href="#hero" aria-label="Qamr home">
              <img src="logo.png" alt="" />
              <span>Qamr</span>
            </a>
            <ul className="nav-links">
              <li><a href="#community">Community</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#spaces">Spaces</a></li>
              <li><a href="#download">Download</a></li>
            </ul>
            <a className="nav-download" href={APPSTORE} data-track="appstore_click" data-location="nav">
              Download
            </a>
          </div>
        </nav>

        <section id="hero">
          <div className="hero-wash" aria-hidden="true" />
          <div className="hero-crescent" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy-wrap rv">
              <span className="kicker"><span className="live-dot" /> Built for Muslims</span>
              <h1>Connect with the <span>Ummah.</span></h1>
              <p className="hero-copy">
                Share moments, join meaningful conversations, discover what the Ummah is talking about,
                and scroll without the noise.
              </p>
              <div className="hero-actions" aria-label="Download Qamr">
                <StoreBadges location="hero" />
              </div>
              <div className="trust-row" aria-label="Qamr highlights">
                <span className="trust-chip">Find your people</span>
                <span className="trust-chip">Real conversations</span>
                <span className="trust-chip">Scroll with purpose</span>
              </div>
            </div>

            <div className="phone-scene rv d1" aria-label="Qamr app preview">
              <div className="sparkles" aria-hidden="true" />
              <div className="float-card reaction-chip">18k salaams</div>
              <div className="float-card story-strip" aria-label="Active stories">
                <Avatar initials="AY" />
                <Avatar initials="LM" />
                <Avatar initials="OK" />
                <Avatar initials="ZS" />
              </div>
              <div className="phone-stack">
                <div className="phone-screen">
                  <img src="ios/feedtab_ios.png" alt="Qamr social feed screenshot" />
                </div>
              </div>
              <div className="mini-phone">
                <img src="ios/dms_ios.png" alt="Qamr direct messages screenshot" />
              </div>
              <div className="float-card bubble">
                <strong>Daily check-in</strong>
                <span>How are you staying focused this week?</span>
              </div>
            </div>
          </div>
        </section>

        <section id="community">
          <div className="container">
            <div className="section-head rv">
              <span className="eyebrow">Real Muslims. Real conversations.</span>
              <h2 className="section-title">A social space that feels calmer.</h2>
              <p className="section-copy">
                Qamr brings Muslim feeds, reels, DMs, country rooms, and thoughtful discussions into one warm community.
              </p>
            </div>

            <div className="proof-grid">
              <div className="conversation-wall rv d1">
                <Post initials="FA" name="Fatima A." text="Moved cities recently. Any sisters in Kuala Lumpur who know good study spots?" meta="Malaysia · 42 replies" />
                <Post initials="YK" name="Yusuf K." text="What is everyone reading this Ramadan? Need something grounded but easy to follow." meta="Books · 128 reactions" />
                <Post initials="MN" name="Mariam N." text="The Qamr Pulse thread on Gaza updates is the first one I check now." meta="Pulse · Active now" />
              </div>
              <div className="proof-side">
                <div className="float-card social-card rv d2">
                  <strong>Community first</strong>
                  <span>People, posts, stories, reels, and useful conversations before everything else.</span>
                  <span className="big-stat">Ummah</span>
                </div>
                <div className="float-card social-card rv d3">
                  <strong>Less noise</strong>
                  <span>No endless clutter. Qamr is designed to feel softer, more intentional, and more human.</span>
                  <span className="big-stat">Calm</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features">
          <div className="container">
            <div className="section-head rv">
              <span className="eyebrow">What you can do</span>
              <h2 className="section-title">Built for Muslims. Made for daily life.</h2>
            </div>
            <div className="feature-grid">
              <Feature icon="play" title="Share posts, reels, and stories" text="Post your life, send DMs, and keep up with people who share your values." />
              <Feature icon="chat" title="Join Ummah discussions" text="Country rooms and topic threads help you find the conversations that fit your context." />
              <Feature icon="pulse" title="Discover high-signal news with Qamr Pulse" text="Follow what the Ummah is talking about without getting buried in outrage and noise." />
              <Feature icon="moon" title="Keep deen tools close" text="Quran, Hadith, Dua, prayer times, and Qibla stay nearby as a strong secondary benefit." />
            </div>
          </div>
        </section>

        <section id="spaces">
          <div className="container">
            <div className="visual-community rv">
              <div className="community-layout">
                <div className="community-phone">
                  <img src="ios/countryforum_ios.png" alt="Qamr country and community discussions screenshot" />
                </div>
                <div>
                  <div className="section-head">
                    <span className="eyebrow">Find your people</span>
                    <h2 className="section-title">Communities that feel close.</h2>
                    <p className="section-copy">
                      Follow spaces by country, stage of life, interests, and the reminders you want in your day.
                    </p>
                  </div>
                  <div className="community-cards">
                    <CommunityCard tag="Country" title="Pakistan" text="Local updates, questions, and everyday Muslim life." />
                    <CommunityCard tag="Country" title="Malaysia" text="Meet people nearby and follow community threads." />
                    <CommunityCard tag="Life" title="Students" text="Study routines, campus life, and practical advice." />
                    <CommunityCard tag="Journey" title="Reverts" text="A welcoming space for questions and steady support." />
                    <CommunityCard tag="Faith" title="Daily Reminders" text="Simple reminders that fit into the social flow." />
                    <CommunityCard tag="News" title="Qamr Pulse" text="High-signal stories with room for thoughtful replies." />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="inside">
          <div className="container">
            <div className="section-head rv">
              <span className="eyebrow">Inside Qamr</span>
              <h2 className="section-title">Social first, with Islamic essentials close by.</h2>
            </div>
            <div className="showcase">
              <ShowCard title="A warmer feed" text="Posts, reels, stories, and comments from Muslims around the world." img="ios/feedtab_ios.png" alt="Qamr feed" />
              <ShowCard title="Pulse with purpose" text="High-signal news and active Ummah conversations in one place." img="ios/qamrpulse_ios.PNG" alt="Qamr Pulse" />
              <ShowCard title="Qamr Hub" text="Quran, Hadith, Dua, prayer tools, and Qibla when you need them." img="ios/qamrhub_ios.PNG" alt="Qamr Hub" />
            </div>
          </div>
        </section>

        <section id="download">
          <div className="container">
            <div className="cta-panel rv">
              <div>
                <h2 className="cta-title">Join the Ummah on Qamr.</h2>
                <p>Find your people, share what matters, and scroll with purpose in a social space built for Muslims.</p>
                <div className="cta-actions" aria-label="Download Qamr">
                  <StoreBadges location="cta" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer>
          <div className="container foot-row">
            <a className="brand" href="#hero" aria-label="Qamr home">
              <img src="logo.png" alt="" />
              <span>Qamr</span>
            </a>
            <div className="foot-links">
              <a href="privacypolicy">Privacy</a>
              <a href="terms">Terms</a>
              <a href="/community-guidelines">Community Guidelines</a>
              <a href="/contact">Contact</a>
            </div>
            <span>© 2026 Qamr</span>
          </div>
        </footer>

        <a href={APPSTORE} className="float-dl" aria-label="Download Qamr" data-track="appstore_click" data-location="float">
          Download Qamr
        </a>
      </main>
    </>
  );
}

function StoreBadges({ location }: { location: string }) {
  return (
    <>
      <a href={APPSTORE} className="store-badge" aria-label="Download Qamr on the App Store" data-track="appstore_click" data-location={location}>
        <AppleIcon />
        <span className="store-text">
          <span className="store-small">Download on the</span>
          <span className="store-big">App Store</span>
        </span>
      </a>
      <a href={PLAYSTORE} className="store-badge" aria-label="Get Qamr on Google Play" data-track="playstore_click" data-location={location}>
        <PlayIcon />
        <span className="store-text">
          <span className="store-small">Get it on</span>
          <span className="store-big">Google Play</span>
        </span>
      </a>
    </>
  );
}

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="avatar">
      <span>{initials}</span>
    </div>
  );
}

function Post({ initials, name, text, meta }: { initials: string; name: string; text: string; meta: string }) {
  return (
    <article className="post-row">
      <Avatar initials={initials} />
      <div>
        <strong>{name}</strong>
        <p>{text}</p>
        <div className="post-meta">
          <span>{meta}</span>
          <span>Like</span>
          <span>Reply</span>
        </div>
      </div>
    </article>
  );
}

function Feature({ icon, title, text }: { icon: "play" | "chat" | "pulse" | "moon"; title: string; text: string }) {
  return (
    <article className="feature-card rv">
      <div className="feature-icon" aria-hidden="true">
        {icon === "play" && <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 5v14l11-7-11-7z" /></svg>}
        {icon === "chat" && <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" /></svg>}
        {icon === "pulse" && <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h4l3-8 4 16 3-8h4" /></svg>}
        {icon === "moon" && <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 13.2A8.5 8.5 0 1 1 10.8 3a6.7 6.7 0 0 0 10.2 10.2z" /></svg>}
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function CommunityCard({ tag, title, text }: { tag: string; title: string; text: string }) {
  return (
    <article className="community-card">
      <span className="community-tag">{tag}</span>
      <strong>{title}</strong>
      <span>{text}</span>
    </article>
  );
}

function ShowCard({ title, text, img, alt }: { title: string; text: string; img: string; alt: string }) {
  return (
    <article className="show-card rv">
      <h3>{title}</h3>
      <p>{text}</p>
      <div className="show-phone">
        <img src={img} alt={alt} loading="lazy" />
      </div>
    </article>
  );
}

function AppleIcon() {
  return (
    <svg width="24" height="28" viewBox="0 0 24 24" fill="#101c35" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="playA" x1="2" y1="2" x2="20" y2="22">
          <stop stopColor="#d7b46f" />
          <stop offset="1" stopColor="#745a96" />
        </linearGradient>
      </defs>
      <path d="M3.6 1.2a1.6 1.6 0 0 0-.6 1.3v19a1.6 1.6 0 0 0 .6 1.3l11-11.3z" fill="url(#playA)" />
      <path d="M14.6 11.5 17.8 8.3 5.2.8a1.4 1.4 0 0 0-1.6.4z" fill="#b8893f" />
      <path d="M14.6 12.5 3.6 23.5a1.4 1.4 0 0 0 1.6.3l12.6-7.4z" fill="#745a96" />
      <path d="m20.8 10.4-3-1.8-3.2 3.4 3.2 3.3 3-1.7a1.7 1.7 0 0 0 0-3.2z" fill="#d7b46f" />
    </svg>
  );
}
