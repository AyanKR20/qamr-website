import Link from "next/link";
import OpenInQamr from "./OpenInQamr";
import { SHARE_CSS } from "./share.css";
import { getAppDeepLink, type ShareType } from "@/lib/share/links";
import {
  pickImages,
  pickPoster,
  pickVideoUrl,
  type Preview,
} from "@/lib/share/preview";

type Props = {
  kind: ShareType;
  preview: Preview;
};

function initials(preview: Preview): string {
  const src = (preview.display_name || preview.username || "Q").trim();
  const parts = src.split(/\s+/).filter(Boolean);
  const chars = parts.length >= 2 ? parts[0][0] + parts[1][0] : src.slice(0, 2);
  return chars.toUpperCase();
}

function formatDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return `${n}`;
}

function VerifiedBadge() {
  return (
    <span className="qv-badge" title="Verified" aria-label="Verified">
      <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="#8b5cf6"
          d="M12 1l2.6 1.9 3.2-.2 1 3 2.7 1.7-1 3 1 3-2.7 1.7-1 3-3.2-.2L12 23l-2.6-1.9-3.2.2-1-3L2.5 15.6l1-3-1-3 2.7-1.7 1-3 3.2.2z"
        />
        <path
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.5 12l2.3 2.3 4.7-4.9"
        />
      </svg>
    </span>
  );
}

function PremiumBadge() {
  return (
    <span className="qv-badge" title="Premium" aria-label="Premium">
      <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="#d4bf8a"
          d="M12 1l2.6 1.9 3.2-.2 1 3 2.7 1.7-1 3 1 3-2.7 1.7-1 3-3.2-.2L12 23l-2.6-1.9-3.2.2-1-3L2.5 15.6l1-3-1-3 2.7-1.7 1-3 3.2.2z"
        />
        <path
          fill="none"
          stroke="#0b0713"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.5 12l2.3 2.3 4.7-4.9"
        />
      </svg>
    </span>
  );
}

function Media({ kind, preview }: Props) {
  const media = preview.media;
  const isVideo =
    kind === "reel" ||
    preview.post_type === "reel" ||
    media.some((m) => m.media_type === "video");

  if (isVideo) {
    const src = pickVideoUrl(media);
    const poster = pickPoster(media);
    if (!src) return null;
    return (
      <div className="qv-media">
        <video
          className="qv-media-video"
          src={src}
          poster={poster ?? undefined}
          controls
          playsInline
          preload="metadata"
        />
      </div>
    );
  }

  const images = pickImages(media);
  if (images.length === 0) return null;
  if (images.length === 1) {
    return (
      <div className="qv-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="qv-media-img" src={images[0]} alt="" />
      </div>
    );
  }
  return (
    <div className="qv-media">
      <span className="qv-count">1 / {images.length}</span>
      <div className="qv-carousel">
        {images.map((url, i) => (
          <div className="qv-slide" key={i}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="qv-media-img" src={url} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ShareView({ kind, preview }: Props) {
  const deepLink = getAppDeepLink(kind, preview.id);
  const avatarOk =
    preview.avatar_url && /^https?:\/\//i.test(preview.avatar_url);
  const caption = (preview.content ?? "").trim();
  const kindLabel = kind === "reel" ? "Reel" : "Post";

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
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
            </svg>
            <span>Get the app</span>
          </Link>
        </nav>

        <div className="qv-stage">
          <article className="qv-card">
            <header className="qv-creator">
              <div className="qv-avatar">
                {avatarOk ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={preview.avatar_url as string} alt="" />
                ) : (
                  <span>{initials(preview)}</span>
                )}
              </div>
              <div className="qv-names">
                <div className="qv-nameline">
                  <span className="qv-display">
                    {preview.display_name || preview.username || "Qamr user"}
                  </span>
                  {preview.is_premium ? (
                    <PremiumBadge />
                  ) : preview.is_verified ? (
                    <VerifiedBadge />
                  ) : null}
                </div>
                {preview.username ? (
                  <span className="qv-username">@{preview.username}</span>
                ) : null}
              </div>
              <span className="qv-kind">{kindLabel}</span>
            </header>

            <Media kind={kind} preview={preview} />

            <div className="qv-body">
              {caption ? <p className="qv-caption">{caption}</p> : null}
              <div className="qv-meta">
                <span className="qv-stat" aria-label="Likes">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                  </svg>
                  {formatCount(preview.likes_count)}
                </span>
                <span className="qv-stat" aria-label="Comments">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.4 8.9 8.9 0 0 1-4-.9L3 20l1-4.5a8.4 8.4 0 0 1-.9-4A8.4 8.4 0 0 1 11.5 3 8.4 8.4 0 0 1 21 11.5z" />
                  </svg>
                  {formatCount(preview.comments_count)}
                </span>
                {preview.created_at ? (
                  <span className="qv-time">{formatDate(preview.created_at)}</span>
                ) : null}
              </div>
            </div>

            <OpenInQamr deepLink={deepLink} />
            <p className="qv-appnote">
              Likes, comments, follows &amp; more happen inside the app.
            </p>
          </article>
        </div>

        <footer className="qv-footer">
          Qamr — Muslim Social App
        </footer>
      </main>
    </>
  );
}
