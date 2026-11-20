import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "unkn — Minimalist Geography Deduction Game | Xweet",
  description:
    "Survey 10 verified Google Street View locations. Deduce the country in pure light-mode clarity.",
  metadataBase: new URL("https://xweet.in"),
  alternates: {
    canonical: "https://xweet.in/unkn",
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/icon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "unkn — Minimalist Geography Deduction Game | Xweet",
    description: "Survey 10 verified Google Street View locations. Deduce the country in pure light-mode clarity.",
    url: "https://xweet.in/unkn",
    images: [{ url: "/icon.png", width: 512, height: 512, alt: "unkn emblem" }],
  },
};

export default function UnknLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

