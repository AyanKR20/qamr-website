"use client";

import { useEffect } from "react";

/**
 * Qamr landing — premium polish pass.
 * Refinements: deeper layered gradients, soft glows, tighter type, generous whitespace,
 * GPU-friendly hover/lift, staggered reveals, subtle hero parallax. Layout preserved.
 */
export default function QamrLanding() {
  useEffect(() => {
    // Fonts
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
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;0,900;1,500;1,700;1,800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=Inter:wght@400;500;600;700&display=swap";
    document.head.appendChild(preconnect1);
    document.head.appendChild(preconnect2);
    document.head.appendChild(fontLink);

    // Nav scroll
    const nav = document.getElementById("nav");
    const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });

    // Reveal observer with stagger via data-rv-i
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".rv").forEach((el) => obs.observe(el));

    // Hero phone tilt
    const stage = document.querySelector(".hero-phone-stage") as HTMLElement | null;
    const heroWrap = document.querySelector(".hero-phone-wrap") as HTMLElement | null;
    let raf: number | null = null;
    let target = { rx: 0, ry: 0 };
    let curr = { rx: 0, ry: 0 };
    const tick = () => {
      curr.rx += (target.rx - curr.rx) * 0.08;
      curr.ry += (target.ry - curr.ry) * 0.08;
      if (stage) stage.style.transform = `rotateX(${curr.rx}deg) rotateY(${curr.ry}deg)`;
      if (Math.abs(target.rx - curr.rx) + Math.abs(target.ry - curr.ry) > 0.01) {
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
      target.ry = cx * 8;
      target.rx = -cy * 5;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onPointerLeave = () => {
      target = { rx: 0, ry: 0 };
      if (!raf) raf = requestAnimationFrame(tick);
    };
    heroWrap?.addEventListener("pointermove", onPointerMove);
    heroWrap?.addEventListener("pointerleave", onPointerLeave);

    // Hero parallax + floating idle
    let parallaxRaf: number | null = null;
    const onScrollParallax = () => {
      if (parallaxRaf) return;
      parallaxRaf = requestAnimationFrame(() => {
        if (stage) {
          const y = Math.min(window.scrollY, 800);
          stage.style.translate = `0 ${y * 0.06}px`;
        }
        // Background orb drift
        const orb = document.querySelector(".hero-orb") as HTMLElement | null;
        if (orb) {
          const y = Math.min(window.scrollY, 1000);
          orb.style.translate = `-50% ${y * 0.12}px`;
        }
        parallaxRaf = null;
      });
    };
    window.addEventListener("scroll", onScrollParallax, { passive: true });

    // Tweaks
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
        S.accent = (sw as HTMLElement).dataset.a!;
        S.accentLt = (sw as HTMLElement).dataset.b!;
        applyTweaks(S);
      };
      sw.addEventListener("click", h);
      swatchHandlers.push([sw, h]);
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

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScrollParallax);
      window.removeEventListener("message", onMsg);
      heroWrap?.removeEventListener("pointermove", onPointerMove);
      heroWrap?.removeEventListener("pointerleave", onPointerLeave);
      obs.disconnect();
      swatchHandlers.forEach(([el, h]) => el.removeEventListener("click", h));
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
  --bg:        #06030c;
  --bg-2:      #0a0518;
  --bg-3:      #120a24;
  --fg:        #ede8df;
  --fg-dim:    #c9c2b6;
  --muted:     #6a6278;
  --muted-lt:  #8a8298;
  --accent:    #d4bf8a;
  --acc-lt:    #e8d5a8;
  --surface:   #0f0819;
  --surf-lt:   #160e22;
  --border:    rgba(212,191,138,.08);
  --bord-lt:   rgba(212,191,138,.16);
  --plum:      #2d0a3e;
  --glow:      #5a1e7a;
  --hd: 'Playfair Display', Georgia, serif;
  --bd: 'DM Sans', system-ui, sans-serif;
  --ease: cubic-bezier(.16,1,.3,1);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; overflow-x: hidden; max-width: 100vw; }

body {
  background: var(--bg);
  color: var(--fg);
  font-family: var(--bd);
  font-size: 17px;
  line-height: 1.6;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Layered global gradient — black → navy → plum */
body::before {
  content: '';
  position: fixed; inset: 0;
  pointer-events: none; z-index: 0;
  background:
    radial-gradient(ellipse 80% 50% at 50% 0%, rgba(45,10,62,.35) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 100% 30%, rgba(20,30,80,.18) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 0% 60%, rgba(60,20,90,.15) 0%, transparent 60%),
    linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 50%, var(--bg) 100%);
}

/* Grain */
body::after {
  content: '';
  position: fixed; inset: 0;
  pointer-events: none; z-index: 900;
  opacity: 0.022;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ───── REVEAL (staggered) ───── */
.rv { opacity: 0; transform: translateY(28px); transition: opacity 1s var(--ease), transform 1s var(--ease); }
.rv.in { opacity: 1; transform: none; }
.d1 { transition-delay: .10s; }
.d2 { transition-delay: .20s; }
.d3 { transition-delay: .30s; }
.d4 { transition-delay: .42s; }

/* ───── NAV ───── */
nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 800;
  padding: 22px 0;
  transition: background .5s var(--ease), border-color .5s, backdrop-filter .5s, padding .4s var(--ease);
}
nav.scrolled {
  background: rgba(8,4,15,.72);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(28px) saturate(1.2);
  -webkit-backdrop-filter: blur(28px) saturate(1.2);
  padding: 14px 0;
}
.nav-row {
  max-width: 1280px; margin: 0 auto; padding: 0 48px;
  display: flex; align-items: center; justify-content: space-between;
}
.nav-brand {
  display: flex; align-items: center; gap: 10px;
  text-decoration: none; color: var(--fg);
  transition: opacity .25s;
}
.nav-brand:hover { opacity: .85; }
.nav-brand img { width: 30px; height: 30px; border-radius: 8px; }
.nav-brand-name { font-family: 'Inter', system-ui, sans-serif; font-size: 20px; font-weight: 600; letter-spacing: -.02em; }
.nav-links { display: flex; gap: 36px; list-style: none; }
.nav-links a {
  font-size: 13px; color: var(--muted-lt); text-decoration: none; letter-spacing: .005em;
  transition: color .25s var(--ease);
  position: relative;
}
.nav-links a::after {
  content: ''; position: absolute; left: 0; right: 0; bottom: -6px; height: 1px;
  background: var(--accent); transform: scaleX(0); transform-origin: left;
  transition: transform .35s var(--ease);
}
.nav-links a:hover { color: var(--fg); }
.nav-links a:hover::after { transform: scaleX(1); }

/* ───── HERO ───── */
#hero {
  min-height: 100vh;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 160px 48px 0;
  position: relative; overflow: hidden;
  z-index: 1;
}

