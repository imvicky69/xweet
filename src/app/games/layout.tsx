import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "unkn — Guess the Country | Minimalist Geo Game",
  description:
    "An artisanal, minimalist GeoGuessr alternative. Survey real Google Street View panoramas, calculate solar azimuth, inspect landscape biomes, and guess the country in pure light-mode clarity.",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/icon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "unkn — Guess the Country",
    description: "Drop into unknown coordinates. Read the terrain. Guess the country.",
    images: [{ url: "/icon.png", width: 512, height: 512, alt: "unkn emblem" }],
  },
};

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

