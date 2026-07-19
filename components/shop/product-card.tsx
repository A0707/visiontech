"use client";

import Link from "next/link";
import { Star, ShoppingCart, Server, Router, Shield, Laptop, Cloud, Wifi, BatteryCharging, HardDrive, Lock } from "lucide-react";
import type { Product } from "@/lib/products";
import { discountPercent, isPromo, STOCK_LABELS } from "@/lib/products";
import { formatMAD, cn } from "@/lib/utils";
import { Badge, type badgeVariants } from "@/components/ui/badge";
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

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const Icon = ICONS[product.image] ?? Server;
  const promo = isPromo(product);
  const discount = discountPercent(product);

  return (
    <div className="glass-card group flex h-full flex-col overflow-hidden p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 hover:ring-1 hover:ring-electric-500/30 dark:hover:shadow-black/30">
      <Link href={`/boutique/${product.id}`} className="relative flex h-40 items-center justify-center rounded-xl bg-gradient-to-br from-electric-500/10 via-slate-900/[0.02] to-cyan-500/10 dark:via-white/[0.02]">
        <Icon className="h-14 w-14 text-electric-500/80 transition-transform duration-500 group-hover:scale-110 dark:text-electric-400/80" strokeWidth={1.4} />
        {promo ? (
          <Badge variant="solid-success" className="absolute left-3 top-3">
            -{discount}%
          </Badge>
        ) : (
          product.badge && (
            <Badge variant={BADGE_VARIANT[product.badge]} className="absolute left-3 top-3">
              {product.badge}
            </Badge>
          )
        )}
      </Link>

      <div className="flex flex-1 flex-col pt-4">
        <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate">
          {product.category}
        </span>
        <Link href={`/boutique/${product.id}`}>
          <h3 className="mt-1 text-sm font-semibold leading-snug text-night-900 hover:text-electric-600 dark:text-white dark:hover:text-electric-400">{product.name}</h3>
        </Link>

        <div className="mt-2 flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-medium text-night-900 dark:text-white">{product.rating}</span>
          <span className="text-xs text-slate-500 dark:text-slate">({product.reviews})</span>
        </div>

        <div className="mt-2 flex items-center gap-1.5">
          <span className={cn("h-1.5 w-1.5 rounded-full", STOCK_DOT[product.stock])} />
          <span className={cn("text-xs font-medium", STOCK_TEXT[product.stock])}>
            {STOCK_LABELS[product.stock]}
          </span>
        </div>

        <div className="mt-3 flex-1">
          {promo ? (
            <div className="flex items-baseline gap-2">
              <p className="text-lg font-bold text-night-900 dark:text-white">{formatMAD(product.price)}</p>
              <p className="text-xs text-slate-500 line-through dark:text-slate">{formatMAD(product.oldPrice!)}</p>
            </div>
          ) : (
            <p className="text-lg font-bold text-night-900 dark:text-white">{formatMAD(product.price)}</p>
          )}
        </div>

        <button
          onClick={() => addItem(product)}
          className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-full bg-electric-500 text-sm font-semibold text-white transition-all hover:bg-electric-600 hover:shadow-glow active:scale-[0.98]"
        >
          <ShoppingCart className="h-4 w-4" />
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}
