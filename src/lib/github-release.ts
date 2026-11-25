"use client";

import { useEffect, useState } from "react";

export interface GithubReleaseAsset {
  name: string;
  size: number;
  downloadUrl: string;
  downloadCount: number;
}

export interface GithubReleaseInfo {
  tagName: string;
  name: string;
  publishedAt: string;
  htmlUrl: string;
  totalDownloads: number;
  assets: GithubReleaseAsset[];
}

const CACHE_TTL_MS = 15 * 60 * 1000;

export function formatAssetSize(bytes: number): string {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  return `${Math.round(bytes / 1024)} KB`;
}

export function useGithubLatestRelease(repo?: string): {
  release: GithubReleaseInfo | null;
  loading: boolean;
} {
  const [release, setRelease] = useState<GithubReleaseInfo | null>(null);
  const [loading, setLoading] = useState(Boolean(repo));

  useEffect(() => {
    if (!repo) return;
    let active = true;
    const cacheKey = `xweet_gh_rel_${repo}`;

    try {
      const cachedRaw = sessionStorage.getItem(cacheKey);
      if (cachedRaw) {
        const parsed = JSON.parse(cachedRaw) as { ts: number; data: GithubReleaseInfo };
        if (Date.now() - parsed.ts < CACHE_TTL_MS) {
          Promise.resolve().then(() => {
            if (active) {
              setRelease(parsed.data);
              setLoading(false);
            }
          });
          return () => {
            active = false;
          };
        }
      }
    } catch {
      // noop
    }

    fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!active) return;
        const assets: GithubReleaseAsset[] = Array.isArray(data.assets)
          ? data.assets.map(
              (a: {
                name: string;
                size: number;
                browser_download_url: string;
                download_count: number;
              }) => ({
                name: a.name,
                size: a.size,
                downloadUrl: a.browser_download_url,
                downloadCount: a.download_count ?? 0,
              })
            )
          : [];

        const info: GithubReleaseInfo = {
          tagName: data.tag_name ?? "latest",
          name: data.name ?? data.tag_name ?? "Latest Release",
          publishedAt: data.published_at ?? "",
          htmlUrl: data.html_url ?? `https://github.com/${repo}/releases/latest`,
          totalDownloads: assets.reduce((sum, a) => sum + a.downloadCount, 0),
          assets,
        };

        setRelease(info);
        setLoading(false);
        try {
          sessionStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data: info }));
        } catch {
          // noop
        }
      })
      .catch(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [repo]);

  return { release, loading };
}
