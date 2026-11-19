import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "xwordle — Minimalist Daily Word Game | Xweet",
  description:
    "A clean, tactile 5-letter vocabulary deduction game. 6 attempts, zero ads, zero distraction, and pure deduction in light mode.",
  keywords: [
    "xwordle",
    "wordle alternative",
    "minimalist word game",
    "word puzzle",
    "vocabulary game",
    "Xweet Games",
    "tactile web game",
  ],
  openGraph: {
    title: "xwordle — Minimalist Word Deduction Game",
    description: "Deduce the secret 5-letter word in 6 attempts. Crafted with precision & restraint.",
    url: "https://xweet.in/games/xwordle",
    siteName: "Xweet",
    images: [
      {
        url: "/logo-clear.png",
        width: 1381,
        height: 1139,
        alt: "xwordle",
      },
    ],
  },
};

export default function XwordleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
