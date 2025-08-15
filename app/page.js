'use client'

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { ChevronDown, PenTool, CodeXml, LayoutDashboard, Users, ChartPie, ArrowRight, Sun } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
// Hinweis: Wir verzichten bewusst auf Bilder/Stock-Assets. Hero nutzt Gradient-Background.

export default function Home() {
  const [animationRight, setAnimationRight] = useState<'fade-right' | 'fade-down'>('fade-right');
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setActiveCard((prev) => (prev === index ? null : index));
  };

  // AOS nur clientseitig laden + Resize-Handling
  useEffect(() => {
    let cleanup = () => {};
    (async () => {
      const AOS = (await import('aos')).default;
      await import('aos/dist/aos.css');
      AOS.init({ duration: 500, once: true });
      cleanup = () => {
        // AOS hat kein explizites destroy nötig,
        // wir räumen nur unsere Listener auf.
      };
    })();

    const onResize = () => {
      // Mobile => kürzere Scrollrichtung
      if (window.innerWidth < 768) setAnimationRight('fade-down');
      else setAnimationRight('fade-right');
    };
    onResize();
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      window.removeEventListener('resize', onResize);
      cleanup();
    };
  }, []);

  // Tastaturunterstützung für die Service-Karten
  const onKeyToggle = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleCard(index);
    }
  };

  return (
    <div className="font-proxima">
      <Navbar />

      {/* HERO */}
      <section
        className="md:px-5 md:pb-12"
        aria-labelledby="hero-heading"
      >
        <div className="relative flex flex-col items-center py-10 md:pt-40 md:pb-52 px-4 gap-6 md:gap-12 md:rounded-3xl overflow-hidden
                        bg-gradient-to-br from-violet-900 via-[#2D286A] to-neutral-900">
          {/* Kein Bild/Video mehr, nur gradient für bessere LCP */}
          <div className="flex text-white flex-col items-center justify-center gap-3 md:gap-4 max-w-3xl">
            <h1 id="hero-heading" className="text-3xl sm:text-5xl md:text-7xl font-bold text-center">
              paveo — Dein Weg zu wirksamer Markenkommunikation.
            </h1>
            <p className="text-sm md:text-lg text-center">
              Branding, Webdesign, Content & Systeme — modular, psychologisch fundiert und praxistauglich für Selbstständige & KMU.
            </p>
          </div>

          <Link
            href="/request"
            className="px-4 py-2 md:px-8 md:py-3 text-sm md:text-base bg-violet-600 text-white rounded-full font-medium transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-400"
            role="button"
            aria-label="Termin anfragen"
          >
            Termin anfragen
          </Link>
        </div>
      </section>

      {/* SERVICES */}
      <section className="px-0 md:px-5 pb-10" aria-labelledby="services-heading">
        <div className="bg-neutral-800 rounded-none md:rounded-3xl px-5 py-8 md:p-14 flex flex-col items-center justify-center gap-12">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="text-white flex flex-col items-center justify-center gap-3 max-w-2xl">
              <div className="flex flex-col items-center justify-center gap-2">
                <Sun aria-hidden="true" />
                <h2 id="services-heading" className="font-medium text-xl md:text-2xl text-center">Leistungen</h2>
              </div>
              <p className="font-semibold text-2xl md:text-4xl text-center">
                Modul für Modul zu mehr Wirkung.
              </p>
              <p className="text-neutral-300 text-center">
                Buche nur, was du wirklich brauchst — kombiniert zu einem stimmigen, conversion‑orientierten Gesamtauftritt.
              </p>
            </div>

            {/* 5 Karten – mobil als Akkordeon, Desktop offen */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
              {/* Branding & Positionierung */}
              <div
                data-aos={animationRight}
                data-aos-duration="500"
                className="relative bg-[#353088] px-6 pt-6 rounded-2xl w-full min-h-[420px] md:min-h-[520px] flex flex-col gap-8"
              >
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between items-center">
                    <div className="h-12 w-12 rounded-full text-[#353088] bg-neutral-200 flex items-center justify-center">
                      <PenTool size={24} aria-hidden="true" />
                    </div>
                    <button
                      className="md:hidden text-white"
                      aria-expanded={activeCard === 0}
                      aria-controls="svc-0"
                      onClick={() => toggleCard(0)}
                    >
                      <ChevronDown />
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 text-white">
                    <h3 className="font-bold text-2xl">Branding &amp; Positionierung</h3>
                    <p
                      id="svc-0"
                      className={`text-base md:text-lg transition-all duration-300 overflow-hidden ${activeCard === 0 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} md:max-h-none md:opacity-100`}
                    >
                      Logo, Farbwelt, Tonalität und Kernbotschaft — passgenau auf deine Zielgruppe. Psychologisch geschärft statt
                      nur „schön“.
                    </p>
                  </div>
                </div>
              </div>

              {/* Webdesign */}
              <div
                data-aos={animationRight}
                data-aos-duration="500"
                className="flex flex-col gap-8 w-full h-full"
              >
                <div
                  className="md:h-1/2 flex flex-col gap-5 p-6 bg-[#7569AD] rounded-2xl"
                >
                  <div className="flex justify-between items-center">
                    <div className="h-12 w-12 rounded-full text-[#4B3A98] bg-white flex items-center justify-center">
                      <CodeXml size={24} aria-hidden="true" />
                    </div>
                    <button
                      className="md:hidden text-white"
                      aria-expanded={activeCard === 1}
                      aria-controls="svc-1"
                      onClick={() => toggleCard(1)}
                    >
                      <ChevronDown />
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 text-white">
                    <h3 className="font-bold text-2xl">Webdesign</h3>
                    <p
                      id="svc-1"
                      className={`transition-all duration-300 overflow-hidden ${activeCard === 1 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} md:max-h-none md:opacity-100`}
                    >
                      Klar strukturiert, modern und conversion‑orientiert — als Baukastensystem oder individuell entwickelt.
                    </p>
                  </div>
                </div>

                {/* Social Media Management */}
                <div
                  className="md:h-1/2 flex flex-col gap-5 p-6 bg-[#B6B0D6] rounded-2xl"
                >
                  <div className="flex justify-between items-center">
                    <div className="h-12 w-12 rounded-full text-[#222] bg-white flex items-center justify-center">
                      <Users size={24} aria-hidden="true" />
                    </div>
                    <button
                      className="md:hidden text-neutral-900"
                      aria-expanded={activeCard === 2}
                      aria-controls="svc-2"
                      onClick={() => toggleCard(2)}
                    >
                      <ChevronDown />
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">Social Media Management</h3>
                    <p
                      id="svc-2"
                      className={`text-neutral-700 transition-all duration-300 overflow-hidden ${activeCard === 2 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} md:max-h-none md:opacity-100`}
                    >
                      Strategie, Planung, Content‑Produktion (Reels, Posts), Analyse & Management — ready‑to‑post.
                    </p>
                  </div>
                </div>
              </div>

              {/* Content Creation + Leadsystem */}
              <div
                data-aos={animationRight}
                data-aos-duration="500"
                className="flex flex-col gap-8 w-full h-full"
              >
                <div
                  className="md:h-1/2 flex flex-col gap-5 p-6 bg-white rounded-2xl"
                >
                  <div className="flex justify-between items-center">
                    <div className="h-12 w-12 rounded-full text-[#222] bg-neutral-200 flex items-center justify-center">
                      <LayoutDashboard size={24} aria-hidden="true" />
                    </div>
                    <button
                      className="md:hidden text-neutral-900"
                      aria-expanded={activeCard === 3}
                      aria-controls="svc-3"
                      onClick={() => toggleCard(3)}
                    >
                      <ChevronDown />
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">Content Creation</h3>
                    <p
                      id="svc-3"
                      className={`text-neutral-700 transition-all duration-300 overflow-hidden ${activeCard === 3 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} md:max-h-none md:opacity-100`}
                    >
                      Foto, Video, Copywriting & Motion Design — konsistent zur Markenwelt und auf Wirkung getrimmt.
                    </p>
                  </div>
                </div>

                <div
                  className="md:h-1/2 flex flex-col gap-5 p-6 bg-[#F5F4FC] rounded-2xl"
                >
                  <div className="flex justify-between items-center">
                    <div className="h-12 w-12 rounded-full text-[#222] bg-neutral-200 flex items-center justify-center">
                      <ChartPie size={24} aria-hidden="true" />
                    </div>
                    <button
                      className="md:hidden text-neutral-900"
                      aria-expanded={activeCard === 4}
                      aria-controls="svc-4"
                      onClick={() => toggleCard(4)}
                    >
                      <ChevronDown />
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">Leadsystem &amp; Angebotsstrukturierung</h3>
                    <p
                      id="svc-4"
                      className={`text-neutral-700 transition-all duration-300 overflow-hidden ${activeCard === 4 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} md:max-h-none md:opacity-100`}
                    >
                      Digitale Vertriebsprozesse: automatisierte Angebots‑Generatoren, Anfrageformulare, CRM‑Einbindung u. v. m.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/request"
              className="px-6 py-3 bg-violet-600 text-white rounded-full font-medium flex items-center gap-2 transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-400"
              role="button"
              aria-label="Leistungen anfragen"
            >
              Jetzt anfragen <ArrowRight className="hidden md:inline" />
            </Link>
          </div>
        </div>
      </section>

      {/* WARUM PAVEO */}
      <section className="px-5 py-10" aria-labelledby="why-heading">
        <div className="bg-white rounded-3xl px-0 md:px-5 py-8 md:p-14 flex flex-col gap-12">
          <div className="flex gap-4 max-w-6xl">
            <Sun className="min-w-[16px]" aria-hidden="true" />
            <div className="flex flex-col gap-6">
              <h2 id="why-heading" className="font-medium text-xl md:text-2xl">Warum paveo</h2>
              <p className="font-semibold text-2xl md:text-4xl">
                Psychologisch fundiert. Modular &amp; flexibel. Kollaborativ. Für kleine Budgets — professionell umgesetzt.
              </p>
              <Link
                href="/request"
                className="w-fit px-6 py-3 bg-violet-600 text-white rounded-full font-medium transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-400"
                role="button"
                aria-label="Projekt starten"
              >
                Projekt starten
              </Link>
            </div>
          </div>

          {/* Metriken/Trust ohne Bilder */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <div className="w-full bg-[#353088] rounded-2xl flex flex-col p-8 gap-4 items-center justify-center text-center">
              <span className="text-white/90 bg-white/10 px-4 py-2 rounded-full">Psychologisch fundiert</span>
              <p className="text-white">
                Entscheidungen werden von Wahrnehmung, Heuristiken und Kontext geprägt. Unsere Konzepte zielen genau darauf — für mehr
                Relevanz und Conversion.
              </p>
            </div>

            <div className="w-full bg-[#7569AD] rounded-2xl flex flex-col p-8 gap-4 items-center justify-center text-center text-white">
              <span className="bg-white/10 px-4 py-2 rounded-full">Modular &amp; skalierbar</span>
              <p>
                Leistungen sind Bausteine. Du startest schlank und ergänzt später — ohne Brüche in Design, Content oder Technik.
              </p>
            </div>

            <div className="w-full bg-[#EAEAEA] rounded-2xl flex flex-col p-8 gap-4 items-center justify-center text-center">
              <span className="text-[#353088] bg-[#7569AD1F] px-4 py-2 rounded-full">Kollaboratives Netzwerk</span>
              <p className="text-neutral-900">
                Kein starres Agenturmodell: Wir arbeiten mit einem wachsenden Netzwerk und fairen Beteiligungen — effizient und nahbar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* KONTAKT */}
      <section className="px-5 md:px-20 py-10 md:py-20" aria-labelledby="contact-heading">
        <div className="flex flex-col md:flex-row gap-16">
          <div data-aos="fade-up" data-aos-duration="500" className="w-full md:w-2/5 flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <h2 id="contact-heading" className="font-semibold text-3xl md:text-5xl">
                Lass uns starten.
              </h2>
              <p className="text-neutral-700">
                Ob konkrete Anfrage oder erstes Sparring: Schreib uns kurz, was du vorhast — wir melden uns zeitnah.
              </p>
              <Link
                href="/request"
                className="w-fit px-5 py-2.5 bg-violet-700 text-white rounded-full font-semibold border-2 border-violet-700 relative overflow-hidden
                           transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-400"
                role="button"
                aria-label="Termin buchen"
              >
                Termin buchen
              </Link>
            </div>
            <div className="flex items-center gap-2 text-neutral-900">
              <p className="text-lg md:text-xl font-medium">Wir freuen uns auf das Projekt!</p>
              <ArrowRight aria-hidden="true" />
            </div>
          </div>

          {/* Rechte Spalte: statt Stock-Fotos einfache Info-Karten */}
          <div data-aos={animationRight} data-aos-duration="500" className="w-full md:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-2xl p-6 bg-neutral-100">
              <h3 className="font-semibold text-xl mb-2">Tools &amp; Arbeitsweise</h3>
              <ul className="list-disc pl-5 text-neutral-700">
                <li>Slack &amp; Asana für smoothe Zusammenarbeit</li>
                <li>Transparente Prozesse &amp; klare Zuständigkeiten</li>
                <li>Templates &amp; Standards für Outreach &amp; Self‑Branding</li>
              </ul>
            </div>
            <div className="rounded-2xl p-6 bg-neutral-100">
              <h3 className="font-semibold text-xl mb-2">Beteiligungsmodell</h3>
              <p className="text-neutral-700">
                Teammitglieder erhalten prozentuale Anteile je nach Beitrag (z. B. 40 % bei Kundenakquise durch Outreach).
              </p>
            </div>
            <div className="rounded-2xl p-6 bg-neutral-100">
              <h3 className="font-semibold text-xl mb-2">Interne Projekte</h3>
              <ul className="list-disc pl-5 text-neutral-700">
                <li>paveo Outreach (Leadgewinnung)</li>
                <li>paveo General (Struktur &amp; Org)</li>
                <li>paveo Social Media (eigener Auftritt)</li>
              </ul>
            </div>
            <div className="rounded-2xl p-6 bg-neutral-100">
              <h3 className="font-semibold text-xl mb-2">Zielbild</h3>
              <p className="text-neutral-700">
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
