import { MapPin, Headset, Zap, Puzzle, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const TRUST_ITEMS = [
  { icon: MapPin, label: "Intervention partout au Maroc" },
  { icon: Headset, label: "Support 24/7" },
  { icon: Zap, label: "Réponse rapide" },
  { icon: Puzzle, label: "Solutions sur mesure" },
  { icon: ShieldCheck, label: "Sécurité renforcée" },
];

export function TrustBar() {
  return (
    <section className="relative border-y bg-slate-900/[0.015] py-6 dark:bg-white/[0.015]">
      <div className="container">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
          {TRUST_ITEMS.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.06}>
              <li className="flex flex-col items-center gap-2 text-center lg:flex-row lg:gap-3 lg:text-left">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-electric-500/15 to-cyan-500/15 text-electric-600 dark:text-electric-400">
                  <item.icon className="h-[18px] w-[18px]" />
                </span>
                <span className="text-xs font-medium leading-snug text-slate-700 dark:text-slate-300">
                  {item.label}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
