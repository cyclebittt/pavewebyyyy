'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function AccordionExample() {
  const faqs = [
    {
      q: 'Was genau macht paveo?',
      a: 'paveo ist ein modulares Kreativ-Studio für digitale Markenkommunikation. Wir kombinieren Branding, Webdesign, Content & Systeme – psychologisch fundiert und auf messbare Conversion ausgerichtet.',
    },
    {
      q: 'Für wen ist paveo gedacht?',
      a: 'Für Selbstständige, kleine Unternehmen & lokale Marken. Modular bedeutet: Du buchst nur die Bausteine, die du wirklich brauchst – ohne Brüche in Design, Content oder Technik.',
    },
    {
      q: 'Wie läuft die Zusammenarbeit ab?',
      a: 'Kurzbriefing → Analyse & Zielbild → modulare Roadmap → Umsetzung in Sprints → Testen & Optimieren. Transparente Kommunikation, klare Zuständigkeiten, schnelle Loops.',
    },
    {
      q: 'Was kostet das?',
      a: 'Es gibt fixe Paketpreise (z. B. Social Media) und individuell kalkulierte Module (Branding, Website). Wir starten schlank – skalieren dann nach Bedarf.',
    },
    {
      q: 'Bietet ihr laufende Betreuung?',
      a: 'Ja. Social Media Management, Content-Produktion, sowie Pflege/Optimierung deiner Systeme (CRM, Automationen). Monatsweise planbar & kündbar.',
    },
  ];

  const [open, setOpen] = useState(-1);

  return (
    <div className="mx-auto w-full max-w-2xl">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className="mb-3 rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur transition hover:bg-white/[0.07]"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60"
            >
              <span className="text-base md:text-lg font-medium text-white">
                {item.q}
              </span>
              <span className="shrink-0 rounded-full border border-white/15 bg-white/10 p-1.5 text-white transition-transform duration-300 group-hover:scale-105">
                {isOpen ? <Minus size={18} /> : <Plus size={18} />}
              </span>
            </button>

            <div
              id={`faq-panel-${i}`}
              role="region"
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="px-5 pb-5 pt-0 text-sm md:text-base text-[#C9CEE0]">
                  {item.a}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
