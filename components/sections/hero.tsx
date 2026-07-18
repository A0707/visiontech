"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Server, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const FLOATING_CARDS = [
  { icon: Server, label: "Infrastructure", metric: "99.98%", sub: "Disponibilité garantie", pos: "-top-6 -left-4 sm:-left-8", delay: 0 },
  { icon: ShieldCheck, label: "Cybersécurité", metric: "SOC 24/7", sub: "Détection en temps réel", pos: "-bottom-6 -right-4 sm:-right-8", delay: 0.6 },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_60%_60%_at_50%_20%,black,transparent)]" />
      <div className="absolute inset-0 bg-grid-glow" />
      <div className="absolute inset-0 bg-cyan-glow" />

      <div className="container relative section-y grid grid-cols-1 items-center gap-16 pt-16 md:pt-24 lg:grid-cols-2 lg:gap-12">
        {/* Left column: message */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-slate-900/[0.04] px-4 py-1.5 text-xs font-medium text-slate-600 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            Nouveau : Supervision SIEM 24/7 disponible à Casablanca
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-balance text-5xl font-extrabold leading-[1.08] tracking-tight text-night-900 dark:text-white sm:text-6xl"
          >
            L&apos;IT sur mesure qui
            <br />
            <span className="text-gradient">propulse votre entreprise</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-slate-600 dark:text-slate-300 md:text-xl"
          >
            Infrastructure, Cloud, Cybersécurité et Support technique : VisionTech —
            CUSTOM IT conçoit des systèmes d&apos;information robustes et sécurisés pour
            les entreprises de Casablanca et du Maroc.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Link href="/contact" className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
              Demander un devis gratuit
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/services" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
              Découvrir nos services
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-slate-400 lg:justify-start"
          >
            <span>Basé à Casablanca</span>
            <span className="h-1 w-1 rounded-full bg-slate-500/60" />
            <span>+150 entreprises accompagnées</span>
            <span className="h-1 w-1 rounded-full bg-slate-500/60" />
            <span>Support réactif 24/7</span>
          </motion.div>
        </div>

        {/* Right column: dashboard visual */}
        <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card noise relative overflow-hidden rounded-3xl p-2 shadow-2xl shadow-slate-900/10 dark:shadow-black/40"
          >
            <div className="flex items-center gap-1.5 border-b px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-4 text-xs text-slate-500 dark:text-slate-400">visiontech-ops · console de supervision</span>
            </div>
            <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-3">
              {[
                { label: "Serveurs actifs", value: "48/48", tone: "text-emerald-600 dark:text-emerald-400" },
                { label: "Incidents ouverts", value: "0", tone: "text-cyan-600 dark:text-cyan-400" },
                { label: "Latence moyenne", value: "6ms", tone: "text-electric-600 dark:text-electric-400" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border bg-slate-900/[0.02] p-4 dark:bg-white/[0.02]">
                  <p className="text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
                  <p className={cn("mt-1 text-2xl font-bold", s.tone)}>{s.value}</p>
                </div>
              ))}
            </div>
            <div className="px-4 pb-4">
              <div className="flex h-28 items-end gap-1.5 rounded-xl border bg-slate-900/[0.02] p-4 dark:bg-white/[0.02]">
                {[40, 65, 45, 80, 55, 90, 60, 75, 50, 95, 70, 85].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.6, delay: 0.6 + i * 0.04, ease: "easeOut" }}
                    className="flex-1 rounded-t-sm bg-gradient-to-t from-electric-500/40 to-cyan-400/80"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {FLOATING_CARDS.map(({ icon: Icon, label, metric, sub, pos, delay }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.9 + delay * 0.15 }}
              className={cn(
                "glass-card absolute hidden w-44 animate-float rounded-2xl p-4 sm:block",
                pos
              )}
              style={{ animationDelay: `${delay}s` }}
            >
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-electric-500/20 to-cyan-500/20">
                  <Icon className="h-4 w-4 text-cyan-400" />
                </span>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{label}</span>
              </div>
              <p className="mt-2 text-xl font-bold text-night-900 dark:text-white">{metric}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
