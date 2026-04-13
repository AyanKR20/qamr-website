import StoreButtons from "./StoreButtons";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      <div className="hero-glow" aria-hidden="true" />

      <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
        {/* Badge */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-surface text-xs text-muted mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Now in beta — join the movement
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up animation-delay-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight">
          Real conversations
          <br />
          <span className="text-accent">in a world full of noise</span>
        </h1>

        {/* Subheadline */}
        <p className="animate-fade-in-up animation-delay-200 mt-6 text-base sm:text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
          Qamr is the social platform where connection is genuine, content is
          meaningful, and your experience is truly yours.
        </p>

        {/* Buttons */}
        <div className="animate-fade-in-up animation-delay-300 mt-10">
          <StoreButtons />
        </div>

        {/* App preview placeholder */}
        <div className="animate-fade-in-up animation-delay-400 mt-16 md:mt-20 mx-auto max-w-sm">
          <div className="relative">
            {/* Phone frame */}
            <div className="aspect-[9/19] rounded-[2.5rem] border-2 border-border bg-surface-light overflow-hidden shadow-2xl shadow-black/40">
              {/* Replace this div with an <Image> of your app screenshot */}
              <div className="w-full h-full flex items-center justify-center text-muted/40 text-sm">
                <div className="text-center">
                  <div className="text-4xl mb-2">&#9790;</div>
                  <p>App Preview</p>
                </div>
              </div>
            </div>
            {/* Reflection glow */}
            <div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-accent/5 blur-2xl rounded-full"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
