'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, Sun, Users, LayoutDashboard, PenTool, CodeXml } from 'lucide-react';

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

      {/* HERO */}
      <section className="bg-gradient-to-br from-violet-900 via-[#2D286A] to-neutral-900 text-white py-20 px-5 md:px-20 text-center md:text-left">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            paveo – Dein Weg zu wirksamer Markenkommunikation
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            Wir bringen Selbstständige & KMU mit Branding, Webdesign, Content und Systemen
            auf das nächste Level – modular, psychologisch fundiert und praxistauglich.
          </p>
          <Link
            href="/request"
            className="w-fit mx-auto md:mx-0 px-6 py-3 bg-violet-600 text-white rounded-full font-medium flex items-center gap-2 transition-transform duration-300 hover:scale-[1.03]"
          >
            Jetzt starten <ArrowRight />
          </Link>
        </div>
      </section>

      {/* UNSERE STORY */}
      <section className="px-5 md:px-20 py-16 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-semibold mb-4">Unsere Story</h2>
            <p className="text-neutral-700 text-lg leading-relaxed">
              paveo ist aus der Idee entstanden, kleine und mittlere Unternehmen mit
              hochwertiger Markenkommunikation zu unterstützen – ohne die Hürden
              klassischer Agenturen.  
              Wir arbeiten modular, um dir nur das anzubieten, was du wirklich brauchst.
              Mit unserem Netzwerk aus Spezialist:innen können wir flexibel skalieren und
              Projekte effizient umsetzen.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Gegründet', value: '2024' },
              { title: 'Module', value: '5 Kernleistungen' },
              { title: 'Netzwerk', value: '10+ Partner:innen' },
              { title: 'Mission', value: 'Psychologisch wirksam' },
            ].map((fact, idx) => (
              <div key={idx} className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-violet-700">{fact.value}</p>
                <p className="text-neutral-600">{fact.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WAS UNS AUSMACHT */}
      <section className="px-5 md:px-20 py-16 bg-neutral-50">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-semibold">Was uns ausmacht</h2>
          <p className="text-neutral-600 mt-4">
            Unsere Prinzipien für wirkungsvolle Markenkommunikation
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#353088] text-white rounded-2xl p-8 flex flex-col gap-4">
            <Sun />
            <h3 className="font-bold text-2xl">Psychologisch fundiert</h3>
            <p>
              Kommunikation, die auf Wahrnehmung, Heuristiken und Kontext optimiert ist –
              nicht nur auf Ästhetik.
            </p>
          </div>
          <div className="bg-[#7569AD] text-white rounded-2xl p-8 flex flex-col gap-4">
            <LayoutDashboard />
            <h3 className="font-bold text-2xl">Modular & flexibel</h3>
            <p>
              Leistungen als Bausteine – starte klein und erweitere gezielt, ohne Brüche in
              Design oder Technik.
            </p>
          </div>
          <div className="bg-[#EAEAEA] text-neutral-900 rounded-2xl p-8 flex flex-col gap-4">
            <Users />
            <h3 className="font-bold text-2xl">Kollaboratives Netzwerk</h3>
            <p>
              Passgenaue Expert:innen für jedes Projekt, mit transparenten und fairen
              Beteiligungen.
            </p>
          </div>
        </div>
      </section>

      {/* NETZWERK */}
      <section className="px-5 md:px-20 py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-semibold">Unser Netzwerk</h2>
          <p className="text-neutral-600 mt-4">
            Die kreativen Köpfe hinter paveo – ein Pool aus Design, Development, Content &
            Strategie.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {[
            'Brand Designer:in',
            'Webentwickler:in',
            'Fotograf:in',
            'Videograf:in',
            'Content Creator',
            'SEO-Expert:in',
            'Strateg:in',
            'Social Media Manager:in',
          ].map((role, idx) => (
            <span
              key={idx}
              className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-full border border-neutral-200 hover:bg-violet-50 hover:border-violet-300 transition-colors"
            >
              {role}
            </span>
          ))}
        </div>
      </section>

      {/* KONTAKT */}
      <section className="px-5 md:px-20 py-16 bg-neutral-50">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="w-full md:w-2/5 flex flex-col gap-8">
            <h2 className="font-semibold text-3xl md:text-5xl">Lass uns starten.</h2>
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
            <div className="flex items-center gap-2 text-neutral-900">
              <p className="text-lg md:text-xl font-medium">Wir freuen uns auf das Projekt!</p>
              <ArrowRight />
            </div>
          </div>
          <div className="w-full md:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-2xl p-6 bg-white border border-neutral-200">
              <h3 className="font-semibold text-xl mb-2">Tools & Arbeitsweise</h3>
              <ul className="list-disc pl-5 text-neutral-700">
                <li>Slack & Asana für Zusammenarbeit</li>
                <li>Transparente Prozesse & klare Zuständigkeiten</li>
                <li>Templates & Standards für Outreach & Branding</li>
              </ul>
            </div>
            <div className="rounded-2xl p-6 bg-white border border-neutral-200">
              <h3 className="font-semibold text-xl mb-2">Beteiligungsmodell</h3>
              <p className="text-neutral-700">
                Beteiligungen je nach Beitrag – z. B. 40 % bei Kundenakquise.
              </p>
            </div>
            <div className="rounded-2xl p-6 bg-white border border-neutral-200">
              <h3 className="font-semibold text-xl mb-2">Interne Projekte</h3>
              <ul className="list-disc pl-5 text-neutral-700">
                <li>paveo Outreach</li>
                <li>paveo General</li>
                <li>paveo Social Media</li>
              </ul>
            </div>
            <div className="rounded-2xl p-6 bg-white border border-neutral-200">
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
