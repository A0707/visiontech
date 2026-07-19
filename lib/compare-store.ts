"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./products";

/** Au-delà de 4 produits, le tableau devient illisible sur desktop. */
export const MAX_COMPARE = 4;

interface CompareState {
  items: Product[];
  isOpen: boolean;
  toggle: (product: Product) => void;
  remove: (productId: string) => void;
  clear: () => void;
  openPanel: () => void;
  closePanel: () => void;
  has: (productId: string) => boolean;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      toggle: (product) => {
        const items = get().items;
        const exists = items.some((p) => p.id === product.id);
        if (exists) {
          set({ items: items.filter((p) => p.id !== product.id) });
          return;
        }
        if (items.length >= MAX_COMPARE) return;
        set({ items: [...items, product] });
      },
      remove: (productId) => set({ items: get().items.filter((p) => p.id !== productId) }),
      clear: () => set({ items: [], isOpen: false }),
      openPanel: () => set({ isOpen: true }),
      closePanel: () => set({ isOpen: false }),
      has: (productId) => get().items.some((p) => p.id === productId),
    }),
    {
      name: "visiontech-compare",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
