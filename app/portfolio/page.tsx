"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { portfolioProjects, portfolioCategories, type PortfolioCategory } from "@/lib/portfolio";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type CategoryFilter = PortfolioCategory | "Tous";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("Tous");

  const filtered = useMemo(() => {
    if (activeCategory === "Tous") return portfolioProjects;
    return portfolioProjects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="section-y">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
            Portfolio
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-night-900 dark:text-white sm:text-5xl">
            Des projets, des résultats concrets
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Un aperçu des missions menées par nos équipes pour des entreprises marocaines.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap justify-center gap-2">
          {(["Tous", ...portfolioCategories] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                activeCategory === cat
                  ? "border-electric-500/30 bg-electric-500/15 text-electric-600 dark:text-electric-400"
                  : "text-slate-700 hover:bg-slate-900/[0.04] hover:text-night-900 dark:text-slate-300 dark:hover:bg-white/[0.04] dark:hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {filtered.map((project, i) => (
            <Reveal key={project.id} delay={Math.min(i, 6) * 0.06}>
              <Link
                href={`/portfolio/${project.id}`}
                className="glass-card group flex h-full flex-col overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex h-40 items-center justify-center rounded-xl bg-gradient-to-br from-electric-500/10 via-slate-900/[0.02] to-cyan-500/10 dark:via-white/[0.02]">
                  <project.icon
                    className="h-14 w-14 text-electric-500/80 transition-transform duration-500 group-hover:scale-110 dark:text-electric-400/80"
                    strokeWidth={1.4}
                  />
                </div>
                <span className="mt-5 text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate">
                  {project.category} · {project.sector}
                </span>
                <h2 className="mt-1 text-lg font-bold text-night-900 group-hover:text-electric-600 dark:text-white dark:group-hover:text-electric-400">
                  {project.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate">
                  {project.description}
                </p>

                <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-slate-900/[0.02] p-3 dark:bg-white/[0.03]">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="text-center">
                      <p className="text-base font-extrabold text-electric-600 dark:text-electric-400">
                        {metric.value}
                      </p>
                      <p className="mt-0.5 text-[10px] leading-tight text-slate-500 dark:text-slate">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-slate-900/[0.04] px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:bg-white/[0.06] dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center gap-1.5 border-t pt-4 text-sm font-medium text-electric-600 dark:text-electric-400">
                  Lire l&apos;étude de cas
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
