import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, AlertTriangle, Wrench, TrendingUp, Check, Clock } from "lucide-react";
import { portfolioProjects, getProject } from "@/lib/portfolio";
import { Reveal } from "@/components/motion/reveal";
import { Breadcrumb } from "@/components/breadcrumb";
import { CtaSection } from "@/components/sections/cta-section";

export function generateStaticParams() {
  return portfolioProjects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);
  if (!project) return {};

  return {
    title: project.title,
    description: `${project.description} — ${project.result}`,
    alternates: { canonical: `/portfolio/${project.id}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.description,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  const related = portfolioProjects
    .filter((p) => p.category === project.category && p.id !== project.id)
    .slice(0, 2);

  return (
    <article className="section-y">
      <div className="container max-w-4xl">
        <Reveal>
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Réalisations", href: "/portfolio" },
              { label: project.title },
            ]}
          />
          <Link
            href="/portfolio"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-electric-600 hover:text-electric-500 dark:text-electric-400 dark:hover:text-electric-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Toutes les réalisations
          </Link>

          <div className="mt-6 flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-electric-500/15 to-cyan-500/15 text-electric-600 ring-1 ring-slate-900/10 dark:text-electric-400 dark:ring-white/10">
              <project.icon className="h-7 w-7" />
            </span>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                {project.category}
              </span>
              <p className="text-sm text-slate-500 dark:text-slate">{project.sector}</p>
            </div>
          </div>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-night-900 dark:text-white sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {project.description}
          </p>

          <div className="mt-6 flex items-center gap-2 text-sm text-slate-500 dark:text-slate">
            <Clock className="h-4 w-4" />
            Durée du projet : {project.duration}
          </div>
        </Reveal>

        {/* Indicateurs chiffrés */}
        <Reveal delay={0.1} className="mt-10">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="glass-card p-6 text-center">
                <p className="text-3xl font-extrabold text-gradient">{metric.value}</p>
                <p className="mt-1.5 text-xs leading-snug text-slate-600 dark:text-slate">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Problématique */}
        <Reveal delay={0.15} className="mt-12">
          <section>
            <h2 className="flex items-center gap-2.5 text-xl font-bold text-night-900 dark:text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <AlertTriangle className="h-[18px] w-[18px]" />
              </span>
              Problématique
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">
              {project.challenge}
            </p>
          </section>
        </Reveal>

        {/* Solution */}
        <Reveal delay={0.2} className="mt-10">
          <section>
            <h2 className="flex items-center gap-2.5 text-xl font-bold text-night-900 dark:text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-electric-500/10 text-electric-600 dark:text-electric-400">
                <Wrench className="h-[18px] w-[18px]" />
              </span>
              Solution mise en œuvre
            </h2>
            <ul className="mt-4 space-y-3">
              {project.solution.map((step) => (
                <li key={step} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500 dark:text-emerald-400" />
                  <span className="leading-relaxed text-slate-600 dark:text-slate-300">{step}</span>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        {/* Résultat */}
        <Reveal delay={0.25} className="mt-10">
          <section>
            <h2 className="flex items-center gap-2.5 text-xl font-bold text-night-900 dark:text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="h-[18px] w-[18px]" />
              </span>
              Résultat obtenu
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">
              {project.outcome}
            </p>
          </section>
        </Reveal>

        {/* Technologies */}
        <Reveal delay={0.3} className="mt-10">
          <section>
            <h2 className="text-xl font-bold text-night-900 dark:text-white">
              Technologies utilisées
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-slate-900/[0.04] px-3 py-1.5 text-sm font-medium text-slate-700 dark:bg-white/[0.06] dark:text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </Reveal>

        {related.length > 0 && (
          <Reveal delay={0.35} className="mt-16">
            <h2 className="text-xl font-bold text-night-900 dark:text-white">
              Projets similaires
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {related.map((p) => (
                <Link key={p.id} href={`/portfolio/${p.id}`} className="glass-card group p-5">
                  <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate">
                    {p.category}
                  </span>
                  <h3 className="mt-1 font-bold text-night-900 group-hover:text-electric-600 dark:text-white dark:group-hover:text-electric-400">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-600 dark:text-slate">{p.result}</p>
                </Link>
              ))}
            </div>
          </Reveal>
        )}
      </div>

      <div className="mt-16">
        <CtaSection />
      </div>
    </article>
  );
}
