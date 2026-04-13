import Image from "next/image";
import IslamicDivider from "./IslamicDivider";

const SCREENS = [
  { label: "Feed", placeholder: "Feed Screen" },
  { label: "Pulse", placeholder: "Pulse Screen" },
  { label: "Profile", placeholder: "Profile Screen" },
  { label: "Discovery", placeholder: "Discovery Screen" },
];

export default function Screenshots() {
  return (
    <section id="screenshots" className="relative py-24 md:py-32 overflow-hidden">
      {/* Ambient side glows */}
      <div className="absolute top-1/3 -left-32 w-64 h-96 bg-plum/20 blur-3xl rounded-full" aria-hidden="true" />
      <div className="absolute bottom-1/3 -right-32 w-64 h-96 bg-plum/15 blur-3xl rounded-full" aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        {/* Divider */}
        <IslamicDivider />

        {/* Section header */}
        <div className="text-center mt-12 mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-accent font-medium mb-4">
            Preview
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            A glimpse inside
          </h2>
          <p className="mt-4 text-muted max-w-lg mx-auto leading-relaxed">
            Designed with intention. Every screen, every interaction.
          </p>
        </div>

        {/* Screenshot grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {SCREENS.map((screen) => (
            <div key={screen.label} className="group">
              <div className="screenshot-card aspect-[9/19] rounded-2xl border border-border bg-gradient-to-b from-surface-light to-surface overflow-hidden">
                {/* Replace with: <Image src={`/screenshots/${screen.label.toLowerCase()}.png`} alt={screen.label} fill className="object-cover" /> */}
                <div className="w-full h-full flex items-center justify-center text-muted/20 text-xs">
                  <div className="text-center">
                    {/* Small crescent placeholder */}
                    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" className="mx-auto mb-2 opacity-40">
                      <path
                        d="M36 24C36 30.627 30.627 36 24 36C20.286 36 16.981 34.226 14.844 31.5C17.019 33.141 19.715 34.1 22.636 34.1C30.178 34.1 36.293 27.985 36.293 20.443C36.293 17.166 35.122 14.162 33.165 11.844C34.933 14.036 36 16.891 36 24Z"
                        fill="#d4bf8a"
                        fillOpacity="0.3"
                      />
                    </svg>
                    <p>{screen.placeholder}</p>
                  </div>
                </div>
              </div>
              <p className="text-center text-xs text-muted mt-3 font-medium tracking-wide">
                {screen.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
