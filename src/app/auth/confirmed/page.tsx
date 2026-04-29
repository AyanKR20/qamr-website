import type { Metadata } from "next";
import Crescent from "@/components/Crescent";

export const metadata: Metadata = {
  title: "Account confirmed | Qamr",
  description: "Your Qamr account has been confirmed. You can now log in.",
  robots: { index: false, follow: false },
};

const DEEP_LINK = "qamr://auth-callback";

type Lang = "en" | "ar" | "id";

const COPY: Record<Lang, {
  badge: string;
  titleLead: string;
  titleAccent: string;
  subtext: string;
  button: string;
  fallback: string;
}> = {
  en: {
    badge: "Confirmed",
    titleLead: "Your account has been",
    titleAccent: "confirmed",
    subtext: "You can now log in to Qamr.",
    button: "Open Qamr",
    fallback: "If the app doesn’t open, launch Qamr manually and sign in.",
  },
  ar: {
    badge: "تم التأكيد",
    titleLead: "لقد تم تأكيد",
    titleAccent: "حسابك",
    subtext: "يمكنك الآن تسجيل الدخول إلى قمر.",
    button: "فتح قمر",
    fallback: "إذا لم يُفتح التطبيق، شغّل قمر يدويًا وسجّل الدخول.",
  },
  id: {
    badge: "Dikonfirmasi",
    titleLead: "Akun Anda telah",
    titleAccent: "dikonfirmasi",
    subtext: "Anda sekarang dapat masuk ke Qamr.",
    button: "Buka Qamr",
    fallback: "Jika aplikasi tidak terbuka, jalankan Qamr secara manual dan masuk.",
  },
};

function normalizeLang(raw: string | string[] | undefined): Lang {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (value === "ar" || value === "id") return value;
  return "en";
}

export default async function ConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const lang = normalizeLang(params.lang);
  const copy = COPY[lang];
  const isRtl = lang === "ar";

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      lang={lang}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-24"
    >
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
          {copy.badge}
        </div>

        {/* Title */}
        <h1 className="animate-fade-in-up animation-delay-200 text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight">
          {copy.titleLead}{" "}
          <span className="bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent">
            {copy.titleAccent}
          </span>
        </h1>

        {/* Subtext */}
        <p className="animate-fade-in-up animation-delay-300 mt-5 text-base sm:text-lg text-muted leading-relaxed">
          {copy.subtext}
        </p>

        {/* CTA */}
        <div className="animate-fade-in-up animation-delay-400 mt-10 flex justify-center">
          <a
            href={DEEP_LINK}
            className="group inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-foreground/95 text-background hover:bg-foreground transition-all duration-200 shadow-lg shadow-black/20 text-sm font-semibold"
          >
            {copy.button}
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                isRtl
                  ? "rotate-180 group-hover:-translate-x-0.5"
                  : "group-hover:translate-x-0.5"
              }`}
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
          {copy.fallback}
        </p>
      </div>
    </section>
  );
}
