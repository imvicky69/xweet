import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Xweet Studio — Custom App & Website Development",
  description:
    "Get in touch with Xweet Studio. Share your web or mobile app requirements, get an architectural proposal, and start building high-performance software with direct engineering oversight.",
  icons: {
    icon: [
      { url: "/favicon.ico?v=3", sizes: "any" },
      { url: "/favicon.png?v=3", type: "image/png" },
    ],
    apple: "/favicon.png?v=3",
    shortcut: "/favicon.ico?v=3",
  },
  openGraph: {
    title: "Contact Xweet Studio — App & Website Development",
    description: "Start your app or website project with Xweet Studio. Fast response within 24 hours.",
    images: [{ url: "/logo-clear.png", width: 1381, height: 1139, alt: "Xweet Studio" }],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

