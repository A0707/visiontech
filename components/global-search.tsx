"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, CornerDownLeft } from "lucide-react";
import { searchAll, type SearchEntry, type SearchKind } from "@/lib/search-index";
import { cn } from "@/lib/utils";

const KIND_STYLE: Record<SearchKind, string> = {
  Service: "bg-electric-500/10 text-electric-600 dark:text-electric-400",
  Produit: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  Article: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Réalisation: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Page: "bg-slate-500/10 text-slate-600 dark:text-slate-300",
};

export function GlobalSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => searchAll(query), [query]);

  // Ouverture via Ctrl/Cmd + K, fermeture via Échap.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Focus à l'ouverture, réinitialisation à la fermeture, blocage du scroll.
  useEffect(() => {
    if (open) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      return () => {
        cancelAnimationFrame(id);
        document.body.style.overflow = previous;
      };
    }
    setQuery("");
    setActiveIndex(0);
  }, [open]);

  useEffect(() => setActiveIndex(0), [query]);

  function go(entry: SearchEntry) {
    setOpen(false);
    router.push(entry.href);
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[activeIndex]);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Rechercher sur le site"
        className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-900/[0.06] hover:text-night-900 dark:text-slate dark:hover:bg-white/[0.06] dark:hover:text-white"
      >
        <Search className="h-[18px] w-[18px]" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Recherche"
              initial={{ opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-4 top-[10vh] z-[60] mx-auto flex max-h-[70vh] max-w-xl flex-col overflow-hidden rounded-2xl border bg-white shadow-2xl dark:bg-night-900"
            >
              <div className="flex shrink-0 items-center gap-3 border-b px-4">
                <Search className="h-4 w-4 shrink-0 text-slate-500 dark:text-slate" />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onInputKeyDown}
                  placeholder="Rechercher un service, produit, article..."
                  aria-label="Rechercher"
                  className="h-14 flex-1 bg-transparent text-sm text-night-900 outline-none placeholder:text-slate-500 dark:text-white dark:placeholder:text-slate"
                />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Fermer la recherche"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-500 hover:bg-slate-900/[0.06] dark:hover:bg-white/[0.06]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto">
                {query.trim().length < 2 ? (
                  <p className="px-4 py-8 text-center text-sm text-slate-500 dark:text-slate">
                    Saisissez au moins 2 caractères.
                  </p>
                ) : results.length === 0 ? (
                  <p className="px-4 py-8 text-center text-sm text-slate-500 dark:text-slate">
                    Aucun résultat pour «&nbsp;{query}&nbsp;».
                  </p>
                ) : (
                  <ul role="listbox" aria-label="Résultats de recherche" className="py-2">
                    {results.map((entry, i) => (
                      <li key={`${entry.kind}-${entry.href}-${i}`}>
                        <button
                          role="option"
                          aria-selected={i === activeIndex}
                          onClick={() => go(entry)}
                          onMouseEnter={() => setActiveIndex(i)}
                          className={cn(
                            "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors",
                            i === activeIndex && "bg-slate-900/[0.04] dark:bg-white/[0.06]"
                          )}
                        >
                          <span
                            className={cn(
                              "mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                              KIND_STYLE[entry.kind]
                            )}
                          >
                            {entry.kind}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium text-night-900 dark:text-white">
                              {entry.title}
                            </span>
                            <span className="mt-0.5 block truncate text-xs text-slate-500 dark:text-slate">
                              {entry.description}
                            </span>
                          </span>
                          {i === activeIndex && (
                            <CornerDownLeft className="mt-1 h-3.5 w-3.5 shrink-0 text-slate-400" />
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="shrink-0 border-t px-4 py-2.5 text-[11px] text-slate-500 dark:text-slate">
                <span className="hidden sm:inline">
                  ↑↓ naviguer · ↵ ouvrir · Échap fermer
                </span>
                <span className="sm:hidden">Touchez un résultat pour l&apos;ouvrir</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
