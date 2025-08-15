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
  Sun,
} from 'lucide-react';

export default function Home() {
  return (
    <div
      className="
        font-proxima text-[#EDEDF2] antialiased overflow-x-clip
        bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(79,70,229,0.18),transparent_60%),radial-gradient(1000px_500px_at_85%_-10%,rgba(29,78,216,0.14),transparent_55%),linear-gradient(180deg,#0B0B0F_0%,#0E0E14_40%,#0A0A10_100%)]
      "
    >
      <Navbar />

      {/* HERO — animierte Ribbons + weißer Sheen nur hier */}
      <section className="relative overflow-hidden">
        <HeroRibbons />

        <div className="relative z-10 px-5 md:px-20 pt-20 md:pt-36 pb-16 md:pb-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#AAB1C2] backdrop-blur">
              <Sparkles size={14} />
              <span>Modulare Markenkommunikation für Selbstständige & KMU</span>
            </div>

            <h1 className="mt-5 text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight">
              Eine Marke, die <span className="text-[#8AAEFF]">wirklich</span> wirkt.
            </h1>

            <p className="mt-5 text-lg md:text-xl text-[#AAB1C2] max-w-2xl">
              Branding, Webdesign, Content & Systeme – psychologisch fundiert, modular
              aufgebaut und messbar auf Conversion ausgerichtet.
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
                  <span className="text-[#8AAEFF] font-semibold mr-2">{f.k}:</span>
                  {f.v}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LEISTUNGEN */}
      <section className="px-5 md:px-20 py-14 md:py-20">
        <header className="max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-semibold">Leistungen</h2>
          <p className="mt-3 text-[#AAB1C2]">
            Wähle nur die Bausteine, die du brauchst – oder kombiniere zu einem stimmigen
            Gesamtauftritt.
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
              bg="from-[#232136] to-[#18162A]"
            />
            <ServiceCard
              icon={<Users size={22} />}
              title="Social Media Management"
              desc="Strategie, Planung, Content-Produktion & Analyse – ready-to-post und skalierbar."
              bg="from-[#1A1E2B] to-[#131722]"
            />
          </div>

        <div className="flex flex-col gap-6">
            <ServiceCard
              icon={<LayoutDashboard size={22} />}
              title="Content Creation"
              desc="Foto, Video, Texte & Motion Design – konsistent zur Markenwelt und auf Wirkung getrimmt."
              bg="from-[#171B28] to-[#111520]"
            />
            <ServiceCard
              icon={<ChartPie size={22} />}
              title="Leadsystem & Angebotsstrukturierung"
              desc="Digitale Vertriebsprozesse: Angebots-Generatoren, Anfrageformulare & CRM-Einbindung."
              bg="from-[#1B1A28] to-[#12121D]"
            />
          </div>
        </div>
      </section>

      {/* WARUM PAVEO */}
      <section className="px-5 md:px-20 pb-14 md:pb-20">
        <header className="max-w-3xl">
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
              bg: 'from-[#202238] to-[#17192C]',
            },
            {
              title: 'Modular & flexibel',
              text:
                'Buche nur, was du brauchst. Starte klein und erweitere ohne Brüche in Design, Content oder Technik.',
              bg: 'from-[#231E3B] to-[#18152F]',
            },
            {
              title: 'Kollaboratives Netzwerk',
              text:
                'Statt starrem Agenturmodell arbeiten wir mit Spezialist:innen – effizient, fair & transparent.',
              bg: 'from-[#1B1E30] to-[#141725]',
            },
          ].map((card) => (
            <div
              key={card.title}
              className={`rounded-2xl bg-gradient-to-br ${card.bg} p-6 md:p-7 border border-white/10 backdrop-blur transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_-12px_rgba(138,174,255,0.35)]`}
            >
              <h3 className="text-xl md:text-2xl font-bold">{card.title}</h3>
              <p className="mt-2 text-[#BFC6D8]">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="
          relative overflow-hidden
          bg-[radial-gradient(900px_300px_at_15%_0%,rgba(122,166,255,0.08),transparent_60%),linear-gradient(180deg,#0A0A10_0%,#0B0B12_60%,#0A0A10_100%)]
        "
      >
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

/* ---------- UI: Service-Card ---------- */
function ServiceCard({ icon, title, desc, bg = 'from-[#20243A] to-[#151A26]' }) {
  return (
    <div
      className={`group rounded-2xl p-6 bg-gradient-to-br ${bg} border border-white/10 backdrop-blur transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_-12px_rgba(138,174,255,0.35)]`}
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

/* ---------- HERO RIBBONS (animiert, aber stabil) ---------- */
function HeroRibbons() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden [contain:layout_paint_size]">
      {/* Weißer „Sheen“ (sanft, sorgt für den gewünschten Look) */}
      <div
        aria-hidden="true"
        className="
          absolute -top-10 left-1/2 -translate-x-1/2 w-[140%] h-[55%]
          bg-[radial-gradient(60%_140%_at_50%_0%,rgba(255,255,255,0.4),rgba(255,255,255,0.05)_60%,transparent_80%)]
          opacity-[0.45]
          blur-[6px]
        "
      />

      {/* obere Ribbon */}
      <svg
        className="absolute top-[-8%] left-1/2 -translate-x-1/2 w-[115%] h-[60%] opacity-[0.55]"
        viewBox="0 0 800 400"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2D8CFF" />
            <stop offset="50%" stopColor="#6D61FF" />
            <stop offset="100%" stopColor="#8AAEFF" />
          </linearGradient>
          <filter id="b1">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>
        <path
          d="M-50 150 C 150 90, 250 210, 450 150 S 750 70, 900 160"
          stroke="url(#g1)"
          strokeWidth="42"
          filter="url(#b1)"
          className="ribbon-a"
        />
      </svg>

      {/* untere Ribbon */}
      <svg
        className="absolute bottom-[-14%] left-1/2 -translate-x-1/2 w-[105%] h-[50%] opacity-[0.42]"
        viewBox="0 0 800 400"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8AAEFF" />
            <stop offset="60%" stopColor="#2D8CFF" />
            <stop offset="100%" stopColor="#6D61FF" />
          </linearGradient>
          <filter id="b2">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>
        <path
          d="M-60 200 C 140 160, 280 260, 480 200 S 760 140, 920 220"
          stroke="url(#g2)"
          strokeWidth="34"
          filter="url(#b2)"
          className="ribbon-b"
        />
      </svg>

      {/* dunkler Verlauf für perfekte Lesbarkeit */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,12,0.45)_0%,rgba(8,8,12,0.75)_60%,rgba(8,8,12,0.95)_100%)]" />

      {/* Animationen */}
      <style jsx>{`
        .ribbon-a {
          animation: floatA 12s ease-in-out infinite;
          will-change: transform;
        }
        .ribbon-b {
          animation: floatB 15s ease-in-out infinite;
          will-change: transform;
        }
        @keyframes floatA {
          0% { transform: translateY(0); }
          50% { transform: translateY(14px); }
          100% { transform: translateY(0); }
        }
        @keyframes floatB {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-16px) translateX(-6px); }
          100% { transform: translateY(0) translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ribbon-a, .ribbon-b { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
