import type { Metadata } from "next";
import StoreView from "./View";

export const metadata: Metadata = {
  title: "Download Qamr",
  description:
    "Get Qamr on iPhone or Android. Real conversations, high-signal news, and everything Muslims need built in.",
  openGraph: {
    title: "Download Qamr",
    description: "Get Qamr on iPhone or Android.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <StoreView />;
}
