import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://xweet.in"),
  title: "Xweet Studio — Custom App & Website Development",
  description:
    "Bespoke web applications, cross-platform mobile apps, and real-time software systems. Direct engineer collaboration, 100% code ownership, and zero agency bloat.",
  keywords: [
    "Xweet Studio",
    "xweet.in",
    "App Development",
    "Website Development",
    "Mobile Apps",
    "Next.js Development",
    "Flutter Development",
    "React Native",
    "Full Stack Development",
    "unkn",
    "geoguessr alternative",
  ],
  authors: [{ name: "Xweet Studio", url: "https://xweet.in" }],
  icons: {
    icon: [
      { url: "/favicon.ico?v=3", sizes: "any" },
      { url: "/favicon.png?v=3", type: "image/png" },
    ],
    apple: "/favicon.png?v=3",
    shortcut: "/favicon.ico?v=3",
  },
  openGraph: {
    title: "Xweet Studio — Custom App & Website Development",
    description: "High-performance web platforms and mobile apps engineered with precision.",
    url: "https://xweet.in",
    siteName: "Xweet Studio",
    images: [
      {
        url: "/logo-clear.png",
        width: 1381,
        height: 1139,
        alt: "Xweet Studio",
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=3" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png?v=3" />
        <link rel="apple-touch-icon" href="/favicon.png?v=3" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
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
