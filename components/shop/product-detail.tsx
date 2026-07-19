"use client";

import { useState } from "react";
import { Star, ShoppingCart, Minus, Plus, Server, Router, Shield, Laptop, Cloud, Wifi, BatteryCharging, HardDrive, Lock } from "lucide-react";
import type { Product } from "@/lib/products";
import { discountPercent, isPromo, STOCK_LABELS } from "@/lib/products";
import { formatMAD, cn } from "@/lib/utils";
import { Badge, type badgeVariants } from "@/components/ui/badge";
import { Countdown } from "@/components/shop/countdown";
import { useCartStore } from "@/lib/store";
import type { VariantProps } from "class-variance-authority";

const ICONS: Record<string, typeof Server> = {
  firewall: Shield,
  server: Server,
  switch: Router,
  wifi: Wifi,
  nas: HardDrive,
  shield: Lock,
  ups: BatteryCharging,
  laptop: Laptop,
  cloud: Cloud,
  vpn: Shield,
  siem: Server,
};

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>;

const BADGE_VARIANT: Record<string, BadgeVariant> = {
  Nouveau: "cyan",
  Populaire: "default",
  "Meilleure vente": "warning",
  "Stock limité": "danger",
};

const STOCK_DOT: Record<Product["stock"], string> = {
  "in-stock": "bg-emerald-500",
  limited: "bg-amber-500",
  "on-order": "bg-slate-400",
};

const STOCK_TEXT: Record<Product["stock"], string> = {
  "in-stock": "text-emerald-600 dark:text-emerald-400",
  limited: "text-amber-600 dark:text-amber-400",
  "on-order": "text-slate-500 dark:text-slate-400",
};

export function ProductDetail({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const Icon = ICONS[product.image] ?? Server;
  const promo = isPromo(product);
  const discount = discountPercent(product);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      <div className="glass-card relative flex h-72 items-center justify-center overflow-hidden sm:h-96">
        <Icon className="h-32 w-32 text-electric-500/80 dark:text-electric-400/80" strokeWidth={1.2} />
        {promo ? (
          <Badge variant="solid-success" className="absolute left-4 top-4">
            -{discount}%
          </Badge>
        ) : (
          product.badge && (
            <Badge variant={BADGE_VARIANT[product.badge]} className="absolute left-4 top-4">
              {product.badge}
            </Badge>
          )
        )}
      </div>

      <div>
        <span className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate">
          {product.category}
        </span>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-night-900 dark:text-white sm:text-3xl">
          {product.name}
        </h1>

        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-night-900 dark:text-white">{product.rating}</span>
          </div>
          <span className="text-sm text-slate-500 dark:text-slate">({product.reviews} avis)</span>
          <span className="h-1 w-1 rounded-full bg-slate-400" />
          <span className={cn("h-1.5 w-1.5 rounded-full", STOCK_DOT[product.stock])} />
          <span className={cn("text-sm font-medium", STOCK_TEXT[product.stock])}>
            {STOCK_LABELS[product.stock]}
          </span>
        </div>

        {product.promoHours && (
          <div className="mt-4">
            <Countdown hours={product.promoHours} />
          </div>
        )}

        <div className="mt-6">
          {promo ? (
            <div className="flex items-baseline gap-3">
              <p className="text-3xl font-extrabold text-night-900 dark:text-white">{formatMAD(product.price)}</p>
              <p className="text-base text-slate-500 line-through dark:text-slate">{formatMAD(product.oldPrice!)}</p>
            </div>
          ) : (
            <p className="text-3xl font-extrabold text-night-900 dark:text-white">{formatMAD(product.price)}</p>
          )}
        </div>

        <p className="mt-6 leading-relaxed text-slate-600 dark:text-slate-300">{product.description}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <div className="flex h-12 w-fit items-center rounded-full border">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Diminuer la quantité"
              className="flex h-full w-11 items-center justify-center text-night-900 hover:bg-slate-900/[0.06] dark:text-white dark:hover:bg-white/[0.06]"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center text-sm font-medium text-night-900 dark:text-white">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Augmenter la quantité"
              className="flex h-full w-11 items-center justify-center text-night-900 hover:bg-slate-900/[0.06] dark:text-white dark:hover:bg-white/[0.06]"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={() => addItem(product, quantity)}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-electric-500 text-sm font-semibold text-white transition-all hover:bg-electric-600 hover:shadow-glow active:scale-[0.98]"
          >
            <ShoppingCart className="h-4 w-4" />
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}
