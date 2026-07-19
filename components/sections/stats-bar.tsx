import { Reveal } from "@/components/motion/reveal";
import { AnimatedCounter } from "@/components/motion/animated-counter";

const STATS = [
  { value: 150, suffix: "+", label: "Projets réalisés" },
  { value: 40, suffix: "+", label: "Clients satisfaits" },
  { value: 99.9, suffix: "%", decimals: 1, label: "Disponibilité garantie" },
  { value: 24, suffix: "/7", label: "Support technique" },
];

export function StatsBar() {
  return (
    <section className="relative border-y bg-slate-900/[0.015] dark:bg-white/[0.015]">
      <div className="container">
        <div className="grid grid-cols-2 divide-x divide-slate-900/[0.06] py-10 dark:divide-white/[0.06] md:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="px-4 text-center">
              <p className="text-3xl font-extrabold text-gradient sm:text-4xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals ?? 0} />
              </p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate sm:text-sm">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
