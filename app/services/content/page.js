'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ServiceTemplate from '@/components/services/ProofBlocks';
import { Video, Image as Img, Megaphone, MessageSquare } from 'lucide-react';

export default function Content() {
  return (
    <ServiceTemplate
      NavbarCmp={<Navbar />}
      FooterCmp={<Footer />}
      heroTitle={<>Content, der <span className="text-indigo-300">zieht</span>.</>}
      heroSub="Foto, Video, Motion, Text – zugeschnitten auf Zielgruppe & Funnel‑Stufe. Ready‑to‑post."
      deliverables={[
        { icon:<Video size={18}/>, title:'Reels/Shorts', desc:'Hook → Story → CTA – für Reichweite & Leads.' },
        { icon:<Img size={18}/>, title:'Graphics & Carousels', desc:'Design mit Wiedererkennung.' },
        { icon:<Megaphone size={18}/>, title:'Ad‑Creatives', desc:'Auf Conversion getestet.' },
        { icon:<MessageSquare size={18}/>, title:'Copywriting', desc:'Klar. Wirksam. On‑Brand.' },
      ]}
      caseStudy={{
        title:'Dienstleister • Social Performance',
        problem:'Unregelmäßiger Content, niedrige Engagement‑Rate.',
        approach:'Editorial‑Plan + Templates + Variationen für A/B‑Tests.',
        results:['+220% Reichweite (60 Tage)','3× mehr qualifizierte Anfragen','CPM –18% in Paid‑Tests'],
      }}
      beforeAfter={{
        before:'/img/content-before.jpg',
        after:'/img/content-after.jpg',
        labelBefore:'Rohmaterial',
        labelAfter:'Final Post'
      }}
      outputs={[
        '/img/content-1.jpg','/img/content-2.jpg','/img/content-3.jpg',
        '/img/content-4.jpg','/img/content-5.jpg','/img/content-6.jpg',
      ]}
      process={[
        {title:'Plan', text:'Themen, Formate, Frequenz.'},
        {title:'Produktion', text:'Drehs, Design, Text.'},
        {title:'Distribution', text:'Organisch + Paid.'},
        {title:'Review', text:'KPIs → nächste Iteration.'},
      ]}
      testimonials={[
        {quote:'Konstant guter Content = konstant neue Anfragen.', name:'S. Wagner', role:'CEO, Handwerk'},
        {quote:'Die Templates sparen uns Zeit & halten die Linie.', name:'C. Jung', role:'Marketing'},
        {quote:'Klarer Content‑Plan – endlich kein Ad‑hoc‑Stress.', name:'E. Krauß', role:'Gründerin'},
      ]}
    />
  );
}
