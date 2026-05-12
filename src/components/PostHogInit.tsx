"use client";

import { useEffect, useRef } from "react";
import posthog from "posthog-js";

/**
 * Initializes PostHog once on the client.
 *
 * A useEffect in a "use client" component is the most reliable init path
 * across Next.js dev/prod and Turbopack configurations.
 */
export function PostHogInit() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

    if (!token) {
      // eslint-disable-next-line no-console
      console.error(
        "[posthog] NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is missing. " +
          "Set it in .env.local and your hosting provider, then restart."
      );
      return;
    }

    posthog.init(token, {
      api_host: host,
      defaults: "2026-01-30",
    });
  }, []);

  return null;
}
