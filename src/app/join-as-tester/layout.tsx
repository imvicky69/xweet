import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Closed Testing — Xweet Android Beta",
  description:
    "Join Google Play Closed Testing for Xweet Android apps including Xweet Wallpapers, Xweet Games, Smiley PDF, and Indivio. Enter your Play Store email to get early access.",
  alternates: {
    canonical: "https://xweet.in/join-as-tester",
  },
  openGraph: {
    title: "Join Closed Testing — Xweet Android Beta",
    description:
      "Request early access to Xweet Android apps in Google Play Closed Testing.",
    url: "https://xweet.in/join-as-tester",
    siteName: "Xweet",
    images: [{ url: "/logo-clear.png", width: 1381, height: 1139, alt: "Xweet Closed Testing" }],
  },
};

export default function JoinAsTesterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
