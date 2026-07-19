import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales de VisionTech — CUSTOM IT.",
  robots: { index: false, follow: true },
};

export default function LegalNoticePage() {
  return (
    <div className="section-y">
      <div className="container max-w-3xl">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
            Informations légales
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-night-900 dark:text-white sm:text-4xl">
            Mentions légales
          </h1>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <p>
              Cette page est un modèle à compléter avec les informations légales réelles de
              votre entreprise avant mise en ligne publique.
            </p>
            <section>
              <h2 className="text-base font-bold text-night-900 dark:text-white">Éditeur du site</h2>
              <p className="mt-2">
                Raison sociale : VisionTech — CUSTOM IT (à confirmer)
                <br />
                Forme juridique : [à compléter]
                <br />
                Siège social : Boulevard Zerktouni, Casablanca, Maroc
                <br />
                Identifiant Commun de l&apos;Entreprise (ICE) : [à compléter]
                <br />
                Registre du Commerce (RC) : [à compléter]
                <br />
                Directeur de la publication : [à compléter]
              </p>
            </section>
            <section>
              <h2 className="text-base font-bold text-night-900 dark:text-white">Hébergement</h2>
              <p className="mt-2">Hébergeur : Vercel Inc. — [adresse de l&apos;hébergeur à compléter]</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-night-900 dark:text-white">Propriété intellectuelle</h2>
              <p className="mt-2">
                L&apos;ensemble des contenus de ce site (textes, logos, visuels) est la propriété
                de VisionTech — CUSTOM IT, sauf mention contraire.
              </p>
            </section>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
