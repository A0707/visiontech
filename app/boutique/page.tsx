"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X, Flame, RotateCcw } from "lucide-react";
import {
  products,
  categories,
  discountPercent,
  isPromo,
  STOCK_LABELS,
  type ProductCategory,
  type StockStatus,
} from "@/lib/products";
import { ProductCard } from "@/components/shop/product-card";
import { FeaturedProductCard } from "@/components/shop/featured-product-card";
import { PriceRangeFilter } from "@/components/shop/price-range-filter";
import { Reveal } from "@/components/motion/reveal";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SortKey = "pertinence" | "prix-asc" | "prix-desc" | "ventes" | "promos";
type CategoryFilter = ProductCategory | "Tous" | "Promotions";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "pertinence", label: "Pertinence" },
  { key: "prix-asc", label: "Prix croissant" },
  { key: "prix-desc", label: "Prix décroissant" },
  { key: "ventes", label: "Meilleures ventes" },
  { key: "promos", label: "Meilleures promos" },
];

const STOCK_OPTIONS: StockStatus[] = ["in-stock", "limited", "on-order"];

const PRICE_MIN = 0;
const PRICE_MAX = 70000;

export default function BoutiquePage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("Tous");
  const [sort, setSort] = useState<SortKey>("pertinence");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([PRICE_MIN, PRICE_MAX]);
  const [availability, setAvailability] = useState<StockStatus[]>([]);
  const [promoOnly, setPromoOnly] = useState(false);

  const featured = useMemo(() => products.filter((p) => p.featured), []);
  const showFeatured = query === "" && activeCategory === "Tous";

  const filtersActive =
    query !== "" ||
    activeCategory !== "Tous" ||
    sort !== "pertinence" ||
    priceRange[0] !== PRICE_MIN ||
    priceRange[1] !== PRICE_MAX ||
    availability.length > 0 ||
    promoOnly;

  function resetFilters() {
    setQuery("");
    setActiveCategory("Tous");
    setSort("pertinence");
    setPriceRange([PRICE_MIN, PRICE_MAX]);
    setAvailability([]);
    setPromoOnly(false);
  }

  function toggleAvailability(status: StockStatus) {
    setAvailability((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  }

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchesQuery =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory =
        activeCategory === "Tous"
          ? true
          : activeCategory === "Promotions"
            ? isPromo(p)
            : p.category === activeCategory;
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchesAvailability = availability.length === 0 || availability.includes(p.stock);
      const matchesPromo = !promoOnly || isPromo(p);
      return matchesQuery && matchesCategory && matchesPrice && matchesAvailability && matchesPromo;
    });

    switch (sort) {
      case "prix-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "prix-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "ventes":
        list = [...list].sort((a, b) => b.sales - a.sales);
        break;
      case "promos":
        list = [...list].sort((a, b) => discountPercent(b) - discountPercent(a));
        break;
    }
    return list;
  }, [query, activeCategory, sort, priceRange, availability, promoOnly]);

  return (
    <div>
      {/* Compact hero */}
      <div className="container pt-8 pb-6 sm:pt-10">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
            Boutique
          </span>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-night-900 dark:text-white sm:text-3xl">
            Équipements professionnels
          </h1>
          <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
            Serveurs, réseau, sécurité et licences — livrés et configurés par VisionTech.{" "}
            <Link href="/services" className="font-medium text-electric-600 hover:text-electric-500 dark:text-electric-400 dark:hover:text-electric-300">
              Besoin d&apos;installation ?
            </Link>
          </p>
        </Reveal>
      </div>

      {/* Featured / offres du moment */}
      {showFeatured && featured.length > 0 && (
        <div className="container pb-8">
          <Reveal className="mb-4 flex items-center gap-2">
            <Flame className="h-4 w-4 text-red-500 dark:text-red-400" />
            <h2 className="text-sm font-bold uppercase tracking-wide text-night-900 dark:text-white">
              Offres du moment
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {featured.slice(0, 3).map((product, i) => (
              <Reveal key={product.id} delay={i * 0.06}>
                <FeaturedProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      )}

      <div className="container pb-16">
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Sidebar filters */}
          <aside
            className={cn(
              "lg:w-64 lg:shrink-0",
              filtersOpen ? "block" : "hidden lg:block"
            )}
          >
            <div className="glass-card sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto p-5">
              <div className="mb-4 flex items-center justify-between lg:hidden">
                <h3 className="text-sm font-semibold text-night-900 dark:text-white">Filtres</h3>
                <button onClick={() => setFiltersOpen(false)} aria-label="Fermer les filtres">
                  <X className="h-4 w-4 text-slate-600 dark:text-slate" />
                </button>
              </div>

              <h3 className="mb-3 text-sm font-semibold text-night-900 dark:text-white">Catégories</h3>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setActiveCategory("Promotions")}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm font-medium transition-colors",
                      activeCategory === "Promotions"
                        ? "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400"
                        : "border-red-500/20 bg-gradient-to-r from-red-500/[0.06] to-amber-500/[0.06] text-red-600 hover:border-red-500/40 dark:text-red-400"
                    )}
                  >
                    <Flame className="h-3.5 w-3.5" />
                    Promotions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveCategory("Tous")}
                    className={cn(
                      "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      activeCategory === "Tous"
                        ? "bg-electric-500/15 text-electric-600 dark:text-electric-400"
                        : "text-slate-700 hover:bg-slate-900/[0.04] hover:text-night-900 dark:text-slate-300 dark:hover:bg-white/[0.04] dark:hover:text-white"
                    )}
                  >
                    Tous
                  </button>
                </li>
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setActiveCategory(cat)}
                      className={cn(
                        "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                        activeCategory === cat
                          ? "bg-electric-500/15 text-electric-600 dark:text-electric-400"
                          : "text-slate-700 hover:bg-slate-900/[0.04] hover:text-night-900 dark:text-slate-300 dark:hover:bg-white/[0.04] dark:hover:text-white"
                      )}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t pt-5">
                <h3 className="mb-4 text-sm font-semibold text-night-900 dark:text-white">Prix</h3>
                <PriceRangeFilter
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  value={priceRange}
                  onChange={setPriceRange}
                />
              </div>

              <div className="mt-6 border-t pt-5">
                <h3 className="mb-3 text-sm font-semibold text-night-900 dark:text-white">Disponibilité</h3>
                <ul className="space-y-2">
                  {STOCK_OPTIONS.map((status) => (
                    <li key={status}>
                      <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                        <input
                          type="checkbox"
                          checked={availability.includes(status)}
                          onChange={() => toggleAvailability(status)}
                          className="h-4 w-4 rounded accent-electric-500"
                        />
                        {STOCK_LABELS[status]}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t pt-5">
                <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={promoOnly}
                    onChange={(e) => setPromoOnly(e.target.checked)}
                    className="h-4 w-4 rounded accent-red-500"
                  />
                  En promotion uniquement
                </label>
              </div>

              {filtersActive && (
                <button
                  onClick={resetFilters}
                  className="mt-6 flex w-full items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:text-night-900 dark:text-slate dark:hover:text-white"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Réinitialiser les filtres
                </button>
              )}
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate" />
                <Input
                  placeholder="Rechercher un produit (ex : pare-feu, switch, NAS...)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-11"
                />
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="h-12 shrink-0 rounded-xl border border-slate-900/10 bg-slate-900/[0.03] px-4 text-sm text-night-900 outline-none transition-colors focus:border-electric-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.key} value={opt.key} className="bg-white text-night-900 dark:bg-night-800 dark:text-white">
                    Trier : {opt.label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setFiltersOpen(true)}
                className="glass-card flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm text-night-900 dark:text-white lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filtres
              </button>
            </div>

            <p className="mb-5 text-sm text-slate-600 dark:text-slate">
              {filtered.length} produit{filtered.length > 1 ? "s" : ""} trouvé
              {filtered.length > 1 ? "s" : ""}
            </p>

            {filtered.length === 0 ? (
              <div className="glass-card flex flex-col items-center justify-center gap-2 py-20 text-center">
                <p className="text-night-900 dark:text-white">Aucun produit ne correspond à votre recherche.</p>
                <p className="text-sm text-slate-600 dark:text-slate">Essayez un autre mot-clé ou modifiez vos filtres.</p>
                <button
                  onClick={resetFilters}
                  className="mt-2 text-sm font-medium text-electric-600 hover:text-electric-500 dark:text-electric-400 dark:hover:text-electric-300"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((product, i) => (
                  <Reveal key={product.id} delay={Math.min(i, 6) * 0.05}>
                    <ProductCard product={product} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
