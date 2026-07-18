import Link from "next/link";
import { Server, Cloud, ShieldCheck, Headset, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const SERVICES = [
  {
    icon: Server,
    title: "Infrastructure IT",
    description:
      "Conception, déploiement et administration de réseaux, serveurs et postes de travail robustes et évolutifs.",
    points: ["Réseaux LAN/WAN", "Virtualisation", "Datacenters"],
  },
  {
    icon: Cloud,
    title: "Cloud & Hybride",
    description:
      "Migration cloud, architectures hybrides et optimisation des coûts pour une agilité maximale.",
    points: ["Azure & AWS", "Sauvegarde cloud", "Reprise d'activité"],
  },
  {
    icon: ShieldCheck,
    title: "Cybersécurité",
    description:
      "Protection avancée de vos systèmes : audit, EDR, pare-feu nouvelle génération et supervision SOC.",
    points: ["Audit & pentest", "EDR / XDR", "Supervision SIEM"],
  },
  {
    icon: Headset,
    title: "Support & Maintenance",
    description:
      "Assistance technique réactive et contrats de maintenance adaptés à la criticité de vos systèmes.",
    points: ["Support 24/7", "Interventions sur site", "Monitoring proactif"],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="section-y relative">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
            Nos expertises · Accompagnement sur mesure
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-night-900 dark:text-white sm:text-4xl md:text-5xl">
            Quatre piliers pour un SI performant
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Nos ingénieurs conçoivent, déploient et sécurisent votre système
            d&apos;information — de l&apos;audit initial à la maintenance continue.
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Besoin uniquement de matériel ?{" "}
            <Link href="/boutique" className="font-medium text-electric-600 hover:text-electric-500 dark:text-electric-400 dark:hover:text-electric-300">
              Découvrez notre boutique
            </Link>
            .
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.1}>
              <div className="glass-card group relative h-full overflow-hidden p-6">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-electric-500/10 blur-2xl transition-all duration-500 group-hover:bg-electric-500/20" />
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-electric-500/15 to-cyan-500/15 text-electric-600 ring-1 ring-slate-900/10 dark:text-electric-400 dark:ring-white/10">
                  <service.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-night-900 dark:text-white">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate">{service.description}</p>
                <ul className="mt-4 space-y-2">
                  {service.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate">
                      <span className="h-1 w-1 rounded-full bg-cyan-500 dark:bg-cyan-400" />
                      {p}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/services"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-electric-600 transition-colors hover:text-electric-500 dark:text-electric-400 dark:hover:text-electric-300"
                >
                  En savoir plus
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
