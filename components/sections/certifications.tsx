import { Award, Clock3 } from "lucide-react";
import { certifications } from "@/lib/certifications";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function Certifications() {
  return (
    <section className="section-y relative border-t">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
            Certifications
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-night-900 dark:text-white sm:text-4xl">
            Des compétences reconnues
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {certifications.map((cert, i) => (
            <Reveal key={cert.name} delay={i * 0.05}>
              <div className="glass-card flex h-full flex-col items-center gap-3 p-5 text-center">
                <span
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl ring-1",
                    cert.status === "Certifié"
                      ? "bg-emerald-500/10 text-emerald-600 ring-emerald-500/20 dark:text-emerald-400"
                      : "bg-amber-500/10 text-amber-600 ring-amber-500/20 dark:text-amber-400"
                  )}
                >
                  {cert.status === "Certifié" ? (
                    <Award className="h-6 w-6" />
                  ) : (
                    <Clock3 className="h-6 w-6" />
                  )}
                </span>
                <p className="text-sm font-semibold text-night-900 dark:text-white">{cert.name}</p>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-[11px] font-medium",
                    cert.status === "Certifié"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  )}
                >
                  {cert.status}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