.hero-orb {
  position: absolute; top: -10%; left: 50%; transform: translateX(-50%);
  width: 1200px; height: 800px; border-radius: 50%;
  background:
    radial-gradient(ellipse, rgba(120,40,160,.22) 0%, rgba(45,10,62,.10) 40%, transparent 70%);
  pointer-events: none;
  filter: blur(8px);
  animation: orb 14s ease-in-out infinite;
  will-change: transform, opacity;
}
.hero-orb-warm {
  position: absolute; top: 22%; left: 50%; transform: translateX(-50%);
  width: 600px; height: 360px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(212,191,138,.08) 0%, transparent 70%);
  pointer-events: none;
  filter: blur(20px);
  animation: warmPulse 9s ease-in-out infinite;
}
@keyframes orb {
  0%,100% { opacity: .9; transform: translateX(-50%) scale(1); }
  50%     { opacity: .72; transform: translateX(-50%) scale(1.05); }
}
@keyframes warmPulse {
  0%,100% { opacity: .75; }
  50%     { opacity: 1; }
}

.hero-text {
  position: relative; z-index: 10;
  text-align: center;
  max-width: 1100px;
}

.hero-kicker {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 16px; border-radius: 100px;
  border: 1px solid rgba(212,191,138,.16);
  background: rgba(212,191,138,.04);
  backdrop-filter: blur(10px);
  font-size: 11px; letter-spacing: .18em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 36px;
  font-weight: 500;
}
.kicker-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 10px rgba(212,191,138,.7);
  animation: pulse 2.4s ease-in-out infinite;
}
@keyframes pulse { 0%,100% { opacity: .9; } 50% { opacity: .4; } }

