"use client";

import { useEffect, useState } from "react";
import posthog from "posthog-js";

const IOS_URL = "https://apps.apple.com/app/qamr/id6764144560";
const ANDROID_URL =
  "https://play.google.com/store/apps/details?id=com.ayankhokhar.qamr";
const REDIRECT_DELAY_MS = 700;

type Platform = "ios" | "android" | "desktop";

function detectPlatform(ua: string): Platform {
  const s = ua.toLowerCase();
  // iPadOS 13+ reports as Mac; disambiguate via touch points.
  const isIpad =
    /macintosh/.test(s) &&
    typeof navigator !== "undefined" &&
    (navigator as Navigator & { maxTouchPoints?: number }).maxTouchPoints! > 1;
  if (/iphone|ipad|ipod/.test(s) || isIpad) return "ios";
  if (/android/.test(s)) return "android";
  return "desktop";
}

function buildStoreUrl(base: string, search: string): string {
  if (!search || search === "?") return base;
  // Append client query string; stores silently ignore unknown params.
  const sep = base.includes("?") ? "&" : "?";
  const clean = search.startsWith("?") ? search.slice(1) : search;
  return `${base}${sep}${clean}`;
}

export default function StoreView() {
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [iosHref, setIosHref] = useState(IOS_URL);
  const [androidHref, setAndroidHref] = useState(ANDROID_URL);

  useEffect(() => {
    const p = detectPlatform(navigator.userAgent);
    const search = window.location.search;
    const ios = buildStoreUrl(IOS_URL, search);
    const android = buildStoreUrl(ANDROID_URL, search);

    setIosHref(ios);
    setAndroidHref(android);
    setPlatform(p);

    // Capture UTMs as event properties for analytics fidelity.
    const params = new URLSearchParams(search);
    const utm: Record<string, string> = {};
    params.forEach((value, key) => {
      if (key.toLowerCase().startsWith("utm_")) utm[key] = value;
    });

    try {
      posthog.capture("store_redirect_opened", { platform: p, ...utm });
      posthog.capture(`store_redirect_${p}`, utm);
    } catch {
      // PostHog may not be initialized yet; failing silently is fine.
    }

    if (p === "desktop") return;

    const target = p === "ios" ? ios : android;
    const timer = window.setTimeout(() => {
      window.location.replace(target);
    }, REDIRECT_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  const isDesktop = platform === "desktop";

  return (
    <>
      <style>{CSS}</style>
      <div className="qamr-store">
        <div className="bg-orb" aria-hidden />
        <div className="bg-warm" aria-hidden />

        <main className="store-inner">
          <img
            src="/logo.png"
            alt="Qamr"
            className="store-logo"
            width={88}
            height={88}
            decoding="async"
            fetchPriority="high"
          />

          {!isDesktop ? (
            <>
              <p className="store-title">Opening Qamr…</p>
              <div className="store-spinner" aria-hidden />
              <p className="store-fallback">
                If nothing happens,{" "}
                <a
                  href={platform === "android" ? androidHref : iosHref}
                  className="store-fallback-link"
                >
                  tap here
                </a>
                .
              </p>
              <div className="store-buttons">
                <StoreButton kind="ios" href={iosHref} />
                <StoreButton kind="android" href={androidHref} />
              </div>
            </>
          ) : (
            <>
              <h1 className="store-headline">Download Qamr</h1>
              <p className="store-sub">
                Real. Human. Social. Available on iPhone and Android.
              </p>
              <div className="store-buttons desktop">
                <StoreButton kind="ios" href={iosHref} />
                <StoreButton kind="android" href={androidHref} />
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}

function StoreButton({
  kind,
  href,
}: {
  kind: "ios" | "android";
  href: string;
}) {
  if (kind === "ios") {
    return (
      <a href={href} className="sb sb-ios" aria-label="Download on the App Store">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.56 2.93 11.3 4.7 7.72C5.57 5.94 7.36 4.86 9.28 4.84C10.56 4.82 11.78 5.7 12.56 5.7C13.34 5.7 14.82 4.66 16.36 4.81C17 4.84 18.83 5.08 20 6.68C19.88 6.75 17.48 8.13 17.51 11.05C17.53 14.5 20.49 15.62 20.52 15.63C20.49 15.72 20.07 17.18 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
        </svg>
        <span className="sb-text">
          <span className="sb-top">Download on the</span>
          <span className="sb-bot">App Store</span>
        </span>
      </a>
    );
  }
  return (
    <a href={href} className="sb sb-android" aria-label="Get it on Google Play">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M3.61 1.814L13.793 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.61-.92zm10.893 9.476l2.56-2.56L5.574.858l8.93 10.432zm0 1.42l-8.93 10.432 11.49-7.872-2.56-2.56zm3.897-1.42l2.745 1.582a1 1 0 010 1.736l-2.745 1.582L15.91 12l2.49-2.71z" />
      </svg>
      <span className="sb-text">
        <span className="sb-top">Get it on</span>
        <span className="sb-bot">Google Play</span>
      </span>
    </a>
  );
}

const CSS = `
.qamr-store {
  --bg: #08040f;
  --fg: #ede8df;
  --fg-dim: #c9c2b6;
  --muted: #6a6278;
  --muted-lt: #8a8298;
  --accent: #d4bf8a;
  --acc-lt: #ecd9a8;
  --border: rgba(212,191,138,.10);
  --bord-lt: rgba(212,191,138,.18);
  position: fixed;
  inset: 0;
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font-bd), system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  overflow: hidden;
  z-index: 0;
}

.qamr-store .bg-orb {
  position: absolute;
  top: 50%; left: 50%;
  width: 900px; height: 600px;
  transform: translate(-50%, -55%);
  border-radius: 50%;
  background: radial-gradient(ellipse at center,
    rgba(90,30,122,.22) 0%,
    rgba(45,10,62,.08) 45%,
    transparent 70%);
  pointer-events: none;
}
.qamr-store .bg-warm {
  position: absolute;
  top: 50%; left: 50%;
  width: 460px; height: 280px;
  transform: translate(-50%, -55%);
  border-radius: 50%;
  background: radial-gradient(ellipse at center,
    rgba(212,191,138,.06) 0%, transparent 70%);
  pointer-events: none;
}

.qamr-store .store-inner {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 420px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: qs-fade .55s cubic-bezier(.16,1,.3,1) both;
}

@keyframes qs-fade {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: none; }
}

.qamr-store .store-logo {
  width: 88px;
  height: 88px;
  border-radius: 22px;
  object-fit: cover;
  box-shadow:
    0 0 0 1px rgba(212,191,138,.08),
    0 24px 60px rgba(0,0,0,.55),
    0 0 80px rgba(90,30,122,.22);
}

.qamr-store .store-title {
  margin-top: 28px;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: .005em;
  color: var(--fg-dim);
}

.qamr-store .store-spinner {
  margin-top: 22px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1.5px solid rgba(212,191,138,.18);
  border-top-color: var(--accent);
  animation: qs-spin .9s linear infinite;
}

@keyframes qs-spin {
  to { transform: rotate(360deg); }
}

.qamr-store .store-fallback {
  margin-top: 36px;
  font-size: 12.5px;
  color: var(--muted-lt);
  letter-spacing: .005em;
}
.qamr-store .store-fallback-link {
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1px solid rgba(212,191,138,.3);
  padding-bottom: 1px;
  transition: border-color .2s ease, color .2s ease;
}
.qamr-store .store-fallback-link:hover {
  color: var(--acc-lt);
  border-color: rgba(212,191,138,.55);
}

.qamr-store .store-headline {
  margin-top: 32px;
  font-family: var(--font-hd), Georgia, serif;
  font-size: clamp(34px, 5vw, 44px);
  font-weight: 800;
  letter-spacing: -.03em;
  line-height: 1.05;
  color: var(--fg);
}
.qamr-store .store-sub {
  margin-top: 14px;
  font-size: 15px;
  color: var(--muted-lt);
  font-weight: 300;
  line-height: 1.6;
  max-width: 340px;
}

.qamr-store .store-buttons {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 320px;
}
.qamr-store .store-buttons.desktop {
  margin-top: 32px;
  flex-direction: row;
  justify-content: center;
  max-width: none;
}

.qamr-store .sb {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 13px 22px;
  border-radius: 14px;
  text-decoration: none;
  font-family: inherit;
  transition: transform .15s ease, background .25s ease,
              border-color .25s ease, box-shadow .25s ease;
}
.qamr-store .sb svg { width: 22px; height: 22px; flex: none; }
.qamr-store .sb-text {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.05;
  text-align: left;
}
.qamr-store .sb-top {
  font-size: 10px;
  opacity: .7;
  letter-spacing: .02em;
}
.qamr-store .sb-bot {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -.005em;
  margin-top: 2px;
}

.qamr-store .sb-ios {
  background: var(--fg);
  color: #08040f;
  box-shadow: 0 10px 30px rgba(0,0,0,.35);
}
.qamr-store .sb-ios:hover {
  background: #fff;
  transform: translateY(-1px);
  box-shadow: 0 14px 36px rgba(0,0,0,.45);
}

.qamr-store .sb-android {
  background: rgba(212,191,138,.05);
  color: var(--fg);
  border: 1px solid var(--bord-lt);
}
.qamr-store .sb-android svg { color: var(--accent); }
.qamr-store .sb-android:hover {
  background: rgba(212,191,138,.09);
  border-color: rgba(212,191,138,.32);
  transform: translateY(-1px);
}

@media (max-width: 480px) {
  .qamr-store .store-buttons.desktop {
    flex-direction: column;
    max-width: 320px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .qamr-store .store-inner { animation: none; }
  .qamr-store .store-spinner { animation-duration: 1.6s; }
}
`;
