"use client";

import { Star, ShoppingCart, Server, Router, Shield, Laptop, Cloud, Wifi, BatteryCharging, HardDrive, Lock } from "lucide-react";
import type { Product } from "@/lib/products";
import { discountPercent, isPromo } from "@/lib/products";
import { formatMAD } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Countdown } from "@/components/shop/countdown";
import { useCartStore } from "@/lib/store";

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

export function FeaturedProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const Icon = ICONS[product.image] ?? Server;
  const promo = isPromo(product);
  const discount = discountPercent(product);

  return (
    <div className="glass-card group relative flex h-full flex-col overflow-hidden p-5 ring-1 ring-electric-500/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 dark:hover:shadow-black/30 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
      <div className="relative flex h-36 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-electric-500/15 via-slate-900/[0.02] to-cyan-500/15 dark:via-white/[0.02] sm:h-32 sm:w-32">
        <Icon className="h-16 w-16 text-electric-500/80 transition-transform duration-500 group-hover:scale-110 dark:text-electric-400/80" strokeWidth={1.3} />
        {promo && (
          <Badge variant="solid-success" className="absolute left-2 top-2 sm:hidden">
            -{discount}%
          </Badge>
        )}
      </div>

      <div className="mt-4 flex flex-1 flex-col sm:mt-0">
        <div className="hidden items-center gap-2 sm:flex">
          {promo && <Badge variant="solid-success">-{discount}%</Badge>}
          {product.promoHours && <Countdown hours={product.promoHours} />}
        </div>

        <h3 className="mt-2 text-base font-bold leading-snug text-night-900 dark:text-white sm:text-lg">
          {product.name}
        </h3>

        <div className="mt-1.5 flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-medium text-night-900 dark:text-white">{product.rating}</span>
          <span className="text-xs text-slate-500 dark:text-slate">({product.reviews} avis)</span>
        </div>

        <div className="mt-2 flex items-center gap-2 sm:hidden">
          {product.promoHours && <Countdown hours={product.promoHours} />}
        </div>

        <div className="mt-3 flex flex-col items-stretch gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div className="min-w-0">
            {promo ? (
              <div className="flex flex-wrap items-baseline gap-2">
                <p className="text-2xl font-extrabold text-night-900 dark:text-white">{formatMAD(product.price)}</p>
                <p className="text-sm text-slate-500 line-through dark:text-slate">{formatMAD(product.oldPrice!)}</p>
              </div>
            ) : (
              <p className="text-2xl font-extrabold text-night-900 dark:text-white">{formatMAD(product.price)}</p>
            )}
          </div>
          <button
            onClick={() => addItem(product)}
            className="flex h-10 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-electric-500 px-5 text-sm font-semibold text-white transition-all hover:bg-electric-600 hover:shadow-glow active:scale-[0.98] sm:w-auto"
          >
            <ShoppingCart className="h-4 w-4" />
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}