.hero-h1 {
  font-family: var(--hd);
  font-size: clamp(60px, 8.4vw, 128px);
  font-weight: 700;
  line-height: .98;
  letter-spacing: -.04em;
  margin-bottom: 32px;
  text-wrap: balance;
  color: var(--fg);
}
.hero-h1 em {
  font-style: italic;
  font-weight: 600;
  color: var(--accent);
  background: linear-gradient(180deg, var(--acc-lt) 0%, var(--accent) 60%, #c2a86a 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-sub {
  font-size: clamp(16px, 1.5vw, 19px);
  color: var(--fg-dim);
  font-weight: 300;
  max-width: 500px;
  margin: 0 auto 56px;
  line-height: 1.65;
  text-wrap: balance;
}

.ctas {
  display: flex; align-items: center; justify-content: center;
  gap: 14px; flex-wrap: wrap;
}

/* ───── STORE BADGES ───── */
.store-badge {
  display: inline-flex; align-items: center; gap: 12px;
  padding: 12px 22px 12px 18px;
  min-width: 188px;
  border-radius: 16px;
  background: linear-gradient(180deg, #150c24 0%, #08040f 100%);
  border: 1px solid var(--bord-lt);
  color: var(--fg);
  text-decoration: none;
  position: relative;
  transition: transform .35s var(--ease), border-color .4s, box-shadow .5s;
  box-shadow:
    0 2px 0 rgba(0,0,0,.35),
    0 8px 24px rgba(0,0,0,.4),
    inset 0 1px 0 rgba(255,255,255,.05);
  overflow: hidden;
  will-change: transform;
}
.store-badge::before {
  content: '';
  position: absolute; inset: 0;
  border-radius: inherit; padding: 1px;
  background: linear-gradient(160deg, rgba(212,191,138,.5), rgba(212,191,138,.06) 40%, rgba(212,191,138,.25) 100%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  pointer-events: none; opacity: .9;
  transition: opacity .4s;
}
.store-badge::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(110deg, transparent 42%, rgba(212,191,138,.22) 50%, transparent 58%);
  transform: translateX(-130%);
  transition: transform .9s var(--ease);
  pointer-events: none;
}
.store-badge:hover {
  transform: translateY(-3px);
  border-color: rgba(212,191,138,.4);
  box-shadow:
    0 20px 50px rgba(0,0,0,.55),
    0 0 60px rgba(212,191,138,.12),
    0 0 0 1px rgba(212,191,138,.22),
    inset 0 1px 0 rgba(255,255,255,.07);
}
.store-badge:hover::before { opacity: 1; }
.store-badge:hover::after { transform: translateX(130%); }

.sb-icon {
  flex: none; width: 28px; height: 28px;
  display: flex; align-items: center; justify-content: center;
  position: relative; z-index: 1;
}
.sb-icon svg { display: block; filter: drop-shadow(0 1px 2px rgba(0,0,0,.5)); }
.sb-text { display: flex; flex-direction: column; line-height: 1.05; position: relative; z-index: 1; }
.sb-small {
  font-size: 9.5px; letter-spacing: .14em; text-transform: uppercase;
  color: rgba(212,191,138,.72); font-weight: 500; margin-bottom: 3px;
}
.sb-big { font-family: var(--bd); font-size: 17px; font-weight: 500; letter-spacing: -.01em; color: var(--fg); }

.btn-outline {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 26px; border-radius: 100px;
  border: 1px solid var(--bord-lt); color: var(--fg-dim);
  font-size: 13px; font-weight: 400; text-decoration: none;
  transition: border-color .3s, background .3s, color .3s, transform .25s var(--ease);
  background: rgba(255,255,255,.01);
  backdrop-filter: blur(6px);
}
.btn-outline:hover {
  border-color: rgba(212,191,138,.32);
  background: rgba(212,191,138,.04);
  color: var(--fg);
  transform: translateY(-2px);
}
.btn-outline svg { transition: transform .3s var(--ease); }
.btn-outline:hover svg { transform: translateX(3px); }

/* Hero phone */
.hero-phone-wrap {
  position: relative; z-index: 10;
  margin-top: 88px;
  display: flex; justify-content: center; align-items: flex-end;
  perspective: 1800px;
  width: 100%;
  max-width: 820px;
  animation: float 7s ease-in-out infinite;
  will-change: transform;
}
@keyframes float {
  0%,100% { transform: translateY(0); }
  50%     { transform: translateY(-8px); }
}

.hero-phone-stage {
  position: relative;
  width: 280px;
  display: flex; justify-content: center;
  transform-style: preserve-3d;
  transition: transform .3s var(--ease);
}

.hero-phone {
  width: 280px;
  border-radius: 48px;
  border: 1px solid var(--bord-lt);
  overflow: hidden;
  box-shadow:
    0 90px 140px rgba(0,0,0,.7),
    0 0 80px rgba(212,191,138,.08),
    0 0 0 1px rgba(212,191,138,.06),
    inset 0 1px 0 rgba(255,255,255,.06);
  position: relative; z-index: 5;
  transform: translateY(40px) scale(.96);
  opacity: 0;
  animation: heroCenterRise 1.2s var(--ease) .25s forwards;
  transition: transform .6s var(--ease);
}
.hero-phone img { width: 100%; display: block; }
@keyframes heroCenterRise { to { transform: translateY(0) scale(1); opacity: 1; } }

.hero-phone-side {
  position: absolute; bottom: 0; left: 50%;
  width: 230px;
  border-radius: 42px;
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

.hero-phone-l { transform: translateX(-50%) translateZ(-1px) scale(.82); animation: revealLeft 1.5s cubic-bezier(.22,1.15,.36,1) 1.0s forwards; }
.hero-phone-r { transform: translateX(-50%) translateZ(-1px) scale(.82); animation: revealRight 1.5s cubic-bezier(.22,1.15,.36,1) 1.0s forwards; }

@keyframes revealLeft {
  0%   { transform: translateX(-50%) translateZ(-1px) rotate(0deg) scale(.82); opacity: 0; filter: blur(6px) brightness(.5); }
  40%  { opacity: .9; filter: blur(2px) brightness(.7); }
  100% { transform: translateX(calc(-50% - 200px)) translateZ(-80px) rotate(-12deg) scale(.92); opacity: .85; filter: blur(.5px) brightness(.82); }
}
@keyframes revealRight {
  0%   { transform: translateX(-50%) translateZ(-1px) rotate(0deg) scale(.82); opacity: 0; filter: blur(6px) brightness(.5); }
  40%  { opacity: .9; filter: blur(2px) brightness(.7); }
  100% { transform: translateX(calc(-50% + 200px)) translateZ(-80px) rotate(12deg) scale(.92); opacity: .85; filter: blur(.5px) brightness(.82); }
}

.hero-phone-wrap:hover .hero-phone { transform: translateY(-8px) scale(1.02); }
.hero-phone-wrap:hover .hero-phone-l {
  transform: translateX(calc(-50% - 240px)) translateZ(-60px) rotate(-14deg) scale(.96);
  opacity: 1; filter: blur(0) brightness(.95);
  transition: transform .8s var(--ease), opacity .5s, filter .5s;
}
.hero-phone-wrap:hover .hero-phone-r {
  transform: translateX(calc(-50% + 240px)) translateZ(-60px) rotate(14deg) scale(.96);
  opacity: 1; filter: blur(0) brightness(.95);
  transition: transform .8s var(--ease), opacity .5s, filter .5s;
}
.hero-phone-l, .hero-phone-r { transition: transform .8s var(--ease), opacity .5s, filter .5s; }

.hero-phone-wrap::before {
  content: '';
  position: absolute; bottom: 30px; left: 50%;
  width: 800px; height: 260px;
  transform: translateX(-50%);
  background: radial-gradient(ellipse, rgba(212,191,138,.14) 0%, rgba(90,30,122,.10) 40%, transparent 70%);
  filter: blur(50px);
  opacity: 0;
  animation: padGlow 1.8s ease-out 1.2s forwards;
  pointer-events: none;
  z-index: 0;
}
@keyframes padGlow { to { opacity: 1; } }

.hero-floor-grad {
  position: absolute; bottom: 0; left: 0; right: 0;
  height: 240px;
  background: linear-gradient(to top, var(--bg) 0%, transparent 100%);
  pointer-events: none; z-index: 20;
}

/* ───── MARQUEE ───── */
.marquee-section {
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 20px 0;
  overflow: hidden;
  position: relative;
  background: rgba(8,4,15,.4);
  z-index: 1;
}
.marquee-track {
  display: flex; animation: marquee 36s linear infinite;
  width: max-content;
}
.marquee-track:hover { animation-play-state: paused; }
.marquee-item {
  padding: 0 48px;
  font-size: 12px; letter-spacing: .22em; text-transform: uppercase;
  color: var(--muted); white-space: nowrap;
  display: flex; align-items: center; gap: 16px;
  font-weight: 500;
}
.marquee-item::after {
  content: ''; width: 3px; height: 3px; border-radius: 50%;
  background: var(--accent); opacity: .4; display: inline-block;
}
@keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

/* ───── CONTRAST ───── */
#contrast { padding: 160px 0 120px; position: relative; z-index: 1; }
.section-eye {
  font-size: 11px; letter-spacing: .22em; text-transform: uppercase;
  color: var(--accent); font-weight: 500; margin-bottom: 22px;
  display: flex; align-items: center; gap: 12px;
}
.section-eye::before {
  content: ''; flex: none;
  width: 28px; height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent));
  opacity: .7;
}

.contrast-header {
  max-width: 1280px; margin: 0 auto 80px; padding: 0 48px;
}
.contrast-header h2 {
  font-family: var(--hd);
  font-size: clamp(42px, 5.8vw, 84px);
  font-weight: 700; letter-spacing: -.035em; line-height: 1.02;
  text-wrap: balance;
}
.contrast-header h2 em { font-style: italic; color: var(--accent); font-weight: 600; }
.contrast-header h2 span { color: var(--muted); font-weight: 600; font-style: italic; }

.split {
  display: grid; grid-template-columns: 1fr 1fr;
  max-width: 1280px; margin: 0 auto; padding: 0 48px;
  gap: 4px;
  border-radius: 24px; overflow: hidden;
}
.split-side {
  padding: 44px 36px;
  display: flex; flex-direction: column; gap: 14px;
  border-radius: 22px;
}
.split-label {
  font-size: 10px; letter-spacing: .22em; text-transform: uppercase;
  font-weight: 500; padding-bottom: 16px; margin-bottom: 4px;
  border-bottom: 1px solid rgba(255,255,255,.05);
  display: flex; justify-content: space-between; align-items: center;
}

.s-chaos { background: linear-gradient(180deg, #0b0813 0%, #08060e 100%); }
.s-chaos .split-label { color: #45404e; }

.chaos-post {
  padding: 14px; border-radius: 12px;
  background: rgba(255,255,255,.018);
  border: 1px solid rgba(255,255,255,.035);
  position: relative;
}
.chaos-badge { font-size: 8px; padding: 2px 7px; border-radius: 4px; letter-spacing: .06em; text-transform: uppercase; display: inline-flex; margin-bottom: 8px; }
.badge-ad, .badge-ai, .badge-spam { background: rgba(255,255,255,.04); color: rgba(255,255,255,.25); }
.chaos-lines { display: flex; flex-direction: column; gap: 5px; }
.chaos-line { height: 5px; border-radius: 3px; background: rgba(255,255,255,.04); }
.chaos-avrow { display: flex; gap: 7px; align-items: center; margin-bottom: 7px; }
.chaos-av { width: 20px; height: 20px; border-radius: 50%; background: rgba(255,255,255,.05); }
.chaos-nm { font-size: 9px; color: rgba(255,255,255,.18); font-weight: 500; }

.s-clean {
  background:
    radial-gradient(ellipse at top right, rgba(212,191,138,.04), transparent 60%),
    linear-gradient(180deg, var(--surface) 0%, var(--surf-lt) 100%);
}
.s-clean .split-label { color: var(--accent); }

.clean-post {
  padding: 18px; border-radius: 14px;
  background: rgba(255,255,255,.025);
  border: 1px solid var(--border);
  transition: border-color .35s var(--ease), background .35s var(--ease), transform .35s var(--ease);
}
.clean-post:hover {
  border-color: rgba(212,191,138,.18);
  background: rgba(212,191,138,.025);
  transform: translateY(-2px);
}
.cprow { display: flex; gap: 10px; align-items: center; margin-bottom: 10px; }
.cpav { width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0; border: 1px solid rgba(212,191,138,.15); }
.cpav.a1 { background: linear-gradient(135deg, #5a1e7a, #2d0a3e); }
.cpav.a2 { background: linear-gradient(135deg, #1a4a8a, #0f2a5c); }
.cpav.a3 { background: linear-gradient(135deg, #3d7a3a, #1f4a1d); }
.cpname { font-size: 11.5px; font-weight: 500; color: var(--fg); opacity: .9; }
.cphandle { font-size: 9px; color: var(--muted); }
.cp-check { margin-left: auto; width: 14px; height: 14px; border-radius: 50%; background: rgba(212,191,138,.12); display: flex; align-items: center; justify-content: center; }
.cp-check::before { content: ''; width: 5px; height: 3px; border-left: 1.2px solid var(--accent); border-bottom: 1.2px solid var(--accent); transform: rotate(-45deg) translate(0.5px, -0.5px); }
.cptext { font-size: 12px; color: rgba(240,235,224,.65); line-height: 1.65; margin-bottom: 12px; }
.cpactions { display: flex; gap: 14px; }
.cpa { font-size: 9.5px; color: var(--muted); display: flex; align-items: center; gap: 4px; }

/* ───── SHOWCASE ───── */
#showcase { padding: 140px 0; position: relative; z-index: 1; }

.showcase-hd { max-width: 1280px; margin: 0 auto 110px; padding: 0 48px; }
.showcase-hd h2 {
  font-family: var(--hd);
  font-size: clamp(42px, 5.8vw, 80px);
  font-weight: 700; letter-spacing: -.035em; line-height: 1.02;
  text-wrap: balance;
}
.showcase-hd h2 em { font-style: italic; color: var(--accent); font-weight: 600; }

.feature {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 4px; align-items: stretch;
  max-width: 1280px; margin: 0 auto 8px; padding: 0 48px;
}
.feature.rev { direction: rtl; }
.feature.rev > * { direction: ltr; }

.feat-text {
  padding: 88px 64px;
  display: flex; flex-direction: column; justify-content: center;
  background:
    radial-gradient(ellipse at top right, rgba(212,191,138,.025), transparent 60%),
    linear-gradient(180deg, var(--surface) 0%, var(--surf-lt) 100%);
  border-radius: 24px 8px 8px 24px;
}
.feature.rev .feat-text { border-radius: 8px 24px 24px 8px; }

.feat-eyebrow {
  font-size: 10px; letter-spacing: .25em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 22px; font-weight: 500;
  display: flex; align-items: center; gap: 12px;
}
.feat-eyebrow::before {
  content: ''; width: 24px; height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent)); opacity: .6;
}

.feat-h3 {
  font-family: var(--hd);
  font-size: clamp(36px, 3.8vw, 58px);
  font-weight: 700; letter-spacing: -.03em; line-height: 1.04;
  margin-bottom: 24px;
  text-wrap: balance;
}
.feat-h3 em { font-style: italic; color: var(--accent); font-weight: 600; }

.feat-desc {
  font-size: 15.5px; color: var(--muted-lt); font-weight: 300;
  line-height: 1.75; max-width: 400px; margin-bottom: 36px;
}

.feat-pill {
  display: inline-flex; align-items: center; gap: 9px;
  padding: 8px 18px; border-radius: 100px;
  border: 1px solid var(--border);
  background: rgba(212,191,138,.025);
  font-size: 11.5px; color: var(--muted-lt); font-weight: 400;
  width: fit-content;
}
.pill-live {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--accent); opacity: .7;
  box-shadow: 0 0 6px rgba(212,191,138,.5);
  animation: pulse 2.4s ease-in-out infinite;
}

.feat-visual {
  border-radius: 8px 24px 24px 8px;
  background:
    radial-gradient(ellipse at center, rgba(212,191,138,.025), transparent 70%),
    linear-gradient(180deg, var(--surf-lt) 0%, #100823 100%);
  overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  padding: 60px 40px;
  position: relative;
  min-height: 560px;
  perspective: 1600px;
}
.feature.rev .feat-visual { border-radius: 24px 8px 8px 24px; }

.feat-glow {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
  width: 320px; height: 360px; border-radius: 50%;
  pointer-events: none;
  filter: blur(20px);
}

.feat-phone {
  width: 224px;
  border-radius: 40px;
  border: 1px solid var(--bord-lt);
  overflow: hidden;
  box-shadow:
    0 60px 100px rgba(0,0,0,.65),
    0 0 60px rgba(212,191,138,.06),
    0 0 0 1px rgba(212,191,138,.06),
    inset 0 1px 0 rgba(255,255,255,.05);
  position: relative; z-index: 2;
  transition: transform .7s var(--ease), box-shadow .6s var(--ease);
  transform-style: preserve-3d;
  will-change: transform;
}
.feat-phone:hover {
  transform: translateY(-10px) scale(1.03);
  box-shadow:
    0 80px 140px rgba(0,0,0,.75),
    0 0 100px rgba(212,191,138,.16),
    0 0 0 1px rgba(212,191,138,.18),
    inset 0 1px 0 rgba(255,255,255,.06);
}
.feat-phone img { width: 100%; display: block; }

/* Floating stat card */
.feat-float {
  position: absolute;
  padding: 16px 20px;
  border-radius: 16px;
  background: rgba(12,7,22,.86);
  border: 1px solid var(--bord-lt);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  box-shadow: 0 24px 60px rgba(0,0,0,.5), 0 0 0 1px rgba(212,191,138,.05);
  z-index: 10;
  animation: floatCard 6s ease-in-out infinite;
}
@keyframes floatCard { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
.feat-float.tr { top: 64px; right: 24px; }
.feat-float.bl { bottom: 64px; left: 24px; animation-delay: 1.5s; }
.ff-label { font-size: 9.5px; color: var(--muted); letter-spacing: .12em; text-transform: uppercase; margin-bottom: 6px; font-weight: 500; }
.ff-val { font-family: var(--hd); font-size: 24px; font-weight: 700; color: var(--fg); letter-spacing: -.03em; line-height: 1; }
.ff-sub { font-size: 9.5px; color: var(--muted); margin-top: 4px; }

/* ───── TRUST ───── */
#trust { padding: 140px 0; border-top: 1px solid var(--border); position: relative; z-index: 1; }
.trust-container { max-width: 1280px; margin: 0 auto; padding: 0 48px; }
.trust-top { margin-bottom: 88px; }
.trust-top h2 {
  font-family: var(--hd);
  font-size: clamp(42px, 5.8vw, 80px);
  font-weight: 700; letter-spacing: -.035em; line-height: 1.02;
  max-width: 640px;
  text-wrap: balance;
}
.trust-top h2 em { font-style: italic; color: var(--accent); font-weight: 600; }

.trust-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px;
}
.trust-cell {
  padding: 44px 36px;
  background:
    radial-gradient(ellipse at top right, rgba(212,191,138,.022), transparent 60%),
    linear-gradient(180deg, var(--surface) 0%, var(--surf-lt) 100%);
  border-radius: 6px;
  transition: background .35s var(--ease), transform .35s var(--ease);
}
.trust-cell:first-child { border-radius: 24px 6px 6px 24px; }
.trust-cell:last-child { border-radius: 6px 24px 24px 6px; }
.trust-cell:hover {
  transform: translateY(-3px);
  background:
    radial-gradient(ellipse at top right, rgba(212,191,138,.06), transparent 60%),
    linear-gradient(180deg, var(--surf-lt) 0%, #1a1130 100%);
}

.tc-icon {
  width: 40px; height: 40px;
  border: 1px solid var(--border); border-radius: 11px;
  display: flex; align-items: center; justify-content: center;
  color: var(--accent); margin-bottom: 24px;
  background: rgba(212,191,138,.03);
  transition: border-color .35s, background .35s, transform .35s var(--ease);
}
.trust-cell:hover .tc-icon {
  border-color: rgba(212,191,138,.32);
  background: rgba(212,191,138,.08);
  transform: scale(1.05);
}
.tc-title { font-family: var(--hd); font-size: 19px; font-weight: 700; margin-bottom: 10px; letter-spacing: -.02em; }
.tc-desc { font-size: 13.5px; color: var(--muted-lt); line-height: 1.7; font-weight: 300; }

/* ───── CTA ───── */
#cta { padding: 200px 48px; text-align: center; position: relative; overflow: hidden; z-index: 1; }
.cta-orb {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
  width: 900px; height: 560px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(120,40,160,.18) 0%, transparent 70%);
  pointer-events: none;
  filter: blur(20px);
  animation: orb 14s ease-in-out infinite;
}
.cta-warm {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
  width: 460px; height: 240px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(212,191,138,.08) 0%, transparent 70%);
  pointer-events: none; filter: blur(16px);
}
.cta-inner { position: relative; z-index: 10; max-width: 920px; margin: 0 auto; }
.cta-h2 {
  font-family: var(--hd);
  font-size: clamp(54px, 7.8vw, 116px);
  font-weight: 700; letter-spacing: -.04em; line-height: 1;
  margin-bottom: 30px;
  text-wrap: balance;
}
.cta-h2 em {
  font-style: italic; font-weight: 600; color: var(--accent);
  background: linear-gradient(180deg, var(--acc-lt) 0%, var(--accent) 60%, #c2a86a 100%);
  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
}
.cta-sub { font-size: 17px; color: var(--fg-dim); font-weight: 300; margin-bottom: 56px; line-height: 1.65; text-wrap: balance; }
.cta-note { margin-top: 28px; font-size: 11px; color: rgba(106,98,120,.55); letter-spacing: .1em; }

/* ───── FOOTER ───── */
footer { padding: 48px; border-top: 1px solid var(--border); position: relative; z-index: 1; }
.foot-row {
  max-width: 1280px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px;
}
.foot-brand { display: flex; align-items: center; gap: 9px; text-decoration: none; }
.foot-brand img { width: 24px; height: 24px; border-radius: 6px; }
.foot-brand span { font-family: 'Inter', system-ui, sans-serif; font-size: 15px; font-weight: 600; color: rgba(237,232,223,.5); letter-spacing: -.02em; }
.foot-links { display: flex; gap: 24px; flex-wrap: wrap; }
.foot-links a { font-size: 12px; color: rgba(106,98,120,.55); text-decoration: none; transition: color .25s; }
.foot-links a:hover { color: var(--fg-dim); }
.foot-copy { font-size: 11px; color: rgba(106,98,120,.45); }

/* ───── TWEAKS PANEL ───── */
#tweaks-panel {
  display: none; position: fixed; bottom: 24px; right: 24px; z-index: 850;
  width: 270px;
  background: rgba(15,8,25,.92); border: 1px solid var(--bord-lt);
  border-radius: 18px; padding: 20px;
  backdrop-filter: blur(28px);
  box-shadow: 0 30px 70px rgba(0,0,0,.55);
}
#tweaks-panel.open { display: block; }
.tp-title {
  font-family: var(--hd); font-size: 14px; font-weight: 700;
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
.tw-lbl { font-size: 10px; color: var(--muted); margin-bottom: 8px; display: block; letter-spacing: .08em; text-transform: uppercase; }
.tw-swatches { display: flex; gap: 8px; }
.tw-sw {
  width: 26px; height: 26px; border-radius: 50%;
  border: 2px solid transparent; cursor: pointer;
  transition: transform .2s var(--ease), border-color .25s;
}
.tw-sw:hover { transform: scale(1.08); border-color: rgba(237,232,223,.3); }
.tw-sw.on { border-color: rgba(237,232,223,.7); }
.tw-opts { display: flex; gap: 6px; }
.tw-opt {
  flex: 1; height: 30px; border-radius: 8px;
  background: rgba(255,255,255,.04); border: 1px solid var(--border);
  color: var(--muted); font-size: 11px; cursor: pointer; transition: all .25s var(--ease);
}
.tw-opt.on { background: rgba(212,191,138,.1); border-color: rgba(212,191,138,.3); color: var(--accent); }

/* ───── RESPONSIVE ───── */
img, svg, video { max-width: 100%; height: auto; }

@media (max-width: 1024px) {
  .nav-row { padding: 0 28px; }
  #hero { padding: 140px 28px 0; }
  .contrast-header, .showcase-hd { padding: 0 28px; }
  .feature { padding: 0 28px; }
  .split { padding: 0 28px; }
  .trust-container { padding: 0 28px; }
  footer { padding: 40px 28px; }
}

@media (max-width: 900px) {
  body { font-size: 16px; }
  .nav-links { display: none; }
  nav { padding: 16px 0; }
  nav.scrolled { padding: 12px 0; }
  .nav-row { padding: 0 20px; }

  #hero { padding: 110px 20px 0; min-height: auto; }
  .hero-orb { width: 700px; height: 500px; }
  .hero-orb-warm { width: 360px; height: 220px; }
  .hero-kicker { margin-bottom: 24px; font-size: 10px; padding: 5px 14px; }
  .hero-h1 { font-size: clamp(40px, 9vw, 64px); margin-bottom: 22px; line-height: 1.02; }
  .hero-sub { font-size: 15px; margin: 0 auto 36px; max-width: 90%; }
  .ctas { gap: 10px; width: 100%; }
  .store-badge { min-width: 0; flex: 1 1 calc(50% - 6px); padding: 11px 16px 11px 14px; }
  .sb-big { font-size: 15px; }
  .sb-small { font-size: 9px; }
  .btn-outline { flex: 1 1 100%; justify-content: center; padding: 12px 22px; }

  .hero-phone-side { display: none; }
  .hero-phone-wrap { margin-top: 56px; max-width: 100%; }
  .hero-phone-stage { width: 220px; }
  .hero-phone { width: 220px; border-radius: 38px; }
  .hero-phone-wrap::before { width: 110%; height: 200px; bottom: 20px; }
  .hero-floor-grad { height: 160px; }

  .marquee-section { padding: 14px 0; }
  .marquee-item { padding: 0 28px; font-size: 11px; }

  #contrast { padding: 100px 0 80px; }
  .contrast-header { padding: 0 20px; margin-bottom: 48px; }
  .contrast-header h2 { font-size: clamp(32px, 7vw, 48px); }
  .split { grid-template-columns: 1fr; padding: 0 20px; gap: 4px; }
  .split-side { padding: 28px 22px; border-radius: 18px; }

  #showcase { padding: 90px 0; }
  .showcase-hd { padding: 0 20px; margin-bottom: 64px; }
  .showcase-hd h2 { font-size: clamp(32px, 7vw, 48px); }
  .feature { grid-template-columns: 1fr; padding: 0 20px; gap: 4px; margin-bottom: 4px; }
  .feature.rev { direction: ltr; }
  .feat-text { border-radius: 20px 20px 6px 6px !important; padding: 44px 28px; }
  .feat-visual { border-radius: 6px 6px 20px 20px !important; min-height: 360px; padding: 36px 20px; }
  .feat-h3 { font-size: clamp(28px, 6vw, 40px); }
  .feat-desc { font-size: 14.5px; max-width: 100%; margin-bottom: 28px; }
  .feat-phone { width: 200px; border-radius: 36px; }
  .feat-float { display: none; }

  /* World section dual-phone block — stack & shrink */
  #showcase > .rv > div[style*="grid-template-columns:1fr 1fr"] {
    grid-template-columns: 1fr !important;
  }
  #showcase > .rv {
    padding: 0 20px !important;
  }
  #showcase > .rv > div > div:first-child {
    border-radius: 20px 20px 6px 6px !important;
    padding: 44px 28px !important;
  }
  #showcase > .rv > div > div:last-child {
    border-radius: 6px 6px 20px 20px !important;
    padding: 36px 20px !important;
    min-height: 380px !important;
    gap: 14px !important;
  }
  #showcase > .rv > div > div:last-child > div[style*="width:172px"] {
    width: 140px !important;
    border-radius: 28px !important;
  }

  #trust { padding: 90px 0; }
  .trust-top { margin-bottom: 56px; }
  .trust-top h2 { font-size: clamp(32px, 7vw, 48px); }
  .trust-grid { grid-template-columns: 1fr 1fr; gap: 4px; }
  .trust-cell { padding: 32px 24px; border-radius: 14px !important; }

  /* Muslim section */
  #for-muslims { padding: 90px 0 !important; }
  #for-muslims > div { padding: 0 20px !important; }
  #for-muslims > div > div:first-child { margin-bottom: 56px !important; }
  #for-muslims > div > div:first-child h2 { font-size: clamp(32px, 7vw, 48px) !important; }
  #for-muslims > div > div[style*="repeat(3,1fr)"] {
    grid-template-columns: 1fr !important; gap: 4px;
  }
  #for-muslims > div > div[style*="repeat(3,1fr)"] > div {
    border-radius: 14px !important;
    min-height: auto !important;
  }
  #for-muslims > div > div[style*="repeat(3,1fr)"] > div > div:last-child { padding: 36px 28px !important; }
  #for-muslims > div > div[style*="grid-template-columns:1fr 1fr"] {
    grid-template-columns: 1fr !important; gap: 4px;
  }
  #for-muslims > div > div[style*="grid-template-columns:1fr 1fr"] > div {
    border-radius: 14px !important;
    padding: 36px 28px !important;
  }
  #for-muslims > div > div[style*="grid-template-columns:1fr 1fr"] > div:first-child {
    flex-wrap: wrap; gap: 22px !important;
  }

  #cta { padding: 100px 20px; }
  .cta-orb { width: 100%; max-width: 600px; height: 380px; }
  .cta-h2 { font-size: clamp(40px, 9vw, 64px); margin-bottom: 22px; }
  .cta-sub { font-size: 15px; margin-bottom: 36px; }

  footer { padding: 32px 20px; }
  .foot-row { flex-direction: column; align-items: flex-start; gap: 16px; }
  .foot-links { gap: 18px; }

  #tweaks-panel { right: 16px; bottom: 16px; left: 16px; width: auto; }
}

