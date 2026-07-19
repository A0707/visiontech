import { Network, ShieldCheck, Zap, Puzzle, Headset, Cpu } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const REASONS = [
  {
    icon: Network,
    title: "Expertise Infrastructure",
    description: "Une équipe d'ingénieurs certifiés maîtrisant réseaux, serveurs et virtualisation.",
  },
  {
    icon: ShieldCheck,
    title: "Cybersécurité",
    description: "Protection multicouche et supervision continue face aux menaces actuelles.",
  },
  {
    icon: Zap,
    title: "Réactivité",
    description: "Un support qui répond vite, avec des délais d'intervention garantis contractuellement.",
  },
  {
    icon: Puzzle,
    title: "Solutions sur mesure",
    description: "Chaque architecture est pensée pour votre activité, pas de solution générique.",
  },
  {
    icon: Headset,
    title: "Support 24/7",
    description: "Une astreinte disponible en continu pour vos systèmes les plus critiques.",
  },
  {
    icon: Cpu,
    title: "Technologies modernes",
    description: "Des partenariats avec les leaders du secteur pour des solutions à jour et pérennes.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-y relative border-t">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
            Pourquoi VisionTech
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-night-900 dark:text-white sm:text-4xl">
            Un partenaire IT en qui investir
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Ce qui distingue VisionTech dans l&apos;accompagnement des entreprises marocaines.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason, i) => (
            <Reveal key={reason.title} delay={i * 0.08}>
              <div className="glass-card group flex h-full items-start gap-4 p-6 transition-transform duration-300 hover:-translate-y-1">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-electric-500/15 to-cyan-500/15 text-electric-600 ring-1 ring-slate-900/10 dark:text-electric-400 dark:ring-white/10">
                  <reason.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-bold text-night-900 dark:text-white">{reason.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate">
                    {reason.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
