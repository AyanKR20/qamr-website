import type { Metadata } from "next";
import CommunityGuidelinesView from "./View";

export const metadata: Metadata = {
  title: "Community Guidelines — Qamr",
  description:
    "Qamr’s community guidelines and child safety standards.",
  openGraph: {
    title: "Community Guidelines — Qamr",
    description:
      "Qamr’s community guidelines and child safety standards.",
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <CommunityGuidelinesView />;
}
