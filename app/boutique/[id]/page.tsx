import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { products } from "@/lib/products";
import { Reveal } from "@/components/motion/reveal";
import { ProductDetail } from "@/components/shop/product-detail";
import { ProductCard } from "@/components/shop/product-card";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/boutique/${product.id}` },
    openGraph: {
      title: product.name,
      description: product.description,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const similar = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    offers: {
      "@type": "Offer",
      priceCurrency: "MAD",
      price: product.price,
      availability:
        product.stock === "in-stock"
          ? "https://schema.org/InStock"
          : product.stock === "limited"
            ? "https://schema.org/LimitedAvailability"
            : "https://schema.org/PreOrder",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
  };

  return (
    <div className="section-y">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container">
        <Reveal>
          <Link
            href="/boutique"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-electric-600 hover:text-electric-500 dark:text-electric-400 dark:hover:text-electric-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à la boutique
          </Link>
        </Reveal>

        <Reveal delay={0.05} className="mt-6">
          <ProductDetail product={product} />
        </Reveal>

        {similar.length > 0 && (
          <div className="mt-20">
            <Reveal>
              <h2 className="text-xl font-bold text-night-900 dark:text-white">Produits similaires</h2>
            </Reveal>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {similar.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.06}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
