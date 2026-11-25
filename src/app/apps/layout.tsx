import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apps & Ecosystem Directory — Xweet",
  description:
    "Explore all Xweet ecosystem apps: xweet bg, Xweet Wallpapers, Xweet Games, Infyn DL (dynamic GitHub APK releases), Infyn Home Tab Chrome extension, Infyn browser tools, Smiley PDF, and Indivio.",
  keywords: [
    "Xweet Apps",
    "xweet bg",
    "bg.xweet.in",
    "wallpaper.xweet.in",
    "Infyn DL",
    "Infyn Home Tab",
    "infyn.software",
    "Smiley PDF",
    "Indivio",
    "Xweet Games",
  ],
  openGraph: {
    title: "Apps & Ecosystem Directory — Xweet",
    description:
      "On-device web tools, open-source Android apps, Chrome extensions, and games built under the Xweet ecosystem.",
    url: "https://xweet.in/apps",
    siteName: "Xweet",
    images: [{ url: "/logo-clear.png", width: 1381, height: 1139, alt: "Xweet Apps" }],
  },
};

export default function AppsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
