import { partners } from "@/lib/partners";
import { Reveal } from "@/components/motion/reveal";

export function PartnersSlider() {
  const loop = [...partners, ...partners];

  return (
    <section className="relative border-t py-14">
      <div className="container">
        <Reveal className="mb-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Ils nous font confiance sur le terrain
          </span>
        </Reveal>
      </div>

      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-16 group-hover:[animation-play-state:paused]">
          {loop.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="flex shrink-0 items-center text-xl font-bold tracking-tight text-slate-400 opacity-70 transition-opacity hover:opacity-100 dark:text-slate-500"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
