import type { Metadata } from "next";
import { Target, Eye, HeartHandshake, Search, PenTool, Rocket, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez VisionTech — CUSTOM IT : notre mission, nos valeurs, notre méthode de travail et l'équipe d'ingénieurs qui accompagne les entreprises de Casablanca.",
  alternates: { canonical: "/a-propos" },
};

const VALUES = [
  {
    icon: Target,
    title: "Notre mission",
    description:
      "Rendre l'infrastructure IT des entreprises marocaines aussi fiable, sécurisée et évolutive que celle des plus grands groupes internationaux.",
  },
  {
    icon: Eye,
    title: "Notre vision",
    description:
      "Devenir la référence régionale de l'intégration IT sur mesure, reconnue pour la rigueur de ses ingénieurs et la transparence de sa relation client.",
  },
  {
    icon: HeartHandshake,
    title: "Nos valeurs",
    description:
      "Exigence technique, honnêteté dans le conseil, réactivité assumée et respect de l'engagement pris — sans exception.",
  },
];

const METHOD = [
  { icon: Search, step: "01", title: "Audit & diagnostic", desc: "Analyse complète de votre infrastructure existante et de vos besoins métier." },
  { icon: PenTool, step: "02", title: "Recommandation", desc: "Proposition d'architecture sur mesure avec devis détaillé et transparent." },
  { icon: Rocket, step: "03", title: "Déploiement", desc: "Mise en œuvre par nos ingénieurs certifiés, sans interruption d'activité." },
  { icon: TrendingUp, step: "04", title: "Suivi & optimisation", desc: "Supervision continue et amélioration continue de vos systèmes." },
];

const TEAM = [
  { name: "Yassine Fassi", role: "Fondateur & Directeur technique" },
  { name: "Amine Chraibi", role: "Responsable Infrastructure" },
  { name: "Salma Ouazzani", role: "Responsable Cybersécurité" },
  { name: "Réda El Amrani", role: "Responsable Support & Maintenance" },
];

const TIMELINE = [
  { year: "2016", title: "Création de VisionTech", desc: "Lancement de l'activité d'intégration IT à Casablanca." },
  { year: "2019", title: "Pôle Cybersécurité", desc: "Constitution d'une équipe dédiée à l'audit et à la protection des SI." },
  { year: "2022", title: "Offre Cloud & Hybride", desc: "Développement des compétences de migration et gestion cloud." },
  { year: "2024", title: "Supervision 24/7", desc: "Mise en place d'une astreinte continue pour les infrastructures critiques." },
  { year: "2026", title: "150+ projets livrés", desc: "Un portefeuille de clients fidèles, du PME au grand compte." },
];

export default function AboutPage() {
  return (
    <div>
      <section className="section-y relative overflow-hidden">
        <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
        <div className="container relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
              Qui sommes-nous
            </span>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-night-900 dark:text-white sm:text-5xl">
              L&apos;équipe derrière votre infrastructure
            </h1>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              VisionTech — CUSTOM IT est un intégrateur IT basé à Casablanca, spécialisé dans
              l&apos;infrastructure, le cloud et la cybersécurité pour les entreprises marocaines.
              Nous concevons des systèmes d&apos;information robustes, sécurisés et pensés pour
              accompagner votre croissance sur le long terme.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y relative border-t">
        <div className="container">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="glass-card h-full p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-electric-500/15 to-cyan-500/15 text-electric-600 ring-1 ring-slate-900/10 dark:text-electric-400 dark:ring-white/10">
                    <v.icon className="h-6 w-6" />
                  </span>
                  <h2 className="mt-5 text-lg font-bold text-night-900 dark:text-white">{v.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate">
                    {v.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y relative border-t bg-slate-900/[0.015] dark:bg-white/[0.015]">
        <div className="container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
              Méthode
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-night-900 dark:text-white sm:text-4xl">
              Notre façon de travailler
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {METHOD.map((m, i) => (
              <Reveal key={m.step} delay={i * 0.1}>
                <div className="glass-card relative h-full p-6">
                  <span className="text-4xl font-extrabold text-slate-900/10 dark:text-white/10">{m.step}</span>
                  <span className="mt-2 flex h-10 w-10 items-center justify-center rounded-lg bg-electric-500/10 text-electric-600 dark:text-electric-400">
                    <m.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-night-900 dark:text-white">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate">{m.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y relative border-t">
        <div className="container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
              Équipe
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-night-900 dark:text-white sm:text-4xl">
              Les experts à votre service
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.08}>
                <div className="glass-card flex h-full flex-col items-center gap-3 p-6 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-electric-500 to-cyan-500 text-xl font-bold text-white">
                    {member.name.split(" ").map((p) => p.charAt(0)).join("")}
                  </span>
                  <div>
                    <p className="font-semibold text-night-900 dark:text-white">{member.name}</p>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate">{member.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y relative border-t bg-slate-900/[0.015] dark:bg-white/[0.015]">
        <div className="container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
              Parcours
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-night-900 dark:text-white sm:text-4xl">
              Notre histoire
            </h2>
          </Reveal>

          <div className="relative mx-auto mt-14 max-w-2xl">
            <div className="absolute bottom-0 left-[15px] top-0 w-px bg-slate-900/10 dark:bg-white/10 sm:left-1/2" />
            <div className="space-y-10">
              {TIMELINE.map((item, i) => (
                <Reveal key={item.year} delay={i * 0.08}>
                  <div className="relative flex gap-6 sm:justify-center sm:gap-0">
                    <div
                      className={
                        "flex sm:w-1/2 " +
                        (i % 2 === 0 ? "sm:order-1 sm:justify-end sm:pr-10" : "sm:order-3 sm:pl-10")
                      }
                    >
                      <div className="glass-card p-5 sm:max-w-xs">
                        <p className="text-sm font-bold text-electric-600 dark:text-electric-400">{item.year}</p>
                        <p className="mt-1 font-semibold text-night-900 dark:text-white">{item.title}</p>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate">{item.desc}</p>
                      </div>
                    </div>
                    <span className="absolute left-[9px] top-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-night-900 bg-electric-500 dark:border-white sm:left-1/2 sm:-translate-x-1/2 sm:order-2" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
