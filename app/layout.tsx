import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { CartDrawer } from "@/components/shop/cart-drawer";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const SITE_URL = "https://www.visiontech.ma";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "VisionTech — CUSTOM IT | Infrastructure, Cloud & Cybersécurité à Casablanca",
    template: "%s | VisionTech — CUSTOM IT",
  },
  description:
    "VisionTech — CUSTOM IT accompagne les entreprises à Casablanca dans leur infrastructure IT, cloud, cybersécurité et support technique. Solutions sur mesure, boutique et maintenance premium.",
  keywords: [
    "infrastructure IT Casablanca",
    "cybersécurité Maroc",
    "cloud computing Maroc",
    "maintenance informatique Casablanca",
    "support IT entreprise",
    "VisionTech",
  ],
  authors: [{ name: "VisionTech — CUSTOM IT" }],
  creator: "VisionTech — CUSTOM IT",
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: SITE_URL,
    siteName: "VisionTech — CUSTOM IT",
    title: "VisionTech — CUSTOM IT | Infrastructure, Cloud & Cybersécurité",
    description:
      "Infrastructure · Cloud · Cybersécurité · Support. Votre partenaire IT de confiance à Casablanca.",
    images: [{ url: "/images/og-cover.png", width: 1200, height: 630, alt: "VisionTech — CUSTOM IT" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VisionTech — CUSTOM IT",
    description: "Infrastructure · Cloud · Cybersécurité · Support à Casablanca.",
    images: ["/images/twitter-card.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VisionTech — CUSTOM IT",
  url: SITE_URL,
  logo: `${SITE_URL}/brand/icone-sombre.svg`,
  description:
    "Intégrateur IT à Casablanca spécialisé en infrastructure, cloud et cybersécurité pour les entreprises marocaines.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Casablanca",
    addressCountry: "MA",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+212-6-00-00-00-00",
    contactType: "customer service",
    areaServed: "MA",
    availableLanguage: ["fr"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={manrope.variable} suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased selection:bg-electric-500/30">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-screen pt-20">{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
