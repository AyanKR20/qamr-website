interface StoreButtonsProps {
  className?: string;
}

export default function StoreButtons({ className = "" }: StoreButtonsProps) {
  return (
    <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 ${className}`}>
      {/* App Store */}
      <a
        href="#"
        className="group flex items-center gap-3 px-6 py-3 rounded-xl bg-foreground/95 text-background hover:bg-foreground transition-all duration-200 w-full sm:w-auto justify-center shadow-lg shadow-black/20"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.56 2.93 11.3 4.7 7.72C5.57 5.94 7.36 4.86 9.28 4.84C10.56 4.82 11.78 5.7 12.56 5.7C13.34 5.7 14.82 4.66 16.36 4.81C17 4.84 18.83 5.08 20 6.68C19.88 6.75 17.48 8.13 17.51 11.05C17.53 14.5 20.49 15.62 20.52 15.63C20.49 15.72 20.07 17.18 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
        </svg>
        <div className="text-left">
          <div className="text-[10px] leading-tight opacity-60">Download on the</div>
          <div className="text-sm font-semibold leading-tight">App Store</div>
        </div>
      </a>

      {/* Google Play */}
      <a
        href="#"
        className="group flex items-center gap-3 px-6 py-3 rounded-xl border border-accent/20 bg-accent/5 text-foreground hover:bg-accent/10 hover:border-accent/30 transition-all duration-200 w-full sm:w-auto justify-center"
      >
        <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3.61 1.814L13.793 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.61-.92zm10.893 9.476l2.56-2.56L5.574.858l8.93 10.432zm0 1.42l-8.93 10.432 11.49-7.872-2.56-2.56zm3.897-1.42l2.745 1.582a1 1 0 010 1.736l-2.745 1.582L15.91 12l2.49-2.71z" />
        </svg>
        <div className="text-left">
          <div className="text-[10px] leading-tight text-muted">Get it on</div>
          <div className="text-sm font-semibold leading-tight">Google Play</div>
        </div>
      </a>
    </div>
  );
}
