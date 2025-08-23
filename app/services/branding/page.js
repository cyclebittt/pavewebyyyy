'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ServiceTemplate, { Deliverables } from '@/components/services/ProofBlocks';
import { Target, MessageSquare, LayoutTemplate, Palette, Type, Wand2 } from 'lucide-react';

export default function Branding() {
  return (
    <ServiceTemplate
      NavbarCmp={<Navbar />}
      FooterCmp={<Footer />}
      heroTitle={<>Branding, das <span className="text-indigo-300">greift</span> und konvertiert.</>}
      heroSub="Kernbotschaft, Nutzen, Tonalität & visuelles System – psychologisch fundiert und modular gedacht."
      ctaHref="/request"
      deliverables={[
        { icon:<Target size={18}/>, title:'Positionierung & Zielsegmente', desc:'Schärfe, Relevanz, klare Nutzenargumente.' },
        { icon:<MessageSquare size={18}/>, title:'Naming, Claim & Tonalität', desc:'Wording, das hängenbleibt.' },
        { icon:<LayoutTemplate size={18}/>, title:'Brand-Guidelines (PDF + Figma)', desc:'System statt Einzelstück.' },
        { icon:<Palette size={18}/>, title:'Farbwelt & Typografie', desc:'Skalierbare Komponenten, konsistent.' },
        { icon:<Type size={18}/>, title:'Logo-System', desc:'Primär/Secondary/Monogram.' },
        { icon:<Wand2 size={18}/>, title:'Anwendungsbeispiele', desc:'Web, Ads, Social, Print.' },
      ]}
      caseStudy={{
        title: 'Neupositionierung Café • Region',
        problem: 'Unklare Botschaft, wechselnde Gestaltung, schwacher Wiedererkennungswert.',
        approach: 'Nutzenkerne definiert, Tonalität auf „regional handgemacht“ geschärft, modulares Design‑System.',
        results: ['+31% Wiedererkennung (Umfrage)', '–25% Absprungrate Website', '+18% Direktanfragen'],
      }}
      beforeAfter={{
        before:'/img/branding-before.jpg',
        after:'/img/branding-after.jpg',
        labelBefore:'Altes Erscheinungsbild',
        labelAfter:'Neues System'
      }}
      outputs={[
        '/img/brand-1.jpg','/img/brand-2.jpg','/img/brand-3.jpg',
        '/img/brand-4.jpg','/img/brand-5.jpg','/img/brand-6.jpg',
      ]}
      process={[
        {title:'Kickoff & Research', text:'Ziele, Markt, Zielgruppe.'},
        {title:'Core & Botschaften', text:'Positionierung, Tonalität.'},
        {title:'Design‑System', text:'Logo, Typo, Farben, Komponenten.'},
        {title:'Guides & Rollout', text:'PDF/Figma + Begleitung.'},
      ]}
      testimonials={[
        {quote:'Endlich wirkt alles wie aus einem Guss – und verkauft besser.', name:'M. Richter', role:'Inhaber, Café'},
        {quote:'Klarer Fokus + System. Entscheidend für alle Kanäle.', name:'L. Sommer', role:'Marketing, Tech'},
        {quote:'Weniger diskutieren, mehr machen – Guidelines helfen enorm.', name:'K. Arnold', role:'Founder'},
      ]}
    />
  );
}
