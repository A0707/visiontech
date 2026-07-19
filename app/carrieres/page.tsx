import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, HeartHandshake, GraduationCap, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Carrières",
  description: "Rejoignez les équipes de VisionTech — CUSTOM IT à Casablanca.",
};

const PERKS = [
  { icon: GraduationCap, title: "Montée en compétences", desc: "Certifications éditeurs financées et veille technologique continue." },
  { icon: HeartHandshake, title: "Esprit d'équipe", desc: "Une équipe technique resserrée, où chaque ingénieur a un vrai impact." },
  { icon: Briefcase, title: "Projets variés", desc: "Infrastructure, cloud, cybersécurité : pas de routine, des clients différents chaque semaine." },
];

export default function CareersPage() {
  return (
    <div className="section-y">
      <div className="container max-w-3xl text-center">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
            Carrières
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-night-900 dark:text-white sm:text-5xl">
            Construisez votre carrière IT avec nous
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            VisionTech recrute des ingénieurs passionnés par l&apos;infrastructure, le cloud et la
            cybersécurité. Aucun poste ouvert pour le moment ? Envoyez-nous une candidature
            spontanée.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {PERKS.map((perk, i) => (
            <Reveal key={perk.title} delay={i * 0.1}>
              <div className="glass-card h-full p-6 text-left">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-electric-500/15 to-cyan-500/15 text-electric-600 ring-1 ring-slate-900/10 dark:text-electric-400 dark:ring-white/10">
                  <perk.icon className="h-5 w-5" />
                </span>
                <h2 className="mt-4 font-bold text-night-900 dark:text-white">{perk.title}</h2>
                <p className="mt-1.5 text-sm text-slate-600 dark:text-slate">{perk.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12">
          <Link href="/contact" className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
            Envoyer une candidature spontanée
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
