"use client";

import { useEffect } from "react";

type Props = {
  iosUrl: string;
  androidUrl: string;
};

function withSearch(base: string, search: string) {
  if (!search || search === "?") return base;
  return `${base}${base.includes("?") ? "&" : "?"}${search.slice(1)}`;
}

export default function StoreRedirect({ iosUrl, androidUrl }: Props) {
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isIpad =
      ua.includes("macintosh") && navigator.maxTouchPoints > 1;
    const isIos = /iphone|ipad|ipod/.test(ua) || isIpad;
    const isAndroid = ua.includes("android");
    const ios = withSearch(iosUrl, window.location.search);
    const android = withSearch(androidUrl, window.location.search);

    document
      .querySelectorAll<HTMLAnchorElement>("[data-store-target='ios']")
      .forEach((link) => {
        link.href = ios;
      });
    document
      .querySelectorAll<HTMLAnchorElement>("[data-store-target='android']")
      .forEach((link) => {
        link.href = android;
      });

    if (!isIos && !isAndroid) return;

    window.location.replace(isIos ? ios : android);
  }, [androidUrl, iosUrl]);

  return null;
}
