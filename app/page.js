'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  PenTool, CodeXml, Users, LayoutDashboard, ChartPie,
  ArrowRight, Sun
} from 'lucide-react';

export default function Home() {
  const [animationRight, setAnimationRight] = useState('fade-right');
  const [activeCard, setActiveCard] = useState(null);

  const toggleCard = (index) => {
    setActiveCard((prev) => (prev === index ? null : index));
  };

  // AOS + responsive Animationsrichtung
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
    const onResize = () => setAnimationRight(window.innerWidth < 768 ? 'fade-down' : 'fade-right');
    onResize();
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const onKeyToggle = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleCard(index);
    }
  };

  return (
    <div className="font-proxima bg-[#0B0B0F] text-white">
      <Navbar />

      {/* HERO */}
      <section className="px-5 md:px-8 lg:px-12">
        <div className="relative overflow-hidden rounded-none md:rounded-3xl">
          {/* kräftige diagonale Gradients im Hintergrund */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.22),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#101018_60%,#0B0B0F_100%)]" />
          <div className="relative flex flex-col items-center text-center gap-6 md:gap-8 py-16 md:py-28 px-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1]">
              paveo — <span className="text-indigo-300">wirksame</span> Markenkommunikation.
            </h1>
            <p className="text-sm md:text-lg text-neutral-300 max-w-3xl">
              Branding, Webdesign, Content & Systeme — modular, psychologisch fundiert
              und praxistauglich für Selbstständige & KMU.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/request"
                className="px-5 py-2.5 md:px-7 md:py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-400"
              >
                Termin anfragen <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="px-5 py-2.5 md:px-7 md:py-3 rounded-full border border-white/15 hover:border-white/30 bg-white/5 transition-colors"
              >
                Kontakt
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="px-5 md:px-8 lg:px-12 py-10 md:py-14" aria-labelledby="services-heading">
        <div className="bg-neutral-900/60 rounded-none md:rounded-3xl border border-white/10 px-5 py-8 md:p-12 flex flex-col items-center gap-10">
          <div className="text-white flex flex-col items-center gap-3 max-w-2xl">
            <div className="flex flex-col items-center gap-2">
              <Sun aria-hidden="true" />
              <h2 id="services-heading" className="font-medium text-xl md:text-2xl text-center">Leistungen</h2>
            </div>
            <p className="font-semibold text-2xl md:text-4xl text-center">
              Modul für Modul zu mehr Wirkung.
            </p>
            <p className="text-neutral-300 text-center">
              Buche nur, was du wirklich brauchst — kombiniert zu einem stimmigen, conversion-orientierten Gesamtauftritt.
            </p>
          </div>

          {/* 5 Kacheln – klickbar zu einzelnen Service-Seiten */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {/* Branding */}
            <Link
              href="/services/branding"
              className="group relative bg-[#353088] rounded-2xl p-6 min-h-[280px] flex flex-col justify-between transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              data-aos={animationRight}
            >
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-full text-[#353088] bg-neutral-200 flex items-center justify-center">
                  <PenTool size={22} />
                </div>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white/90">→</span>
              </div>
              <div className="text-white mt-4">
                <h3 className="font-bold text-2xl">Branding &amp; Positionierung</h3>
                <p className="mt-2 text-white/90">
                  Logo, Farbwelt, Tonalität, Kernbotschaft — psychologisch geschärft für Relevanz.
                </p>
              </div>
            </Link>

            {/* Webdesign + Social als Spalte */}
            <div className="flex flex-col gap-6" data-aos={animationRight}>
              <Link
                href="/services/webdesign"
                className="group p-6 bg-[#7569AD] rounded-2xl min-h-[160px] flex flex-col justify-between transition-transform duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-full text-[#4B3A98] bg-white flex items-center justify-center">
                    <CodeXml size={22} />
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white">→</span>
                </div>
                <div className="text-white mt-3">
                  <h3 className="font-bold text-2xl">Webdesign</h3>
                  <p className="mt-1">Klar, modern, conversion-orientiert — Baukasten oder Custom.</p>
                </div>
              </Link>

              <Link
                href="/services/socialmedia"
                className="group p-6 bg-[#B6B0D6] rounded-2xl min-h-[160px] flex flex-col justify-between transition-transform duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-full text-[#222] bg-white flex items-center justify-center">
                    <Users size={22} />
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-900">→</span>
                </div>
                <div className="mt-3 text-neutral-900">
                  <h3 className="font-bold text-2xl">Social Media Management</h3>
                  <p className="mt-1 text-neutral-800">Strategie, Produktion, Analyse — ready-to-post.</p>
                </div>
              </Link>
            </div>

            {/* Content + Lead als Spalte */}
            <div className="flex flex-col gap-6" data-aos={animationRight}>
              <Link
                href="/services/content"
                className="group p-6 bg-white rounded-2xl min-h-[160px] flex flex-col justify-between transition-transform duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-full text-[#222] bg-neutral-200 flex items-center justify-center">
                    <LayoutDashboard size={22} />
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-900">→</span>
                </div>
                <div className="mt-3">
                  <h3 className="font-bold text-2xl text-neutral-900">Content Creation</h3>
                  <p className="mt-1 text-neutral-700">Foto, Video, Copy & Motion — konsistent zur Marke.</p>
                </div>
              </Link>

              <Link
                href="/services/lead"
                className="group p-6 bg-[#F5F4FC] rounded-2xl min-h-[160px] flex flex-col justify-between transition-transform duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-full text-[#222] bg-neutral-200 flex items-center justify-center">
                    <ChartPie size={22} />
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-900">→</span>
                </div>
                <div className="mt-3">
                  <h3 className="font-bold text-2xl text-neutral-900">Leadsystem &amp; Angebote</h3>
                  <p className="mt-1 text-neutral-700">
                    Funnel, Formulare, CRM — digitale Prozesse, die konvertieren.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <Link
            href="/request"
            className="px-6 py-3 bg-violet-600 text-white rounded-full font-medium flex items-center gap-2 transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-400"
            aria-label="Leistungen anfragen"
          >
            Jetzt anfragen <ArrowRight className="hidden md:inline" />
          </Link>
        </div>
      </section>

      {/* WARUM PAVEO */}
      <section className="px-5 md:px-8 lg:px-12 py-10" aria-labelledby="why-heading">
        <div className="bg-white/5 border border-white/10 rounded-3xl px-5 py-8 md:p-12 flex flex-col gap-10">
          <div className="flex gap-4 max-w-5xl">
            <Sun className="min-w-[16px] text-indigo-300" aria-hidden="true" />
            <div className="flex flex-col gap-6">
              <h2 id="why-heading" className="font-medium text-xl md:text-2xl">Warum paveo</h2>
              <p className="font-semibold text-2xl md:text-4xl">
                Psychologisch fundiert. Modular &amp; flexibel. Kollaborativ. Für kleine Budgets — professionell umgesetzt.
              </p>
              <Link
                href="/request"
                className="w-fit px-6 py-3 bg-violet-600 text-white rounded-full font-medium transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-400"
              >
                Projekt starten
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <div className="w-full bg-[#353088] rounded-2xl flex flex-col p-8 gap-4 items-center justify-center text-center">
              <span className="text-white/90 bg-white/10 px-4 py-2 rounded-full">Psychologisch fundiert</span>
              <p className="text-white">
                Entscheidungen werden von Wahrnehmung & Kontext geprägt. Unsere Konzepte zielen darauf — für Relevanz & Conversion.
              </p>
            </div>

            <div className="w-full bg-[#7569AD] rounded-2xl flex flex-col p-8 gap-4 items-center justify-center text-center text-white">
              <span className="bg-white/10 px-4 py-2 rounded-full">Modular &amp; skalierbar</span>
              <p>Starte schlank und erweitere später — ohne Brüche in Design, Content oder Technik.</p>
            </div>

            <div className="w-full bg-white/10 border border-white/10 rounded-2xl flex flex-col p-8 gap-4 items-center justify-center text-center">
              <span className="text-indigo-200 bg-white/5 px-4 py-2 rounded-full">Kollaboratives Netzwerk</span>
              <p className="text-neutral-100">
                Kein starres Agenturmodell: Wir arbeiten mit einem wachsenden Netzwerk & fairen Beteiligungen — effizient & nahbar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* KONTAKT / CTA */}
      <section className="px-5 md:px-8 lg:px-12 py-12 md:py-20" aria-labelledby="contact-heading">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16">
          <div data-aos="fade-up" className="w-full md:w-2/5 flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <h2 id="contact-heading" className="font-semibold text-3xl md:text-5xl">
                Lass uns starten.
              </h2>
              <p className="text-neutral-300">
                Ob konkrete Anfrage oder erstes Sparring: Schreib uns kurz, was du vorhast — wir melden uns zeitnah.
              </p>
              <Link
                href="/request"
                className="w-fit px-5 py-2.5 bg-violet-600 text-white rounded-full font-semibold border-2 border-violet-600 relative overflow-hidden transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-400"
              >
                Termin buchen
              </Link>
            </div>
            <div className="flex items-center gap-2 text-neutral-200">
              <p className="text-lg md:text-xl font-medium">Wir freuen uns auf das Projekt!</p>
              <ArrowRight aria-hidden="true" />
            </div>
          </div>

          <div data-aos={animationRight} className="w-full md:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
              <h3 className="font-semibold text-xl mb-2">Tools &amp; Arbeitsweise</h3>
              <ul className="list-disc pl-5 text-neutral-300">
                <li>Slack &amp; Asana für smoothe Zusammenarbeit</li>
                <li>Transparente Prozesse &amp; klare Zuständigkeiten</li>
                <li>Templates &amp; Standards für Outreach &amp; Self-Branding</li>
              </ul>
            </div>
            <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
              <h3 className="font-semibold text-xl mb-2">Beteiligungsmodell</h3>
              <p className="text-neutral-300">
                Teammitglieder erhalten prozentuale Anteile je nach Beitrag (z. B. 40 % bei Kundenakquise durch Outreach).
              </p>
            </div>
            <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
              <h3 className="font-semibold text-xl mb-2">Interne Projekte</h3>
              <ul className="list-disc pl-5 text-neutral-300">
                <li>paveo Outreach (Leadgewinnung)</li>
                <li>paveo General (Struktur &amp; Org)</li>
                <li>paveo Social Media (eigener Auftritt)</li>
              </ul>
            </div>
            <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
              <h3 className="font-semibold text-xl mb-2">Zielbild</h3>
              <p className="text-neutral-300">
                Eine smarte, klare Marke für KMU — mit reduzierten Designs, scharfem Messaging und skalierbaren Systemen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


