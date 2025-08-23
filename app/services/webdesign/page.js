'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ServiceTemplate from '@/components/services/ProofBlocks';
import { Gauge, Shield, MousePointerClick } from 'lucide-react';

export default function Webdesign() {
  return (
    <ServiceTemplate
      NavbarCmp={<Navbar />}
      FooterCmp={<Footer />}
      heroTitle={<>Websites, die <span className="text-indigo-300">konvertieren</span>.</>}
      heroSub="Schnell, klar, vertrauensbildend. Struktur & Performance für Leads, nicht nur hübsch."
      deliverables={[
        { icon:<MousePointerClick size={18}/>, title:'Conversion‑Struktur', desc:'Hero‑Logik, Proof, CTA, Einwände.' },
        { icon:<Gauge size={18}/>, title:'Performance', desc:'Ladezeit, Responsiveness, Core Web Vitals.' },
        { icon:<Shield size={18}/>, title:'Vertrauen', desc:'Social Proof, Sicherheit, Rechtliches.' },
        { title:'CMS & Editierbarkeit', desc:'Sauber gepflegt, leicht erweiterbar.' },
      ]}
      caseStudy={{
        title:'B2B Landingpage Relaunch',
        problem:'Alte Seite langsam & unübersichtlich → wenig Anfragen.',
        approach:'UX‑Wireframe, neues Messaging, Code‑Optimierung.',
        results:['+34% Conversion‑Rate','–47% Bounce‑Rate','+0.9 s schnellere LCP'],
      }}
      beforeAfter={{
        before:'/img/web-before.jpg',
        after:'/img/web-after.jpg',
        labelBefore:'Alt',
        labelAfter:'Neu'
      }}
      outputs={[
        '/img/web-1.jpg','/img/web-2.jpg','/img/web-3.jpg',
        '/img/web-4.jpg','/img/web-5.jpg','/img/web-6.jpg',
      ]}
      process={[
        {title:'Audit & Ziele', text:'Ist‑Stand & Zieldefinition.'},
        {title:'UX & Content', text:'Wireframes, Copy, Struktur.'},
        {title:'Build', text:'Sauber, performant, CMS.'},
        {title:'Go‑Live & Iteration', text:'Messen, optimieren.'},
      ]}
      testimonials={[
        {quote:'Relaunch hat die Leads faktisch verdoppelt.', name:'J. König', role:'Vertrieb, SaaS'},
        {quote:'Schnell – auch im Projekt. Gute Entscheidungen.', name:'N. Frey', role:'Ops'},
        {quote:'Endlich fühlt sich die Seite “richtig” an.', name:'A. Lenz', role:'Founder'},
      ]}
    />
  );
}
