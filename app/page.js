'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

import {
  ArrowRight,
  Sun,
  PenTool,
  CodeXml,
  Users,
  LayoutDashboard,
  ChartPie,
} from 'lucide-react';

export default function Home() {
  const [aosDir, setAosDir] = useState('fade-right');

  useEffect(() => {
    let cleanup = () => {};
    (async () => {
      const AOS = (await import('aos')).default;
      await import('aos/dist/aos.css');
      AOS.init({ duration: 600, once: true, easing: 'ease-out' });
      cleanup = () => {};
    })();

    const onResize = () => setAosDir(window.innerWidth < 768 ? 'fade-up' : 'fade-right');
    onResize();
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('resize', onResize);
      cleanup();
    };
  }, []);

  return (
    <div className="font-proxima bg-[#0B0C10] text-white">
      <Navbar />

      {/* HERO */}
      <section
        className="
          relative overflow-hidden
          px-5 md:px-20 pt-16 md:pt-24 pb-24 md:pb-36
        "
        aria-labelledby="hero-heading"
      >
        {/* kräftiger diagonaler Gradient */}
        <div
          className="
            absolute inset-0 -z-10
            bg-[radial-gradient(1200px_500px_at_10%_10%,#1E1B4B_0%,transparent_60%),
                radial-gradient(1000px_500px_at_90%_30%,#0EA5E9_0%,transparent_60%),
                linear-gradient(135deg,#0B0C10_10%,#0F172A_60%,#0B0C10)]
          "
        />
        {/* weiche Glow-Bänder */}
        <div className="pointer-events-none absolute -left-32 top-28 h-40 w-[120%] -rotate-6 blur-2xl opacity-60"
             style={{background: 'linear-gradient(90deg, rgba(129,51,241,.22), rgba(14,165,233,.18))'}}/>
        <div className="pointer-events-none absolute -right-40 bottom-10 h-40 w-[120%] rotate-6 blur-2xl opacity-60"
             style={{background: 'linear-gradient(90deg, rgba(14,165,233,.2), rgba(129,51,241,.22))'}}/>

        <div className="max-w-6xl">
          <span className="inline-flex items-center gap-2 text-xs md:text-sm text-white/70 bg-white/5 rounded-full px-3 py-1 ring-1 ring-white/10">
            <Sun size={14} className="opacity-70" />
            Modulare Markenkommunikation für Selbstständige & KMU
          </span>

          <h1
            id="hero-heading"
            className="mt-6 text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight"
          >
            Eine Marke, die <span className="text-sky-300">wirklich</span> wirkt.
          </h1>

          <p className="mt-5 max-w-2xl text-white/70 text-base md:text-lg">
            Branding, Webdesign, Content & Systeme – psychologisch fundiert, modular
            aufgebaut und messbar auf Conversion ausgerichtet.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <Link
              href="/request"
              className="px-5 py-2.5 md:px-6 md:py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold"
            >
              Jetzt starten
            </Link>
            <a
              href="#services"
              className="px-5 py-2.5 md:px-6 md:py-3 rounded-full ring-1 ring-white/15 hover:ring-white/30 text-white/85 transition-all font-medium"
            >
              Mehr erfahren
            </a>
          </div>

          <div className="mt-10 flex gap-4 text-xs md:text-sm text-white/60">
            <span className="bg-white/5 ring-1 ring-white/10 rounded-full px-3 py-1">Seit: 2024</span>
            <span className="bg-white/5 ring-1 ring-white/10 rounded-full px-3 py-1">Module: 5</span>
            <span className="bg-white/5 ring-1 ring-white/10 rounded-full px-3 py-1">Netzwerk: 10+ Partner:innen</span>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-5 md:px-20 pb-20" aria-labelledby="services-heading">
        <div className="max-w-7xl">
          <h2 id="services-heading" className="text-2xl md:text-4xl font-semibold mb-3">
            Leistungen
          </h2>
          <p className="text-white/60 mb-10">
            Wähle nur die Bausteine, die du brauchst – oder kombiniere zu einem stimmigen Gesamtauftritt.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Branding & Positionierung */}
            <Link
              href="/services/branding"
              data-aos={aosDir}
              className="
                group relative overflow-hidden rounded-2xl p-6
                bg-gradient-to-br from-[#1B193F] via-[#151433] to-[#111225]
                ring-1 ring-white/10 hover:ring-white/20 transition-all
              "
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="h-11 w-11 rounded-full bg-white/10 flex items-center justify-center">
                  <PenTool size={20} />
                </div>
                <ArrowRight className="opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
              </div>
              <h3 className="text-xl font-bold">Branding & Positionierung</h3>
              <p className="mt-2 text-white/70">
                Logo, Farbwelt, Tonalität & Kernbotschaft – entwickelt, um bei deiner Zielgruppe im Kopf zu bleiben.
              </p>
            </Link>

            {/* Webdesign */}
            <Link
              href="/services/webdesign"
              data-aos={aosDir}
              className="
                group relative overflow-hidden rounded-2xl p-6
                bg-gradient-to-br from-[#1F2854] via-[#1A2246] to-[#121629]
                ring-1 ring-white/10 hover:ring-white/20 transition-all
              "
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="h-11 w-11 rounded-full bg-white/10 flex items-center justify-center">
                  <CodeXml size={20} />
                </div>
                <ArrowRight className="opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
              </div>
              <h3 className="text-xl font-bold">Webdesign</h3>
              <p className="mt-2 text-white/70">
                Klar, modern und conversion-stark – als Baukastensystem oder individuell entwickelt.
              </p>
            </Link>

            {/* Content Creation */}
            <Link
              href="/services/content"
              data-aos={aosDir}
              className="
                group relative overflow-hidden rounded-2xl p-6
                bg-gradient-to-br from-[#23314F] via-[#1A263D] to-[#111827]
                ring-1 ring-white/10 hover:ring-white/20 transition-all
              "
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="h-11 w-11 rounded-full bg-white/10 flex items-center justify-center">
                  <LayoutDashboard size={20} />
                </div>
                <ArrowRight className="opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
              </div>
              <h3 className="text-xl font-bold">Content Creation</h3>
              <p className="mt-2 text-white/70">
                Foto, Video, Texte & Motion Design – konsistent zur Markenwelt und auf Wirkung getrimmt.
              </p>
            </Link>

            {/* Social Media Management */}
            <Link
              href="/services/socialmedia"
              data-aos={aosDir}
              className="
                group relative overflow-hidden rounded-2xl p-6
                bg-gradient-to-br from-[#21273B] via-[#191E31] to-[#101625]
                ring-1 ring-white/10 hover:ring-white/20 transition-all
              "
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="h-11 w-11 rounded-full bg-white/10 flex items-center justify-center">
                  <Users size={20} />
                </div>
                <ArrowRight className="opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
              </div>
              <h3 className="text-xl font-bold">Social Media Management</h3>
              <p className="mt-2 text-white/70">
                Strategie, Planung, Content-Produktion & Analyse – ready-to-post und skalierbar.
              </p>
            </Link>

            {/* Leadsysteme */}
            <Link
              href="/services/leadsystem"
              data-aos={aosDir}
              className="
                group relative overflow-hidden rounded-2xl p-6
                bg-gradient-to-br from-[#2B244D] via-[#201D42] to-[#13132B]
                ring-1 ring-white/10 hover:ring-white/20 transition-all
              "
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="h-11 w-11 rounded-full bg-white/10 flex items-center justify-center">
                  <ChartPie size={20} />
                </div>
                <ArrowRight className="opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
              </div>
              <h3 className="text-xl font-bold">Leadsystem & Angebotsstrukturierung</h3>
              <p className="mt-2 text-white/70">
                Digitale Vertriebsprozesse: Angebots-Generatoren, Anfrageformulare, CRM-Einbindung u. v. m.
              </p>
            </Link>
          </div>

          <div className="mt-8">
            <Link
              href="/request"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold"
            >
              Leistungen anfragen <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* WARUM PAVEO */}
      <section className="px-5 md:px-20 pb-20" aria-labelledby="why-heading">
        <div className="max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            data-aos="fade-up"
            className="rounded-2xl p-7 bg-gradient-to-br from-[#251F4F] to-[#1A1536] ring-1 ring-white/10"
          >
            <span className="text-white/90 bg-white/10 px-4 py-1.5 rounded-full text-sm">Psychologisch fundiert</span>
            <p className="mt-4 text-white/80">
              Entscheidungen werden von Wahrnehmung, Heuristiken und Kontext geprägt. Wir konzipieren genau darauf – für
              mehr Relevanz und Conversion.
            </p>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="rounded-2xl p-7 bg-gradient-to-br from-[#26345C] to-[#17203A] ring-1 ring-white/10"
          >
            <span className="text-white/90 bg-white/10 px-4 py-1.5 rounded-full text-sm">Modular & flexibel</span>
            <p className="mt-4 text-white/80">
              Starte schlank, erweitere gezielt – ohne Brüche in Design, Content oder Technik.
            </p>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="rounded-2xl p-7 bg-gradient-to-br from-[#1F2538] to-[#121826] ring-1 ring-white/10"
          >
            <span className="text-white/90 bg-white/10 px-4 py-1.5 rounded-full text-sm">Kollaboratives Netzwerk</span>
            <p className="mt-4 text-white/80">
              Kein starres Agenturmodell: passgenaue Spezialist:innen pro Projekt – effizient, fair & transparent.
            </p>
          </div>
        </div>
      </section>

      {/* KONTAKT-CTA */}
      <section className="px-5 md:px-20 pb-24" aria-labelledby="cta-heading">
        <div className="max-w-7xl relative overflow-hidden rounded-3xl p-8 md:p-14 ring-1 ring-white/10">
          <div
            className="
              absolute inset-0 -z-10
              bg-[radial-gradient(800px_200px_at_20%_30%,rgba(129,51,241,.25),transparent_70%),
                  radial-gradient(700px_200px_at_80%_70%,rgba(14,165,233,.22),transparent_70%),
                  linear-gradient(135deg,#10121A_0%,#0F1420_60%,#0B0F17)]
            "
          />
          <h2 id="cta-heading" className="text-3xl md:text-5xl font-semibold">
            Bereit für den nächsten Schritt?
          </h2>
          <p className="mt-3 text-white/70 max-w-2xl">
            Lass uns deinen Auftritt schärfen – mit klarer Struktur, starken Inhalten und Systemen, die verkaufen.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/request"
              className="px-5 py-2.5 md:px-6 md:py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold"
            >
              Termin buchen
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2.5 md:px-6 md:py-3 rounded-full ring-1 ring-white/15 hover:ring-white/30 text-white/85 transition-all font-medium"
            >
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
