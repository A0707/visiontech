import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { blogPosts } from "@/lib/blog";
import { portfolioProjects } from "@/lib/portfolio";

const SITE_URL = "https://www.visiontech.ma";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/boutique`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/maintenance`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/a-propos`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/portfolio`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/devis`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/downloads`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/carrieres`, changeFrequency: "monthly", priority: 0.4 },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = portfolioProjects.map((p) => ({
    url: `${SITE_URL}/portfolio/${p.id}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/boutique/${p.id}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...productRoutes, ...caseStudyRoutes, ...blogRoutes];
}