@media (max-width: 480px) {
  body { font-size: 15px; }
  .nav-row { padding: 0 16px; }
  .nav-brand img { width: 26px; height: 26px; }
  .nav-brand-name { font-size: 18px; }

  #hero { padding: 96px 16px 0; }
  .hero-h1 { font-size: clamp(36px, 10vw, 52px); letter-spacing: -.03em; }
  .hero-sub { font-size: 14.5px; max-width: 100%; line-height: 1.6; }
  .ctas { flex-direction: column; gap: 10px; }
  .store-badge { width: 100%; flex: 0 0 auto; justify-content: center; padding: 13px 20px; }
  .btn-outline { width: 100%; flex: 0 0 auto; }

  .hero-phone-wrap { margin-top: 44px; }
  .hero-phone-stage, .hero-phone { width: min(82vw, 240px); }

  .marquee-item { padding: 0 22px; font-size: 10.5px; letter-spacing: .18em; }

  #contrast { padding: 72px 0 56px; }
  .contrast-header { padding: 0 16px; margin-bottom: 36px; }
  .contrast-header h2 { font-size: clamp(28px, 8vw, 38px); }
  .section-eye { font-size: 10px; margin-bottom: 16px; }
  .split { padding: 0 16px; }
  .split-side { padding: 22px 18px; }
  .clean-post, .chaos-post { padding: 14px; }
  .cptext { font-size: 12px; }

  #showcase { padding: 72px 0; }
  .showcase-hd { padding: 0 16px; margin-bottom: 48px; }
  .showcase-hd h2 { font-size: clamp(28px, 8vw, 38px); }
  .feature { padding: 0 16px; }
  .feat-text { padding: 36px 22px; }
  .feat-visual { padding: 32px 18px; min-height: 320px; }
  .feat-h3 { font-size: clamp(26px, 7vw, 34px); }
  .feat-desc { font-size: 14px; line-height: 1.7; margin-bottom: 22px; }
  .feat-pill { font-size: 11px; padding: 7px 14px; }
  .feat-phone { width: 180px; border-radius: 32px; }

  #showcase > .rv { padding: 0 16px !important; }
  #showcase > .rv > div > div:first-child { padding: 36px 22px !important; }
  #showcase > .rv > div > div:last-child {
    padding: 32px 18px !important;
    min-height: 340px !important;
    gap: 10px !important;
  }
  #showcase > .rv > div > div:last-child > div[style*="width"] {
    width: 128px !important;
    border-radius: 26px !important;
  }

  #trust { padding: 72px 0; }
  .trust-container { padding: 0 16px; }
  .trust-top { margin-bottom: 40px; }
  .trust-top h2 { font-size: clamp(28px, 8vw, 38px); }
  .trust-grid { grid-template-columns: 1fr; gap: 4px; }
  .trust-cell { padding: 28px 22px; border-radius: 14px !important; }
  .tc-title { font-size: 17px; }
  .tc-desc { font-size: 13px; }

  #for-muslims { padding: 72px 0 !important; }
  #for-muslims > div { padding: 0 16px !important; }
  #for-muslims > div > div:first-child h2 { font-size: clamp(28px, 8vw, 38px) !important; }
  #for-muslims > div > div:first-child p { font-size: 15px !important; }
  #for-muslims > div > div[style*="repeat(3,1fr)"] > div > div:last-child { padding: 30px 22px !important; }
  #for-muslims > div > div[style*="grid-template-columns:1fr 1fr"] > div { padding: 30px 22px !important; }

  #cta { padding: 80px 16px; }
  .cta-h2 { font-size: clamp(34px, 10vw, 50px); }
  .cta-sub { font-size: 14.5px; }
  .cta-note { font-size: 10px; }

  footer { padding: 28px 16px; }
  .foot-links { flex-wrap: wrap; gap: 14px; }
  .foot-copy { font-size: 10.5px; }
}

