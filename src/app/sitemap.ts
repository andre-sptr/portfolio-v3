import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/metadata";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return siteUrl ? [{ url: siteUrl.href, changeFrequency: "monthly", priority: 1 }] : [];
}
