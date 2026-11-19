import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apps & Software Catalog — Xweet Studio",
  description:
    "Explore independent software, sovereign privacy utilities, 120 FPS Android tools, 4K/5K wallpaper archives, and interactive cartography games engineered by Xweet.",
  keywords: [
    "Xweet Apps",
    "Independent Software",
    "Infyn DL",
    "Smiley PDF",
    "wallpaper.xweet.in",
    "unkn",
    "Indivio",
    "Android Apps",
    "WebAssembly Tools",
    "Phone Wallpapers",
    "Desktop Wallpapers",
  ],
  openGraph: {
    title: "Apps & Software Catalog — Xweet Studio",
    description:
      "Sovereign digital tools, 120 FPS mobile apps, curated 4K/5K wallpaper archives, and cartography games.",
    url: "https://xweet.in/apps",
    siteName: "Xweet",
    images: [
      {
        url: "/logo-clear.png",
        width: 1381,
        height: 1139,
        alt: "Xweet Software Catalog",
      },
    ],
  },
};

export default function AppsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
