import { faqItems } from "@/lib/faq";
import { FaqAccordion } from "@/components/faq-accordion";
import { Reveal } from "@/components/motion/reveal";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export function FaqSection() {
  return (
    <section id="faq" className="section-y relative scroll-mt-24 border-t">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-night-900 dark:text-white sm:text-4xl">
            Questions fréquentes
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <FaqAccordion items={faqItems} />
        </Reveal>
      </div>
    </section>
  );
}
