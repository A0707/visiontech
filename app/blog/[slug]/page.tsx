import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { blogPosts, getBlogPost } from "@/lib/blog";
import { Reveal } from "@/components/motion/reveal";
import { CtaSection } from "@/components/sections/cta-section";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: "VisionTech — CUSTOM IT" },
  };

  return (
    <article className="section-y">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container max-w-3xl">
        <Reveal>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-electric-600 hover:text-electric-500 dark:text-electric-400 dark:hover:text-electric-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au blog
          </Link>

          <span className="mt-6 block text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
            {post.category}
          </span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-night-900 dark:text-white sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-5 border-y py-4 text-sm text-slate-600 dark:text-slate">
            <span className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-electric-500 to-cyan-500 text-xs font-bold text-white">
                {post.author.split(" ").map((p) => p.charAt(0)).join("")}
              </span>
              <span>
                <span className="font-medium text-night-900 dark:text-white">{post.author}</span>
                <span className="block text-xs text-slate-500 dark:text-slate">{post.authorRole}</span>
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readingTime} min de lecture
            </span>
          </div>

          <div className="mt-8 flex h-56 items-center justify-center rounded-2xl bg-gradient-to-br from-electric-500/10 via-slate-900/[0.02] to-cyan-500/10 dark:via-white/[0.02] sm:h-72">
            <post.icon className="h-20 w-20 text-electric-500/80 dark:text-electric-400/80" strokeWidth={1.3} />
          </div>

          <div className="mt-8 space-y-5">
            {post.content.map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-slate-700 dark:text-slate-300">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="mt-16">
        <CtaSection />
      </div>
    </article>
  );
}