@media (max-width: 360px) {
  .hero-h1 { font-size: 34px; }
  .cta-h2 { font-size: 34px; }
  .contrast-header h2, .showcase-hd h2, .trust-top h2 { font-size: 26px; }
  .feat-h3 { font-size: 24px; }
  .hero-phone-stage, .hero-phone { width: min(78vw, 220px); }
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
      <a href="https://apps.apple.com/pk/app/qamr/id6764144560" class="store-badge" aria-label="Download on the App Store">
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

  <div class="hero-phone-wrap rv d4">
    <div class="hero-phone-stage">
      <div class="hero-phone-side hero-phone-l">
        <img src="ios/dms ios.png" alt="" />
      </div>
      <div class="hero-phone-side hero-phone-r">
        <img src="ios/qamrhub_ios.png" alt="" />
      </div>
      <div class="hero-phone">
        <img src="ios/feedtab_ios.png" alt="Qamr Feed" />
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

  <div class="feature rv">
    <div class="feat-text">
      <p class="feat-eyebrow">Feed</p>
      <h3 class="feat-h3">Your people.<br/><em>Nothing else.</em></h3>
      <p class="feat-desc">A clean, human feed. No AI-generated media, no fake engagement. Real posts from real people, surfaced without manipulation or slop.</p>
      <div class="feat-pill">
        <span class="pill-live"></span>
        Zero AI-generated media
      </div>
    </div>
    <div class="feat-visual">
      <div class="feat-glow" style="background:radial-gradient(ellipse,rgba(120,40,160,.3) 0%,transparent 70%)"></div>
      <div class="feat-phone">
        <img src="ios/feedtab_ios.png" alt="Feed" />
      </div>
      <div class="feat-float tr">
        <div class="ff-label">AI Media</div>
        <div class="ff-val">Blocked</div>
        <div class="ff-sub">Humans only</div>
      </div>
    </div>
  </div>

  <div class="feature rev rv">
    <div class="feat-text">
      <p class="feat-eyebrow">Pulse</p>
      <h3 class="feat-h3">High signal.<br/><em>Zero noise.</em></h3>
      <p class="feat-desc">Verified, high-impact news, curated by community signal instead of engagement bait. Know what actually matters, every single day.</p>
      <div class="feat-pill">
        <span class="pill-live"></span>
        Updated continuously
      </div>
    </div>
    <div class="feat-visual">
      <div class="feat-glow" style="background:radial-gradient(ellipse,rgba(80,50,170,.25) 0%,transparent 70%)"></div>
      <div class="feat-phone">
        <img src="ios/qamrpulse_ios.png" alt="Pulse" />
      </div>
    </div>
  </div>

  <div class="rv" style="max-width:1280px;margin:8px auto;padding:0 48px;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;border-radius:24px;overflow:hidden;">
      <div style="background:radial-gradient(ellipse at top right,rgba(212,191,138,.025),transparent 60%),linear-gradient(180deg,var(--surface) 0%,var(--surf-lt) 100%);padding:88px 64px;display:flex;flex-direction:column;justify-content:center;border-radius:24px 8px 8px 24px;">
        <p class="feat-eyebrow">Qamr World</p>
        <h3 class="feat-h3">Your Ummah,<br/><em>everywhere.</em></h3>
        <p class="feat-desc">Explore Muslim communities across the globe. Ask questions, offer help, and discuss what matters at the country level, with people who actually live it.</p>
        <div class="feat-pill" style="margin-top:36px;">
          <span class="pill-live"></span>
          Forum-style · Country communities
        </div>
      </div>

      <div style="background:radial-gradient(ellipse at center,rgba(212,191,138,.025),transparent 70%),linear-gradient(180deg,var(--surf-lt) 0%,#100823 100%);padding:60px 40px;display:flex;align-items:center;justify-content:center;gap:18px;position:relative;min-height:560px;border-radius:8px 24px 24px 8px;">
        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:340px;height:340px;border-radius:50%;background:radial-gradient(ellipse,rgba(120,40,160,.22) 0%,transparent 70%);pointer-events:none;filter:blur(20px);"></div>

        <div style="width:172px;border-radius:34px;border:1px solid var(--bord-lt);overflow:hidden;box-shadow:0 50px 90px rgba(0,0,0,.55),0 0 60px rgba(212,191,138,.06),0 0 0 1px rgba(212,191,138,.05);transform:translateY(-8px);transition:transform .7s cubic-bezier(.16,1,.3,1);z-index:2;position:relative;" onmouseover="this.style.transform='translateY(-16px)'" onmouseout="this.style.transform='translateY(-8px)'">
          <img src="ios/qamrworld_ios.png" style="width:100%;display:block;" alt="Qamr World map" />
        </div>

        <div style="width:172px;border-radius:34px;border:1px solid var(--bord-lt);overflow:hidden;box-shadow:0 50px 90px rgba(0,0,0,.55),0 0 60px rgba(212,191,138,.06),0 0 0 1px rgba(212,191,138,.05);transform:translateY(8px);transition:transform .7s cubic-bezier(.16,1,.3,1);z-index:2;position:relative;" onmouseover="this.style.transform='translateY(0)'" onmouseout="this.style.transform='translateY(8px)'">
          <img src="ios/countryforum_ios.png" style="width:100%;display:block;" alt="Country community" />
        </div>
      </div>
    </div>
  </div>

  <div class="feature rv">
    <div class="feat-text">
      <p class="feat-eyebrow">Hub</p>
      <h3 class="feat-h3">Everything<br/><em>you need.</em></h3>
      <p class="feat-desc">Quran. Hadith. Prayer times. Qibla. Global Muslim communities. All in one place, built with the care it deserves.</p>
      <div class="feat-pill">
        <span class="pill-live"></span>
        Qamr Hub, your companion
      </div>
    </div>
    <div class="feat-visual">
      <div class="feat-glow" style="background:radial-gradient(ellipse,rgba(212,191,138,.12) 0%,transparent 70%)"></div>
      <div class="feat-phone">
        <img src="ios/qamrhub_ios.png" alt="Hub" />
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
        <div class="tc-desc">Country rooms, forum-style discussion, and global Muslim communities. All human, all signal.</div>
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
<section id="for-muslims" style="padding:140px 0;border-top:1px solid var(--border);position:relative;overflow:hidden;z-index:1;">
  <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:760px;height:440px;border-radius:50%;background:radial-gradient(ellipse,rgba(212,191,138,.08) 0%,transparent 70%);pointer-events:none;filter:blur(20px);"></div>

  <div style="max-width:1280px;margin:0 auto;padding:0 48px;position:relative;z-index:10;">
    <div class="rv" style="margin-bottom:88px;">
      <div class="section-eye">Qamr Hub</div>
      <h2 style="font-family:var(--hd);font-size:clamp(42px,5.8vw,80px);font-weight:700;letter-spacing:-.035em;line-height:1.02;max-width:720px;text-wrap:balance;">
        Built for the<br/><em style="font-style:italic;color:var(--accent);font-weight:600;">global Muslim.</em>
      </h2>
      <p style="margin-top:22px;font-size:17px;color:var(--fg-dim);font-weight:300;max-width:540px;line-height:1.7;">
        Qamr is a premium social platform for everyone, and inside it lives everything a Muslim needs for daily life, all in one place.
      </p>
    </div>

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;" class="rv d1">
      <div style="grid-column:span 1;background:radial-gradient(ellipse at top right,rgba(212,191,138,.03),transparent 60%),linear-gradient(180deg,var(--surface) 0%,var(--surf-lt) 100%);border-radius:24px 6px 6px 24px;display:flex;flex-direction:column;overflow:hidden;position:relative;min-height:300px;">
        <div style="position:absolute;inset:0;pointer-events:none;overflow:hidden;">
          <svg viewBox='0 0 400 200' xmlns='http://www.w3.org/2000/svg' style='position:absolute;bottom:-10px;right:-10px;width:75%;opacity:.07;'><text x='50%' y='70%' text-anchor='middle' font-size='96' fill='#d4bf8a' font-family='serif' dominant-baseline='middle'>﷽</text></svg>
        </div>
        <div style="position:relative;z-index:2;padding:52px 40px;display:flex;flex-direction:column;gap:14px;flex:1;">
          <div style="font-family:var(--hd);font-size:23px;font-weight:700;letter-spacing:-.02em;">Quran</div>
          <div style="font-size:14px;color:var(--muted-lt);font-weight:300;line-height:1.7;">Full text with audio recitation, translation, and personal bookmarks. Always with you.</div>
        </div>
      </div>

      <div style="background:radial-gradient(ellipse at top right,rgba(212,191,138,.03),transparent 60%),linear-gradient(180deg,var(--surface) 0%,var(--surf-lt) 100%);display:flex;flex-direction:column;overflow:hidden;position:relative;min-height:300px;border-radius:6px;">
        <div style="position:absolute;inset:0;pointer-events:none;overflow:hidden;">
          <svg viewBox='0 0 100 100' style='position:absolute;top:-10px;right:-10px;width:180px;height:180px;opacity:.05;'><polygon points='50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35' fill='#d4bf8a'/></svg>
          <svg viewBox='0 0 400 120' style='position:absolute;bottom:10px;right:0;width:70%;opacity:.06;'><text x='50%' y='80%' text-anchor='middle' font-size='52' fill='#d4bf8a' font-family='serif' dominant-baseline='middle'>حديث</text></svg>
        </div>
        <div style="position:relative;z-index:2;padding:52px 40px;display:flex;flex-direction:column;gap:14px;flex:1;">
          <div style="font-family:var(--hd);font-size:23px;font-weight:700;letter-spacing:-.02em;">Hadith Collections</div>
          <div style="font-size:14px;color:var(--muted-lt);font-weight:300;line-height:1.7;">Kutub al-Sittah, 40 Nawawi, and more. Searchable, readable, shareable.</div>
        </div>
      </div>

      <div style="background:radial-gradient(ellipse at top right,rgba(212,191,138,.03),transparent 60%),linear-gradient(180deg,var(--surface) 0%,var(--surf-lt) 100%);border-radius:6px 24px 24px 6px;display:flex;flex-direction:column;overflow:hidden;position:relative;min-height:300px;">
        <div style="position:absolute;inset:0;pointer-events:none;overflow:hidden;">
          <svg viewBox='0 0 120 120' style='position:absolute;bottom:-20px;right:-20px;width:180px;height:180px;opacity:.07;'><path d='M60,10 A50,50 0 1,1 10,60 A38,38 0 1,0 60,10 Z' fill='#d4bf8a'/><polygon points='88,16 91,27 102,24 94,32 100,43 89,37 82,47 82,36 71,32 82,27' fill='#d4bf8a'/></svg>
        </div>
        <div style="position:relative;z-index:2;padding:52px 40px;display:flex;flex-direction:column;gap:14px;flex:1;">
          <div style="font-family:var(--hd);font-size:23px;font-weight:700;letter-spacing:-.02em;">Prayer Times</div>
          <div style="font-size:14px;color:var(--muted-lt);font-weight:300;line-height:1.7;">Daily salah times with Adhan for your exact location. Qibla direction included.</div>
        </div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-top:4px;" class="rv d2">
      <div style="padding:52px 44px;background:radial-gradient(ellipse at top right,rgba(212,191,138,.04),transparent 60%),linear-gradient(180deg,var(--surf-lt) 0%,#1a1130 100%);border-radius:24px 6px 6px 24px;display:flex;align-items:center;gap:32px;">
        <div>
          <div style="font-family:var(--hd);font-size:clamp(48px,5vw,76px);font-weight:700;letter-spacing:-.04em;color:var(--accent);line-height:1;">40+</div>
          <div style="font-size:13px;color:var(--muted-lt);margin-top:6px;font-weight:300;">Countries with active<br/>Muslim communities</div>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;gap:7px;">
          <div style="height:4px;border-radius:2px;background:rgba(212,191,138,.15);"><div style="height:100%;width:78%;border-radius:2px;background:linear-gradient(90deg,var(--accent),var(--acc-lt));"></div></div>
          <div style="height:4px;border-radius:2px;background:rgba(212,191,138,.15);"><div style="height:100%;width:62%;border-radius:2px;background:linear-gradient(90deg,var(--accent),var(--acc-lt));"></div></div>
          <div style="height:4px;border-radius:2px;background:rgba(212,191,138,.15);"><div style="height:100%;width:89%;border-radius:2px;background:linear-gradient(90deg,var(--accent),var(--acc-lt));"></div></div>
        </div>
      </div>

      <div style="padding:52px 44px;background:radial-gradient(ellipse at top right,rgba(212,191,138,.04),transparent 60%),linear-gradient(180deg,var(--surf-lt) 0%,#1a1130 100%);border-radius:6px 24px 24px 6px;">
        <div style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);margin-bottom:18px;font-weight:500;">بِسْمِ اللَّه</div>
        <div style="font-family:var(--hd);font-size:clamp(22px,2.6vw,30px);font-weight:700;letter-spacing:-.02em;margin-bottom:12px;line-height:1.2;">Your Islamic<br/>companion.</div>
        <div style="font-size:14px;color:var(--muted-lt);font-weight:300;line-height:1.7;max-width:380px;">Social connection and spiritual practice, together in one thoughtfully built space. Not an afterthought. A foundation.</div>
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
      <a href="privacypolicy">Privacy</a>
      <a href="terms">Terms</a>
      <a href="/community-guidelines">Community Guidelines</a>
      <a href="/contact">Contact</a>
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
