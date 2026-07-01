"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { detectPlatform, getStoreLink } from "@/lib/share/links";

type Props = {
  deepLink: string;
};

/**
 * "Open in Qamr" / "Download Qamr" CTAs.
 *
 * Open in Qamr tries the qamr:// custom scheme. If the app is installed the OS
 * switches away and the page is hidden; if nothing handles the scheme we fall
 * back to the correct store after a short delay. Download Qamr goes to /store,
 * which auto-detects the platform (App Store / Play Store) or shows both.
 */
export default function OpenInQamr({ deepLink }: Props) {
  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    const onHide = () => {
      // The app took over (tab hidden) — cancel the store fallback.
      if (document.visibilityState === "hidden") clearTimer();
    };
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", clearTimer);
    window.addEventListener("blur", clearTimer);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", clearTimer);
      window.removeEventListener("blur", clearTimer);
      clearTimer();
    };
  }, [clearTimer]);

  const openApp = useCallback(() => {
    const platform = detectPlatform(navigator.userAgent);
    clearTimer();
    // On mobile, fall back to the store if the app didn't take over.
    if (platform === "ios" || platform === "android") {
      timerRef.current = window.setTimeout(() => {
        window.location.href = getStoreLink(platform);
      }, 1600);
    }
    window.location.href = deepLink;
  }, [deepLink, clearTimer]);

  return (
    <div className="qs-ctas">
      <button type="button" className="qv-btn qv-btn-primary" onClick={openApp}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14 3h7v7M21 3l-9 9M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
        </svg>
        <span>Open in Qamr</span>
      </button>
      <Link className="qv-btn qv-btn-secondary" href="/store">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
        </svg>
        <span>Download Qamr</span>
      </Link>
    </div>
  );
}
