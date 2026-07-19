import type { MetadataRoute } from "next";

const SITE_URL = "https://www.visiontech.ma";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/mentions-legales", "/confidentialite", "/cgu"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
