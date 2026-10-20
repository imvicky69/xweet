import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://unkn.vercel.app"),
  title: "unkn — Guess the Country | Minimalist Geo Game",
  description:
    "An artisanal, minimalist GeoGuessr alternative. Drop into unmapped coordinates, read geographical clues, and guess the country in pure light-mode clarity.",
  keywords: [
    "geoguessr alternative",
    "guess the country",
    "geography game",
    "unkn",
    "world exploration",
    "street view game",
  ],
  authors: [{ name: "unkn studio" }],
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/icon.png",
  },
  openGraph: {
    title: "unkn — Guess the Country",
    description: "Drop into unknown coordinates. Read the terrain. Guess the country.",
    url: "https://unkn.vercel.app",
    siteName: "unkn",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "unkn emblem",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F0EFE6",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playwrite+DE+Grund:wght@100..400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-paper text-carbon font-geist antialiased selection:bg-signal-lime selection:text-carbon flex flex-col">
        {children}
      </body>
    </html>
  );
}
