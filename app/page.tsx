import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { StatsBar } from "@/components/sections/stats-bar";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { ServicesSection } from "@/components/sections/services-section";
import { ShopPreview } from "@/components/sections/shop-preview";
import { PartnersSlider } from "@/components/sections/partners-slider";
import { Certifications } from "@/components/sections/certifications";
import { Testimonials } from "@/components/sections/testimonials";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Accueil",
  description:
    "VisionTech — CUSTOM IT : infrastructure, cloud, cybersécurité et support technique pour les entreprises de Casablanca. Devis gratuit sous 24h.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <StatsBar />
      <WhyChooseUs />
      <ServicesSection />
      <ShopPreview />
      <PartnersSlider />
      <Certifications />
      <Testimonials />
      <FaqSection />
      <CtaSection />
    </>
  );
}
