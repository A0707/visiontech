import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation",
  description: "Conditions générales d'utilisation du site VisionTech — CUSTOM IT.",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <div className="section-y">
      <div className="container max-w-3xl">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
            Conditions
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-night-900 dark:text-white sm:text-4xl">
            Conditions générales d&apos;utilisation
          </h1>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <p>
              Cette page est un modèle à compléter avec vos conditions générales réelles
              (utilisation du site et, le cas échéant, conditions de vente de la boutique) avant
              mise en ligne publique.
            </p>
            <section>
              <h2 className="text-base font-bold text-night-900 dark:text-white">Objet</h2>
              <p className="mt-2">
                Les présentes conditions régissent l&apos;utilisation du site visiontech.ma et des
                services qui y sont proposés.
              </p>
            </section>
            <section>
              <h2 className="text-base font-bold text-night-900 dark:text-white">Boutique en ligne</h2>
              <p className="mt-2">
                [Préciser les conditions de vente réelles : modalités de commande, prix, délais
                de livraison, garanties, droit de rétractation le cas échéant.]
              </p>
            </section>
            <section>
              <h2 className="text-base font-bold text-night-900 dark:text-white">Responsabilité</h2>
              <p className="mt-2">
                VisionTech — CUSTOM IT s&apos;efforce d&apos;assurer l&apos;exactitude des informations
                diffusées sur ce site, sans garantie d&apos;absence d&apos;erreur.
              </p>
            </section>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
