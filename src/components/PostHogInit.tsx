"use client";

import { useEffect, useRef } from "react";
import posthog from "posthog-js";

/**
 * Initializes PostHog once on the client.
 *
 * Production diagnostics are temporarily enabled to debug qamr.app.
 * Remove the [posthog-prod] console logs once events are confirmed flowing
 * in production PostHog Activity.
 */
export function PostHogInit() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

    // Production-visible diagnostics
    /* eslint-disable no-console */
    console.log("[posthog-prod] init starting", {
      hostname: typeof window !== "undefined" ? window.location.hostname : "(ssr)",
      tokenPresent: !!token,
      tokenPrefix: token ? `${token.slice(0, 8)}…` : "(missing)",
      host: host ?? "(missing)",
      nodeEnv: process.env.NODE_ENV,
    });
    /* eslint-enable no-console */

    if (!token) {
      // eslint-disable-next-line no-console
      console.error(
        "[posthog-prod] NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is missing in the client bundle. " +
          "On Vercel, add both NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN and NEXT_PUBLIC_POSTHOG_HOST " +
          "under Project Settings → Environment Variables (Production scope), then redeploy."
      );
      return;
    }

    try {
      posthog.init(token, {
        api_host: host,
        defaults: "2026-01-30",
      });
      // eslint-disable-next-line no-console
      console.log("[posthog-prod] init complete — autocapture + $pageview active");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[posthog-prod] posthog.init threw", err);
    }
  }, []);

  return null;
}
