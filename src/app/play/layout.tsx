import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Play unkn — 10-Round Geography Challenge",
  description:
    "Survey 10 verified Google Street View locations. Deduce the country in pure light-mode clarity.",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/icon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Play unkn — 10-Round Geography Challenge",
    description: "Survey 10 verified Google Street View locations. Deduce the country in pure light-mode clarity.",
    images: [{ url: "/icon.png", width: 512, height: 512, alt: "unkn emblem" }],
  },
};

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

