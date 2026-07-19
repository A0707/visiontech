import Link from "next/link";
import { ChevronRight } from "lucide-react";

const SITE_URL = "https://www.visiontech.ma";

export interface Crumb {
  label: string;
  /** Omis pour l'élément courant (dernier de la liste). */
  href?: string;
}

/**
 * Fil d'Ariane accessible + données structurées BreadcrumbList.
 * Google s'appuie sur ce balisage pour afficher le chemin dans les résultats.
 */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Fil d'Ariane">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-slate-500 transition-colors hover:text-electric-600 dark:text-slate dark:hover:text-electric-400"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className="font-medium text-night-900 dark:text-white"
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight
                  aria-hidden="true"
                  className="h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-slate-600"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
