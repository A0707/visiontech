import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { StatsBar } from "@/components/sections/stats-bar";
import { ServicesSection } from "@/components/sections/services-section";
import { ShopPreview } from "@/components/sections/shop-preview";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Accueil",
  description:
    "VisionTech — CUSTOM IT : infrastructure, cloud, cybersécurité et support technique pour les entreprises de Casablanca. Devis gratuit sous 24h.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesSection />
      <ShopPreview />
      <Testimonials />
      <CtaSection />
    </>
  );
}
