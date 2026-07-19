import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "Découvrez notre boutique d'équipements IT professionnels : serveurs, réseau, cybersécurité, postes de travail et licences cloud.",
  alternates: { canonical: "/boutique" },
};

export default function BoutiqueLayout({ children }: { children: React.ReactNode }) {
  return children;
}
