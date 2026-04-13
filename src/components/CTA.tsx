import IslamicDivider from "./IslamicDivider";
import StoreButtons from "./StoreButtons";

export default function CTA() {
  return (
    <section
      id="download"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-plum/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full bg-accent/3 blur-3xl"
        aria-hidden="true"
      />

      {/* Islamic pattern layer */}
      <div className="islamic-pattern-bg" aria-hidden="true" />

      <div className="mx-auto max-w-3xl px-6 relative z-10">
        {/* Divider */}
        <IslamicDivider />

        <div className="text-center mt-12">
          {/* Crescent moon accent */}
          <div className="flex justify-center mb-6">
            <svg width="32" height="32" viewBox="0 0 48 48" fill="none" className="crescent-shadow">
              <path
                d="M36 24C36 30.627 30.627 36 24 36C20.286 36 16.981 34.226 14.844 31.5C17.019 33.141 19.715 34.1 22.636 34.1C30.178 34.1 36.293 27.985 36.293 20.443C36.293 17.166 35.122 14.162 33.165 11.844C34.933 14.036 36 16.891 36 24Z"
                fill="#d4bf8a"
                fillOpacity="0.5"
              />
            </svg>
          </div>

          <p className="text-xs uppercase tracking-[0.25em] text-accent font-medium mb-4">
            Join the beta
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            The world doesn&apos;t need
            <br />
            <span className="bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent">
              another app.
            </span>
          </h2>
          <p className="mt-5 text-muted max-w-lg mx-auto text-lg leading-relaxed">
            It needs a better one. Qamr is social media reimagined — built for
            depth, clarity, and real human connection.
          </p>

          <div className="mt-10">
            <StoreButtons />
          </div>

          <p className="mt-8 text-xs text-muted/50">
            Free to download. No ads. No data selling. Ever.
          </p>
        </div>
      </div>
    </section>
  );
}
