import type { Metadata } from "next";

export function getSiteUrl(): URL | undefined {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? new URL(url.origin) : undefined;
  } catch { return undefined; }
}

export const siteUrl = getSiteUrl();
export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: siteUrl, alternates: { canonical: "/" } } : {}),
  title: "Andre Saputra | Networking, Automation & Digital Engineering",
  description: "Electronics and Telecommunication Engineering graduate working across networking, telecommunications operations, data automation, IoT, and web applications.",
  authors: [{ name: "Andre Saputra" }],
  openGraph: { type: "website", locale: "en_US", title: "Andre Saputra — Engineering, Connected.", description: "Networking, automation, IoT, and practical digital solutions.", siteName: "Andre Saputra", ...(siteUrl ? { url: siteUrl } : {}), images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Andre Saputra — Networking, Automation & Digital Engineering" }] },
  twitter: { card: "summary_large_image", title: "Andre Saputra — Engineering, Connected.", description: "Networking, automation, IoT, and practical digital solutions.", images: ["/og-image.png"] },
  icons: { icon: "/favicon.svg", apple: "/apple-icon.png" },
};
