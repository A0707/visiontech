import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, ShieldCheck, Monitor, Headset, Info } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Breadcrumb } from "@/components/breadcrumb";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Centre de téléchargement",
  description:
    "Outils de prise en main à distance et sécurité recommandés par VisionTech — liens vers les sources officielles des éditeurs.",
  alternates: { canonical: "/downloads" },
};

/**
 * Volontairement : uniquement des liens vers les pages officielles des éditeurs.
 * Héberger nous-mêmes les installeurs poserait un problème de licence de
 * redistribution, et surtout un risque de sécurité — un client doit toujours
 * pouvoir vérifier qu'il télécharge un binaire signé par l'éditeur.
 */
const TOOLS = [
  {
    category: "Prise en main à distance",
    icon: Headset,
    items: [
      {
        name: "TeamViewer QuickSupport",
        description:
          "Module léger sans installation, à lancer uniquement pendant une intervention de notre équipe.",
        url: "https://www.teamviewer.com/fr/telecharger/",
        vendor: "TeamViewer",
      },
      {
        name: "AnyDesk",
        description:
          "Alternative légère pour les connexions à faible bande passante.",
        url: "https://anydesk.com/fr/downloads",
        vendor: "AnyDesk",
      },
      {
        name: "Microsoft Remote Desktop",
        description:
          "Client officiel pour accéder à un poste ou serveur Windows distant.",
        url: "https://apps.microsoft.com/detail/9wzdncrfj3ps",
        vendor: "Microsoft",
      },
    ],
  },
  {
    category: "Sécurité",
    icon: ShieldCheck,
    items: [
      {
        name: "FortiClient VPN",
        description:
          "Client VPN pour accéder au réseau de votre entreprise depuis l'extérieur.",
        url: "https://www.fortinet.com/support/product-downloads",
        vendor: "Fortinet",
      },
    ],
  },
  {
    category: "Productivité",
    icon: Monitor,
    items: [
      {
        name: "Microsoft 365 Apps",
        description:
          "Installation des applications Office depuis votre compte professionnel.",
        url: "https://www.microsoft365.com/",
        vendor: "Microsoft",
      },
    ],
  },
];

export default function DownloadsPage() {
  return (
    <div className="section-y">
      <div className="container max-w-4xl">
        <Reveal>
          <Breadcrumb
            items={[{ label: "Accueil", href: "/" }, { label: "Téléchargements" }]}
          />
        </Reveal>

        <Reveal className="mt-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
            Assistance
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-night-900 dark:text-white sm:text-5xl">
            Centre de téléchargement
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
            Les outils que nos techniciens utilisent lors d&apos;une intervention à
            distance, ainsi que les clients officiels dont vous pourriez avoir besoin.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <div className="flex items-start gap-3 rounded-xl border border-electric-500/25 bg-electric-500/[0.06] p-4">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-electric-600 dark:text-electric-400" />
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <span className="font-semibold text-night-900 dark:text-white">
                Tous les liens pointent vers les sites officiels des éditeurs.
              </span>{" "}
              Nous n&apos;hébergeons aucun installeur : cela vous garantit de toujours
              télécharger une version authentique, signée et à jour. Ne lancez un outil de
              prise en main à distance que si vous êtes en ligne avec un technicien
              VisionTech identifié.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 space-y-10">
          {TOOLS.map((group, gi) => (
            <Reveal key={group.category} delay={gi * 0.08}>
              <section>
                <h2 className="flex items-center gap-2.5 text-xl font-bold text-night-900 dark:text-white">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-electric-500/15 to-cyan-500/15 text-electric-600 dark:text-electric-400">
                    <group.icon className="h-[18px] w-[18px]" />
                  </span>
                  {group.category}
                </h2>

                <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-card group flex h-full flex-col p-5 transition-transform duration-300 hover:-translate-y-1"
                      >
                        <span className="flex items-start justify-between gap-3">
                          <span className="font-semibold text-night-900 group-hover:text-electric-600 dark:text-white dark:group-hover:text-electric-400">
                            {item.name}
                          </span>
                          <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                        </span>
                        <span className="mt-1 text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate">
                          Site officiel {item.vendor}
                        </span>
                        <span className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate">
                          {item.description}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-14">
          <div className="glass-card p-7 text-center">
            <h2 className="text-lg font-bold text-night-900 dark:text-white">
              Besoin d&apos;aide pour installer un outil ?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-600 dark:text-slate">
              Nos techniciens vous accompagnent par téléphone ou WhatsApp pour la mise en
              place de votre poste de travail.
            </p>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/contact" className={cn(buttonVariants({ variant: "primary" }))}>
                Contacter le support
              </Link>
              <a
                href="https://wa.me/212600000000?text=Bonjour%20VisionTech%2C%20j'ai%20besoin%20d'aide%20pour%20installer%20un%20outil."
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
