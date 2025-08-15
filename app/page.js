'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import {
  PenTool,
  CodeXml,
  Users,
  LayoutDashboard,
  ChartPie,
  ArrowRight,
  Sparkles,
  Sun
} from 'lucide-react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  return (
    <div className="font-proxima text-[#EDEDF2] bg-[#0A0A10] overflow-x-clip">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <HeroRibbon />

        <div className="relative z-10 px-5 md:px-20 pt-20 md:pt-36 pb-16 md:pb-28">
          <div className="max-w-4xl" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#AAB1C2] backdrop-blur">
              <Sparkles size={14} />
              <span>Modulare Markenkommunikation für Selbstständige & KMU</span>
            </div>

            <h1 className="mt-5 text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight">
              Eine Marke, die <span className="text-[#8AAEFF]">wirklich</span> wirkt.
            </h1>

            <p className="mt-5 text-lg md:text-xl text-[#AAB1C2] max-w-2xl">
              Branding, Webdesign, Content & Systeme – psychologisch fundiert,
              modular aufgebaut und messbar auf Conversion ausgerichtet.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/request"
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 font-medium text-white border border-violet-500 transition-transform duration-300 hover:scale-[1.03]"
              >
                Jetzt starten <ArrowRight size={18} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-medium text-[#EDEDF2] hover:bg-white/10"
              >
                Mehr erfahren
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="px-5 md:px-20 py-8 bg-[#0C0C14]">
        <div className="flex flex-wrap gap-3" data-aos="fade-up">
          {[
            { k: 'Seit', v: '2024' },
            { k: 'Module', v: '5' },
            { k: 'Netzwerk', v: '10+ Partner:innen' }
          ].map((f) => (
            <div
              key={f.k}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#BFC6D8] backdrop-blur"
            >
              <span className="text-[#8AAEFF] font-semibold mr-2">{f.k}:</span>
              {f.v}
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="px-5 md:px-20 py-14 md:py-20">
        <header className="max-w-3xl" data-aos="fade-up">
          <h2 className="text-2xl md:text-4xl font-semibold">Leistungen</h2>
          <p className="mt-3 text-[#AAB1C2]">
            Wähle nur die Bausteine, die du brauchst – oder kombiniere zu einem
            stimmigen Gesamtauftritt.
          </p>
        </header>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <ServiceCard
            icon={<PenTool size={22} />}
            title="Branding & Positionierung"
            desc="Logo, Farbwelt, Tonalität & Kernbotschaft – entwickelt, um bei deiner Zielgruppe im Kopf zu bleiben."
          />

          <div className="flex flex-col gap-6">
            <ServiceCard
              icon={<CodeXml size={22} />}
              title="Webdesign"
              desc="Klar, modern und conversion-stark – als Baukastensystem oder individuell entwickelt."
            />
            <ServiceCard
              icon={<Users size={22} />}
              title="Social Media Management"
              desc="Strategie, Planung, Content-Produktion & Analyse – ready-to-post und skalierbar."
            />
          </div>

          <div className="flex flex-col gap-6">
            <ServiceCard
              icon={<LayoutDashboard size={22} />}
              title="Content Creation"
              desc="Foto, Video, Texte & Motion Design – konsistent zur Markenwelt und auf Wirkung getrimmt."
            />
            <ServiceCard
              icon={<ChartPie size={22} />}
              title="Leadsystem & Angebotsstrukturierung"
              desc="Digitale Vertriebsprozesse: Angebots-Generatoren, Anfrageformulare & CRM-Einbindung."
            />
          </div>
        </div>
      </section>

      {/* WHY PAVEO */}
      <section className="px-5 md:px-20 pb-14 md:pb-20">
        <header className="max-w-3xl" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#AAB1C2]">
            <Sun size={14} />
            <span>Warum paveo</span>
          </div>
          <h2 className="mt-4 text-2xl md:text-4xl font-semibold">
            Weniger reden. Mehr Wirkung.
          </h2>
        </header>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Psychologisch fundiert',
              text:
                'Wir gestalten nicht nur schön, sondern wirksam – basierend auf Wahrnehmung, Heuristiken & Kontext.'
            },
            {
              title: 'Modular & flexibel',
              text:
                'Buche nur, was du brauchst. Starte klein und erweitere ohne Brüche in Design, Content oder Technik.'
            },
            {
              title: 'Kollaboratives Netzwerk',
              text:
                'Statt starrem Agenturmodell arbeiten wir mit Spezialist:innen – effizient, fair & transparent.'
            }
          ].map((card) => (
            <div
              key={card.title}
              data-aos="fade-up"
              className="rounded-2xl bg-gradient-to-br from-[#202238] to-[#17192C] p-6 border border-white/10 backdrop-blur transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_-12px_rgba(138,174,255,0.35)]"
            >
              <h3 className="text-xl md:text-2xl font-bold">{card.title}</h3>
              <p className="mt-2 text-[#BFC6D8]">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0C0C14]">
        <div className="px-5 md:px-20 py-16 md:py-24" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-semibold">
            Bereit für den nächsten Schritt?
          </h2>
          <p className="mt-4 text-[#AAB1C2] max-w-2xl">
            Lass uns deinen Auftritt schärfen – mit klarer Struktur, starken
            Inhalten und Systemen, die verkaufen.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/request"
              className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 font-medium text-white border border-violet-500 transition-transform duration-300 hover:scale-[1.03]"
            >
              Termin buchen <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-medium text-[#EDEDF2] hover:bg-white/10"
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

/* ---------- Service Card ---------- */
function ServiceCard({ icon, title, desc }) {
  return (
    <div
      data-aos="fade-up"
      className="group rounded-2xl p-6 bg-gradient-to-br from-[#20243A] to-[#151A26] border border-white/10 backdrop-blur transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_-12px_rgba(138,174,255,0.35)]"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[#8AAEFF] border border-white/10">
          {icon}
        </div>
        <ArrowRight
          size={18}
          className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 text-[#BFC6D8]"
          aria-hidden="true"
        />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-[#BFC6D8]">{desc}</p>
    </div>
  );
}

/* ---------- Hero Ribbon ---------- */
function HeroRibbon() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Gradient Hintergrund */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#6D61FF] via-[#2D8CFF] to-[#0A0A10]" />

      {/* Eine große animierte Ribbon */}
      <svg
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[150%] h-[50%] opacity-[0.5]"
        viewBox="0 0 800 400"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="gMain" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2D8CFF" />
            <stop offset="50%" stopColor="#6D61FF" />
            <stop offset="100%" stopColor="#8AAEFF" />
          </linearGradient>
          <filter id="bMain">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>
        <path
          d="M-80 200 C 100 100, 300 300, 500 200 S 900 100, 1000 200"
          stroke="url(#gMain)"
          strokeWidth="40"
          filter="url(#bMain)"
          className="ribbon"
        />
      </svg>

      {/* Animation */}
      <style jsx>{`
        .ribbon {
          animation: floatRibbon 14s ease-in-out infinite;
          will-change: transform;
        }
        @keyframes floatRibbon {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(20px);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
