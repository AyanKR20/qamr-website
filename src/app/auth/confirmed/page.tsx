import type { Metadata } from "next";
import Crescent from "@/components/Crescent";

export const metadata: Metadata = {
  title: "Account confirmed — Qamr",
  description: "Your Qamr account has been confirmed. You can now log in.",
  robots: { index: false, follow: false },
};

const DEEP_LINK = "qamr://auth-callback";

export default function ConfirmedPage() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-24">
      {/* Ambient glows — matching hero */}
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-warm-glow" aria-hidden="true" />
      <div className="islamic-pattern-bg" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-lg w-full text-center">
        {/* Crescent with glow */}
        <div className="animate-fade-in-up flex justify-center mb-8">
          <div className="relative">
            <div
              className="absolute -inset-4 rounded-full bg-accent/20 blur-2xl animate-moon-glow"
              aria-hidden="true"
            />
            <Crescent
              size={56}
              opacity={0.8}
              className="crescent-shadow relative z-10"
            />
          </div>
        </div>

        {/* Success badge */}
        <div className="animate-fade-in-up animation-delay-100 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/15 bg-accent/5 text-xs text-accent mb-8">
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 10.5l4 4 8-9" />
          </svg>
          Confirmed
        </div>

        {/* Title */}
        <h1 className="animate-fade-in-up animation-delay-200 text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight">
          Your account has been{" "}
          <span className="bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent">
            confirmed
          </span>
        </h1>

        {/* Subtext */}
        <p className="animate-fade-in-up animation-delay-300 mt-5 text-base sm:text-lg text-muted leading-relaxed">
          You can now log in to Qamr.
        </p>

        {/* CTA */}
        <div className="animate-fade-in-up animation-delay-400 mt-10 flex justify-center">
          <a
            href={DEEP_LINK}
            className="group inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-foreground/95 text-background hover:bg-foreground transition-all duration-200 shadow-lg shadow-black/20 text-sm font-semibold"
          >
            Open Qamr
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 10h12M11 5l5 5-5 5" />
            </svg>
          </a>
        </div>

        <p className="animate-fade-in-up animation-delay-500 mt-8 text-xs text-muted/50">
          If the app doesn&apos;t open, launch Qamr manually and sign in.
        </p>
      </div>
    </section>
  );
}
