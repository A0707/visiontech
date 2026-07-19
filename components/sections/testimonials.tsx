"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    quote:
      "VisionTech a entièrement restructuré notre infrastructure réseau. Zéro downtime depuis la migration, et un support qui répond en quelques minutes.",
    name: "Yasmine El Amrani",
    role: "DSI",
    company: "Groupe industriel — Casablanca",
    rating: 5,
  },
  {
    quote:
      "Leur audit de cybersécurité a révélé des failles critiques que personne n'avait détectées. L'équipe est rigoureuse et pédagogue.",
    name: "Karim Benjelloun",
    role: "CTO",
    company: "Fintech — Casablanca",
    rating: 5,
  },
  {
    quote:
      "Le contrat de maintenance premium nous a fait gagner un temps considérable. Interventions rapides et proactives, on recommande sans hésiter.",
    name: "Sanae Idrissi",
    role: "Directrice Générale",
    company: "Cabinet de conseil",
    rating: 4,
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  function go(next: number) {
    setDirection(next > index ? 1 : -1);
    setIndex((next + TESTIMONIALS.length) % TESTIMONIALS.length);
  }

  const t = TESTIMONIALS[index];

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

        <div className="relative mx-auto mt-14 max-w-2xl">
          <div className="relative min-h-[280px] overflow-hidden sm:min-h-[240px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card flex flex-col items-center p-8 text-center sm:p-10"
              >
                <Quote className="h-8 w-8 text-electric-500/40" />
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={cn(
                        "h-4 w-4",
                        idx < t.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-transparent text-slate-300 dark:text-slate-600"
                      )}
                    />
                  ))}
                </div>
                <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-electric-500 to-cyan-500 text-base font-bold text-white">
                    {t.name.charAt(0)}
                  </span>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-night-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => go(index - 1)}
              aria-label="Témoignage précédent"
              className="flex h-9 w-9 items-center justify-center rounded-full border text-slate-600 transition-colors hover:bg-slate-900/[0.06] hover:text-night-900 dark:text-slate dark:hover:bg-white/[0.06] dark:hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((item, i) => (
                <button
                  key={item.name}
                  onClick={() => go(i)}
                  aria-label={`Aller au témoignage ${i + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === index ? "w-6 bg-electric-500" : "w-1.5 bg-slate-900/15 dark:bg-white/15"
                  )}
                />
              ))}
            </div>
            <button
              onClick={() => go(index + 1)}
              aria-label="Témoignage suivant"
              className="flex h-9 w-9 items-center justify-center rounded-full border text-slate-600 transition-colors hover:bg-slate-900/[0.06] hover:text-night-900 dark:text-slate dark:hover:bg-white/[0.06] dark:hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
