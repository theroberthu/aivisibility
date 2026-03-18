import type { MetadataRoute } from "next";
import { insightPosts } from "@/lib/insights";

const SITE_URL = "https://yourgeoreport.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const insightRoutes = insightPosts.map((post) => ({
    url: `${SITE_URL}/insights/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/insights`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...insightRoutes,
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date("2026-03-18"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date("2026-03-18"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
