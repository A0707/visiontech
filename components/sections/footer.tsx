import Link from "next/link";
import { MapPin, Phone, Mail, Linkedin, Facebook, Instagram } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter-form";

const footerLinks = [
  {
    title: "Entreprise",
    links: [
      { label: "Accueil", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Boutique", href: "/boutique" },
      { label: "Maintenance", href: "/maintenance" },
      { label: "À propos", href: "/a-propos" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Portfolio", href: "/portfolio" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/#faq" },
      { label: "Carrières", href: "/carrieres" },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Politique de confidentialité", href: "/confidentialite" },
      { label: "CGU", href: "/cgu" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t bg-slate-50 dark:bg-night-950">
      <div className="container py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <img
                src="/brand/icone.svg"
                alt=""
                aria-hidden="true"
                width={44}
                height={44}
                className="h-10 w-10 shrink-0 dark:hidden"
              />
              <img
                src="/brand/icone-sombre.svg"
                alt=""
                aria-hidden="true"
                width={44}
                height={44}
                className="hidden h-10 w-10 shrink-0 dark:block"
              />
              <span className="flex flex-col leading-none">
                <span className="text-lg font-extrabold tracking-tight text-night-900 dark:text-white">
                  VisionTech
                </span>
                <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                  Custom IT
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate">
              Infrastructure · Cloud · Cybersécurité · Support. Votre partenaire IT de
              confiance à Casablanca pour bâtir, sécuriser et faire évoluer votre
              système d&apos;information.
            </p>
            <div className="mt-6 flex gap-3">
              {[Linkedin, Facebook, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Réseau social VisionTech"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-900/10 text-slate-600 transition-colors hover:border-electric-500/50 hover:text-electric-400 dark:border-white/10 dark:text-slate"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-semibold text-night-900 dark:text-white">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 transition-colors hover:text-electric-500 dark:text-slate dark:hover:text-electric-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-4 text-sm font-semibold text-night-900 dark:text-white">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-electric-400" />
                Casablanca, Maroc
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-electric-400" />
                +212 6 00 00 00 00
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-electric-400" />
                contact@visiontech.ma
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t pt-10">
          <div className="mx-auto max-w-md text-center">
            <h4 className="text-sm font-semibold text-night-900 dark:text-white">
              Recevez nos conseils IT
            </h4>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate">
              Un email occasionnel, pas de spam.
            </p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-8 text-xs text-slate-500 dark:text-slate md:flex-row">
          <p>© {new Date().getFullYear()} VisionTech — CUSTOM IT. Tous droits réservés.</p>
          <p>Conçu avec précision à Casablanca</p>
        </div>
      </div>
    </footer>
  );
}
