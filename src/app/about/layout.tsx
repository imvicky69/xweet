import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Vikky Raja — Xweet",
  description:
    "Meet Vikky Raja, builder of Xweet. Free web utilities, ad-free Android apps, personalization tools, and games built for daily productivity and work.",
  keywords: [
    "Vikky Raja",
    "Xweet",
    "free web tools",
    "bg.xweet.in",
    "Infyn software",
    "Infyn DL",
    "Smiley PDF",
    "Xweet Wallpapers",
    "Indivio",
    "Nirmali Bihar developer",
  ],
  alternates: {
    canonical: "https://xweet.in/about",
  },
  openGraph: {
    title: "About Vikky Raja — Xweet",
    description:
      "Shipping free apps for daily productivity, work, and personalization under xweet.in.",
    url: "https://xweet.in/about",
    siteName: "Xweet",
    images: [{ url: "/vikky.jpg", width: 800, height: 1000, alt: "Vikky Raja — Xweet" }],
    type: "profile",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Vikky Raja",
    email: "mailto:vikky@xweet.in",
    jobTitle: "Independent Software Developer",
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
      "Free, privacy-first web utilities, ad-free Android apps, personalization tools, and games.",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who builds Xweet?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Xweet is built by Vikky Raja in Nirmali, Bihar — focusing on free, fast web utilities, ad-free Android apps, and personalization tools for daily work.",
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
