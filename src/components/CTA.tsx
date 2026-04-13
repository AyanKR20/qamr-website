import StoreButtons from "./StoreButtons";

export default function CTA() {
  return (
    <section
      id="download"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background accent glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-accent/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-3xl px-6 text-center relative z-10">
        <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4">
          Join the beta
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          The world doesn&apos;t need
          <br />
          <span className="text-accent">another app.</span>
        </h2>
        <p className="mt-4 text-muted max-w-lg mx-auto text-lg">
          It needs a better one. Qamr is social media reimagined — built for
          depth, clarity, and real human connection.
        </p>

        <div className="mt-10">
          <StoreButtons />
        </div>

        <p className="mt-8 text-xs text-muted/60">
          Free to download. No ads. No data selling. Ever.
        </p>
      </div>
    </section>
  );
}
