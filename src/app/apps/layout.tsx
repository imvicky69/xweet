import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apps & Ecosystem Directory — Xweet",
  description:
    "Explore all Xweet ecosystem apps: xweet bg (AI background remover & easy passport size photo maker), Xweet Wallpapers, Xweet Games, Infyn DL (dynamic GitHub APK releases), Infyn Home Tab Chrome extension, Infyn browser tools, Smiley PDF, and Indivio.",
  keywords: [
    "Xweet Apps",
    "xweet bg",
    "bg.xweet.in",
    "Passport Size Photo Maker",
    "Free AI Background Remover",
    "bg.xweet.in/passport",
    "wallpaper.xweet.in",
    "Infyn DL",
    "Infyn Home Tab",
    "infyn.software",
    "Smiley PDF",
    "Indivio",
    "Xweet Games",
  ],
  alternates: {
    canonical: "https://xweet.in/apps",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Apps & Ecosystem Directory — Xweet",
    description:
      "On-device web tools including AI background removal & fast passport photo maker, open-source Android apps, Chrome extensions, and games built under Xweet.",
    url: "https://xweet.in/apps",
    siteName: "Xweet",
    images: [{ url: "/logo-clear.png", width: 1381, height: 1139, alt: "Xweet Apps" }],
  },
};

export default function AppsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
