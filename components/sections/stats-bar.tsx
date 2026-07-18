import { Reveal } from "@/components/motion/reveal";

const STATS = [
  { value: "150+", label: "Entreprises accompagnées" },
  { value: "99.98%", label: "Disponibilité infrastructure" },
  { value: "24/7", label: "Support & supervision" },
  { value: "10 ans", label: "D'expertise IT à Casablanca" },
];

export function StatsBar() {
  return (
    <section className="relative border-y bg-slate-900/[0.015] dark:bg-white/[0.015]">
      <div className="container">
        <div className="grid grid-cols-2 divide-x divide-slate-900/[0.06] py-10 dark:divide-white/[0.06] md:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="px-4 text-center">
              <p className="text-3xl font-extrabold text-gradient sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate sm:text-sm">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
