import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Découvrez les projets menés par VisionTech — CUSTOM IT : infrastructure, cloud, cybersécurité, virtualisation, Microsoft 365 et Wi-Fi professionnel.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
