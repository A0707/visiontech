import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et protection des données de VisionTech — CUSTOM IT.",
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="section-y">
      <div className="container max-w-3xl">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
            Confidentialité
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-night-900 dark:text-white sm:text-4xl">
            Politique de confidentialité
          </h1>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <p>
              Cette page est un modèle à compléter avec votre politique réelle de traitement des
              données personnelles, conformément à la loi 09-08 relative à la protection des
              données à caractère personnel au Maroc, avant mise en ligne publique.
            </p>
            <section>
              <h2 className="text-base font-bold text-night-900 dark:text-white">Données collectées</h2>
              <p className="mt-2">
                Via le formulaire de contact et la newsletter : nom, email, téléphone, entreprise,
                message. [Préciser toute autre donnée réellement collectée, ex. cookies analytiques.]
              </p>
            </section>
            <section>
              <h2 className="text-base font-bold text-night-900 dark:text-white">Finalité</h2>
              <p className="mt-2">
                Ces données sont utilisées exclusivement pour répondre à vos demandes et, si vous
                y consentez, vous adresser notre newsletter.
              </p>
            </section>
            <section>
              <h2 className="text-base font-bold text-night-900 dark:text-white">Vos droits</h2>
              <p className="mt-2">
                Conformément à la réglementation en vigueur, vous disposez d&apos;un droit d&apos;accès, de
                rectification et de suppression de vos données. Contact : [email dédié à compléter].
              </p>
            </section>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
