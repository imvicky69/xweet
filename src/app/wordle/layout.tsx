import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wordle — Minimalist Daily Word Game | Xweet",
  description:
    "A clean, tactile 5-letter vocabulary deduction game. 6 attempts, zero ads, zero distraction, and pure deduction in light mode.",
  metadataBase: new URL("https://xweet.in"),
  alternates: {
    canonical: "https://xweet.in/wordle",
  },
  keywords: [
    "wordle",
    "wordle alternative",
    "minimalist word game",
    "word puzzle",
    "vocabulary game",
    "Xweet Games",
    "tactile web game",
  ],
  openGraph: {
    title: "Wordle — Minimalist Word Deduction Game | Xweet",
    description: "Deduce the secret 5-letter word in 6 attempts. Crafted with precision & restraint.",
    url: "https://xweet.in/wordle",
    siteName: "Xweet",
    images: [
      {
        url: "/logo-clear.png",
        width: 1381,
        height: 1139,
        alt: "Wordle",
      },
    ],
  },
};

export default function WordleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
