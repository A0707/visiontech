import { Quote, Star } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const TESTIMONIALS = [
  {
    quote:
      "VisionTech a entièrement restructuré notre infrastructure réseau. Zéro downtime depuis la migration, et un support qui répond en quelques minutes.",
    name: "Yasmine El Amrani",
    role: "DSI, Groupe industriel — Casablanca",
  },
  {
    quote:
      "Leur audit de cybersécurité a révélé des failles critiques que personne n'avait détectées. L'équipe est rigoureuse et pédagogue.",
    name: "Karim Benjelloun",
    role: "CTO, Fintech — Casablanca",
  },
  {
    quote:
      "Le contrat de maintenance premium nous a fait gagner un temps considérable. Interventions rapides et proactives, on recommande sans hésiter.",
    name: "Sanae Idrissi",
    role: "Directrice Générale, Cabinet de conseil",
  },
];

export function Testimonials() {
  return (
    <section className="section-y relative border-t">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
            Témoignages
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-night-900 dark:text-white sm:text-4xl">
            Ils nous font confiance
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div className="glass-card flex h-full flex-col p-6">
                <Quote className="h-7 w-7 text-electric-500/40" />
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-electric-500 to-cyan-500 text-sm font-bold text-white">
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-night-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
