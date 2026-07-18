"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCartStore, useCartTotal } from "@/lib/store";
import { formatMAD, cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function CartDrawer() {
  const [mounted, setMounted] = useState(false);
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const total = useCartTotal();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l bg-white dark:bg-night-900 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b px-6 py-5">
              <h2 className="flex items-center gap-2 text-lg font-bold text-night-900 dark:text-white">
                <ShoppingBag className="h-5 w-5 text-electric-500 dark:text-electric-400" />
                Votre panier
              </h2>
              <button
                onClick={closeCart}
                aria-label="Fermer le panier"
                className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 hover:bg-slate-900/[0.06] hover:text-night-900 dark:text-slate dark:hover:bg-white/[0.06] dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <ShoppingBag className="h-12 w-12 text-slate-900/10 dark:text-white/10" />
                  <p className="text-sm text-slate-600 dark:text-slate">Votre panier est vide.</p>
                  <Link
                    href="/boutique"
                    onClick={closeCart}
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-2")}
                  >
                    Découvrir la boutique
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map(({ product, quantity }) => (
                    <li
                      key={product.id}
                      className="flex gap-3 rounded-xl border bg-slate-900/[0.02] p-3 dark:bg-white/[0.02]"
                    >
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-electric-500/20 to-cyan-500/20 text-2xl font-bold text-electric-600 dark:text-electric-400">
                        {product.name.charAt(0)}
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium leading-tight text-night-900 dark:text-white">
                            {product.name}
                          </p>
                          <button
                            onClick={() => removeItem(product.id)}
                            aria-label="Retirer l'article"
                            className="shrink-0 text-slate-500 hover:text-red-500 dark:text-slate dark:hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate">{formatMAD(product.price)}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-md border text-night-900 hover:bg-slate-900/[0.06] dark:text-white dark:hover:bg-white/[0.06]"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm text-night-900 dark:text-white">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-md border text-night-900 hover:bg-slate-900/[0.06] dark:text-white dark:hover:bg-white/[0.06]"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t px-6 py-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate">Total</span>
                  <span className="text-xl font-bold text-night-900 dark:text-white">{formatMAD(total)}</span>
                </div>
                <Link
                  href="/contact"
                  onClick={closeCart}
                  className={cn(buttonVariants({ variant: "primary" }), "w-full")}
                >
                  Demander un devis pour ce panier
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
