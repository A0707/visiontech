import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez VisionTech — CUSTOM IT pour un devis gratuit ou une question sur nos services d'infrastructure, cloud, cybersécurité et support à Casablanca.",
};

const CONTACT_INFO = [
  { icon: MapPin, label: "Adresse", value: "Boulevard Zerktouni, Casablanca, Maroc" },
  { icon: Phone, label: "Téléphone", value: "+212 6 00 00 00 00" },
  { icon: Mail, label: "Email", value: "contact@visiontech.ma" },
  { icon: Clock, label: "Horaires", value: "Lun - Ven : 9h00 - 18h30" },
];

export default function ContactPage() {
  return (
    <div className="section-y">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
            Contact
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-night-900 dark:text-white sm:text-5xl">
            Parlons de votre projet
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate">
            Une question, un projet, un incident ? Notre équipe vous répond sous 24h
            ouvrées.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="space-y-4">
              {CONTACT_INFO.map((info) => (
                <div key={info.label} className="glass-card flex items-start gap-4 p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-electric-500/15 to-cyan-500/15 text-electric-600 ring-1 ring-slate-900/10 dark:text-electric-400 dark:ring-white/10">
                    <info.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate">{info.label}</p>
                    <p className="mt-0.5 text-sm font-medium text-night-900 dark:text-white">{info.value}</p>
                  </div>
                </div>
              ))}

              <div className="glass-card overflow-hidden">
                <iframe
                  title="Localisation VisionTech — CUSTOM IT à Casablanca"
                  src="https://www.google.com/maps?q=Casablanca,Maroc&output=embed"
                  className="h-56 w-full dark:grayscale dark:invert-[0.92] dark:contrast-[1.1]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-3">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
