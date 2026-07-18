import type { Metadata } from "next";
import Link from "next/link";
import { Check, Minus, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { CtaSection } from "@/components/sections/cta-section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Maintenance",
  description:
    "Comparez nos contrats de maintenance informatique : Essentiel, Business et Premium. Support réactif, supervision proactive et interventions sur site à Casablanca.",
};

type PlanRow = {
  label: string;
  essentiel: boolean | string;
  business: boolean | string;
  premium: boolean | string;
};

const ROWS: PlanRow[] = [
  { label: "Support à distance", essentiel: true, business: true, premium: true },
  { label: "Horaires de support", essentiel: "9h - 18h (jours ouvrés)", business: "7h - 20h (jours ouvrés)", premium: "24/7" },
  { label: "Délai de première réponse", essentiel: "8h", business: "4h", premium: "1h" },
  { label: "Interventions sur site", essentiel: "Sur devis", business: "2 / mois incluses", premium: "Illimitées" },
  { label: "Supervision proactive (monitoring)", essentiel: false, business: true, premium: true },
  { label: "Sauvegarde & vérification quotidienne", essentiel: false, business: true, premium: true },
  { label: "Mises à jour & correctifs de sécurité", essentiel: "Trimestriel", business: "Mensuel", premium: "Continu" },
  { label: "Audit de sécurité annuel", essentiel: false, business: false, premium: true },
  { label: "Supervision SOC / SIEM", essentiel: false, business: false, premium: true },
  { label: "Gestionnaire de compte dédié", essentiel: false, business: false, premium: true },
  { label: "Rapport mensuel détaillé", essentiel: false, business: true, premium: true },
];

const PLANS = [
  { key: "essentiel" as const, name: "Essentiel", price: "3 900", desc: "Pour les petites structures", highlighted: false },
  { key: "business" as const, name: "Business", price: "8 500", desc: "Le plus populaire", highlighted: true },
  { key: "premium" as const, name: "Premium", price: "18 900", desc: "Infrastructures critiques", highlighted: false },
];

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="mx-auto h-4 w-4 text-emerald-500 dark:text-emerald-400" />
    ) : (
      <Minus className="mx-auto h-4 w-4 text-slate-900/15 dark:text-white/15" />
    );
  }
  return <span className="text-xs text-night-900/80 dark:text-white/80">{value}</span>;
}

export default function MaintenancePage() {
  return (
    <div>
      <section className="section-y relative">
        <div className="container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
              Maintenance
            </span>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-night-900 dark:text-white sm:text-5xl">
              Un contrat de maintenance adapté à votre activité
            </h1>
            <p className="mt-4 text-slate-600 dark:text-slate">
              Trois formules pensées pour couvrir tous les niveaux de criticité, du
              support de base à la supervision SOC 24/7.
            </p>
          </Reveal>

          {/* Plan cards (mobile-friendly summary) */}
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
            {PLANS.map((plan, i) => (
              <Reveal key={plan.key} delay={i * 0.1}>
                <div
                  className={cn(
                    "glass-card relative flex h-full flex-col p-7",
                    plan.highlighted && "border-electric-500/50 shadow-glow"
                  )}
                >
                  {plan.highlighted && (
                    <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-electric-500 px-3 py-1 text-[11px] font-semibold text-white">
                      <Sparkles className="h-3 w-3" />
                      Recommandé
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-night-900 dark:text-white">{plan.name}</h3>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate">{plan.desc}</p>
                  <p className="mt-5 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-night-900 dark:text-white">{plan.price}</span>
                    <span className="text-sm text-slate-600 dark:text-slate">MAD / mois</span>
                  </p>
                  <Link
                    href="/contact"
                    className={cn(
                      buttonVariants({ variant: plan.highlighted ? "primary" : "outline" }),
                      "mt-6 w-full"
                    )}
                  >
                    Choisir {plan.name}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Comparison table */}
          <Reveal delay={0.2} className="mt-16 overflow-x-auto">
            <table className="w-full min-w-[640px] border-separate border-spacing-0 overflow-hidden rounded-2xl">
              <thead>
                <tr>
                  <th className="glass-card rounded-tl-2xl border-b-0 p-4 text-left text-sm font-semibold text-night-900 dark:text-white">
                    Fonctionnalités
                  </th>
                  {PLANS.map((plan, i) => (
                    <th
                      key={plan.key}
                      className={cn(
                        "glass-card border-b-0 p-4 text-center text-sm font-semibold text-night-900 dark:text-white",
                        i === PLANS.length - 1 && "rounded-tr-2xl",
                        plan.highlighted && "text-electric-600 dark:text-electric-400"
                      )}
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, idx) => (
                  <tr key={row.label} className={idx % 2 === 0 ? "bg-slate-900/[0.015] dark:bg-white/[0.015]" : ""}>
                    <td className="border-t p-4 text-sm text-night-900/80 dark:text-white/80">
                      {row.label}
                    </td>
                    <td className="border-t p-4 text-center">
                      <Cell value={row.essentiel} />
                    </td>
                    <td className="border-t bg-electric-500/[0.04] p-4 text-center">
                      <Cell value={row.business} />
                    </td>
                    <td className="border-t p-4 text-center">
                      <Cell value={row.premium} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
