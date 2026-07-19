import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculateur de devis",
  description:
    "Estimez en quelques clics le budget de votre projet IT : pare-feu, Wi-Fi, vidéosurveillance, Microsoft 365, serveurs et sauvegarde.",
  alternates: { canonical: "/devis" },
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
