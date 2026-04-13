const FOOTER_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Contact", href: "mailto:hello@qamr.app" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">Qamr</span>
          <span className="text-xs text-muted">
            &copy; {new Date().getFullYear()}
          </span>
        </div>

        <div className="flex items-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
