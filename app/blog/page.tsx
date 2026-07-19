"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, Calendar, Clock } from "lucide-react";
import { blogPosts, blogCategories, type BlogCategory } from "@/lib/blog";
import { Reveal } from "@/components/motion/reveal";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type CategoryFilter = BlogCategory | "Tous";

const PAGE_SIZE = 6;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("Tous");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesQuery =
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "Tous" || post.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function updateFilter(fn: () => void) {
    fn();
    setPage(1);
  }

  return (
    <div className="section-y">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
            Blog
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-night-900 dark:text-white sm:text-5xl">
            Conseils & actualités IT
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Infrastructure, cloud et cybersécurité vus par nos ingénieurs.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-10 max-w-xl">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate" />
            <Input
              placeholder="Rechercher un article..."
              value={query}
              onChange={(e) => updateFilter(() => setQuery(e.target.value))}
              className="pl-11"
            />
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {(["Tous", ...blogCategories] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => updateFilter(() => setCategory(cat))}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  category === cat
                    ? "border-electric-500/30 bg-electric-500/15 text-electric-600 dark:text-electric-400"
                    : "text-slate-700 hover:bg-slate-900/[0.04] hover:text-night-900 dark:text-slate-300 dark:hover:bg-white/[0.04] dark:hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate">
          {filtered.length} article{filtered.length > 1 ? "s" : ""}
        </p>

        {paginated.length === 0 ? (
          <div className="glass-card mt-6 flex flex-col items-center gap-2 py-16 text-center">
            <p className="text-night-900 dark:text-white">Aucun article ne correspond à votre recherche.</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginated.map((post, i) => (
              <Reveal key={post.slug} delay={Math.min(i, 6) * 0.06}>
                <Link href={`/blog/${post.slug}`} className="glass-card group flex h-full flex-col overflow-hidden p-5">
                  <div className="flex h-36 items-center justify-center rounded-xl bg-gradient-to-br from-electric-500/10 via-slate-900/[0.02] to-cyan-500/10 dark:via-white/[0.02]">
                    <post.icon
                      className="h-12 w-12 text-electric-500/80 transition-transform duration-500 group-hover:scale-110 dark:text-electric-400/80"
                      strokeWidth={1.4}
                    />
                  </div>
                  <span className="mt-4 text-[11px] font-medium uppercase tracking-wide text-cyan-600 dark:text-cyan-400">
                    {post.category}
                  </span>
                  <h2 className="mt-1 text-base font-bold leading-snug text-night-900 dark:text-white">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-4 border-t pt-4 text-xs text-slate-500 dark:text-slate">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readingTime} min
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                aria-label={`Page ${i + 1}`}
                aria-current={page === i + 1 ? "page" : undefined}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors",
                  page === i + 1
                    ? "bg-electric-500 text-white"
                    : "text-slate-600 hover:bg-slate-900/[0.06] dark:text-slate dark:hover:bg-white/[0.06]"
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
