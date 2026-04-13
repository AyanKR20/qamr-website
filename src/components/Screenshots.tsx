const SCREENS = [
  { label: "Feed", placeholder: "Feed Screen" },
  { label: "Pulse", placeholder: "Pulse Screen" },
  { label: "Profile", placeholder: "Profile Screen" },
  { label: "Discovery", placeholder: "Discovery Screen" },
];

export default function Screenshots() {
  return (
    <section id="screenshots" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4">
            Preview
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            A glimpse inside
          </h2>
          <p className="mt-4 text-muted max-w-lg mx-auto">
            Designed with intention. Every screen, every interaction.
          </p>
        </div>

        {/* Screenshot grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {SCREENS.map((screen) => (
            <div key={screen.label} className="group">
              <div className="aspect-[9/19] rounded-2xl border border-border bg-surface-light overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
                {/* Replace with <Image> pointing to /screenshots/feed.png etc. */}
                <div className="w-full h-full flex items-center justify-center text-muted/30 text-xs">
                  <div className="text-center">
                    <div className="text-2xl mb-1">&#9790;</div>
                    <p>{screen.placeholder}</p>
                  </div>
                </div>
              </div>
              <p className="text-center text-xs text-muted mt-3 font-medium">
                {screen.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
