"use client";

import { useState } from "react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Screenshots", href: "#screenshots" },
  { label: "Download", href: "#download" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-background/70 backdrop-blur-xl border-b border-border">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
            Qamr
          </span>
          <span className="hidden sm:inline text-[10px] uppercase tracking-[0.2em] text-muted font-medium mt-0.5">
            Beta
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#download"
            className="text-sm font-medium px-5 py-2 rounded-full bg-accent text-background hover:bg-accent-light transition-colors"
          >
            Get the App
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-muted hover:text-foreground transition-colors"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="flex flex-col px-6 py-4 gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#download"
              onClick={() => setOpen(false)}
              className="text-sm font-medium px-5 py-2 rounded-full bg-accent text-background hover:bg-accent-light transition-colors text-center"
            >
              Get the App
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
