// Server-side fetch of public post/reel previews from Supabase.
//
// Uses the PUBLIC anon key only (never the service-role key) and calls the
// public_post_preview / public_reel_preview RPCs, which already enforce that
// only public-account, non-deleted content is returned. Results are wrapped in
// React.cache so generateMetadata and the page share a single request.

import { cache } from "react";

export type PreviewMedia = {
  media_url: string | null;
  delivery_url: string | null;
  hls_playlist_url: string | null;
  poster_url: string | null;
  thumbnail_url: string | null;
  media_type: string | null;
  aspect_ratio: number | null;
  width: number | null;
  height: number | null;
  duration_ms: number | null;
  order_index: number | null;
};

export type Preview = {
  id: string;
  user_id: string;
  post_type: string | null;
  content: string | null;
  created_at: string | null;
  edited_at: string | null;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  is_verified: boolean;
  is_premium: boolean;
  likes_count: number;
  comments_count: number;
  media: PreviewMedia[];
};

const UUID_RE =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

function baseUrl(): string | null {
  const raw = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "")
    .trim()
    .replace(/^['"]|['"]$/g, "")
    .replace(/\/+$/, "");
  if (!raw) return null;
  try {
    return new URL(raw).origin;
  } catch {
    return null;
  }
}

async function fetchPreview(
  rpc: "public_post_preview" | "public_reel_preview",
  param: "p_post_id" | "p_reel_id",
  id: string
): Promise<Preview | null> {
  if (!UUID_RE.test(id)) return null;

  const url = baseUrl();
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[share preview] Supabase URL or anon key not configured.");
    }
    return null;
  }

  let res: Response;
  try {
    res = await fetch(`${url}/rest/v1/rpc/${rpc}`, {
      method: "POST",
      headers: {
        apikey: anon,
        Authorization: `Bearer ${anon}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ [param]: id }),
      // Cache at the edge briefly so previews are fast but reflect
      // deletions/edits within a minute.
      next: { revalidate: 60 },
    });
  } catch {
    return null;
  }

  if (!res.ok) return null;

  const data = (await res.json()) as Preview | null;
  if (!data || typeof data !== "object" || !data.id) return null;

  data.media = Array.isArray(data.media) ? data.media : [];
  return data;
}

export const getPostPreview = cache((id: string) =>
  fetchPreview("public_post_preview", "p_post_id", id)
);

export const getReelPreview = cache((id: string) =>
  fetchPreview("public_reel_preview", "p_reel_id", id)
);

// ── Rendering helpers ────────────────────────────────────────────────────────

/** First playable video URL for a reel/video post (prefers a direct mp4). */
export function pickVideoUrl(media: PreviewMedia[]): string | null {
  const videos = media.filter((m) => m.media_type === "video");
  const source = videos.length ? videos : media;
  const mp4 =
    source.find((m) => m.delivery_url && !/\.m3u8($|\?)/i.test(m.delivery_url)) ??
    source.find((m) => m.media_url && !/\.m3u8($|\?)/i.test(m.media_url));
  if (mp4) return mp4.delivery_url || mp4.media_url;
  // Fall back to HLS (plays natively in Safari) if that's all we have.
  const hls = source.find((m) => m.hls_playlist_url);
  return hls?.hls_playlist_url ?? null;
}

/** Poster/thumbnail for a reel/video. */
export function pickPoster(media: PreviewMedia[]): string | null {
  for (const m of media) {
    if (m.poster_url) return m.poster_url;
    if (m.thumbnail_url) return m.thumbnail_url;
  }
  return null;
}

/** Image URLs for an image post. */
export function pickImages(media: PreviewMedia[]): string[] {
  return media
    .filter((m) => (m.media_type ?? "image") === "image")
    .map((m) => m.media_url)
    .filter((u): u is string => !!u);
}

/** Best OG image: an image, else poster/thumbnail, else avatar. */
export function pickOgImage(preview: Preview): string | null {
  const images = pickImages(preview.media);
  if (images.length) return images[0];
  const poster = pickPoster(preview.media);
  if (poster) return poster;
  if (preview.avatar_url && /^https?:\/\//i.test(preview.avatar_url)) {
    return preview.avatar_url;
  }
  return null;
}

/** Trim a caption to a preview length on a word boundary. */
export function captionPreview(text: string | null, max = 160): string {
  const trimmed = (text ?? "").trim();
  if (trimmed.length <= max) return trimmed;
  const cut = trimmed.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}
