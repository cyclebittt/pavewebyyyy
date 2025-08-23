'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ServiceTemplate from '@/components/services/ProofBlocks';
import { Workflow, Database, MailCheck, BarChart3 } from 'lucide-react';

export default function LeadSystems() {
  return (
    <ServiceTemplate
      NavbarCmp={<Navbar />}
      FooterCmp={<Footer />}
      heroTitle={<>Funnel & CRM, <span className="text-indigo-300">die arbeiten</span>.</>}
      heroSub="Besucher abholen, qualifizieren, nachfassen. Formulare, Automationen, CRM‑Flows – sauber integriert."
      deliverables={[
        { icon:<Workflow size={18}/>, title:'Funnel‑Design', desc:'Entry, Nurturing, CTA – ohne Leerlauf.' },
        { icon:<Database size={18}/>, title:'CRM‑Setup', desc:'Pipelines, Felder, Rollen, DSGVO.' },
        { icon:<MailCheck size={18}/>, title:'Automationen', desc:'Follow‑ups, Scoring, Tasks.' },
        { icon:<BarChart3 size={18}/>, title:'Reporting', desc:'Klarheit zu Quellen & ROI.' },
      ]}
      caseStudy={{
        title:'Lead‑Machine für Dienstleister',
        problem:'Viele Website‑Besuche, kaum strukturierte Nachverfolgung.',
        approach:'Form‑Flows + CRM‑Pipelines + Automationen + SLA.',
        results:['3× mehr qualifizierte Leads','–60% Nachfass‑Zeit','+22% Abschlussquote'],
      }}
      beforeAfter={{
        before:'/img/funnel-before.jpg',
        after:'/img/funnel-after.jpg',
        labelBefore:'Zerstreut',
        labelAfter:'Flow'
      }}
      outputs={[
        '/img/funnel-1.jpg','/img/funnel-2.jpg','/img/funnel-3.jpg',
        '/img/funnel-4.jpg','/img/funnel-5.jpg','/img/funnel-6.jpg',
      ]}
      process={[
        {title:'Mapping', text:'Ist‑Prozess, Lücken, Tools.'},
        {title:'Setup', text:'Funnel, CRM, Automationen.'},
        {title:'Rollout', text:'Team onboarden, QA.'},
        {title:'Messen', text:'KPIs & Iteration.'},
      ]}
      testimonials={[
        {quote:'Endlich Ordnung im Vertrieb. Wir verlieren keine Leads mehr.', name:'T. Bauer', role:'Geschäftsführer'},
        {quote:'Automationen sparen Stunden pro Woche.', name:'R. Giese', role:'Sales'},
        {quote:'Wir sehen jetzt genau, was funktioniert.', name:'H. Klein', role:'Marketing'},
      ]}
    />
  );
}
