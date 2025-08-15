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
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic' });
  }, []);

  return (
    <div className="font-proxima text-[#EDEDF2] bg-[#0A0A10] antialiased overflow-x-clip">
      <Navbar />

      {/* HERO – simpler diagonaler Dark-Gradient */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, #141227 0%, #1b1850 35%, #0f1a3a 65%, #0b0e18 100%)',
        }}
      >
        {/* dunkler Overlay für Lesbarkeit */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,12,0.25)_0%,rgba(8,8,12,0.55)_60%,rgba(8,8,12,0.85)_100%)]" />

        <div className="relative z-10 px-5 md:px-20 pt-20 md:pt-36 pb-16 md:pb-28">
          <div className="max-w-4xl" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#AAB1C2] backdrop-blur">
              <Sparkles size={14} />
              <span>Modulare Markenkommunikation für Selbstständige & KMU</span>
            </div>

            <h1 className="mt-5 text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight">
              Eine Marke, die <span className="text-[#8AAEFF]">wirklich</span> wirkt.
            </h1>

            <p className="mt-5 text-lg md:text-xl text-[#C0C6D8] max-w-2xl">
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

      {/* TRUST */}
      <section className="px-5 md:px-20 py-8 bg-[#0C0C14]">
        <div className="flex flex-wrap gap-3" data-aos="fade-up">
          {[
            { k: 'Fokus', v: 'Psychologie + Conversion' },
            { k: 'Ansatz', v: 'Modular & skalierbar' },
            { k: 'Arbeitsweise', v: 'Kollaborativ & fair' },
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
            Wähle nur die Bausteine, die du brauchst – oder kombiniere zu einem stimmigen
            Gesamtauftritt.
          </p>
        </header>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <ServiceCard
            icon={<PenTool size={22} />}
            title="Branding & Positionierung"
            desc="Logo, Farbwelt, Tonalität & Kernbotschaft – entwickelt, um bei deiner Zielgruppe im Kopf zu bleiben."
            delay={0}
          />

          <div className="flex flex-col gap-6">
            <ServiceCard
              icon={<CodeXml size={22} />}
              title="Webdesign"
              desc="Klar, modern und conversion-stark – als Baukastensystem oder individuell entwickelt."
              bg="from-[#232136] to-[#18162A]"
              delay={100}
            />
            <ServiceCard
              icon={<Users size={22} />}
              title="Social Media Management"
              desc="Strategie, Planung, Content-Produktion & Analyse – ready-to-post und skalierbar."
              bg="from-[#1A1E2B] to-[#131722]"
              delay={200}
            />
          </div>

          <div className="flex flex-col gap-6">
            <ServiceCard
              icon={<LayoutDashboard size={22} />}
              title="Content Creation"
              desc="Foto, Video, Texte & Motion Design – konsistent zur Markenwelt und auf Wirkung getrimmt."
              bg="from-[#171B28] to-[#111520]"
              delay={300}
            />
            <ServiceCard
              icon={<ChartPie size={22} />}
              title="Leadsystem & Angebotsstrukturierung"
              desc="Digitale Vertriebsprozesse: Angebots-Generatoren, Anfrageformulare & CRM-Einbindung."
              bg="from-[#1B1A28] to-[#12121D]"
              delay={400}
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

      {/* WHY PAVEO */}
      <section className="px-5 md:px-20 pb-14 md:pb-20">
        <header className="max-w-3xl" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#AAB1C2]">
            <Sun size={14} />
            <span>Warum paveo</span>
          </div>
          <h2 className="mt-4 text-2xl md:text-4xl font-semibold">Weniger reden. Mehr Wirkung.</h2>
        </header>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Psychologisch fundiert',
              text:
                'Wir gestalten nicht nur schön, sondern wirksam – basierend auf Wahrnehmung, Heuristiken & Kontext.',
              bg: 'from-[#202238] to-[#17192C]',
              delay: 0,
            },
            {
              title: 'Modular & flexibel',
              text:
                'Buche nur, was du brauchst. Starte klein und erweitere ohne Brüche in Design, Content oder Technik.',
              bg: 'from-[#231E3B] to-[#18152F]',
              delay: 120,
            },
            {
              title: 'Kollaboratives Netzwerk',
              text:
                'Statt starrem Agenturmodell arbeiten wir mit Spezialist:innen – effizient, fair & transparent.',
              bg: 'from-[#1B1E30] to-[#141725]',
              delay: 240,
            },
          ].map((card) => (
            <div
              key={card.title}
              data-aos="fade-up"
              data-aos-delay={card.delay}
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
        <div className="relative z-10 px-5 md:px-20 py-16 md:py-24" data-aos="fade-up">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-semibold">Bereit für den nächsten Schritt?</h2>
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

/* ---------- Card ---------- */
function ServiceCard({ icon, title, desc, bg = 'from-[#20243A] to-[#151A26]', delay = 0 }) {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={delay}
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
