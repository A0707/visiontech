import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/shop/product-card";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ShopPreview() {
  const featured = products.filter((p) => p.badge).slice(0, 4);

  return (
    <section className="section-y relative border-t">
      <div className="container">
        <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
              Boutique · Achat direct de matériel
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-night-900 dark:text-white sm:text-4xl">
              Équipements professionnels
            </h2>
            <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-300">
              Achetez directement serveurs, réseau, sécurité et licences cloud — avec
              installation et configuration disponibles en option via nos{" "}
              <Link href="/services" className="font-medium text-electric-600 hover:text-electric-500 dark:text-electric-400 dark:hover:text-electric-300">
                services
              </Link>
              .
            </p>
          </div>
          <Link
            href="/boutique"
            className={cn(buttonVariants({ variant: "outline" }), "shrink-0")}
          >
            Voir la boutique
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.08}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
