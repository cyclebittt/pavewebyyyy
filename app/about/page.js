'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Sun, ArrowRight } from 'lucide-react';

export default function About() {
  const [animationRight, setAnimationRight] = useState('fade-right');

  useEffect(() => {
    let cleanup = () => {};
    (async () => {
      const AOS = (await import('aos')).default;
      await import('aos/dist/aos.css');
      AOS.init({ duration: 500, once: true });
      cleanup = () => {};
    })();

    const onResize = () => {
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

  return (
    <div className="font-proxima">
      <Navbar />

      {/* WER WIR SIND */}
      <section className="px-5 py-8 md:py-12" aria-labelledby="about-heading">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Karte 1 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-neutral-200">
            <h1 id="about-heading" className="text-3xl md:text-5xl font-semibold mb-4">
              Wer wir sind
            </h1>
            <p className="text-neutral-700 text-base md:text-lg leading-relaxed">
              <strong>paveo</strong> ist ein junges, modulares Kreativ-Studio für digitale
              Markenkommunikation. Wir helfen Selbstständigen und KMU, sichtbarer,
              professioneller und psychologisch wirksamer aufzutreten – mit
              <em> Branding</em>, <em> Webdesign</em>, <em> Content</em> und schlauen
              <em> Systemen</em>. Unser Ansatz ist klar: reduzierte Designs, starke Inhalte
              und modulare Leistungen – genau so viel, wie du wirklich brauchst.
            </p>
          </div>

          {/* Karte 2 */}
          <div className="bg-neutral-50 rounded-2xl p-6 md:p-8 border border-neutral-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl p-4 bg-white border border-neutral-200">
                <span className="text-xs font-medium text-neutral-600 bg-neutral-100 px-2 py-1 rounded-full">
                  Psychologie & Wirkung
                </span>
                <p className="mt-2 text-neutral-800">
                  Wir gestalten Kommunikation so, dass sie wirkt – auf Basis von
                  Wahrnehmung, Heuristiken und Kontext.
                </p>
              </div>
              <div className="rounded-xl p-4 bg-white border border-neutral-200">
                <span className="text-xs font-medium text-neutral-600 bg-neutral-100 px-2 py-1 rounded-full">
                  Modular & skalierbar
                </span>
                <p className="mt-2 text-neutral-800">
                  Starte klein und erweitere flexibel – ohne Brüche in Design, Content oder
                  Technik.
                </p>
              </div>
              <div className="rounded-xl p-4 bg-white border border-neutral-200 sm:col-span-2">
                <span className="text-xs font-medium text-neutral-600 bg-neutral-100 px-2 py-1 rounded-full">
                  Kollaboratives Netzwerk
                </span>
                <p className="mt-2 text-neutral-800">
                  Kein starres Agenturmodell: passgenaue Expert:innen je Projekt – transparent
                  und fair.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAMS */}
      <section className="px-5 py-10">
        <div className="bg-[#F5F4FC] rounded-3xl py-12 md:py-20 flex flex-col items-center justify-center gap-12">
          <div className="text-neutral-900 flex flex-col items-center gap-3 max-w-md text-center">
            <Sun />
            <h2 className="font-medium text-xl md:text-2xl">Netzwerk</h2>
            <p className="font-semibold text-2xl md:text-4xl">
              Die kreativen Köpfe hinter paveo
            </p>
            <p className="text-neutral-600 text-base md:text-lg">
              Wir arbeiten projektbasiert mit einem Netzwerk an Designer:innen,
              Entwickler:innen, Fotograf:innen und Strateg:innen – immer passend zu deinem
              Projekt.
            </p>
          </div>
          {/* Hier könnte später ein Grid mit Profil-Karten rein */}
        </div>
      </section>

      {/* KONTAKT (wie auf Home) */}
      <section className="px-5 md:px-20 py-10 md:py-20" aria-labelledby="contact-heading">
        <div className="flex flex-col md:flex-row gap-16">
          <div data-aos="fade-up" data-aos-duration="500" className="w-full md:w-2/5 flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <h2 id="contact-heading" className="font-semibold text-3xl md:text-5xl">
                Lass uns starten.
              </h2>
              <p className="text-neutral-700">
                Ob konkrete Anfrage oder erstes Sparring: Schreib uns kurz, was du vorhast –
                wir melden uns zeitnah.
              </p>
              <Link
                href="/request"
                className="w-fit px-5 py-2.5 bg-violet-700 text-white rounded-full font-semibold border-2 border-violet-700 relative overflow-hidden transition-transform duration-300 hover:scale-[1.03]"
              >
                Termin buchen
              </Link>
            </div>
            <div className="flex items-center gap-2 text-neutral-900">
              <p className="text-lg md:text-xl font-medium">
                Wir freuen uns auf das Projekt!
              </p>
              <ArrowRight />
            </div>
          </div>

          <div data-aos={animationRight} data-aos-duration="500" className="w-full md:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-2xl p-6 bg-neutral-100">
              <h3 className="font-semibold text-xl mb-2">Tools & Arbeitsweise</h3>
              <ul className="list-disc pl-5 text-neutral-700">
                <li>Slack & Asana für smoothe Zusammenarbeit</li>
                <li>Transparente Prozesse & klare Zuständigkeiten</li>
                <li>Templates & Standards für Outreach & Branding</li>
              </ul>
            </div>
            <div className="rounded-2xl p-6 bg-neutral-100">
              <h3 className="font-semibold text-xl mb-2">Beteiligungsmodell</h3>
              <p className="text-neutral-700">
                Beteiligungen je nach Beitrag – z. B. 40 % bei Kundenakquise.
              </p>
            </div>
            <div className="rounded-2xl p-6 bg-neutral-100">
              <h3 className="font-semibold text-xl mb-2">Interne Projekte</h3>
              <ul className="list-disc pl-5 text-neutral-700">
                <li>paveo Outreach (Leadgewinnung)</li>
                <li>paveo General (Struktur & Organisation)</li>
                <li>paveo Social Media (eigener Auftritt)</li>
              </ul>
            </div>
            <div className="rounded-2xl p-6 bg-neutral-100">
              <h3 className="font-semibold text-xl mb-2">Zielbild</h3>
              <p className="text-neutral-700">
                Eine smarte, klare Marke für KMU – mit reduziertem Design und skalierbaren
                Systemen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
