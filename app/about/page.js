'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, Sparkles, Target, Brain, Layers, Users, Rocket, Workflow } from 'lucide-react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic' });
  }, []);

  return (
    <div className="font-proxima text-[#EDEDF2] bg-[#0A0A10] antialiased overflow-x-clip">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <HeroRibbon />

        <div className="relative z-10 px-5 md:px-20 pt-20 md:pt-32 pb-16 md:pb-24">
          <div className="max-w-4xl" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#AAB1C2] backdrop-blur">
              <Sparkles size={14} />
              <span>Über uns</span>
            </div>

            <h1 className="mt-5 text-4xl sm:text-6xl font-bold leading-[1.05]">
              Wir bauen Marken, <span className="text-[#8AAEFF]">die wirken.</span>
            </h1>

            <p className="mt-5 text-lg text-[#C0C6D8] max-w-2xl">
              paveo ist ein modulares Kreativ-Studio für digitale Marken­kommunikation. 
              Unser Versprechen: weniger Lärm, mehr Wirkung – mit Psychologie, System und 
              Design, das verkauft.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/request"
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 font-medium text-white border border-violet-500 transition-transform duration-300 hover:scale-[1.03]"
              >
                Mit uns starten <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-medium text-[#EDEDF2] hover:bg-white/10"
              >
                Kontakt aufnehmen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="px-5 md:px-20 py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7" data-aos="fade-up">
            <h2 className="text-2xl md:text-4xl font-semibold">Unsere Mission</h2>
            <div className="mt-4 space-y-4 text-[#BFC6D8] leading-relaxed">
              <p>
                Gute Kommunikation ist kein Zufall. Sie entsteht, wenn Strategie, 
                Design und Content sich an echter Wahrnehmung ausrichten – nicht an Trends.
              </p>
              <p>
                Deshalb kombinieren wir Markenpsychologie mit klaren Strukturen und 
                modularen Systemen. So bleibt dein Auftritt fokussiert, skalierbar und 
                messbar stark in der Conversion.
              </p>
              <p>
                Unser Ansatz ist pragmatisch: Wir bauen, was du brauchst – nicht mehr 
                und nicht weniger. Schlanke Pakete, die wachsen können.
              </p>
            </div>
          </div>

          {/* Key Stats / Badges */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4" data-aos="fade-up" data-aos-delay="120">
            {[
              { icon: <Brain size={18} />, t: 'Psychologie', s: 'Wirkungsorientiert' },
              { icon: <Layers size={18} />, t: 'Modular', s: 'Skalierbar' },
              { icon: <Users size={18} />, t: 'Netzwerk', s: '10+ Spezialist:innen' },
              { icon: <Target size={18} />, t: 'Focus', s: 'Conversion' },
            ].map(({ icon, t, s }) => (
              <div
                key={t}
                className="rounded-2xl p-5 bg-gradient-to-br from-[#1A1D2C] to-[#111421] border border-white/10 backdrop-blur hover:shadow-[0_0_32px_-12px_rgba(138,174,255,0.35)] transition-all"
              >
                <div className="flex items-center gap-2 text-[#8AAEFF]">{icon}<span className="text-sm">{t}</span></div>
                <div className="mt-2 text-xl font-semibold">{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT SETS US APART */}
      <section className="px-5 md:px-20 pb-14 md:pb-20">
        <header className="max-w-3xl" data-aos="fade-up">
          <h2 className="text-2xl md:text-4xl font-semibold">Was uns ausmacht</h2>
          <p className="mt-3 text-[#AAB1C2]">
            Drei Prinzipien, die unsere Arbeit prägen – und deine Marke nach vorne bringen.
          </p>
        </header>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Psychologisch fundiert',
              text: 'Wir entwickeln Kommunikation, die Menschen wirklich erreicht – basierend auf Heuristiken, Kontext & Wahrnehmung.',
              bg: 'from-[#202238] to-[#17192C]',
              icon: <Brain size={22} />,
              delay: 0,
            },
            {
              title: 'Modular & flexibel',
              text: 'Starte schlank und erweitere ohne Brüche in Design, Content oder Tech. Jedes Modul zahlt auf dein System ein.',
              bg: 'from-[#231E3B] to-[#18152F]',
              icon: <Layers size={22} />,
              delay: 120,
            },
            {
              title: 'Kollaborativ & fair',
              text: 'Kein starres Agenturmodell. Wir arbeiten mit Spezialist:innen – effizient, transparent, auf Augenhöhe.',
              bg: 'from-[#1B1E30] to-[#141725]',
              icon: <Users size={22} />,
              delay: 240,
            },
          ].map((c) => (
            <div
              key={c.title}
              data-aos="fade-up"
              data-aos-delay={c.delay}
              className={`rounded-2xl p-6 bg-gradient-to-br ${c.bg} border border-white/10`}
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[#8AAEFF] border border-white/10">
                  {c.icon}
                </div>
              </div>
              <h3 className="mt-4 text-xl md:text-2xl font-semibold">{c.title}</h3>
              <p className="mt-2 text-[#BFC6D8]">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="px-5 md:px-20 pb-14 md:pb-20">
        <header className="max-w-3xl" data-aos="fade-up">
          <h2 className="text-2xl md:text-4xl font-semibold">So arbeiten wir</h2>
          <p className="mt-3 text-[#AAB1C2]">Klar. Transparent. Ergebnisorientiert.</p>
        </header>

        <ol className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6 counter-reset-steps">
          {[
            {
              t: 'Erstgespräch',
              d: 'Wir klären Ziele, Zielgruppen und Rahmen – fokussiert und ohne Buzzword-Bingo.',
              i: <Workflow size={20} />,
            },
            {
              t: 'Konzept',
              d: 'Positionierung, Botschaften, Struktur. Schlank dokumentiert, damit alle dasselbe Bild haben.',
              i: <Brain size={20} />,
            },
            {
              t: 'Umsetzung',
              d: 'Design, Content & Systeme entstehen modular – schnell lieferbar, sauber skalierbar.',
              i: <Layers size={20} />,
            },
            {
              t: 'Wachstum',
              d: 'Messen, iterieren, erweitern. Wir optimieren auf Wirkung – nicht auf Slides.',
              i: <Rocket size={20} />,
            },
          ].map((s, idx) => (
            <li
              key={s.t}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="relative rounded-2xl p-6 bg-gradient-to-br from-[#191C2A] to-[#111521] border border-white/10"
            >
              <div className="flex items-center gap-3 text-[#8AAEFF]">
                {s.i}
                <span className="text-sm uppercase tracking-wide">Schritt {idx + 1}</span>
              </div>
              <h3 className="mt-3 text-xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-[#BFC6D8]">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section
        className="
          relative overflow-hidden
          bg-[radial-gradient(900px_300px_at_15%_0%,rgba(122,166,255,0.08),transparent_60%),linear-gradient(180deg,#0A0A10_0%,#0B0B12_60%,#0A0A10_100%)]
        "
      >
        <div className="relative z-10 px-5 md:px-20 py-16 md:py-24" data-aos="fade-up">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-semibold">Klingt nach uns? Dann los.</h2>
            <p className="mt-4 text-[#AAB1C2] max-w-2xl">
              Schreib kurz, was du vorhast – wir melden uns mit einer klaren Einschätzung und 
              einem modularen Vorschlag.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/request"
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 font-medium text-white border border-violet-500 transition-transform duration-300 hover:scale-[1.03]"
              >
                Projekt starten <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-medium text-[#EDEDF2] hover:bg-white/10"
              >
                Kontakt aufnehmen
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ----------------- Hero Ribbon (eine, diagonal) ----------------- */
function HeroRibbon() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Diagonaler kräftiger Gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#141227_0%,#1b1850_35%,#0f1a3a_65%,#0b0e18_100%)]" />

      {/* Eine große animierte Ribbon */}
      <svg
        className="absolute top-[55%] left-1/2 -translate-x-1/2 w-[150%] h-[50%] opacity-[0.45]"
        viewBox="0 0 800 400"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="gAbout" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2D8CFF" />
            <stop offset="50%" stopColor="#6D61FF" />
            <stop offset="100%" stopColor="#8AAEFF" />
          </linearGradient>
          <filter id="bAbout">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>
        <path
          d="M-120 210 C 60 110, 280 310, 500 210 S 900 110, 1120 210"
          stroke="url(#gAbout)"
          strokeWidth="42"
          filter="url(#bAbout)"
          className="about-ribbon"
        />
      </svg>

      <style jsx>{`
        .about-ribbon {
          animation: floatAbout 15s ease-in-out infinite;
          will-change: transform;
        }
        @keyframes floatAbout {
          0% { transform: translateY(0); }
          50% { transform: translateY(16px); }
          100% { transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .about-ribbon { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
