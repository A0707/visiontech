"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Scale } from "lucide-react";
import { useCompareStore, MAX_COMPARE } from "@/lib/compare-store";
import { CompareModal } from "@/components/shop/compare-modal";

/** Barre flottante listant les produits sélectionnés pour comparaison. */
export function CompareBar() {
  const [mounted, setMounted] = useState(false);
  const items = useCompareStore((s) => s.items);
  const remove = useCompareStore((s) => s.remove);
  const clear = useCompareStore((s) => s.clear);
  const openPanel = useCompareStore((s) => s.openPanel);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      <CompareModal />
      <AnimatePresence>
        {items.length > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="fixed inset-x-0 bottom-0 z-40 border-t bg-white/95 backdrop-blur-xl dark:bg-night-900/95"
          >
            <div className="container flex flex-wrap items-center gap-3 py-4">
              <span className="flex items-center gap-2 text-sm font-semibold text-night-900 dark:text-white">
                <Scale className="h-4 w-4 text-electric-600 dark:text-electric-400" />
                Comparateur
                <span className="text-xs font-normal text-slate-500 dark:text-slate">
                  ({items.length}/{MAX_COMPARE})
                </span>
              </span>

              <ul className="flex flex-1 flex-wrap items-center gap-2">
                {items.map((product) => (
                  <li
                    key={product.id}
                    className="flex items-center gap-1.5 rounded-full bg-slate-900/[0.05] py-1 pl-3 pr-1 text-xs dark:bg-white/[0.08]"
                  >
                    <span className="max-w-[160px] truncate text-slate-700 dark:text-slate-200">
                      {product.name}
                    </span>
                    <button
                      onClick={() => remove(product.id)}
                      aria-label={`Retirer ${product.name} du comparateur`}
                      className="flex h-5 w-5 items-center justify-center rounded-full text-slate-500 hover:bg-slate-900/10 hover:text-night-900 dark:hover:bg-white/10 dark:hover:text-white"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2">
                <button
                  onClick={clear}
                  className="text-xs font-medium text-slate-500 hover:text-night-900 dark:text-slate dark:hover:text-white"
                >
                  Tout effacer
                </button>
                <button
                  onClick={openPanel}
                  disabled={items.length < 2}
                  className="flex h-10 items-center justify-center rounded-full bg-electric-500 px-5 text-sm font-semibold text-white transition-colors hover:bg-electric-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {items.length < 2 ? "Ajoutez 2 produits" : `Comparer (${items.length})`}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
