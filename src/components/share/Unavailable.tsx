import Link from "next/link";
import { SHARE_CSS } from "./share.css";

type Props = {
  kind: "post" | "reel";
};

/** Clean "content unavailable" state for deleted/private/invalid links. */
export default function Unavailable({ kind }: Props) {
  return (
    <>
      <style>{SHARE_CSS}</style>
      <main className="qv">
        <nav className="qv-nav">
          <Link href="/" className="qv-brand" aria-label="Qamr — home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="" />
            <span>Qamr</span>
          </Link>
          <Link href="/store" className="qv-getlink">
            Download
          </Link>
        </nav>

        <section className="qv-empty">
          <div className="qv-empty-icon" aria-hidden="true">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M9 9l6 6M15 9l-6 6" />
            </svg>
          </div>
          <h1>This content is unavailable</h1>
          <p>
            This {kind} may have been removed, set to private, or the link is no
            longer valid. Download Qamr to explore real, human content across the
            feed and reels.
          </p>
          <div className="qs-ctas" style={{ padding: 0, maxWidth: 360 }}>
            <Link className="qv-btn qv-btn-primary" href="/store">
              Download Qamr
            </Link>
          </div>
        </section>

        <footer className="qv-footer">
          Qamr — Muslim Social App
        </footer>
      </main>
    </>
  );
}
