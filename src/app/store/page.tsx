import type { Metadata } from "next";
import StoreView from "./View";
import "./store.css";

export const dynamic = "force-static";

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
