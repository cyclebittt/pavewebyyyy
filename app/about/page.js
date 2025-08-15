'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Sun, ArrowRight, PenTool, CodeXml, LayoutDashboard, Users } from 'lucide-react';

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

      {/* HERO / Wer wir sind */}
      <section className="px-5">
        <div className="bg-neutral-800 rounded-3xl px-5 py-10 md:p-14 flex flex-col gap-10 md:gap-14">
          <div className="text-white flex flex-col gap-6 md:gap-8 max-w-4xl">
            <h1 className="font-semibold text-3xl md:text-5xl">Wer wir sind</h1>
            <p className="text-base md:text-xl">
              <strong>paveo</strong> ist ein junges, modulares Kreativ‑Studio für digitale
              Markenkommunikation. Wir helfen Selbstständigen und KMU, sichtbarer,
              professioneller und psychologisch wirksamer aufzutreten – mit
              <em> Branding</em>, <em>Webdesign</em>, <em>Content</em> und schlauen
              <em> Systemen</em>. Unser Ansatz ist pragmatisch: klare Strukturen, reduziertes Design
              und Inhalte mit Wirkung. Modular buchbar – genau so viel, wie du wirklich brauchst.
            </p>
          </div>

          {/* statt Stock-Bild: dezentes Info-Panel */}
          <div
            data-aos={animationRight}
            data-aos-duration="500"
            className="w-full rounded-2xl bg-gradient-to-br from-violet-900 via-[#2D286A] to-neutral-900 p-6 md:p-10 text-white"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-white/90 bg-white/10 w-fit px-3 py-1 rounded-full">Psychologie & Wirkung</span>
                <p className="text-white/90">
                  Kommunikation, die konvertiert: Wir denken in Heuristiken, Wahrnehmung und Kontext –
                  nicht nur in „schön“.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-white/90 bg-white/10 w-fit px-3 py-1 rounded-full">Modular & skalierbar</span>
                <p className="text-white/90">
                  Starte schlank, erweitere gezielt – ohne Brüche in Design, Content oder Technik.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-white/90 bg-white/10 w-fit px-3 py-1 rounded-full">Kollaboratives Netzwerk</span>
                <p className="text-white/90">
                  Kein starres Agenturmodell: passende Spezialist:innen je Projekt, fair & transparent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Köpfe/Netzwerk – statt Teamfotos */}
      <section className="px-5 py-10">
        <div className="bg-[#F2545B] rounded-3xl py-12 md:py-16 flex flex-col items-center gap-10">
          <div className="text-white flex flex-col items-center gap-3 max-w-xl text-center">
            <Sun aria-hidden="true" />
            <h2 className="font-medium text-xl md:text-2xl">Köpfe & Netzwerk hinter paveo</h2>
            <p className="font-semibold text-2xl md:text-4xl">
              Flexibel zusammengestellt – genau passend für dein Projekt.
            </p>
            <p className="text-white/90">
              Wir arbeiten mit einem wachsenden Netzwerk. Je nach Aufgabe holen wir die richtigen
              Leute dazu – schnell, transparent und mit Beteiligungsmodell.
            </p>
          </div>

          {/* Kompetenz-Badges statt Bilder */}
          <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-3 gap-4 px-5">
            <Badge icon={<PenTool size={18} />} text="Brand Design & Positionierung" />
            <Badge icon={<CodeXml size={18} />} text="Webentwicklung" />
            <Badge icon={<Users size={18} />} text="Social Media Management" />
            <Badge icon={<LayoutDashboard size={18} />} text="Content & Video" />
            <Badge icon={<LayoutDashboard size={18} />} text="Funnel, CRM & Automationen" />
            <Badge icon={<LayoutDashboard size={18} />} text="Beratung & Strategie" />
          </div>

          {/* Beteiligungsmodell Hinweis */}
          <div className="text-white/90 text-sm px-5 text-center">
            Beteiligungsmodell: Teammitglieder erhalten je nach Beitrag prozentuale Anteile
            (z. B. bis zu 40 % bei Akquise).
          </div>
        </div>
      </section>

      {/* Kontakt-CTA wie auf der Home */}
      <section className="px-5 md:px-20 py-10 md:py-20" aria-labelledby="contact-heading">
        <div className="flex flex-col md:flex-row gap-16">
          <div data-aos="fade-up" data-aos-duration="500" className="w-full md:w-2/5 flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <h2 id="contact-heading" className="font-semibold text-3xl md:text-5xl">
                Lass uns starten.
              </h2>
              <p className="text-neutral-700">
                Ob konkrete Anfrage oder erstes Sparring: Schreib uns kurz, was du vorhast — wir melden
                uns zeitnah.
              </p>
              <Link
                href="/request"
                className="w-fit px-5 py-2.5 bg-violet-700 text-white rounded-full font-semibold border-2 border-violet-700 relative overflow-hidden transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-400"
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

          {/* Rechte Spalte: Info-Karten statt Fotos */}
          <div
            data-aos={animationRight}
            data-aos-duration="500"
            className="w-full md:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <InfoCard title="Tools & Arbeitsweise" items={[
              'Slack & Asana für smoothe Zusammenarbeit',
              'Transparente Prozesse & klare Zuständigkeiten',
              'Templates & Standards für Outreach & Self‑Branding',
            ]} />
            <InfoCard title="Beteiligungsmodell" text="Teammitglieder erhalten prozentuale Anteile je nach Beitrag (z. B. 40 % bei Kundenakquise durch Outreach)." />
            <InfoCard title="Interne Projekte" items={[
              'paveo Outreach (Leadgewinnung)',
              'paveo General (Struktur & Org)',
              'paveo Social Media (eigener Auftritt)',
            ]} />
            <InfoCard title="Zielbild" text="Eine smarte, klare Marke für KMU — mit reduzierten Designs, scharfem Messaging und skalierbaren Systemen." />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* kleine Hilfs-Komponenten (keine Bilder nötig) */
function Badge({ icon, text }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white/15 text-white px-4 py-2 border border-white/20">
      <span aria-hidden="true">{icon}</span>
      <span className="text-sm">{text}</span>
    </div>
  );
}

function InfoCard({ title, items, text }) {
  return (
    <div className="rounded-2xl p-6 bg-neutral-100">
      <h3 className="font-semibold text-xl mb-2">{title}</h3>
      {items ? (
        <ul className="list-disc pl-5 text-neutral-700">
          {items.map((it) => (<li key={it}>{it}</li>))}
        </ul>
      ) : (
        <p className="text-neutral-700">{text}</p>
      )}
    </div>
  );
}
