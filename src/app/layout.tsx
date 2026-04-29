import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-bd",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-hd",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Qamr · Real. Human. Social.",
  description:
    "Bots. Ads. AI slop. Nobody asked for any of it. Qamr is the alternative. A human-first social platform with real conversations, high-signal news, and everything Muslims need built in.",
  openGraph: {
    title: "Qamr · Real. Human. Social.",
    description: "The social platform built for meaningful connection.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
