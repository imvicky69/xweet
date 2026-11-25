import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Vikky Raja & Xweet — From Indivio Studio to Complete Ecosystem",
  description:
    "Meet Vikky Raja, founder of Xweet and Indivio. Learn how Indivio Studio evolved into Xweet — the parent ecosystem housing bg.xweet.in, Xweet Wallpapers, Xweet Games, Infyn, Smiley PDF, and Indivio food delivery.",
  keywords: [
    "Vikky Raja",
    "Xweet founder",
    "Indivio Studio",
    "Xweet ecosystem",
    "Indivio food delivery",
    "bg.xweet.in",
    "Infyn software",
    "Infyn DL",
    "Smiley PDF",
    "Nirmali Bihar developer",
  ],
  alternates: {
    canonical: "https://xweet.in/about",
  },
  openGraph: {
    title: "About Vikky Raja & Xweet — Independent Software Ecosystem",
    description:
      "How Indivio Studio grew into Xweet (parent ecosystem) and Indivio (hyperlocal food delivery). Explore the story, timeline, and 8 ecosystem apps.",
    url: "https://xweet.in/about",
    siteName: "Xweet",
    images: [{ url: "/vikky.jpg", width: 800, height: 1000, alt: "Vikky Raja — Founder of Xweet" }],
    type: "profile",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Vikky Raja",
    jobTitle: "Founder & Lead Software Architect",
    url: "https://xweet.in/about",
    image: "https://xweet.in/vikky.jpg",
    homeLocation: {
      "@type": "Place",
      name: "Nirmali, Bihar, India",
    },
    worksFor: {
      "@type": "Organization",
      name: "Xweet",
      url: "https://xweet.in",
    },
    sameAs: [
      "https://github.com/imvicky69",
      "https://instagram.com/xweet_69",
      "https://xweet.in",
      "https://indivio.xweet.in",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Xweet",
    url: "https://xweet.in",
    logo: "https://xweet.in/logo-clear.png",
    founder: {
      "@type": "Person",
      name: "Vikky Raja",
    },
    description:
      "Root ecosystem for privacy-first web utilities, open-source Android apps, games, and Indivio hyperlocal food delivery.",
    subOrganization: [
      { "@type": "Organization", name: "xweet bg", url: "https://bg.xweet.in" },
      { "@type": "Organization", name: "Xweet Wallpapers", url: "https://wallpaper.xweet.in" },
      { "@type": "Organization", name: "Infyn", url: "https://infyn.software" },
      { "@type": "Organization", name: "Smiley PDF", url: "https://smiley.xweet.in" },
      { "@type": "Organization", name: "Indivio", url: "https://indivio.xweet.in" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who founded Xweet and Indivio?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Both Xweet and Indivio were founded by Vikky Raja. What began in early 2025 as Indivio Studio evolved into two complementary pillars: Xweet as the root software ecosystem, and Indivio as a dedicated hyperlocal food delivery platform.",
        },
      },
      {
        "@type": "Question",
        name: "How are Xweet and Indivio related?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Xweet (xweet.in) acts as the parent ecosystem—similar to how Eternal serves as the parent brand for Zomato—housing xweet bg, Xweet Wallpapers, Xweet Games, Infyn, Smiley PDF, and Indivio.",
        },
      },
      {
        "@type": "Question",
        name: "How can I try Xweet Android apps in Closed Testing or GitHub Releases?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Xweet Wallpapers and Xweet Games are available via Google Play Closed Testing, while open-source tools like Infyn DL and Infyn Home Tab can be downloaded directly from GitHub Releases on xweet.in/apps.",
        },
      },
    ],
  },
];

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
