'use client'

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Welche Services bietet Pave an?",
    answer: "Wir bieten Branding, Webdesign, Social Media Management, Content Creation und IT-Consulting. Unser Ziel ist es, Unternehmen digital sichtbar und erfolgreich zu machen."
  },
  {
    question: "Wie läuft die Zusammenarbeit ab?",
    answer: "Nach einer ersten Beratung erstellen wir einen individuellen Projektplan. Du erhältst volle Transparenz über die Schritte, Deadlines und Ergebnisse."
  },
  {
    question: "Was kostet die Zusammenarbeit?",
    answer: "Unsere Preise richten sich nach dem Umfang. Für Social Media Management gibt es Paketpreise, andere Services kalkulieren wir individuell nach Aufwand."
  },
  {
    question: "Wie schnell bekomme ich Ergebnisse?",
    answer: "Erste sichtbare Ergebnisse können oft schon nach 2–4 Wochen entstehen. Langfristige Projekte wie Branding oder SEO brauchen etwas mehr Zeit."
  },
];

export default function AccordionExample() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white border border-neutral-300 rounded-xl overflow-hidden transition-all"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full flex justify-between items-center p-4 text-left text-lg font-medium text-neutral-800"
          >
            {faq.question}
            <ChevronDown
              className={`transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`px-4 pb-4 text-neutral-600 transition-all duration-300 ${
              openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
}
