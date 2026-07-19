"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useCartCount, useCartStore } from "@/lib/store";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/boutique", label: "Boutique" },
  { href: "/maintenance", label: "Maintenance" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const cartCount = useCartCount();
  const toggleCart = useCartStore((s) => s.toggleCart);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-white/80 dark:bg-night-900/80 backdrop-blur-xl border-b shadow-lg shadow-black/5 dark:shadow-black/20"
          : "bg-transparent"
      )}
    >
      <nav className="container flex h-20 items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <img
            src="/brand/icone.svg"
            alt=""
            aria-hidden="true"
            width={44}
            height={44}
            className="h-9 w-9 shrink-0 dark:hidden sm:h-10 sm:w-10"
          />
          <img
            src="/brand/icone-sombre.svg"
            alt=""
            aria-hidden="true"
            width={44}
            height={44}
            className="hidden h-9 w-9 shrink-0 dark:block sm:h-10 sm:w-10"
          />
          <span className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-tight text-night-900 dark:text-white sm:text-xl">
              VisionTech
            </span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
              Custom IT
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-night-900 dark:text-white"
                    : "text-slate-600 hover:text-night-900 dark:text-slate dark:hover:text-white"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-slate-900/[0.06] dark:bg-white/[0.08]"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {mounted && (
            <button
              aria-label="Basculer le thème"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hidden h-10 w-10 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-900/[0.06] hover:text-night-900 dark:text-slate dark:hover:bg-white/[0.06] dark:hover:text-white sm:flex"
            >
              {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
            </button>
          )}

          <button
            aria-label="Ouvrir le panier"
            onClick={toggleCart}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-900/[0.06] hover:text-night-900 dark:text-slate dark:hover:bg-white/[0.06] dark:hover:text-white"
          >
            <ShoppingCart className="h-[18px] w-[18px]" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-electric-500 px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

          <Link
            href="/contact"
            className={cn(buttonVariants({ variant: "primary", size: "sm" }), "hidden lg:inline-flex")}
          >
            Demander un devis
          </Link>

          <button
            aria-label="Menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-night-900 dark:text-white lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t bg-white/95 dark:bg-night-900/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-slate-900/[0.06] text-night-900 dark:bg-white/[0.06] dark:text-white"
                      : "text-slate-600 hover:bg-slate-900/[0.04] hover:text-night-900 dark:text-slate dark:hover:bg-white/[0.04] dark:hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: "primary" }), "mt-2 w-full")}
              >
                Demander un devis
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
