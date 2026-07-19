"use client";

import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
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
              <article className="glass-card flex h-full flex-col overflow-hidden p-6">
                <div className="flex h-40 items-center justify-center rounded-xl bg-gradient-to-br from-electric-500/10 via-slate-900/[0.02] to-cyan-500/10 dark:via-white/[0.02]">
                  <project.icon className="h-14 w-14 text-electric-500/80 dark:text-electric-400/80" strokeWidth={1.4} />
                </div>
                <span className="mt-5 text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate">
                  {project.category} · {project.client}
                </span>
                <h2 className="mt-1 text-lg font-bold text-night-900 dark:text-white">{project.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-slate-900/[0.04] px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:bg-white/[0.06] dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-start gap-2 border-t pt-4 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500 dark:text-emerald-400" />
                  <p className="text-slate-700 dark:text-slate-300">
                    <span className="font-semibold text-night-900 dark:text-white">Résultat : </span>
                    {project.result}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
