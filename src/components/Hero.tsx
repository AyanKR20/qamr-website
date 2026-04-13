import Image from "next/image";
import StoreButtons from "./StoreButtons";

export default function Hero() {
  return (
    <section className="relative pt-28 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Ambient glows */}
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-warm-glow" aria-hidden="true" />

      {/* Subtle Islamic geometric pattern layer */}
      <div className="islamic-pattern-bg" aria-hidden="true" />

      {/* Rotating geometric ornament — very faint */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-slow-spin pointer-events-none" aria-hidden="true">
        <svg width="900" height="900" viewBox="0 0 900 900" fill="none" className="opacity-[0.015]">
          <circle cx="450" cy="450" r="350" stroke="#d4bf8a" strokeWidth="0.5" />
          <circle cx="450" cy="450" r="300" stroke="#d4bf8a" strokeWidth="0.3" />
          <circle cx="450" cy="450" r="250" stroke="#d4bf8a" strokeWidth="0.3" />
          {/* 8 radial lines — subtle mashrabiya reference */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line
              key={angle}
              x1="450"
              y1="450"
              x2={450 + 350 * Math.cos((angle * Math.PI) / 180)}
              y2={450 + 350 * Math.sin((angle * Math.PI) / 180)}
              stroke="#d4bf8a"
              strokeWidth="0.3"
            />
          ))}
        </svg>
      </div>

      <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
        {/* Crescent moon above headline */}
        <div className="animate-fade-in-up flex justify-center mb-8">
          <div className="relative">
            {/* Moon glow */}
            <div className="absolute inset-0 rounded-full bg-accent/15 blur-xl animate-moon-glow" aria-hidden="true" />
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              className="crescent-shadow relative z-10"
            >
              <path
                d="M36 24C36 30.627 30.627 36 24 36C20.286 36 16.981 34.226 14.844 31.5C17.019 33.141 19.715 34.1 22.636 34.1C30.178 34.1 36.293 27.985 36.293 20.443C36.293 17.166 35.122 14.162 33.165 11.844C34.933 14.036 36 16.891 36 24Z"
                fill="#d4bf8a"
                fillOpacity="0.6"
              />
              <circle cx="24" cy="24" r="23" stroke="#d4bf8a" strokeWidth="0.5" strokeOpacity="0.15" />
            </svg>
          </div>
        </div>

        {/* Badge */}
        <div className="animate-fade-in-up animation-delay-100 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/10 bg-accent/5 text-xs text-accent mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Now in beta — join the movement
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up animation-delay-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight">
          Real conversations
          <br />
          <span className="bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent">
            in a world full of noise
          </span>
        </h1>

        {/* Subheadline */}
        <p className="animate-fade-in-up animation-delay-300 mt-6 text-base sm:text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
          Qamr is the social platform where connection is genuine, content is
          meaningful, and your experience is truly yours.
        </p>

        {/* Buttons */}
        <div className="animate-fade-in-up animation-delay-400 mt-10">
          <StoreButtons />
        </div>

        {/* App preview */}
        <div className="animate-fade-in-up animation-delay-500 mt-16 md:mt-20 mx-auto max-w-sm">
          <div className="relative animate-gentle-float">
            {/* Ambient glow behind phone */}
            <div className="absolute -inset-8 bg-plum/30 blur-3xl rounded-full" aria-hidden="true" />

            {/* Phone frame */}
            <div className="relative aspect-[9/19] rounded-[2.5rem] border border-border-light bg-gradient-to-b from-surface-light to-surface overflow-hidden shadow-2xl shadow-plum/20">
              {/* Replace with: <Image src="/screenshots/hero.png" alt="Qamr app" fill className="object-cover" /> */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <Image
                    src="/logo.png"
                    alt="Qamr"
                    width={64}
                    height={64}
                    className="mx-auto mb-3 rounded-xl opacity-40"
                  />
                  <p className="text-muted/30 text-xs">App Preview</p>
                </div>
              </div>
              {/* Subtle border shine */}
              <div className="absolute inset-0 rounded-[2.5rem] border border-accent/5" />
            </div>

            {/* Reflection */}
            <div
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-plum-glow/10 blur-3xl rounded-full"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
