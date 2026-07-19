import Link from "next/link";
import {
  Server,
  Cloud,
  AppWindow,
  Layers,
  ShieldCheck,
  Flame,
  Wifi,
  Wrench,
  ClipboardCheck,
  DatabaseBackup,
  PhoneCall,
  Activity,
  ArrowRight,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const GRID_SERVICES = [
  { icon: Server, title: "Infrastructure IT", description: "Réseaux, serveurs et postes de travail conçus pour durer.", anchor: "infrastructure" },
  { icon: Cloud, title: "Cloud", description: "Migration et gestion d'environnements cloud et hybrides.", anchor: "cloud" },
  { icon: AppWindow, title: "Microsoft 365", description: "Déploiement, sécurisation et administration de votre suite collaborative.", anchor: "cloud" },
  { icon: Layers, title: "Virtualisation", description: "Consolidation de serveurs et haute disponibilité.", anchor: "infrastructure" },
  { icon: ShieldCheck, title: "Cybersécurité", description: "Protection multicouche contre les menaces actuelles.", anchor: "securite" },
  { icon: Flame, title: "Firewall", description: "Pare-feu nouvelle génération, VPN et filtrage applicatif.", anchor: "securite" },
  { icon: Wifi, title: "Wi-Fi Professionnel", description: "Couverture haute densité et gestion centralisée.", anchor: "infrastructure" },
  { icon: Wrench, title: "Maintenance", description: "Contrats adaptés à la criticité de vos systèmes.", anchor: "support" },
  { icon: ClipboardCheck, title: "Audit", description: "Diagnostic complet de votre infrastructure et de vos risques.", anchor: "securite" },
  { icon: DatabaseBackup, title: "Sauvegarde", description: "Sauvegarde chiffrée automatisée et plan de reprise d'activité.", anchor: "cloud" },
  { icon: PhoneCall, title: "Téléphonie IP", description: "Solutions de communication unifiée pour vos équipes.", anchor: "infrastructure" },
  { icon: Activity, title: "Supervision", description: "Monitoring proactif 24/7 de vos équipements critiques.", anchor: "support" },
];

export function ServicesGrid() {
  return (
    <section className="section-y relative">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
            Notre offre
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-night-900 dark:text-white sm:text-4xl">
            Douze expertises, un seul interlocuteur
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GRID_SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={Math.min(i, 6) * 0.05}>
              <div className="glass-card group flex h-full flex-col p-6 transition-transform duration-300 hover:-translate-y-1">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-electric-500/15 to-cyan-500/15 text-electric-600 ring-1 ring-slate-900/10 dark:text-electric-400 dark:ring-white/10">
                  <service.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-bold text-night-900 dark:text-white">{service.title}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate">
                  {service.description}
                </p>
                <Link
                  href={`/services#${service.anchor}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-electric-600 transition-colors hover:text-electric-500 dark:text-electric-400 dark:hover:text-electric-300"
                >
                  En savoir plus
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
