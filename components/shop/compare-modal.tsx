"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Star, ShoppingCart, Minus } from "lucide-react";
import { useCompareStore } from "@/lib/compare-store";
import { useCartStore } from "@/lib/store";
import { discountPercent, isPromo, STOCK_LABELS } from "@/lib/products";
import { formatMAD, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const STOCK_TEXT: Record<string, string> = {
  "in-stock": "text-emerald-600 dark:text-emerald-400",
  limited: "text-amber-600 dark:text-amber-400",
  "on-order": "text-slate-500 dark:text-slate-400",
};

export function CompareModal() {
  const isOpen = useCompareStore((s) => s.isOpen);
  const closePanel = useCompareStore((s) => s.closePanel);
  const items = useCompareStore((s) => s.items);
  const remove = useCompareStore((s) => s.remove);
  const addItem = useCartStore((s) => s.addItem);

  // Fermeture au clavier + blocage du défilement arrière-plan.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [isOpen, closePanel]);

  // Union ordonnée des libellés de specs présents dans les produits comparés.
  const specLabels: string[] = [];
  items.forEach((product) => {
    product.specs?.forEach((spec) => {
      if (!specLabels.includes(spec.label)) specLabels.push(spec.label);
    });
  });

  function specValue(productIndex: number, label: string) {
    return items[productIndex].specs?.find((s) => s.label === label)?.value;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePanel}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Comparateur de produits"
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 top-[4vh] z-50 mx-auto flex max-h-[92vh] max-w-6xl flex-col overflow-hidden rounded-2xl border bg-white shadow-2xl dark:bg-night-900 sm:inset-x-6"
          >
            <div className="flex shrink-0 items-center justify-between border-b px-6 py-4">
              <h2 className="text-lg font-bold text-night-900 dark:text-white">
                Comparaison de {items.length} produits
              </h2>
              <button
                onClick={closePanel}
                aria-label="Fermer le comparateur"
                className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 hover:bg-slate-900/[0.06] hover:text-night-900 dark:text-slate dark:hover:bg-white/[0.06] dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="sticky top-0 z-10 bg-white dark:bg-night-900">
                  <tr>
                    <th className="w-40 border-b p-4 text-left align-bottom text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate">
                      Critère
                    </th>
                    {items.map((product) => (
                      <th key={product.id} className="min-w-[180px] border-b p-4 align-bottom">
                        <div className="flex flex-col gap-2 text-left">
                          <button
                            onClick={() => remove(product.id)}
                            aria-label={`Retirer ${product.name}`}
                            className="self-end text-slate-400 hover:text-red-500"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                          <span className="text-[10px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate">
                            {product.category}
                          </span>
                          <Link
                            href={`/boutique/${product.id}`}
                            className="text-sm font-bold leading-snug text-night-900 hover:text-electric-600 dark:text-white dark:hover:text-electric-400"
                          >
                            {product.name}
                          </Link>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-slate-900/[0.015] dark:bg-white/[0.015]">
                    <th scope="row" className="border-b p-4 text-left font-medium text-slate-600 dark:text-slate">
                      Prix
                    </th>
                    {items.map((product) => (
                      <td key={product.id} className="border-b p-4 align-top">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <span className="text-base font-extrabold text-night-900 dark:text-white">
                            {formatMAD(product.price)}
                          </span>
                          {isPromo(product) && (
                            <Badge variant="solid-success">-{discountPercent(product)}%</Badge>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th scope="row" className="border-b p-4 text-left font-medium text-slate-600 dark:text-slate">
                      Note
                    </th>
                    {items.map((product) => (
                      <td key={product.id} className="border-b p-4 align-top">
                        <span className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-medium text-night-900 dark:text-white">
                            {product.rating}
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate">
                            ({product.reviews})
                          </span>
                        </span>
                      </td>
                    ))}
                  </tr>

                  <tr className="bg-slate-900/[0.015] dark:bg-white/[0.015]">
                    <th scope="row" className="border-b p-4 text-left font-medium text-slate-600 dark:text-slate">
                      Disponibilité
                    </th>
                    {items.map((product) => (
                      <td key={product.id} className="border-b p-4 align-top">
                        <span className={cn("font-medium", STOCK_TEXT[product.stock])}>
                          {STOCK_LABELS[product.stock]}
                        </span>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th scope="row" className="border-b p-4 text-left font-medium text-slate-600 dark:text-slate">
                      Installation VisionTech
                    </th>
                    {items.map((product) => (
                      <td key={product.id} className="border-b p-4 align-top text-night-900 dark:text-white">
                        {product.installationPrice ? (
                          `+${formatMAD(product.installationPrice)}`
                        ) : (
                          <Minus className="h-4 w-4 text-slate-400" />
                        )}
                      </td>
                    ))}
                  </tr>

                  {specLabels.map((label, i) => (
                    <tr
                      key={label}
                      className={i % 2 === 0 ? "bg-slate-900/[0.015] dark:bg-white/[0.015]" : ""}
                    >
                      <th
                        scope="row"
                        className="border-b p-4 text-left font-medium text-slate-600 dark:text-slate"
                      >
                        {label}
                      </th>
                      {items.map((product, idx) => {
                        const value = specValue(idx, label);
                        return (
                          <td
                            key={product.id}
                            className="border-b p-4 align-top text-night-900 dark:text-white"
                          >
                            {value ?? <Minus className="h-4 w-4 text-slate-400" />}
                          </td>
                        );
                      })}
                    </tr>
                  ))}

                  <tr>
                    <td className="p-4" />
                    {items.map((product) => (
                      <td key={product.id} className="p-4 align-top">
                        <button
                          onClick={() => addItem(product)}
                          className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-electric-500 text-xs font-semibold text-white transition-colors hover:bg-electric-600"
                        >
                          <ShoppingCart className="h-3.5 w-3.5" />
                          Ajouter
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
