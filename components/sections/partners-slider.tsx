import { partners } from "@/lib/partners";
import { Reveal } from "@/components/motion/reveal";

export function PartnersSlider() {
  const loop = [...partners, ...partners];

  return (
    <section className="relative border-t py-14">
      <div className="container">
        <Reveal className="mb-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Technologies que nous déployons
          </span>
        </Reveal>
      </div>

      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul className="flex w-max animate-marquee items-center gap-16 group-hover:[animation-play-state:paused]">
          {loop.map((partner, i) => (
            <li key={`${partner.name}-${i}`} className="flex shrink-0 items-center">
              {partner.logo ? (
                <img
                  src={partner.logo}
                  alt={partner.name}
                  loading="lazy"
                  className="h-8 w-auto opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 dark:opacity-50 dark:invert dark:hover:opacity-90"
                />
              ) : (
                <span
                  aria-hidden={i >= partners.length}
                  className="text-xl font-bold tracking-tight text-slate-400 opacity-70 transition-opacity hover:opacity-100 dark:text-slate-500"
                >
                  {partner.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
