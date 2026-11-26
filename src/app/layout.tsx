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
  title: "Xweet — Independent Software Studio",
  description:
  "An independent software studio crafting sovereign web tools, tactile mobile applications, and cartographic games. Built with precision, restraint, and obsessive detail.",
  keywords: [
    "Xweet",
    "Independent Software Studio",
    "Independent Developer",
    "xweet bg",
    "AI Background Remover",
    "Passport Size Photo Maker",
    "unkn",
    "Geography Games",
    "geoguessr alternative",
    "Infyn",
    "Smiley PDF",
    "Indivio",
    "Tactile Web Apps",
    "Next.js",
    "Flutter",
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
    title: "Xweet — Independent Software Studio",
    description:
      "Crafting sovereign digital tools, tactile web experiences, and cartographic games.",
    url: "https://xweet.in",
    siteName: "Xweet",
    images: [
      {
        url: "/logo-clear.png",
        width: 1381,
        height: 1139,
        alt: "Xweet",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F0EFE6" },
    { media: "(prefers-color-scheme: dark)", color: "#111210" },
  ],
  colorScheme: "light dark",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('xweet-theme')==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8860248564627345"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-paper text-carbon font-geist antialiased selection:bg-signal-lime selection:text-carbon flex flex-col">
        {children}
      </body>
    </html>
  );
}
