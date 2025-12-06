'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Video, FileText, LayoutTemplate } from 'lucide-react';

export default function PortfolioPage() {
  return (
    <div className="font-proxima bg-[#0B0B0F] text-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />

        <div className="relative max-w-4xl mx-auto px-5 md:px-16 pt-20 md:pt-24 pb-14 text-center">
          <span className="inline-flex items-center gap-2 text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
            <Sparkles size={16} /> Portfolio
          </span>

          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
            Ausgewählte Projekte & Arbeiten.
          </h1>

          <p className="mt-6 text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto">
            Eine kleine Auswahl an Landingpages, Formularen und Medien, die ich für reale oder beispielhafte Projekte umgesetzt habe.  
            Der Fokus liegt auf klaren Abläufen, einfacher Bedienbarkeit und modernem Design.
          </p>
        </div>
      </section>

      {/* PROJECT GRID */}
      <section className="px-5 md:px-16 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* PROJECT 1 – KIRCHE */}
          <ProjectCard
            title="Fundraising-Projekt: Kirche für Aschaffenburg"
            description="Komplette digitale Umsetzung eines Spendenprojekts: Landingpage, Zahlungswege, Struktur, Formulare und begleitende Medien."
            tags={['Landingpage', 'Formulare', 'Zahlungswege', 'Video', 'Flyer']}
            image="/img/portfolio-kirche.jpg" // Optionaler Platzhalter – du kannst ein echtes Bild einfügen
            href="#"
          />

          {/* PROJECT 2 – DEMO LANDINGPAGE */}
          <ProjectCard
            title="Beispiel: Aktion-Landingpage (Demo)"
            description="Eine strukturierte, moderne Demo-Landingpage für Spenden, Aktionen oder Events. Zeigt Aufbau, CTA-Führung und inhaltliche Klarheit."
            tags={['Landingpage', 'Demo-Projekt']}
            image="/img/portfolio-landing-demo.jpg"
            href="#"
          />

          {/* PROJECT 3 – FORMULAR DEMO */}
          <ProjectCard
            title="Formular-Demo: Anmeldung / Rückmeldung"
            description="Ein Beispiel für ein sauberes, verständliches Formular inklusive Felder, Bestätigung und optionaler Weiterleitung."
            tags={['Formulare', 'Datenstruktur']}
            image="/img/portfolio-form-demo.jpg"
            href="#"
          />

          {/* PROJECT 4 – VIDEO TRAILER */}
          <ProjectCard
            title="Motion-Trailer (Showcase)"
            description="Ein kurzer, hochwertiger Trailer zur Präsentation eines fiktiven Projekts – Motion Design, Textanimationen, Rhythmus & Atmosphäre."
            tags={['Motion Design', 'Video', 'Trailer']}
            image="/img/portfolio-video.jpg"
            href="#"
          />

        </div>

        <div className="text-center mt-12">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold"
          >
            Projekt anfragen <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* --- COMPONENT --- */

function ProjectCard({ title, description, tags, image, href }) {
  return (
    <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.05] transition-all">
      
      {/* IMAGE */}
      <div className="relative w-full h-56 md:h-64 bg-white/5">
        {image ? (
          <Image src={image} alt={title} fill className="object-cover opacity-90" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-500">
            Kein Bild
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="mt-2 text-neutral-300 text-sm">{description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t, i) => (
            <span key={i} className="text-xs bg-white/10 px-2 py-1 rounded-full text-indigo-200 border border-white/10">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5">
          <a href={href} className="inline-flex items-center gap-2 text-indigo-300 text-sm hover:text-indigo-200">
            Details ansehen <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
