import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Qamr — Real conversations in a world full of noise",
  description:
    "Qamr is the social platform built for meaningful connection. Feed, Pulse, Discovery, and a premium experience — all in one app.",
  openGraph: {
    title: "Qamr — Real conversations in a world full of noise",
    description:
      "The social platform built for meaningful connection.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
