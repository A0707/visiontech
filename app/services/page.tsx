import type { Metadata } from "next";
import Link from "next/link";
import {
  Server,
  Cloud,
  ShieldCheck,
  Headset,
  Network,
  Database,
  Lock,
  Activity,
  LifeBuoy,
  Wrench,
  ArrowRight,
  Check,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { CtaSection } from "@/components/sections/cta-section";
import { ServicesGrid } from "@/components/sections/services-grid";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Infrastructure IT, Cloud & Hybride, Cybersécurité et Support & Maintenance : découvrez l'ensemble des services VisionTech — CUSTOM IT à Casablanca.",
  alternates: { canonical: "/services" },
};

const SERVICE_DETAILS = [
  {
    id: "infrastructure",
    icon: Server,
    title: "Infrastructure IT",
    tagline: "Des fondations solides pour votre système d'information",
    description:
      "Nous concevons, déployons et administrons des infrastructures réseau et serveurs robustes, évolutives et adaptées à la taille de votre organisation.",
    features: [
      { icon: Network, label: "Réseaux LAN/WAN", desc: "Câblage, switching, routage et Wi-Fi professionnel." },
      { icon: Database, label: "Virtualisation & stockage", desc: "Serveurs virtualisés, NAS/SAN, haute disponibilité." },
      { icon: Activity, label: "Supervision proactive", desc: "Monitoring temps réel de vos équipements critiques." },
    ],
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud & Hybride",
    tagline: "Agilité, scalabilité et maîtrise des coûts",
    description:
      "Migration vers le cloud, architectures hybrides et gestion multi-cloud pour donner à votre entreprise la flexibilité dont elle a besoin.",
    features: [
      { icon: Cloud, label: "Migration cloud", desc: "Azure, AWS et solutions hébergées localement." },
      { icon: Database, label: "Sauvegarde & PRA", desc: "Plan de reprise d'activité et sauvegarde chiffrée automatisée." },
      { icon: Activity, label: "Optimisation FinOps", desc: "Maîtrise et réduction des coûts d'infrastructure cloud." },
    ],
  },
  {
    id: "securite",
    icon: ShieldCheck,
    title: "Cybersécurité",
    tagline: "Anticiper, détecter, neutraliser",
    description:
      "Une protection multicouche de vos systèmes d'information : audit, protection des endpoints, pare-feu et supervision continue.",
    features: [
      { icon: Lock, label: "Audit & pentest", desc: "Identification des vulnérabilités avant qu'elles ne soient exploitées." },
      { icon: ShieldCheck, label: "EDR / XDR", desc: "Détection et réponse aux menaces par intelligence artificielle." },
      { icon: Activity, label: "Supervision SOC / SIEM", desc: "Centralisation des logs et alerting 24/7." },
    ],
  },
  {
    id: "support",
    icon: Headset,
    title: "Support & Maintenance",
    tagline: "Une équipe technique disponible quand vous en avez besoin",
    description:
      "Des contrats de maintenance flexibles et un support technique réactif pour garantir la continuité de votre activité.",
    features: [
      { icon: LifeBuoy, label: "Support 24/7", desc: "Assistance téléphonique, à distance et sur site." },
      { icon: Wrench, label: "Maintenance préventive", desc: "Interventions planifiées pour éviter les pannes." },
      { icon: Activity, label: "Monitoring proactif", desc: "Détection des anomalies avant impact utilisateur." },
    ],
  },
];

const PROCESS = [
  { step: "01", title: "Audit & diagnostic", desc: "Analyse complète de votre infrastructure existante et de vos besoins métier." },
  { step: "02", title: "Recommandation", desc: "Proposition d'architecture sur mesure avec devis détaillé et transparent." },
  { step: "03", title: "Déploiement", desc: "Mise en œuvre par nos ingénieurs certifiés, sans interruption d'activité." },
  { step: "04", title: "Suivi & optimisation", desc: "Supervision continue et amélioration continue de vos systèmes." },
];

export default function ServicesPage() {
  return (
    <div>
      <section className="section-y relative overflow-hidden">
        <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
        <div className="container relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
              Nos services
            </span>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-night-900 dark:text-white sm:text-5xl">
              Des solutions IT complètes, pensées pour durer
            </h1>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              Infrastructure, Cloud, Cybersécurité et Support : l&apos;expertise et
              l&apos;accompagnement de nos ingénieurs, du conseil à la maintenance.
            </p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Besoin uniquement de matériel ?{" "}
              <Link href="/boutique" className="font-medium text-electric-600 hover:text-electric-500 dark:text-electric-400 dark:hover:text-electric-300">
                Découvrez notre boutique
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <ServicesGrid />

      {SERVICE_DETAILS.map((service, i) => (
        <section
          key={service.id}
          id={service.id}
          className={cn(
            "section-y scroll-mt-24 border-t",
            i % 2 === 1 && "bg-slate-900/[0.015] dark:bg-white/[0.015]"
          )}
        >
          <div className="container">
            <div
              className={cn(
                "grid grid-cols-1 items-center gap-12 lg:grid-cols-2",
                i % 2 === 1 && "lg:[&>*:first-child]:order-2"
              )}
            >
              <Reveal>
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-electric-500/15 to-cyan-500/15 text-electric-600 ring-1 ring-slate-900/10 dark:text-electric-400 dark:ring-white/10">
                  <service.icon className="h-7 w-7" />
                </span>
                <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-night-900 dark:text-white sm:text-4xl">
                  {service.title}
                </h2>
                <p className="mt-2 text-sm font-medium text-cyan-600 dark:text-cyan-400">{service.tagline}</p>
                <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate">{service.description}</p>
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ variant: "primary" }), "mt-6")}
                >
                  Demander un audit gratuit
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Reveal>

              <Reveal delay={0.15} className="space-y-4">
                {service.features.map((f) => (
                  <div key={f.label} className="glass-card flex items-start gap-4 p-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900/[0.04] text-cyan-600 dark:bg-white/[0.04] dark:text-cyan-400">
                      <f.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="flex items-center gap-2 text-sm font-semibold text-night-900 dark:text-white">
                        <Check className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
                        {f.label}
                      </p>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <section className="section-y border-t">
        <div className="container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
              Méthodologie
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-night-900 dark:text-white sm:text-4xl">
              Notre approche en 4 étapes
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.1}>
                <div className="glass-card relative h-full p-6">
                  <span className="text-4xl font-extrabold text-slate-900/10 dark:text-white/10">{p.step}</span>
                  <h3 className="mt-3 text-lg font-bold text-night-900 dark:text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
