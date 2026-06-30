import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useT, type TKey } from "@/lib/i18n";
import { Reveal } from "../Reveal";

const qa: { q: TKey; a: TKey }[] = [
  { q: "faq.q1", a: "faq.a1" },
  { q: "faq.q2", a: "faq.a2" },
  { q: "faq.q3", a: "faq.a3" },
  { q: "faq.q4", a: "faq.a4" },
  { q: "faq.q5", a: "faq.a5" },
  { q: "faq.q6", a: "faq.a6" },
];

export function FAQ() {
  const { t } = useT();
  return (
    <section id="faq" className="relative isolate overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="font-display text-sm font-bold uppercase tracking-[0.15em] text-violet">
            {t("faq.kicker")}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-5xl">
            {t("faq.title")}
          </h2>
        </Reveal>

        <Reveal className="mt-10">
          <Accordion type="single" collapsible className="w-full">
            {qa.map((item) => (
              <AccordionItem key={item.q} value={item.q} className="border-border">
                <AccordionTrigger className="font-display text-base font-bold tracking-tight text-foreground hover:text-violet sm:text-lg">
                  {t(item.q)}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {t(item.a)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
