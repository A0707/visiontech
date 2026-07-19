"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Minus, Plus, Info, ArrowRight, RotateCcw } from "lucide-react";
import {
  quoteOptions,
  MAINTENANCE_RATE,
  ESTIMATE_MARGIN,
  type QuoteOption,
} from "@/lib/quote-options";
import { Reveal } from "@/components/motion/reveal";
import { Breadcrumb } from "@/components/breadcrumb";
import { buttonVariants } from "@/components/ui/button";
import { formatMAD, cn } from "@/lib/utils";

interface Selection {
  enabled: boolean;
  units: number;
}

export default function QuoteCalculatorPage() {
  const [selections, setSelections] = useState<Record<string, Selection>>(() =>
    Object.fromEntries(
      quoteOptions.map((o) => [o.id, { enabled: false, units: o.defaultUnits }])
    )
  );
  const [withMaintenance, setWithMaintenance] = useState(false);

  function toggle(option: QuoteOption) {
    setSelections((prev) => ({
      ...prev,
      [option.id]: { ...prev[option.id], enabled: !prev[option.id].enabled },
    }));
  }

  function setUnits(option: QuoteOption, units: number) {
    const clamped = Math.max(1, Math.min(option.maxUnits, units));
    setSelections((prev) => ({
      ...prev,
      [option.id]: { ...prev[option.id], units: clamped },
    }));
  }

  function reset() {
    setSelections(
      Object.fromEntries(
        quoteOptions.map((o) => [o.id, { enabled: false, units: o.defaultUnits }])
      )
    );
    setWithMaintenance(false);
  }

  const { lines, subtotal, maintenance, total, low, high } = useMemo(() => {
    const lines = quoteOptions
      .filter((o) => selections[o.id]?.enabled)
      .map((o) => {
        const units = selections[o.id].units;
        const amount = o.basePrice + o.unitPrice * units;
        return { option: o, units, amount };
      });

    const subtotal = lines.reduce((sum, l) => sum + l.amount, 0);
    const maintenance = withMaintenance ? Math.round(subtotal * MAINTENANCE_RATE) : 0;
    const total = subtotal + maintenance;

    return {
      lines,
      subtotal,
      maintenance,
      total,
      low: Math.round((total * (1 - ESTIMATE_MARGIN)) / 500) * 500,
      high: Math.round((total * (1 + ESTIMATE_MARGIN)) / 500) * 500,
    };
  }, [selections, withMaintenance]);

  const hasSelection = lines.length > 0;

  return (
    <div className="section-y">
      <div className="container">
        <Reveal>
          <Breadcrumb
            items={[{ label: "Accueil", href: "/" }, { label: "Estimation de budget" }]}
          />
        </Reveal>

        <Reveal className="mx-auto mt-6 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
            Calculateur
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-night-900 dark:text-white sm:text-5xl">
            Estimez le budget de votre projet
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Sélectionnez les prestations qui vous intéressent pour obtenir un ordre de
            grandeur immédiat, avant même de nous contacter.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Sélection */}
          <div className="space-y-4 lg:col-span-3">
            {quoteOptions.map((option, i) => {
              const selection = selections[option.id];
              const active = selection.enabled;
              return (
                <Reveal key={option.id} delay={Math.min(i, 5) * 0.05}>
                  <div
                    className={cn(
                      "glass-card p-5 transition-colors",
                      active && "ring-1 ring-electric-500/30"
                    )}
                  >
                    {/* input et label frères (htmlFor) : imbriquer l'input dans le
                        label fait suivre le clic deux fois et annule le basculement. */}
                    <div className="flex items-start gap-3">
                      <input
                        id={`option-${option.id}`}
                        type="checkbox"
                        checked={active}
                        onChange={() => toggle(option)}
                        className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded accent-electric-500"
                      />
                      <label
                        htmlFor={`option-${option.id}`}
                        className="flex flex-1 cursor-pointer items-start gap-3"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-electric-500/15 to-cyan-500/15 text-electric-600 dark:text-electric-400">
                          <option.icon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-semibold text-night-900 dark:text-white">
                            {option.label}
                          </span>
                          <span className="mt-0.5 block text-sm text-slate-600 dark:text-slate">
                            {option.description}
                          </span>
                        </span>
                      </label>
                    </div>

                    {active && (
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
                        <span className="text-sm text-slate-600 dark:text-slate">
                          Nombre de {option.unitLabel}
                          {selection.units > 1 ? "s" : ""}
                        </span>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 items-center rounded-full border">
                            <button
                              onClick={() => setUnits(option, selection.units - 1)}
                              aria-label={`Diminuer le nombre de ${option.unitLabel}`}
                              className="flex h-full w-10 items-center justify-center text-night-900 hover:bg-slate-900/[0.06] dark:text-white dark:hover:bg-white/[0.06]"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <input
                              type="number"
                              min={1}
                              max={option.maxUnits}
                              value={selection.units}
                              onChange={(e) => setUnits(option, Number(e.target.value))}
                              aria-label={`Nombre de ${option.unitLabel}`}
                              className="w-14 bg-transparent text-center text-sm font-medium text-night-900 outline-none dark:text-white [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <button
                              onClick={() => setUnits(option, selection.units + 1)}
                              aria-label={`Augmenter le nombre de ${option.unitLabel}`}
                              className="flex h-full w-10 items-center justify-center text-night-900 hover:bg-slate-900/[0.06] dark:text-white dark:hover:bg-white/[0.06]"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="w-28 text-right text-sm font-bold text-night-900 dark:text-white">
                            {formatMAD(option.basePrice + option.unitPrice * selection.units)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}

            <Reveal delay={0.3}>
              <div
                className={cn(
                  "glass-card flex items-start gap-3 p-5 transition-colors",
                  withMaintenance && "ring-1 ring-electric-500/30"
                )}
              >
                <input
                  id="option-maintenance"
                  type="checkbox"
                  checked={withMaintenance}
                  onChange={(e) => setWithMaintenance(e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded accent-electric-500"
                />
                <label htmlFor="option-maintenance" className="flex-1 cursor-pointer">
                  <span className="block font-semibold text-night-900 dark:text-white">
                    Ajouter un contrat de maintenance annuel
                  </span>
                  <span className="mt-0.5 block text-sm text-slate-600 dark:text-slate">
                    Supervision, mises à jour et support prioritaire —{" "}
                    {Math.round(MAINTENANCE_RATE * 100)} % du montant matériel par an.
                  </span>
                </label>
              </div>
            </Reveal>
          </div>

          {/* Récapitulatif */}
          <div className="lg:col-span-2">
            <div className="glass-card sticky top-24 p-6">
              <h2 className="text-lg font-bold text-night-900 dark:text-white">
                Votre estimation
              </h2>

              {!hasSelection ? (
                <p className="mt-4 text-sm text-slate-600 dark:text-slate">
                  Sélectionnez au moins une prestation pour voir une estimation.
                </p>
              ) : (
                <>
                  <ul className="mt-4 space-y-3 border-b pb-4">
                    {lines.map((line) => (
                      <li key={line.option.id} className="flex items-start justify-between gap-3 text-sm">
                        <span className="min-w-0 flex-1 text-slate-600 dark:text-slate">
                          {line.option.label}
                          <span className="block text-xs text-slate-500 dark:text-slate-400">
                            {line.units} {line.option.unitLabel}
                            {line.units > 1 ? "s" : ""}
                          </span>
                        </span>
                        <span className="shrink-0 font-medium text-night-900 dark:text-white">
                          {formatMAD(line.amount)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-2 border-b py-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate">Sous-total</span>
                      <span className="font-medium text-night-900 dark:text-white">
                        {formatMAD(subtotal)}
                      </span>
                    </div>
                    {withMaintenance && (
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate">
                          Maintenance annuelle
                        </span>
                        <span className="font-medium text-night-900 dark:text-white">
                          {formatMAD(maintenance)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="py-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate">
                      Fourchette estimée
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-night-900 dark:text-white">
                      {formatMAD(low)} – {formatMAD(high)}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate">
                      Prix HT, hors livraison
                    </p>
                  </div>

                  <div className="flex items-start gap-2 rounded-xl bg-amber-500/10 p-3 text-xs leading-relaxed text-amber-700 dark:text-amber-400">
                    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <p>
                      Estimation indicative basée sur des configurations standard. Le
                      montant définitif dépend de votre infrastructure existante et fait
                      l&apos;objet d&apos;un devis après audit.
                    </p>
                  </div>

                  <Link
                    href="/contact"
                    className={cn(buttonVariants({ variant: "primary" }), "mt-4 w-full")}
                  >
                    Obtenir un devis précis
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <button
                    onClick={reset}
                    className="mt-3 flex w-full items-center justify-center gap-1.5 text-xs font-medium text-slate-500 hover:text-night-900 dark:text-slate dark:hover:text-white"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Réinitialiser
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
