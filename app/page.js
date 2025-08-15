'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  PenTool,
  CodeXml,
  Users,
  LayoutDashboard,
  ChartPie,
  ArrowRight,
  Sparkles,
  Sun,
} from 'lucide-react';

export default function Home() {
  const [animSide, setAnimSide] = useState('fade-right');

  // AOS nur clientseitig laden + simples Breakpoint-Handling
  useEffect(() => {
    let cleanup = () => {};
    (async () => {
      const AOS = (await import('aos')).default;
      await import('aos/dist/aos.css');
      AOS.init({ duration: 600, once: true, easing: 'ease-out-cubic' });
      cleanup = () => {};
    })();

    const onResize = () => {
      if (window.innerWidth < 768) setAnimSide('fade-up');
      else setAnimSide('fade-right');
    };
    onResize();
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('resize', onResize);
      cleanup();
    };
  }, []);

  return (
    <div className="font-proxima bg-[#0B0B0F] text-[#EDEDF2] antialiased">
      <Navbar />

      {/* HERO: Deep dark + liquid ribbons */}
      <section className="relative overflow-hidden">
        {/* liquid ribbons background (SVG, performant) */}
        <Ribbons />

        <div
          className="relative z-10 px-5 md:px-20 pt-20 md:pt-36 pb-16 md:pb-28"
          data-aos="fade-up"
        >
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#AAB1C2] backdrop-blur">
              <Sparkles size={14} />
              <span>Modulare Markenkommunikation für Selbstständige & KMU</span>
            </div>

            <h1 className="mt-5 text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight">
              Eine Marke, die <span className="text-[#7AA6FF]">wirklich</span> wirkt.
            </h1>

            <p className="mt-5 text-lg md:text-xl text-[#AAB1C2] max-w-2xl">
              Branding, Webdesign, Content & Systeme – psychologisch fundiert,
              modular aufgebaut und messbar auf Conversion ausgerichtet.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/request"
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 font-medium text-white border border-violet-500 transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-400"
              >
                Jetzt starten <ArrowRight size={18} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-medium text-[#EDEDF2] transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-400"
              >
                Mehr erfahren
              </Link>
            </div>

            {/* Key facts */}
            <div className="mt-10 flex flex-wrap gap-3">
              {[
                { k: 'Seit', v: '2024' },
                { k: 'Module', v: '5' },
                { k: 'Netzwerk', v: '10+ Partner:innen' },
              ].map((f) => (
                <div
                  key={f.k}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#BFC6D8] backdrop-blur"
                >
                  <span className="text-[#7AA6FF] font-semibold mr-2">{f.k}:</span>
                  {f.v}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LEISTUNGEN */}
      <section className="px-5 md:px-20 py-14 md:py-20">
        <header className="max-w-3xl" data-aos="fade-up">
          <h2 className="text-2xl md:text-4xl font-semibold">Leistungen</h2>
          <p className="mt-3 text-[#AAB1C2]">
            Wähle nur die Bausteine, die du brauchst – oder kombiniere zu einem stimmigen
            Gesamtauftritt.
          </p>
        </header>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Branding */}
          <ServiceCard
            icon={<PenTool size={22} />}
            title="Branding & Positionierung"
            desc="Logo, Farbwelt, Tonalität & Kernbotschaft – entwickelt, um bei deiner Zielgruppe im Kopf zu bleiben."
            aos={animSide}
          />
          {/* Webdesign + Social */}
          <div className="flex flex-col gap-6">
            <ServiceCard
              icon={<CodeXml size={22} />}
              title="Webdesign"
              desc="Klar, modern und conversion-stark – als Baukastensystem oder individuell entwickelt."
              aos={animSide}
              bg="from-[#26233F] to-[#1A1830]"
            />
            <ServiceCard
              icon={<Users size={22} />}
              title="Social Media Management"
              desc="Strategie, Planung, Content-Produktion & Analyse – ready-to-post und skalierbar."
              aos="fade-up"
              bg="from-[#1C2030] to-[#161A26]"
            />
          </div>
          {/* Content + Leadsystem */}
          <div className="flex flex-col gap-6">
            <ServiceCard
              icon={<LayoutDashboard size={22} />}
              title="Content Creation"
              desc="Foto, Video, Texte & Motion Design – konsistent zur Markenwelt und auf Wirkung getrimmt."
              aos="fade-up"
              bg="from-[#191E2D] to-[#151826]"
            />
            <ServiceCard
              icon={<ChartPie size={22} />}
              title="Leadsystem & Angebotsstrukturierung"
              desc="Digitale Vertriebsprozesse: Angebots-Generatoren, Anfrageformulare & CRM-Einbindung."
              aos={animSide}
              bg="from-[#1F1E2C] to-[#171624]"
            />
          </div>
        </div>

        <div className="mt-10" data-aos="fade-up">
          <Link
            href="/request"
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2.5 font-medium text-white border border-violet-500 transition-transform duration-300 hover:scale-[1.03]"
          >
            Leistungen anfragen <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* WARUM PAVEO */}
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
                'Wir gestalten nicht nur schön, sondern wirksam – basierend auf Wahrnehmung, Heuristiken & Kontext.',
              bg: 'from-[#22233A] to-[#191A2D]',
            },
            {
              title: 'Modular & flexibel',
              text:
                'Buche nur, was du brauchst. Starte klein und erweitere ohne Brüche in Design, Content oder Technik.',
              bg: 'from-[#26213F] to-[#1B1830]',
            },
            {
              title: 'Kollaboratives Netzwerk',
              text:
                'Statt starrem Agenturmodell arbeiten wir mit Spezialist:innen – effizient, fair & transparent.',
              bg: 'from-[#1E2132] to-[#161A26]',
            },
          ].map((card, i) => (
            <div
              key={card.title}
              data-aos="fade-up"
              data-aos-delay={i * 120}
              className={`rounded-2xl bg-gradient-to-br ${card.bg} p-6 md:p-7 border border-white/10 backdrop-blur transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_-10px_rgba(122,166,255,0.35)]`}
            >
              <h3 className="text-xl md:text-2xl font-bold">{card.title}</h3>
              <p className="mt-2 text-[#BFC6D8]">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <Ribbons subtle />

        <div className="relative z-10 px-5 md:px-20 py-16 md:py-24">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-semibold">
              Bereit für den nächsten Schritt?
            </h2>
            <p className="mt-4 text-[#AAB1C2] max-w-2xl">
              Lass uns deinen Auftritt schärfen – mit klarer Struktur, starken Inhalten und
              Systemen, die verkaufen.
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
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ---------- UI-Bausteine ---------- */

function ServiceCard({ icon, title, desc, aos = 'fade-up', bg = 'from-[#24273B] to-[#181C2A]' }) {
  return (
    <div
      data-aos={aos}
      className={`group rounded-2xl p-6 bg-gradient-to-br ${bg} border border-white/10 backdrop-blur transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_-10px_rgba(109,97,255,0.45)]`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[#7AA6FF] border border-white/10">
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

/**
 * Liquid-style ribbons background.
 * SVG, weich geblurrt, extrem leichtgewichtig – keine Bild-Assets.
 * set prop "subtle" für etwas zurückhaltendere Opazität.
 */
function Ribbons({ subtle = false }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <svg
        className="absolute -top-24 -left-24 w-[120vw] h-[120vh] opacity-[0.55]"
        viewBox="0 0 800 600"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2D8CFF" />
            <stop offset="50%" stopColor="#6D61FF" />
            <stop offset="100%" stopColor="#7AA6FF" />
          </linearGradient>
          <filter id="blur1">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>
        <path
          d="M-50 200 C 150 140, 250 260, 450 200 S 750 120, 900 210"
          stroke="url(#g1)"
          strokeWidth="42"
          filter="url(#blur1)"
          className="ribbon-a"
        />
        <path
          d="M-80 360 C 120 420, 300 320, 520 360 S 760 420, 920 340"
          stroke="url(#g1)"
          strokeWidth="28"
          filter="url(#blur1)"
          className="ribbon-b"
        />
      </svg>

      <svg
        className="absolute bottom-[-10%] right-[-10%] w-[95vw] h-[70vh] opacity-[0.45]"
        viewBox="0 0 800 600"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7AA6FF" />
            <stop offset="60%" stopColor="#2D8CFF" />
            <stop offset="100%" stopColor="#6D61FF" />
          </linearGradient>
          <filter id="blur2">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>
        <path
          d="M-60 280 C 140 240, 280 340, 480 280 S 760 220, 920 300"
          stroke="url(#g2)"
          strokeWidth="36"
          filter="url(#blur2)"
          className="ribbon-c"
        />
      </svg>

      <style jsx>{`
        .ribbon-a {
          animation: floatA 12s ease-in-out infinite;
        }
        .ribbon-b {
          animation: floatB 16s ease-in-out infinite;
        }
        .ribbon-c {
          animation: floatC 14s ease-in-out infinite;
        }
        @keyframes floatA {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(18px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        @keyframes floatB {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-22px) translateX(-6px);
          }
          100% {
            transform: translateY(0px) translateX(0px);
          }
        }
        @keyframes floatC {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(16px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>

      {/* Dunkler Overlay, um Content lesbar zu halten */}
      <div
        className={`absolute inset-0 bg-[linear-gradient(180deg,rgba(6,7,10,0.6)_0%,rgba(6,7,10,0.7)_35%,rgba(6,7,10,0.8)_100%)] ${
          subtle ? 'opacity-60' : 'opacity-80'
        }`}
      />
    </div>
  );
}
