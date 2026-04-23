"use client";

import { useEffect } from "react";

/**
 * Qamr landing page — ported from index.html to a single-file React (TSX) component.
 * The markup is embedded via dangerouslySetInnerHTML to preserve 1:1 fidelity with the
 * original HTML (including inline styles, SVGs, and data attributes). Interactive
 * behavior (nav scroll state, reveal-on-scroll, hero phone pointer tilt, scroll
 * parallax, and the Tweaks panel) is re-implemented in useEffect below.
 */
export default function QamrLanding() {
  useEffect(() => {
    // Load Google Fonts (Playfair Display + DM Sans)
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
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap";
    document.head.appendChild(preconnect1);
    document.head.appendChild(preconnect2);
    document.head.appendChild(fontLink);

    // Navbar scroll state
    const nav = document.getElementById("nav");
    const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });

    // Scroll reveal
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".rv").forEach((el) => obs.observe(el));

    // Hero phone pointer tilt
    const stage = document.querySelector(".hero-phone-stage") as HTMLElement | null;
    const heroWrap = document.querySelector(".hero-phone-wrap") as HTMLElement | null;
    let raf: number | null = null;
    let target = { rx: 0, ry: 0, px: 0 };
    let curr = { rx: 0, ry: 0, px: 0 };
    const tick = () => {
      curr.rx += (target.rx - curr.rx) * 0.08;
      curr.ry += (target.ry - curr.ry) * 0.08;
      curr.px += (target.px - curr.px) * 0.08;
      if (stage) stage.style.transform = `rotateX(${curr.rx}deg) rotateY(${curr.ry}deg)`;
      if (
        Math.abs(target.rx - curr.rx) +
          Math.abs(target.ry - curr.ry) +
          Math.abs(target.px - curr.px) >
        0.01
      ) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = null;
      }
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!heroWrap) return;
      const r = heroWrap.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width - 0.5;
      const cy = (e.clientY - r.top) / r.height - 0.5;
      target.ry = cx * 10;
      target.rx = -cy * 6;
      target.px = cx;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onPointerLeave = () => {
      target = { rx: 0, ry: 0, px: 0 };
      if (!raf) raf = requestAnimationFrame(tick);
    };
    heroWrap?.addEventListener("pointermove", onPointerMove);
    heroWrap?.addEventListener("pointerleave", onPointerLeave);

    // Scroll parallax for hero stage
    let parallaxRaf: number | null = null;
    const onScrollParallax = () => {
      if (parallaxRaf) return;
      parallaxRaf = requestAnimationFrame(() => {
        if (stage) {
          const y = Math.min(window.scrollY, 800);
          stage.style.translate = `0 ${y * 0.08}px`;
        }
        parallaxRaf = null;
      });
    };
    window.addEventListener("scroll", onScrollParallax, { passive: true });

    // Tweaks panel
    const applyTweaks = (s: { accent: string; accentLt: string; surface: string }) => {
      document.documentElement.style.setProperty("--accent", s.accent);
      document.documentElement.style.setProperty("--acc-lt", s.accentLt);
      if (s.surface === "deep") {
        document.documentElement.style.setProperty("--surface", "#080411");
        document.documentElement.style.setProperty("--surf-lt", "#0d0819");
      } else {
        document.documentElement.style.setProperty("--surface", "#0f0819");
        document.documentElement.style.setProperty("--surf-lt", "#160e22");
      }
    };
    const S = { accent: "#d4bf8a", accentLt: "#e8d5a8", heroStyle: "tight", surface: "deep" };
    applyTweaks(S);

    const panel = document.getElementById("tweaks-panel");
    const onMsg = (e: MessageEvent) => {
      if (e.data?.type === "__activate_edit_mode") panel?.classList.add("open");
      if (e.data?.type === "__deactivate_edit_mode") panel?.classList.remove("open");
    };
    window.addEventListener("message", onMsg);
    window.parent?.postMessage({ type: "__edit_mode_available" }, "*");

    const swatchHandlers: Array<[Element, EventListener]> = [];
    document.querySelectorAll(".tw-sw").forEach((sw) => {
      const h = () => {
        document.querySelectorAll(".tw-sw").forEach((s) => s.classList.remove("on"));
        sw.classList.add("on");
        const a = (sw as HTMLElement).dataset.a!;
        const b = (sw as HTMLElement).dataset.b!;
        S.accent = a;
        S.accentLt = b;
        applyTweaks(S);
      };
      sw.addEventListener("click", h);
      swatchHandlers.push([sw, h]);
    });
    const heroHandlers: Array<[Element, EventListener]> = [];
    document.querySelectorAll("[data-hero]").forEach((btn) => {
      const h = () => {
        document.querySelectorAll("[data-hero]").forEach((b) => b.classList.remove("on"));
        btn.classList.add("on");
        S.heroStyle = (btn as HTMLElement).dataset.hero!;
        const h1 = document.querySelector(".hero-h1") as HTMLElement | null;
        if (!h1) return;
        if (S.heroStyle === "tight") {
          h1.style.fontFamily = "'DM Sans', sans-serif";
          h1.style.fontWeight = "800";
          h1.style.letterSpacing = "-.04em";
        } else {
          h1.style.fontFamily = "'Playfair Display', serif";
          h1.style.fontWeight = "900";
          h1.style.letterSpacing = "-.035em";
        }
      };
      btn.addEventListener("click", h);
      heroHandlers.push([btn, h]);
    });
    const surfHandlers: Array<[Element, EventListener]> = [];
    document.querySelectorAll("[data-surf]").forEach((btn) => {
      const h = () => {
        document.querySelectorAll("[data-surf]").forEach((b) => b.classList.remove("on"));
        btn.classList.add("on");
        S.surface = (btn as HTMLElement).dataset.surf!;
        applyTweaks(S);
      };
      btn.addEventListener("click", h);
      surfHandlers.push([btn, h]);
    });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScrollParallax);
      window.removeEventListener("message", onMsg);
      heroWrap?.removeEventListener("pointermove", onPointerMove);
      heroWrap?.removeEventListener("pointerleave", onPointerLeave);
      obs.disconnect();
      swatchHandlers.forEach(([el, h]) => el.removeEventListener("click", h));
      heroHandlers.forEach(([el, h]) => el.removeEventListener("click", h));
      surfHandlers.forEach(([el, h]) => el.removeEventListener("click", h));
      if (raf) cancelAnimationFrame(raf);
      if (parallaxRaf) cancelAnimationFrame(parallaxRaf);
    };
  }, []);

  return (
    <>
      <style>{`
/* ───── TOKENS ───── */
:root {
  --bg:       #08040f;
  --fg:       #ede8df;
  --muted:    #6a6278;
  --muted-lt: #8a8298;
  --accent:   #d4bf8a;
  --acc-lt:   #e8d5a8;
  --surface:  #0f0819;
  --surf-lt:  #160e22;
  --border:   #1e1530;
  --bord-lt:  #2c1f46;
  --plum:     #2d0a3e;
  --glow:     #5a1e7a;
  --hd: 'Playfair Display', Georgia, serif;
  --bd: 'DM Sans', system-ui, sans-serif;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--fg);
  font-family: var(--bd);
  font-size: 17px;
  line-height: 1.6;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* Grain */
body::after {
  content: '';
  position: fixed; inset: 0;
  pointer-events: none; z-index: 900;
  opacity: 0.018;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ───── REVEAL ───── */
.rv { opacity: 0; transform: translateY(32px); transition: opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1); }
.rv.in { opacity: 1; transform: none; }
.d1 { transition-delay: .12s; } .d2 { transition-delay: .24s; } .d3 { transition-delay: .36s; } .d4 { transition-delay: .48s; }

/* ───── NAV ───── */
nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 800;
  padding: 22px 0;
  transition: background .5s, border-color .5s, backdrop-filter .5s;
}
nav.scrolled {
  background: rgba(8,4,15,.88);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(24px);
  padding: 16px 0;
}
.nav-row {
  max-width: 1280px; margin: 0 auto; padding: 0 48px;
  display: flex; align-items: center; justify-content: space-between;
}
.nav-brand {
  display: flex; align-items: center; gap: 10px;
  text-decoration: none; color: var(--fg);
}
.nav-brand img { width: 30px; height: 30px; border-radius: 7px; }
.nav-brand-name { font-family: var(--hd); font-size: 20px; font-weight: 700; letter-spacing: -.02em; }
.nav-links { display: flex; gap: 36px; list-style: none; }
.nav-links a { font-size: 13px; color: var(--muted-lt); text-decoration: none; letter-spacing: .01em; transition: color .2s; }
.nav-links a:hover { color: var(--fg); }
.nav-cta {
  padding: 10px 24px; border-radius: 100px;
  background: var(--accent); color: #08040f;
  font-size: 13px; font-weight: 500; text-decoration: none;
  transition: background .2s, transform .15s, box-shadow .2s;
  letter-spacing: .01em;
}
.nav-cta:hover { background: var(--acc-lt); box-shadow: 0 6px 24px rgba(212,191,138,.15); }

/* ───── HERO ───── */
#hero {
  min-height: 100vh;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 140px 48px 0;
  position: relative; overflow: hidden;
}

.hero-orb {
  position: absolute; top: -10%; left: 50%; transform: translateX(-50%);
  width: 1000px; height: 700px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(90,30,122,.18) 0%, rgba(45,10,62,.08) 45%, transparent 70%);
  pointer-events: none;
  animation: orb 10s ease-in-out infinite;
}
.hero-orb-warm {
  position: absolute; top: 20%; left: 50%; transform: translateX(-50%);
  width: 500px; height: 300px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(212,191,138,.05) 0%, transparent 70%);
  pointer-events: none;
}
@keyframes orb { 0%,100%{opacity:.9;transform:translateX(-50%) scale(1)} 50%{opacity:.75;transform:translateX(-50%) scale(1.04)} }

.hero-text {
  position: relative; z-index: 10;
  text-align: center;
  max-width: 1100px;
}

.hero-kicker {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 5px 16px; border-radius: 100px;
  border: 1px solid rgba(212,191,138,.14);
  background: rgba(212,191,138,.04);
  font-size: 11px; letter-spacing: .18em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 36px;
}
.kicker-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--accent); opacity: .7; }

.hero-h1 {
  font-family: var(--hd);
  font-size: clamp(58px, 7.8vw, 116px);
  font-weight: 800;
  line-height: 1.02;
  letter-spacing: -.035em;
  margin-bottom: 32px;
  text-wrap: balance;
  color: var(--fg);
}
.hero-h1 em {
  font-style: italic;
  font-weight: 700;
  color: var(--accent);
}

.hero-sub {
  font-size: clamp(16px, 1.5vw, 19px);
  color: var(--muted-lt);
  font-weight: 300;
  max-width: 480px;
  margin: 0 auto 52px;
  line-height: 1.7;
}

.ctas {
  display: flex; align-items: center; justify-content: center;
  gap: 14px; flex-wrap: wrap;
}

.btn-gold {
  display: inline-flex; align-items: center; gap: 9px;
  padding: 16px 36px; border-radius: 100px;
  background: var(--accent); color: #08040f;
  font-size: 14px; font-weight: 500; text-decoration: none;
  transition: background .25s, transform .2s cubic-bezier(.16,1,.3,1), box-shadow .3s;
  letter-spacing: .01em;
  position: relative; overflow: hidden;
}
.btn-gold::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(110deg, transparent 40%, rgba(255,255,255,.4) 50%, transparent 60%);
  transform: translateX(-120%);
  transition: transform .7s cubic-bezier(.16,1,.3,1);
}
.btn-gold:hover::before { transform: translateX(120%); }
.btn-gold > * { position: relative; z-index: 1; }
.btn-gold:hover { background: var(--acc-lt); box-shadow: 0 14px 50px rgba(212,191,138,.24); transform: translateY(-2px); }
.btn-gold:active { transform: translateY(0); }

/* ───── STORE BADGES (Qamr-themed) ───── */
.store-badge {
  display: inline-flex; align-items: center; gap: 12px;
  padding: 11px 22px 11px 18px;
  min-width: 188px;
  border-radius: 14px;
  background: linear-gradient(180deg, #120a1e 0%, #08040f 100%);
  border: 1px solid var(--bord-lt);
  color: var(--fg);
  text-decoration: none;
  position: relative;
  transition: transform .25s cubic-bezier(.16,1,.3,1), border-color .3s, box-shadow .3s;
  box-shadow: 0 2px 0 rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.04);
  overflow: hidden;
}
.store-badge::before {
  content: '';
  position: absolute; inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(160deg, rgba(212,191,138,.45), rgba(212,191,138,.06) 40%, rgba(212,191,138,.22) 100%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  pointer-events: none;
  opacity: .9;
}
.store-badge::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(110deg, transparent 42%, rgba(212,191,138,.18) 50%, transparent 58%);
  transform: translateX(-130%);
  transition: transform .8s cubic-bezier(.16,1,.3,1);
  pointer-events: none;
}
.store-badge:hover {
  transform: translateY(-2px);
  border-color: rgba(212,191,138,.35);
  box-shadow: 0 16px 44px rgba(0,0,0,.5), 0 0 0 1px rgba(212,191,138,.18), inset 0 1px 0 rgba(255,255,255,.06);
}
.store-badge:hover::after { transform: translateX(130%); }

.sb-icon {
  flex: none;
  width: 28px; height: 28px;
  display: flex; align-items: center; justify-content: center;
  position: relative; z-index: 1;
}
.sb-icon svg { display: block; filter: drop-shadow(0 1px 2px rgba(0,0,0,.5)); }

.sb-text {
  display: flex; flex-direction: column;
  line-height: 1.05;
  position: relative; z-index: 1;
}
.sb-small {
  font-size: 9.5px;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: rgba(212,191,138,.72);
  font-weight: 500;
  margin-bottom: 3px;
}
.sb-big {
  font-family: var(--bd);
  font-size: 17px;
  font-weight: 500;
  letter-spacing: -.01em;
  color: var(--fg);
}

.btn-outline {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 16px 36px; border-radius: 100px;
  border: 1px solid var(--bord-lt); color: var(--fg);
  font-size: 14px; font-weight: 400; text-decoration: none;
  transition: border-color .2s, background .2s, transform .15s;
}
.btn-outline:hover { border-color: rgba(212,191,138,.25); background: rgba(212,191,138,.03); }

/* Hero phone — large, single, centered with reveal-from-behind sides */
.hero-phone-wrap {
  position: relative; z-index: 10;
  margin-top: 80px;
  display: flex; justify-content: center; align-items: flex-end;
  gap: 0;
  padding-bottom: 0;
  perspective: 1800px;
  width: 100%;
  max-width: 820px;
}

.hero-phone-stage {
  position: relative;
  width: 280px;
  display: flex; justify-content: center;
  transform-style: preserve-3d;
}

.hero-phone {
  width: 280px;
  border-radius: 44px;
  border: 1px solid var(--bord-lt);
  overflow: hidden;
  box-shadow:
    0 80px 120px rgba(0,0,0,.7),
    0 0 0 1px rgba(212,191,138,.06),
    inset 0 1px 0 rgba(255,255,255,.05);
  position: relative; z-index: 5;
  transform: translateY(40px) scale(.96);
  opacity: 0;
  animation: heroCenterRise 1.1s cubic-bezier(.16,1,.3,1) .25s forwards;
  transition: transform .6s cubic-bezier(.16,1,.3,1);
}
.hero-phone img {
  width: 100%; display: block;
}

@keyframes heroCenterRise {
  to { transform: translateY(0) scale(1); opacity: 1; }
}

/* Side phones start stacked BEHIND the center phone, then slide outward */
.hero-phone-side {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 230px;
  border-radius: 40px;
  border: 1px solid rgba(255,255,255,.06);
  overflow: hidden;
  box-shadow:
    0 50px 90px rgba(0,0,0,.75),
    0 0 0 1px rgba(212,191,138,.03);
  opacity: 0;
  will-change: transform, opacity, filter;
  backface-visibility: hidden;
}
.hero-phone-side img { width: 100%; display: block; }

/* Glossy highlight sheen that races across revealed sides */
.hero-phone-side::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(115deg,
    transparent 30%,
    rgba(255,255,255,.12) 48%,
    rgba(255,255,255,0) 62%);
  mix-blend-mode: screen;
  opacity: 0;
  animation: sideSheen 2.2s ease-out 1.8s forwards;
  pointer-events: none;
}
@keyframes sideSheen { 0%{opacity:0;transform:translateX(-100%)} 30%{opacity:.6} 100%{opacity:0;transform:translateX(100%)} }

.hero-phone-l {
  transform: translateX(-50%) translateZ(-1px) scale(.82);
  animation: revealLeft 1.5s cubic-bezier(.22,1.15,.36,1) 1.0s forwards;
}
.hero-phone-r {
  transform: translateX(-50%) translateZ(-1px) scale(.82);
  animation: revealRight 1.5s cubic-bezier(.22,1.15,.36,1) 1.0s forwards;
}

@keyframes revealLeft {
  0% {
    transform: translateX(-50%) translateZ(-1px) rotate(0deg) scale(.82);
    opacity: 0;
    filter: blur(6px) brightness(.5);
  }
  40% {
    opacity: .9;
    filter: blur(2px) brightness(.7);
  }
  100% {
    transform: translateX(calc(-50% - 200px)) translateZ(-80px) rotate(-12deg) scale(.92);
    opacity: .85;
    filter: blur(.5px) brightness(.82);
  }
}
@keyframes revealRight {
  0% {
    transform: translateX(-50%) translateZ(-1px) rotate(0deg) scale(.82);
    opacity: 0;
    filter: blur(6px) brightness(.5);
  }
  40% {
    opacity: .9;
    filter: blur(2px) brightness(.7);
  }
  100% {
    transform: translateX(calc(-50% + 200px)) translateZ(-80px) rotate(12deg) scale(.92);
    opacity: .85;
    filter: blur(.5px) brightness(.82);
  }
}

/* Hover: spread them further and lift center */
.hero-phone-wrap:hover .hero-phone {
  transform: translateY(-6px) scale(1.015);
}
.hero-phone-wrap:hover .hero-phone-l {
  transform: translateX(calc(-50% - 240px)) translateZ(-60px) rotate(-14deg) scale(.96);
  opacity: 1;
  filter: blur(0) brightness(.95);
  transition: transform .7s cubic-bezier(.16,1,.3,1), opacity .5s, filter .5s;
}
.hero-phone-wrap:hover .hero-phone-r {
  transform: translateX(calc(-50% + 240px)) translateZ(-60px) rotate(14deg) scale(.96);
  opacity: 1;
  filter: blur(0) brightness(.95);
  transition: transform .7s cubic-bezier(.16,1,.3,1), opacity .5s, filter .5s;
}
.hero-phone-l, .hero-phone-r {
  transition: transform .7s cubic-bezier(.16,1,.3,1), opacity .5s, filter .5s;
}

/* Glow pads that light up as sides reveal */
.hero-phone-wrap::before {
  content: '';
  position: absolute;
  bottom: 40px; left: 50%;
  width: 700px; height: 220px;
  transform: translateX(-50%);
  background: radial-gradient(ellipse, rgba(212,191,138,.12) 0%, rgba(90,30,122,.08) 40%, transparent 70%);
  filter: blur(40px);
  opacity: 0;
  animation: padGlow 1.8s ease-out 1.2s forwards;
  pointer-events: none;
  z-index: 0;
}
@keyframes padGlow { to { opacity: 1; } }

.hero-floor-grad {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 220px;
  background: linear-gradient(to top, var(--bg) 0%, transparent 100%);
  pointer-events: none; z-index: 20;
}

/* ───── MARQUEE ───── */
.marquee-section {
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 18px 0;
  overflow: hidden;
  position: relative;
}
.marquee-track {
  display: flex; gap: 0;
  animation: marquee 28s linear infinite;
  width: max-content;
}
.marquee-track:hover { animation-play-state: paused; }
.marquee-item {
  padding: 0 48px;
  font-size: 12px; letter-spacing: .22em; text-transform: uppercase;
  color: var(--muted); white-space: nowrap;
  display: flex; align-items: center; gap: 16px;
}
.marquee-item::after {
  content: '';
  width: 3px; height: 3px; border-radius: 50%;
  background: var(--accent); opacity: .35;
  display: inline-block;
}
@keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

/* ───── CONTRAST ───── */
#contrast {
  padding: 140px 0 100px;
  position: relative;
}
.section-eye {
  font-size: 11px; letter-spacing: .22em; text-transform: uppercase;
  color: var(--accent); font-weight: 400; margin-bottom: 18px;
  display: flex; align-items: center; gap: 10px;
}
.section-eye::before {
  content: ''; flex: none;
  width: 24px; height: 1px; background: var(--accent); opacity: .5;
}

.contrast-header {
  max-width: 1280px; margin: 0 auto; padding: 0 48px;
  margin-bottom: 72px;
}
.contrast-header h2 {
  font-family: var(--hd);
  font-size: clamp(40px, 5.5vw, 76px);
  font-weight: 800; letter-spacing: -.03em; line-height: 1.04;
}
.contrast-header h2 em { font-style: italic; color: var(--accent); font-weight: 700; }
.contrast-header h2 span { color: var(--muted); font-weight: 700; font-style: italic; }

.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1280px; margin: 0 auto; padding: 0 48px;
  gap: 3px;
  border-radius: 20px; overflow: hidden;
}

.split-side {
  padding: 40px 32px;
  display: flex; flex-direction: column; gap: 14px;
}

.split-label {
  font-size: 10px; letter-spacing: .22em; text-transform: uppercase;
  font-weight: 500; padding-bottom: 16px; margin-bottom: 4px;
  border-bottom: 1px solid rgba(255,255,255,.05);
  display: flex; justify-content: space-between; align-items: center;
}

/* Chaos side */
.s-chaos { background: #0b0813; }
.s-chaos .split-label { color: #45404e; }

.chaos-post {
  padding: 14px; border-radius: 10px;
  background: rgba(255,255,255,.02);
  border: 1px solid rgba(255,255,255,.035);
  position: relative;
}
.chaos-badge {
  font-size: 8px; padding: 2px 7px; border-radius: 3px;
  letter-spacing: .06em; text-transform: uppercase;
  display: inline-flex; margin-bottom: 8px;
}
.badge-ad { background: rgba(255,255,255,.04); color: rgba(255,255,255,.25); }
.badge-ai { background: rgba(255,255,255,.04); color: rgba(255,255,255,.25); }
.badge-spam { background: rgba(255,255,255,.04); color: rgba(255,255,255,.25); }
.chaos-lines { display: flex; flex-direction: column; gap: 5px; }
.chaos-line { height: 5px; border-radius: 3px; background: rgba(255,255,255,.04); }
.chaos-avrow { display: flex; gap: 7px; align-items: center; margin-bottom: 7px; }
.chaos-av { width: 20px; height: 20px; border-radius: 50%; background: rgba(255,255,255,.05); }
.chaos-nm { font-size: 9px; color: rgba(255,255,255,.18); font-weight: 500; }

/* Clean side */
.s-clean { background: var(--surface); }
.s-clean .split-label { color: var(--accent); }

.clean-post {
  padding: 16px; border-radius: 12px;
  background: rgba(255,255,255,.025);
  border: 1px solid var(--border);
  transition: border-color .3s;
}
.clean-post:hover { border-color: rgba(212,191,138,.1); }
.cprow { display: flex; gap: 10px; align-items: center; margin-bottom: 10px; }
.cpav { width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0; border: 1px solid rgba(212,191,138,.15); }
.cpav.a1 { background: linear-gradient(135deg, #5a1e7a, #2d0a3e); }
.cpav.a2 { background: linear-gradient(135deg, #1a4a8a, #0f2a5c); }
.cpav.a3 { background: linear-gradient(135deg, #3d7a3a, #1f4a1d); }
.cpname { font-size: 11px; font-weight: 500; color: var(--fg); opacity: .85; }
.cphandle { font-size: 9px; color: var(--muted); }
.cp-check { margin-left: auto; width: 14px; height: 14px; border-radius: 50%; background: rgba(212,191,138,.12); display: flex; align-items: center; justify-content: center; }
.cp-check::before { content: ''; width: 5px; height: 3px; border-left: 1.2px solid var(--accent); border-bottom: 1.2px solid var(--accent); transform: rotate(-45deg) translate(0.5px, -0.5px); }
.cptext { font-size: 11px; color: rgba(240,235,224,.6); line-height: 1.65; margin-bottom: 10px; }
.cpactions { display: flex; gap: 14px; }
.cpa { font-size: 9px; color: var(--muted); display: flex; align-items: center; gap: 4px; }

/* ───── SHOWCASE ───── */
#showcase { padding: 120px 0; }

.showcase-hd {
  max-width: 1280px; margin: 0 auto 100px; padding: 0 48px;
}
.showcase-hd h2 {
  font-family: var(--hd);
  font-size: clamp(40px, 5.5vw, 72px);
  font-weight: 800; letter-spacing: -.035em; line-height: 1.04;
}
.showcase-hd h2 em { font-style: italic; color: var(--accent); font-weight: 700; }

.feature {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 0; align-items: stretch;
  max-width: 1280px; margin: 0 auto 6px; padding: 0 48px;
}
.feature.rev { direction: rtl; }
.feature.rev > * { direction: ltr; }

.feat-text {
  padding: 80px 60px;
  display: flex; flex-direction: column; justify-content: center;
  background: var(--surface);
  border-radius: 20px 0 0 20px;
}
.feature.rev .feat-text { border-radius: 0 20px 20px 0; }

.feat-eyebrow {
  font-size: 10px; letter-spacing: .25em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 20px;
  display: flex; align-items: center; gap: 10px;
}
.feat-eyebrow::before { content: ''; width: 20px; height: 1px; background: var(--accent); opacity: .5; }

.feat-h3 {
  font-family: var(--hd);
  font-size: clamp(34px, 3.5vw, 54px);
  font-weight: 800; letter-spacing: -.03em; line-height: 1.06;
  margin-bottom: 22px;
}
.feat-h3 em { font-style: italic; color: var(--accent); font-weight: 700; }

.feat-desc {
  font-size: 15px; color: var(--muted-lt); font-weight: 300;
  line-height: 1.8; max-width: 380px; margin-bottom: 36px;
}

.feat-pill {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 7px 16px; border-radius: 100px;
  border: 1px solid var(--border);
  font-size: 11px; color: var(--muted-lt); font-weight: 400;
}
.pill-live { width: 5px; height: 5px; border-radius: 50%; background: var(--accent); opacity: .6; }

.feat-visual {
  border-radius: 0 20px 20px 0;
  background: var(--surf-lt);
  overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  padding: 60px 40px;
  position: relative;
  min-height: 540px;
}
.feature.rev .feat-visual { border-radius: 20px 0 0 20px; }

/* Glow behind phone in feature */
.feat-glow {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
  width: 260px; height: 300px; border-radius: 50%;
  pointer-events: none;
}

.feat-phone {
  width: 220px;
  border-radius: 38px;
  border: 1px solid var(--bord-lt);
  overflow: hidden;
  box-shadow:
    0 50px 90px rgba(0,0,0,.6),
    0 0 0 1px rgba(212,191,138,.05),
    inset 0 1px 0 rgba(255,255,255,.04);
  position: relative; z-index: 2;
  transition: transform .6s cubic-bezier(.16,1,.3,1), box-shadow .5s;
  transform-style: preserve-3d;
}
.feat-phone:hover {
  transform: translateY(-8px) scale(1.025);
  box-shadow:
    0 70px 120px rgba(0,0,0,.7),
    0 0 80px rgba(212,191,138,.12),
    0 0 0 1px rgba(212,191,138,.14);
}
.feat-phone img { width: 100%; display: block; }
.feat-visual { perspective: 1600px; }

/* Floating stat card */
.feat-float {
  position: absolute;
  padding: 14px 18px;
  border-radius: 14px;
  background: rgba(12,7,22,.92);
  border: 1px solid var(--bord-lt);
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 50px rgba(0,0,0,.4);
  z-index: 10;
}
.feat-float.tr { top: 60px; right: 20px; }
.feat-float.bl { bottom: 60px; left: 20px; }
.ff-label { font-size: 9px; color: var(--muted); letter-spacing: .1em; text-transform: uppercase; margin-bottom: 5px; }
.ff-val { font-family: var(--hd); font-size: 22px; font-weight: 700; color: var(--fg); letter-spacing: -.03em; line-height: 1; }
.ff-sub { font-size: 9px; color: var(--muted); margin-top: 3px; }

/* ───── TRUST ───── */
#trust {
  padding: 120px 0;
  border-top: 1px solid var(--border);
}
.trust-container {
  max-width: 1280px; margin: 0 auto; padding: 0 48px;
}
.trust-top {
  margin-bottom: 80px;
}
.trust-top h2 {
  font-family: var(--hd);
  font-size: clamp(40px, 5.5vw, 72px);
  font-weight: 800; letter-spacing: -.035em; line-height: 1.04;
  max-width: 600px;
}
.trust-top h2 em { font-style: italic; color: var(--accent); font-weight: 700; }

.trust-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
}
.trust-cell {
  padding: 40px 36px;
  background: var(--surface);
  border-radius: 4px;
  transition: background .25s;
}
.trust-cell:first-child { border-radius: 20px 4px 4px 20px; }
.trust-cell:last-child { border-radius: 4px 20px 20px 4px; }
.trust-cell:hover { background: var(--surf-lt); }

.tc-icon {
  width: 36px; height: 36px;
  border: 1px solid var(--border); border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
  color: var(--accent); margin-bottom: 22px;
  transition: border-color .25s;
}
.trust-cell:hover .tc-icon { border-color: rgba(212,191,138,.25); }
.tc-title { font-family: var(--hd); font-size: 18px; font-weight: 700; margin-bottom: 10px; letter-spacing: -.02em; }
.tc-desc { font-size: 13px; color: var(--muted-lt); line-height: 1.7; font-weight: 300; }

/* ───── CTA ───── */
#cta {
  padding: 180px 48px;
  text-align: center;
  position: relative; overflow: hidden;
}
.cta-orb {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
  width: 800px; height: 500px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(90,30,122,.16) 0%, transparent 70%);
  pointer-events: none;
}
.cta-warm {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
  width: 400px; height: 200px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(212,191,138,.06) 0%, transparent 70%);
  pointer-events: none;
}
.cta-inner { position: relative; z-index: 10; max-width: 900px; margin: 0 auto; }
.cta-h2 {
  font-family: var(--hd);
  font-size: clamp(50px, 7vw, 104px);
  font-weight: 800; letter-spacing: -.04em; line-height: 1.02;
  margin-bottom: 28px;
}
.cta-h2 em {
  font-style: italic;
  font-weight: 700;
  color: var(--accent);
}
.cta-sub { font-size: 17px; color: var(--muted-lt); font-weight: 300; margin-bottom: 52px; line-height: 1.65; }
.cta-note { margin-top: 24px; font-size: 11px; color: rgba(106,98,120,.55); letter-spacing: .08em; }

/* ───── FOOTER ───── */
footer {
  padding: 44px 48px;
  border-top: 1px solid var(--border);
}
.foot-row {
  max-width: 1280px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px;
}
.foot-brand { display: flex; align-items: center; gap: 9px; text-decoration: none; }
.foot-brand img { width: 24px; height: 24px; border-radius: 6px; }
.foot-brand span { font-family: var(--hd); font-size: 15px; font-weight: 700; color: rgba(237,232,223,.4); letter-spacing: -.02em; }
.foot-links { display: flex; gap: 24px; }
.foot-links a { font-size: 12px; color: rgba(106,98,120,.5); text-decoration: none; transition: color .2s; }
.foot-links a:hover { color: var(--muted-lt); }
.foot-copy { font-size: 11px; color: rgba(106,98,120,.38); }

/* ───── TWEAKS PANEL ───── */
#tweaks-panel {
  display: none; position: fixed; bottom: 24px; right: 24px; z-index: 850;
  width: 270px;
  background: rgba(15,8,25,.96); border: 1px solid var(--bord-lt);
  border-radius: 16px; padding: 20px;
  backdrop-filter: blur(28px);
  box-shadow: 0 24px 60px rgba(0,0,0,.5);
}
#tweaks-panel.open { display: block; }
.tp-title {
  font-family: var(--hd); font-size: 13px; font-weight: 700;
  color: var(--fg); margin-bottom: 18px; letter-spacing: -.01em;
  display: flex; align-items: center; justify-content: space-between;
}
.tp-x {
  width: 22px; height: 22px; border-radius: 6px;
  background: rgba(255,255,255,.05); border: none;
  color: var(--muted); cursor: pointer; font-size: 13px;
  display: flex; align-items: center; justify-content: center;
}
.tw-row { margin-bottom: 14px; }
.tw-lbl { font-size: 10px; color: var(--muted); margin-bottom: 7px; display: block; letter-spacing: .06em; text-transform: uppercase; }
.tw-swatches { display: flex; gap: 8px; }
.tw-sw {
  width: 26px; height: 26px; border-radius: 50%;
  border: 2px solid transparent; cursor: pointer;
  transition: transform .15s, border-color .2s;
}
.tw-sw:hover { border-color: rgba(237,232,223,.3); }
.tw-sw.on { border-color: rgba(237,232,223,.7); }
.tw-opts { display: flex; gap: 6px; }
.tw-opt {
  flex: 1; height: 28px; border-radius: 7px;
  background: rgba(255,255,255,.04); border: 1px solid var(--border);
  color: var(--muted); font-size: 11px; cursor: pointer; transition: all .2s;
}
.tw-opt.on { background: rgba(212,191,138,.1); border-color: rgba(212,191,138,.25); color: var(--accent); }

/* ───── RESPONSIVE ───── */
@media (max-width: 900px) {
  .nav-links, .nav-cta { display: none; }
  #hero { padding: 110px 24px 0; }
  .hero-phone-side { display: none; }
  .hero-phone { width: 220px; }
  .split { grid-template-columns: 1fr; padding: 0 24px; }
  .feature { grid-template-columns: 1fr; padding: 0 24px; }
  .feature.rev { direction: ltr; }
  .feat-text { border-radius: 20px 20px 0 0 !important; padding: 48px 32px; }
  .feat-visual { border-radius: 0 0 20px 20px !important; min-height: 380px; padding: 40px 24px; }
  .trust-grid { grid-template-columns: 1fr 1fr; }
  .trust-cell { border-radius: 12px !important; }
  #cta { padding: 100px 24px; }
  .marquee-section { display: none; }
  .contrast-header, .showcase-hd { padding: 0 24px; }
  .trust-container { padding: 0 24px; }
  footer { padding: 36px 24px; }
  .feat-float { display: none; }
}
`}</style>
      <div dangerouslySetInnerHTML={{ __html: `

<!-- NAV -->
<nav id="nav">
  <div class="nav-row">
    <a href="#" class="nav-brand">
      <img src="logo.png" alt="Qamr" />
      <span class="nav-brand-name">Qamr</span>
    </a>
    <ul class="nav-links">
      <li><a href="#contrast">Why Qamr</a></li>
      <li><a href="#showcase">Platform</a></li>
      <li><a href="#trust">Our Promise</a></li>
    </ul>
    <a href="#cta" class="nav-cta">Get Early Access</a>
  </div>
</nav>

<!-- HERO -->
<section id="hero">
  <div class="hero-orb"></div>
  <div class="hero-orb-warm"></div>

  <div class="hero-text">
    <div class="hero-kicker rv">
      <span class="kicker-dot"></span>
      Now in Beta
    </div>
    <h1 class="hero-h1 rv d1">
      Your feed is<br/><em>full of ghosts.</em>
    </h1>
    <p class="hero-sub rv d2">
      Bots. Ads. AI slop. Nobody asked for any of it.<br/>
      Qamr is the alternative.
    </p>
    <div class="ctas rv d3">
      <a href="#cta" class="store-badge" aria-label="Download on the App Store">
        <span class="sb-icon">
          <svg width="22" height="26" viewBox="0 0 24 24" fill="#ede8df" aria-hidden="true"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
        </span>
        <span class="sb-text">
          <span class="sb-small">Download on the</span>
          <span class="sb-big">App Store</span>
        </span>
      </a>
      <a href="#cta" class="store-badge" aria-label="Get it on Google Play">
        <span class="sb-icon">
          <svg width="20" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <defs>
              <linearGradient id="qg1a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e8d5a8"/><stop offset="1" stop-color="#b89a55"/></linearGradient>
            </defs>
            <path d="M3.6 1.2a1.6 1.6 0 00-.6 1.3v19a1.6 1.6 0 00.6 1.3l11-11.3z" fill="url(#qg1a)"/>
            <path d="M14.6 11.5 17.8 8.3 5.2.8a1.4 1.4 0 00-1.6.4z" fill="#d4bf8a"/>
            <path d="M14.6 12.5 3.6 23.5a1.4 1.4 0 001.6.3l12.6-7.4z" fill="#b89a55"/>
            <path d="M20.8 10.4l-3-1.8-3.2 3.4 3.2 3.3 3-1.7a1.7 1.7 0 000-3.2z" fill="#e8d5a8"/>
          </svg>
        </span>
        <span class="sb-text">
          <span class="sb-small">Get it on</span>
          <span class="sb-big">Google Play</span>
        </span>
      </a>
      <a href="#contrast" class="btn-outline">
        See why it matters
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </div>
  </div>

  <!-- Hero phone stack: sides start behind center, then sweep outward -->
  <div class="hero-phone-wrap rv d4">
    <div class="hero-phone-stage">
      <div class="hero-phone-side hero-phone-l">
        <img src="ios/dms ios.jpg" alt="" />
      </div>
      <div class="hero-phone-side hero-phone-r">
        <img src="ios/qamrhub_ios.jpg" alt="" />
      </div>
      <div class="hero-phone">
        <img src="ios/feedtab_ios.jpg" alt="Qamr Feed" />
      </div>
    </div>
  </div>
  <div class="hero-floor-grad"></div>
</section>

<!-- MARQUEE -->
<div class="marquee-section">
  <div class="marquee-track">
    <span class="marquee-item">No Data Selling</span>
    <span class="marquee-item">No AI-Generated Media</span>
    <span class="marquee-item">Real People Only</span>
    <span class="marquee-item">High Signal News</span>
    <span class="marquee-item">Built for Depth</span>
    <span class="marquee-item">Quran &amp; Hadith Built In</span>
    <span class="marquee-item">Human First</span>
    <span class="marquee-item">No Data Selling</span>
    <span class="marquee-item">No AI-Generated Media</span>
    <span class="marquee-item">Real People Only</span>
    <span class="marquee-item">High Signal News</span>
    <span class="marquee-item">Built for Depth</span>
    <span class="marquee-item">Quran &amp; Hadith Built In</span>
    <span class="marquee-item">Human First</span>
  </div>
</div>

<!-- CONTRAST -->
<section id="contrast">
  <div class="contrast-header rv">
    <div class="section-eye">The Difference</div>
    <h2>The internet got <em>loud.</em><br/>We went the other way.</h2>
  </div>

  <div class="split rv d1">
    <!-- LEFT: chaos -->
    <div class="split-side s-chaos">
      <div class="split-label">
        <span>Everywhere else</span>
        <span style="font-size:9px;letter-spacing:.16em;color:#35303e;text-transform:uppercase;">AI &middot; Bots &middot; Noise</span>
      </div>
      <div class="chaos-post">
        <span class="chaos-badge badge-ad">Sponsored</span>
        <div class="chaos-avrow"><div class="chaos-av"></div><span class="chaos-nm">Brand_XY_Official</span></div>
        <div class="chaos-lines"><div class="chaos-line" style="width:90%"></div><div class="chaos-line" style="width:70%"></div><div class="chaos-line" style="width:80%"></div></div>
      </div>
      <div class="chaos-post">
        <span class="chaos-badge badge-ai">AI Generated</span>
        <div class="chaos-avrow"><div class="chaos-av"></div><span class="chaos-nm">ContentBot_4421</span></div>
        <div class="chaos-lines"><div class="chaos-line" style="width:95%"></div><div class="chaos-line" style="width:60%"></div></div>
      </div>
      <div class="chaos-post">
        <span class="chaos-badge badge-spam">Promoted</span>
        <div class="chaos-avrow"><div class="chaos-av"></div><span class="chaos-nm">Influencer_Promo99</span></div>
        <div class="chaos-lines"><div class="chaos-line" style="width:85%"></div><div class="chaos-line" style="width:72%"></div><div class="chaos-line" style="width:55%"></div></div>
      </div>
      <div class="chaos-post" style="opacity:.45">
        <span class="chaos-badge badge-ai">AI Generated</span>
        <div class="chaos-lines"><div class="chaos-line" style="width:75%"></div><div class="chaos-line" style="width:50%"></div></div>
      </div>
    </div>

    <!-- RIGHT: clean -->
    <div class="split-side s-clean">
      <div class="split-label">
        <span>Qamr</span>
        <span style="font-size:9px;color:rgba(212,191,138,.45);letter-spacing:.16em;text-transform:uppercase;">Real people &middot; Real talk</span>
      </div>
      <div class="clean-post">
        <div class="cprow">
          <div class="cpav a1"></div>
          <div><div class="cpname">Ahmad Suleiman</div><div class="cphandle">@ahmad.s</div></div>
          <div class="cp-check"></div>
        </div>
        <div class="cptext">Spent the morning hiking with no phone. It was the clearest I've thought in months.</div>
        <div class="cpactions">
          <span class="cpa"><svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg> 84</span>
          <span class="cpa"><svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg> 12</span>
        </div>
      </div>
      <div class="clean-post">
        <div class="cprow">
          <div class="cpav a2"></div>
          <div><div class="cpname">Layla Mohammed</div><div class="cphandle">@layla.m</div></div>
          <div class="cp-check"></div>
        </div>
        <div class="cptext">The AI content flood is real. I barely see actual people anymore on other apps. This is why Qamr matters.</div>
        <div class="cpactions">
          <span class="cpa"><svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg> 231</span>
          <span class="cpa"><svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg> 47</span>
        </div>
      </div>
      <div class="clean-post">
        <div class="cprow">
          <div class="cpav a3"></div>
          <div><div class="cpname">Omar Khalid</div><div class="cphandle">@omar.k</div></div>
          <div class="cp-check"></div>
        </div>
        <div class="cptext">Real conversation is a rare thing now. Keep showing up.</div>
        <div class="cpactions">
          <span class="cpa"><svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg> 519</span>
          <span class="cpa"><svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg> 88</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SHOWCASE -->
<section id="showcase">
  <div class="showcase-hd rv">
    <div class="section-eye">The Platform</div>
    <h2>One platform.<br/><em>Everything you need.</em></h2>
  </div>

  <!-- FEED -->
  <div class="feature rv">
    <div class="feat-text">
      <p class="feat-eyebrow">Feed</p>
      <h3 class="feat-h3">Your people.<br/><em>Nothing else.</em></h3>
      <p class="feat-desc">A clean, human feed — free of AI-generated media and fake engagement. Real posts from real people, surfaced without manipulation or slop.</p>
      <div class="feat-pill">
        <span class="pill-live"></span>
        Zero AI-generated media
      </div>
    </div>
    <div class="feat-visual">
      <div class="feat-glow" style="background:radial-gradient(ellipse,rgba(90,30,122,.25) 0%,transparent 70%)"></div>
      <div class="feat-phone">
        <img src="ios/feedtab_ios.jpg" alt="Feed" />
      </div>
      <div class="feat-float tr">
        <div class="ff-label">AI Media</div>
        <div class="ff-val" style="color:#ef4444;font-size:15px;letter-spacing:.01em">Blocked</div>
        <div class="ff-sub">Humans only</div>
      </div>
    </div>
  </div>

  <!-- PULSE -->
  <div class="feature rev rv">
    <div class="feat-text">
      <p class="feat-eyebrow">Pulse</p>
      <h3 class="feat-h3">High signal.<br/><em>Zero noise.</em></h3>
      <p class="feat-desc">Verified, high-impact news — curated by community signal, not engagement bait. Know what actually matters, every single day.</p>
      <div class="feat-pill">
        <span class="pill-live"></span>
        Updated continuously
      </div>
    </div>
    <div class="feat-visual">
      <div class="feat-glow" style="background:radial-gradient(ellipse,rgba(60,40,140,.2) 0%,transparent 70%)"></div>
      <div class="feat-phone">
        <img src="ios/qamrpulse_ios.jpg" alt="Pulse" />
      </div>
      <div class="feat-float bl">
        <div class="ff-label">Signal Rate</div>
        <div class="ff-val">94<span style="font-size:12px;color:var(--muted)">%</span></div>
        <div class="ff-sub">Human-sourced</div>
      </div>
    </div>
  </div>

  <!-- WORLD — dual phone pair -->
  <div class="rv" style="max-width:1280px;margin:6px auto;padding:0 48px;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px;border-radius:20px;overflow:hidden;">

      <!-- Text + world map phone -->
      <div style="background:var(--surface);padding:80px 60px;display:flex;flex-direction:column;justify-content:center;">
        <p class="feat-eyebrow">Qamr World</p>
        <h3 class="feat-h3">Your Ummah,<br/><em>everywhere.</em></h3>
        <p class="feat-desc">Explore Muslim communities across the globe. Ask questions, offer help, and discuss what matters — at the country level, with people who actually live it.</p>
        <div class="feat-pill" style="margin-top:36px;">
          <span class="pill-live"></span>
          Forum-style · Country communities
        </div>
      </div>

      <!-- Two phones side by side -->
      <div style="background:var(--surf-lt);padding:60px 40px;display:flex;align-items:center;justify-content:center;gap:16px;position:relative;min-height:540px;">
        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:300px;height:300px;border-radius:50%;background:radial-gradient(ellipse,rgba(90,30,122,.2) 0%,transparent 70%);pointer-events:none;"></div>

        <!-- World map phone -->
        <div style="width:168px;border-radius:32px;border:1px solid var(--bord-lt);overflow:hidden;box-shadow:0 40px 70px rgba(0,0,0,.5),0 0 0 1px rgba(212,191,138,.04);transform:translateY(-6px);transition:transform .5s cubic-bezier(.16,1,.3,1);z-index:2;position:relative;" onmouseover="this.style.transform='translateY(-12px)'" onmouseout="this.style.transform='translateY(-6px)'">
          <img src="ios/qamrworld_ios.jpg" style="width:100%;display:block;" alt="Qamr World map" />
        </div>

        <!-- Country discussion phone -->
        <div style="width:168px;border-radius:32px;border:1px solid var(--bord-lt);overflow:hidden;box-shadow:0 40px 70px rgba(0,0,0,.5),0 0 0 1px rgba(212,191,138,.04);transform:translateY(6px);transition:transform .5s cubic-bezier(.16,1,.3,1);z-index:2;position:relative;" onmouseover="this.style.transform='translateY(0)'" onmouseout="this.style.transform='translateY(6px)'">
          <img src="ios/countryforum_ios.jpg" style="width:100%;display:block;" alt="Country community" />
        </div>
      </div>

    </div>
  </div>

  <!-- HUB -->
  <div class="feature rv">
    <div class="feat-text">
      <p class="feat-eyebrow">Hub</p>
      <h3 class="feat-h3">Everything<br/><em>you need.</em></h3>
      <p class="feat-desc">Quran. Hadith. Prayer times. Qibla. Global Muslim communities. All in one place — built with the care it deserves.</p>
      <div class="feat-pill">
        <span class="pill-live"></span>
        Qamr Hub — your companion
      </div>
    </div>
    <div class="feat-visual">
      <div class="feat-glow" style="background:radial-gradient(ellipse,rgba(212,191,138,.08) 0%,transparent 70%)"></div>
      <div class="feat-phone">
        <img src="ios/qamrhub_ios.jpg" alt="Hub" />
      </div>
      <div class="feat-float tr">
        <div class="ff-label">Tools</div>
        <div class="ff-val">8+</div>
        <div class="ff-sub">Islamic essentials</div>
      </div>
    </div>
  </div>
</section>

<!-- TRUST -->
<section id="trust">
  <div class="trust-container">
    <div class="trust-top rv">
      <div class="section-eye">Our Promise</div>
      <h2>Built on trust.<br/><em>Not attention.</em></h2>
    </div>
    <div class="trust-grid">
      <div class="trust-cell rv">
        <div class="tc-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
        </div>
        <div class="tc-title">Ad-free to start.</div>
        <div class="tc-desc">We launch without ads. Your early experience is clean, uninterrupted, and completely yours.</div>
      </div>
      <div class="trust-cell rv d1">
        <div class="tc-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <div class="tc-title">Your data stays yours.</div>
        <div class="tc-desc">We don't sell, trade, or share your personal data with anyone. Full stop.</div>
      </div>
      <div class="trust-cell rv d2">
        <div class="tc-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
        </div>
        <div class="tc-title">Real community.</div>
        <div class="tc-desc">Country rooms, forum-style discussion, and global Muslim communities — all human, all signal.</div>
      </div>
      <div class="trust-cell rv d3">
        <div class="tc-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-5"/></svg>
        </div>
        <div class="tc-title">No AI-generated media.</div>
        <div class="tc-desc">Images, videos, and posts created by AI are detected and filtered. What you see is made by humans.</div>
      </div>
    </div>
  </div>
</section>

<!-- MUSLIM SECTION -->
<section id="for-muslims" style="padding:120px 0;border-top:1px solid var(--border);position:relative;overflow:hidden;">
  <!-- Subtle crescent glow -->
  <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:700px;height:400px;border-radius:50%;background:radial-gradient(ellipse,rgba(212,191,138,.07) 0%,transparent 70%);pointer-events:none;"></div>

  <div style="max-width:1280px;margin:0 auto;padding:0 48px;position:relative;z-index:10;">

    <!-- Header -->
    <div class="rv" style="margin-bottom:80px;">
      <div class="section-eye">Qamr Hub</div>
      <h2 style="font-family:var(--hd);font-size:clamp(40px,5.5vw,72px);font-weight:800;letter-spacing:-.035em;line-height:1.04;max-width:700px;">
        Built for the<br/><em style="font-style:italic;color:var(--accent);font-weight:700;">global Muslim.</em>
      </h2>
      <p style="margin-top:20px;font-size:17px;color:var(--muted-lt);font-weight:300;max-width:520px;line-height:1.75;">
        Qamr is a premium social platform for everyone — and inside it lives everything a Muslim needs for daily life, all in one place.
      </p>
    </div>

    <!-- Grid of hub features -->
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:3px;" class="rv d1">

      <!-- Quran card -->
      <div style="grid-column:span 1;background:var(--surface);border-radius:20px 4px 4px 20px;display:flex;flex-direction:column;overflow:hidden;position:relative;min-height:280px;">
        <div style="position:absolute;inset:0;pointer-events:none;overflow:hidden;">
          <svg viewBox='0 0 400 200' xmlns='http://www.w3.org/2000/svg' style='position:absolute;bottom:-10px;right:-10px;width:75%;opacity:.06;'><text x='50%' y='70%' text-anchor='middle' font-size='96' fill='#d4bf8a' font-family='serif' dominant-baseline='middle'>﷽</text></svg>
          <div style="position:absolute;inset:0;background:linear-gradient(135deg,var(--surface) 40%,rgba(212,191,138,.04) 100%);"></div>
        </div>
        <div style="position:relative;z-index:2;padding:48px 40px;display:flex;flex-direction:column;gap:14px;flex:1;">
          <div style="font-family:var(--hd);font-size:22px;font-weight:700;letter-spacing:-.02em;">Quran</div>
          <div style="font-size:14px;color:var(--muted-lt);font-weight:300;line-height:1.7;">Full text with audio recitation, translation, and personal bookmarks. Always with you.</div>
        </div>
      </div>

      <!-- Hadith card -->
      <div style="background:var(--surface);display:flex;flex-direction:column;overflow:hidden;position:relative;min-height:280px;">
        <div style="position:absolute;inset:0;pointer-events:none;overflow:hidden;">
          <svg viewBox='0 0 100 100' style='position:absolute;top:-10px;right:-10px;width:180px;height:180px;opacity:.04;'><polygon points='50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35' fill='#d4bf8a'/></svg>
          <svg viewBox='0 0 400 120' style='position:absolute;bottom:10px;right:0;width:70%;opacity:.05;'><text x='50%' y='80%' text-anchor='middle' font-size='52' fill='#d4bf8a' font-family='serif' dominant-baseline='middle'>حديث</text></svg>
          <div style="position:absolute;inset:0;background:linear-gradient(135deg,var(--surface) 30%,rgba(90,30,122,.06) 100%);"></div>
        </div>
        <div style="position:relative;z-index:2;padding:48px 40px;display:flex;flex-direction:column;gap:14px;flex:1;">
          <div style="font-family:var(--hd);font-size:22px;font-weight:700;letter-spacing:-.02em;">Hadith Collections</div>
          <div style="font-size:14px;color:var(--muted-lt);font-weight:300;line-height:1.7;">Kutub al-Sittah, 40 Nawawi, and more — searchable, readable, shareable.</div>
        </div>
      </div>

      <!-- Prayer Times card -->
      <div style="background:var(--surface);border-radius:4px 20px 20px 4px;display:flex;flex-direction:column;overflow:hidden;position:relative;min-height:280px;">
        <div style="position:absolute;inset:0;pointer-events:none;overflow:hidden;">
          <svg viewBox='0 0 120 120' style='position:absolute;bottom:-20px;right:-20px;width:180px;height:180px;opacity:.06;'><path d='M60,10 A50,50 0 1,1 10,60 A38,38 0 1,0 60,10 Z' fill='#d4bf8a'/><polygon points='88,16 91,27 102,24 94,32 100,43 89,37 82,47 82,36 71,32 82,27' fill='#d4bf8a'/></svg>
          <div style="position:absolute;inset:0;background:linear-gradient(135deg,var(--surface) 30%,rgba(45,10,62,.1) 100%);"></div>
        </div>
        <div style="position:relative;z-index:2;padding:48px 40px;display:flex;flex-direction:column;gap:14px;flex:1;">
          <div style="font-family:var(--hd);font-size:22px;font-weight:700;letter-spacing:-.02em;">Prayer Times</div>
          <div style="font-size:14px;color:var(--muted-lt);font-weight:300;line-height:1.7;">Daily salah times with Adhan for your exact location. Qibla direction included.</div>
        </div>
      </div>

    </div>

    <!-- Second row -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px;margin-top:3px;" class="rv d2">

      <div style="padding:48px 40px;background:var(--surf-lt);border-radius:20px 4px 4px 20px;display:flex;align-items:center;gap:32px;">
        <div>
          <div style="font-family:var(--hd);font-size:clamp(48px,5vw,72px);font-weight:800;letter-spacing:-.04em;color:var(--accent);line-height:1;">40+</div>
          <div style="font-size:13px;color:var(--muted-lt);margin-top:4px;font-weight:300;">Countries with active<br/>Muslim communities</div>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;gap:6px;">
          <div style="height:4px;border-radius:2px;background:rgba(212,191,138,.15);"><div style="height:100%;width:78%;border-radius:2px;background:linear-gradient(90deg,var(--accent),var(--acc-lt));"></div></div>
          <div style="height:4px;border-radius:2px;background:rgba(212,191,138,.15);"><div style="height:100%;width:62%;border-radius:2px;background:linear-gradient(90deg,var(--accent),var(--acc-lt));"></div></div>
          <div style="height:4px;border-radius:2px;background:rgba(212,191,138,.15);"><div style="height:100%;width:89%;border-radius:2px;background:linear-gradient(90deg,var(--accent),var(--acc-lt));"></div></div>
        </div>
      </div>

      <div style="padding:48px 40px;background:var(--surf-lt);border-radius:4px 20px 20px 4px;">
        <div style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);margin-bottom:16px;font-weight:400;">بِسْمِ اللَّه</div>
        <div style="font-family:var(--hd);font-size:clamp(20px,2.5vw,28px);font-weight:700;letter-spacing:-.02em;margin-bottom:12px;line-height:1.2;">Your Islamic<br/>companion.</div>
        <div style="font-size:14px;color:var(--muted-lt);font-weight:300;line-height:1.7;max-width:360px;">Social connection and spiritual practice, together in one thoughtfully built space. Not an afterthought — a foundation.</div>
      </div>

    </div>
  </div>
</section>

<!-- CTA -->
<section id="cta">
  <div class="cta-orb"></div>
  <div class="cta-warm"></div>
  <div class="cta-inner rv">
    <h2 class="cta-h2">Take back<br/><em>your feed.</em></h2>
    <p class="cta-sub">Join thousands choosing real over algorithmic.<br/>Human over generated.</p>
    <div class="ctas">
      <a href="#" class="store-badge" aria-label="Download on the App Store">
        <span class="sb-icon">
          <svg width="22" height="26" viewBox="0 0 24 24" fill="#ede8df" aria-hidden="true"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
        </span>
        <span class="sb-text">
          <span class="sb-small">Download on the</span>
          <span class="sb-big">App Store</span>
        </span>
      </a>
      <a href="#" class="store-badge" aria-label="Get it on Google Play">
        <span class="sb-icon">
          <svg width="20" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <defs>
              <linearGradient id="qg1b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e8d5a8"/><stop offset="1" stop-color="#b89a55"/></linearGradient>
            </defs>
            <path d="M3.6 1.2a1.6 1.6 0 00-.6 1.3v19a1.6 1.6 0 00.6 1.3l11-11.3z" fill="url(#qg1b)"/>
            <path d="M14.6 11.5 17.8 8.3 5.2.8a1.4 1.4 0 00-1.6.4z" fill="#d4bf8a"/>
            <path d="M14.6 12.5 3.6 23.5a1.4 1.4 0 001.6.3l12.6-7.4z" fill="#b89a55"/>
            <path d="M20.8 10.4l-3-1.8-3.2 3.4 3.2 3.3 3-1.7a1.7 1.7 0 000-3.2z" fill="#e8d5a8"/>
          </svg>
        </span>
        <span class="sb-text">
          <span class="sb-small">Get it on</span>
          <span class="sb-big">Google Play</span>
        </span>
      </a>
    </div>
    <p class="cta-note">Free to download · No data harvesting · No AI slop</p>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="foot-row">
    <a href="#" class="foot-brand">
      <img src="logo.png" alt="Qamr" />
      <span>Qamr</span>
    </a>
    <div class="foot-links">
      <a href="privacy.html">Privacy</a>
      <a href="terms.html">Terms</a>
      <a href="contact.html">Contact</a>
    </div>
    <p class="foot-copy">© 2026 Qamr. Built for humans.</p>
  </div>
</footer>

<!-- TWEAKS -->
<div id="tweaks-panel">
  <div class="tp-title">
    Tweaks
    <button class="tp-x" onclick="document.getElementById('tweaks-panel').classList.remove('open')">✕</button>
  </div>
  <div class="tw-row">
    <label class="tw-lbl">Accent Color</label>
    <div class="tw-swatches">
      <div class="tw-sw on" style="background:#d4bf8a" data-a="#d4bf8a" data-b="#e8d5a8"></div>
      <div class="tw-sw" style="background:#b8d4e8" data-a="#b8d4e8" data-b="#cce0f0"></div>
      <div class="tw-sw" style="background:#b8e8c8" data-a="#b8e8c8" data-b="#ccf0d8"></div>
      <div class="tw-sw" style="background:#e8b8d4" data-a="#e8b8d4" data-b="#f0ccde"></div>
    </div>
  </div>
  <div class="tw-row">
    <label class="tw-lbl">Hero Style</label>
    <div class="tw-opts">
      <button class="tw-opt on" data-hero="serif">Serif</button>
      <button class="tw-opt" data-hero="tight">Tight</button>
    </div>
  </div>
  <div class="tw-row">
    <label class="tw-lbl">Surface</label>
    <div class="tw-opts">
      <button class="tw-opt on" data-surf="dark">Dark</button>
      <button class="tw-opt" data-surf="deep">Deeper</button>
    </div>
  </div>
</div>


` }} />
    </>
  );
}
