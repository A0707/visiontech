import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Conseils et actualités IT par les ingénieurs de VisionTech — CUSTOM IT : infrastructure, cloud et cybersécurité.",
  alternates: { canonical: "/blog" },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
