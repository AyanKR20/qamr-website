"use client";

import posthog from "posthog-js";

/**
 * Temporary fixed button to verify PostHog events reach the dashboard
 * from production (qamr.app). Remove once production events are confirmed.
 */
export function PostHogProdTestButton() {
  return (
    <button
      type="button"
      onClick={() => {
        try {
          posthog.capture("production_test_click", {
            hostname:
              typeof window !== "undefined" ? window.location.hostname : "(ssr)",
            ts: new Date().toISOString(),
          });
          // eslint-disable-next-line no-console
          console.log("[posthog-prod] production_test_click captured");
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error("[posthog-prod] capture threw", err);
        }
      }}
      style={{
        position: "fixed",
        bottom: 16,
        left: 16,
        zIndex: 9999,
        padding: "10px 16px",
        background: "rgba(212,191,138,.95)",
        color: "#0f0819",
        border: "1px solid rgba(0,0,0,.2)",
        borderRadius: 10,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: ".02em",
        cursor: "pointer",
        boxShadow: "0 6px 18px rgba(0,0,0,.45)",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      Production PostHog Test
    </button>
  );
}
