// Shared helpers for the public post/reel viewers: canonical URLs, app deep
// links, and store links. Pure functions — safe on server and client.

export const SITE_ORIGIN = "https://qamr.app";

export const APP_STORE_URL = "https://apps.apple.com/app/qamr/id6764144560";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.ayank.qamr";

export type ShareType = "post" | "reel";

/**
 * Custom-scheme deep link the web viewer uses to try to open the installed
 * app. The Flutter app registers the `qamr` scheme (iOS Info.plist +
 * Android intent-filter) and routes qamr://post/{id} and qamr://reel/{id}
 * through openPostById, which auto-detects reel vs post.
 */
export function getAppDeepLink(type: ShareType, id: string): string {
  return `qamr://${type}/${encodeURIComponent(id)}`;
}

/** Canonical https link for a shared post/reel (matches app share URLs). */
export function getCanonicalUrl(type: ShareType, id: string): string {
  return `${SITE_ORIGIN}/${type}/${encodeURIComponent(id)}`;
}

export type Platform = "ios" | "android" | "other";

/** Best-effort platform detection from a user-agent string. */
export function detectPlatform(userAgent: string | null | undefined): Platform {
  const ua = (userAgent ?? "").toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  if (ua.includes("android")) return "android";
  return "other";
}

/** Store link for a platform. `other` defaults to the App Store. */
export function getStoreLink(platform: Platform): string {
  return platform === "android" ? PLAY_STORE_URL : APP_STORE_URL;
}
