import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: "https://xweet.in", lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: "https://xweet.in/apps", lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: "https://xweet.in/about", lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: "https://xweet.in/join-as-tester", lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://xweet.in/games", lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: "https://xweet.in/unkn", lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: "https://xweet.in/wordle", lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: "https://xweet.in/wallpapers", lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: "https://xweet.in/contact", lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
