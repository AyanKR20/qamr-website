import type { Metadata } from "next";
import ShareView from "@/components/share/ShareView";
import Unavailable from "@/components/share/Unavailable";
import { getCanonicalUrl } from "@/lib/share/links";
import {
  captionPreview,
  getReelPreview,
  pickOgImage,
  pickVideoUrl,
} from "@/lib/share/preview";

type Params = { id: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const preview = await getReelPreview(id);
  const url = getCanonicalUrl("reel", id);

  if (!preview) {
    return {
      title: "Content unavailable · Qamr",
      description: "This reel isn't available. Download Qamr to explore more.",
      robots: { index: false, follow: false },
    };
  }

  const name = preview.display_name || preview.username || "Someone";
  const handle = preview.username ? ` (@${preview.username})` : "";
  const title = `${name}${handle} on Qamr`;
  const description =
    captionPreview(preview.content) || "Watch this reel on Qamr";
  const image = pickOgImage(preview);
  const video = pickVideoUrl(preview.media);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "video.other",
      url,
      title,
      description,
      siteName: "Qamr",
      images: image ? [{ url: image }] : undefined,
      videos: video ? [{ url: video }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ReelPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const preview = await getReelPreview(id);
  if (!preview) return <Unavailable kind="reel" />;
  return <ShareView kind="reel" preview={preview} />;
}
