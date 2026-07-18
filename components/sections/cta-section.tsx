import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CtaSection() {
  return (
    <section className="section-y relative overflow-hidden">
      <div className="container">
        <Reveal>
          <div className="glass-card noise relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16">
            <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-electric-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

            <h2 className="relative text-3xl font-extrabold tracking-tight text-night-900 dark:text-white sm:text-4xl md:text-5xl">
              Prêt à sécuriser et faire évoluer
              <br className="hidden sm:block" /> votre infrastructure&nbsp;?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-slate-600 dark:text-slate">
              Échangez avec un expert VisionTech pour un audit gratuit de votre système
              d&apos;information et un devis personnalisé sous 24h.
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact" className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
                Demander un devis gratuit
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="tel:+212600000000" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                <PhoneCall className="h-4 w-4" />
                +212 6 00 00 00 00
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
