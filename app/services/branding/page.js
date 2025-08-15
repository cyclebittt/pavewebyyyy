'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Sparkles,
  Palette,
  PenTool,
  Type,
  Shapes,
  Target,
  ArrowRight,
  CheckCircle2,
  Compass,
  Layers,
  Rocket,
  ChevronRight,
} from 'lucide-react';

export default function BrandingPage() {
  const [aosReady, setAosReady] = useState(false);

  // AOS nur clientseitig laden
  useEffect(() => {
    let cleanup = () => {};
    (async () => {
      const AOS = (await import('aos')).default;
      await import('aos/dist/aos.css');
      AOS.init({ duration: 600, once: true, offset: 80, easing: 'ease-out' });
      setAosReady(true);
      cleanup = () => {};
    })();
    return () => cleanup();
  }, []);

  return (
    <div className="font-proxima">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* kräftiger diagonaler Hintergrund */}
        <div className="absolute inset-0 -z-10 bg-[#0c0c12]" />
        <div
          className="absolute -top-1/3 -left-1/3 h-[110vh] w-[110vw] -z-10"
          style={{
            background:
              'radial-gradient(60% 60% at 30% 20%, rgba(129,51,241,0.35) 0%, rgba(129,51,241,0.12) 40%, rgba(12,12,18,0) 70%), radial-gradient(60% 60% at 80% 60%, rgba(64,142,255,0.30) 0%, rgba(64,142,255,0.10) 40%, rgba(12,12,18,0) 70%)',
            filter: 'blur(24px)',
          }}
        />
        <div className="px-5 md:px-20 pt-12 md:pt-24 pb-16 md:pb-28 text-white">
          <div className="max-w-5xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs md:text-sm">
              <Sparkles size={16} /> Branding & Positionierung
            </span>
            <h1
              className="mt-6 text-4xl md:text-6xl font-extrabold leading-[1.05]"
              data-aos="fade-up"
            >
              Eine Marke, die bleibt – <span className="text-[#92a6ff]">klar positioniert</span> und
              <span className="text-[#b79cff]"> psychologisch wirksam</span>.
            </h1>
            <p
              className="mt-5 text-neutral-300 text-base md:text-lg max-w-3xl"
              data-aos="fade-up"
              data-aos-delay="80"
            >
              Wir schärfen deine Wahrnehmung am Markt: vom Kern bis zur Kante – Positioning, Naming,
              Tonalität, visuelles System und Guidelines. Modular buchbar, messbar an Wirkung.
            </p>

            <div className="mt-8 flex flex-wrap gap-3" data-aos="fade-up" data-aos-delay="120">
              <Link
                href="/request"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-violet-600 text-white font-semibold border-2 border-violet-600 transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              >
                Termin anfragen <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-white/10 text-white border border-white/15 hover:bg-white/15 transition-colors"
              >
                Fragen klären
              </Link>
            </div>

            <div className="mt-8 flex gap-2 text-xs text-white/60">
              <span className="px-3 py-1 rounded-full bg-white/5">Seit 2024</span>
              <span className="px-3 py-1 rounded-full bg-white/5">Modular & flexibel</span>
              <span className="px-3 py-1 rounded-full bg-white/5">Netzwerk: 10+ Partner:innen</span>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE CARDS */}
      <section className="px-5 md:px-20 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Target className="text-white/90" size={20} />,
              title: 'Positionierung, die trägt',
              text:
                'Klarer Fokus, scharfe Botschaften, konkrete Nutzenargumente – für Relevanz bei deiner Zielgruppe.',
              tint: 'from-[#2B2759] to-[#14121F]',
            },
            {
              icon: <Palette className="text-white/90" size={20} />,
              title: 'Visuelle Systeme',
              text:
                'Logo, Farbwelt, Typo & Komponenten – als skalierbares System gedacht, nicht nur als Einzelstück.',
              tint: 'from-[#3D2D6B] to-[#14121F]',
            },
            {
              icon: <Type className="text-white/90" size={20} />,
              title: 'Tonalität & Story',
              text:
                'Wording, Claims, Narrative – psychologisch fundiert, damit Inhalte hängenbleiben und konvertieren.',
              tint: 'from-[#2C3C72] to-[#14121F]',
            },
          ].map((c, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 80}
              className={`group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br ${c.tint} border border-white/10`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-white/10 flex items-center justify-center">
                    {c.icon}
                  </div>
                  <h3 className="font-semibold text-white text-lg">{c.title}</h3>
                </div>
                <ChevronRight className="text-white/40 group-hover:text-white/70 transition-colors" />
              </div>
              <p className="mt-4 text-white/70">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="px-5 md:px-20 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-10">
          <div className="flex items-center gap-3 text-white mb-6" data-aos="fade-up">
            <Layers size={18} />
            <h2 className="text-2xl md:text-3xl font-bold">Was du bekommst</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Brand Core (Leitbild, Werte, Nutzenversprechen)',
              'Positionierung & Zielgruppen-Segmente',
              'Naming, Claim & Tonalität',
              'Logo-System (Primär/Secondary/Monogram)',
              'Farbwelt, Typografie, Komponenten',
              'Brand-Guidelines (PDF + Figma-Bibliothek)',
              'Social-Templates (Posts/Reels/Stories)',
              'Anwendungs-Beispiele (Web, Print, Ads)',
              'Rollout-Plan & Begleitung',
            ].map((item, i) => (
              <div
                key={item}
                data-aos="fade-up"
                data-aos-delay={i * 40}
                className="flex items-start gap-3 bg-black/30 border border-white/10 rounded-xl p-4"
              >
                <CheckCircle2 className="mt-1 text-[#93a6ff]" size={18} />
                <p className="text-white/80">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-5 md:px-20 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-3xl bg-gradient-to-br from-[#241F43] to-[#13111D] border border-white/10 p-6 md:p-10">
            <div className="flex items-center gap-3 text-white mb-3">
              <Compass size={18} />
              <h2 className="text-2xl md:text-3xl font-bold">Ablauf – klar & kollaborativ</h2>
            </div>
            <p className="text-white/70 mb-6">
              Schlanker Start, klare Milestones und enge Abstimmung. Wir arbeiten modular – du buchst,
              was du brauchst.
            </p>

            <ol className="space-y-4">
              {[
                { t: 'Kick-off & Zielbild', d: 'Audit, Ziele, Zielgruppen, Scope & Roadmap.' },
                {
                  t: 'Positionierung & Kern',
                  d: 'Spitzes Nutzenversprechen, Narrative, Tonalität.',
                },
                { t: 'Visuelles System', d: 'Logo-System, Farben, Typo, Komponenten, Patterns.' },
                {
                  t: 'Guidelines & Templates',
                  d: 'Styleguide + Social/Web-Templates, Figma-Lib, Übergabe.',
                },
                { t: 'Rollout & Iteration', d: 'Begleitung & Feinschliff im Live-Einsatz.' },
              ].map((s, i) => (
                <li key={i} className="flex gap-4">
                  <div className="mt-1 size-6 rounded-full bg-white/10 text-white flex items-center justify-center text-xs">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{s.t}</p>
                    <p className="text-white/70">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* PACKAGES */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-white">
              <Rocket size={18} />
              <h2 className="text-2xl md:text-3xl font-bold">Pakete</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  name: 'Starter',
                  price: 'ab 1.200€',
                  note: 'für Solo & frühe Phasen',
                  items: [
                    'Brand Core Mini',
                    'Logo Basic (1 Variante)',
                    'Farbwelt & Typo Light',
                    '1 Social-Template',
                  ],
                  tint: 'from-[#1c1a2a] to-[#121019]',
                },
                {
                  name: 'Markensystem',
                  price: 'ab 2.900€',
                  note: 'meistgewählt',
                  items: [
                    'Positionierung + Narrative',
                    'Logo-System (Primär/Secondary)',
                    'Farbwelt, Typo, Komponenten',
                    'Social-Kit (6 Templates)',
                    'Brand-Guidelines (PDF)',
                  ],
                  tint: 'from-[#2a2454] to-[#161422]',
                  badge: 'Empfohlen',
                },
              ].map((p, i) => (
                <div
                  key={p.name}
                  className={`relative overflow-hidden rounded-2xl p-6 border border-white/10 bg-gradient-to-br ${p.tint}`}
                >
                  {p.badge && (
                    <span className="absolute top-4 right-4 text-xs px-2 py-1 rounded-full bg-white/15 text-white">
                      {p.badge}
                    </span>
                  )}
                  <h3 className="text-white text-xl font-bold">{p.name}</h3>
                  <p className="text-white/60">{p.note}</p>
                  <div className="my-5 text-3xl font-extrabold text-white">{p.price}</div>
                  <ul className="space-y-2">
                    {p.items.map((x) => (
                      <li key={x} className="flex items-start gap-2 text-white/80">
                        <CheckCircle2 size={18} className="mt-0.5 text-[#93a6ff]" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex gap-3">
                    <Link
                      href="/request"
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-violet-600 text-white font-semibold border-2 border-violet-600 transition-transform hover:scale-[1.03]"
                    >
                      Anfragen
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/10 text-white border border-white/15 hover:bg-white/15"
                    >
                      Details klären
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* drittes Paket breit */}
            <div className="rounded-2xl p-6 border border-white/10 bg-gradient-to-br from-[#253260] to-[#141626]">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-white text-xl font-bold">Brand System+</h3>
                  <p className="text-white/70">
                    Für KMU mit Skalierungsziel: komplette Systematik + Rollout-Begleitung.
                  </p>
                </div>
                <div className="text-3xl font-extrabold text-white">ab 5.900€</div>
              </div>
              <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  'Erweiterte Positionierung & Botschaften',
                  'Logo-System + Pattern/Assets',
                  'Komponenten-Lib (Figma)',
                  'Social-Kit (12 Templates)',
                  'Brand-Guidelines (PDF + Figma)',
                  'Launch-Support (4 Wochen)',
                ].map((x) => (
                  <li key={x} className="flex items-start gap-2 text-white/80">
                    <CheckCircle2 size={18} className="mt-0.5 text-[#93a6ff]" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link
                  href="/request"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-violet-600 text-white font-semibold border-2 border-violet-600 transition-transform hover:scale-[1.03]"
                >
                  Unverbindlich anfragen <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 md:px-20 py-12 md:py-16">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1a1730] via-[#1b2248] to-[#11121a] p-8 md:p-12">
          <h3 className="text-white text-2xl md:text-4xl font-bold max-w-3xl">
            Bereit, deine Marke zu schärfen?
          </h3>
          <p className="text-white/70 mt-3 max-w-2xl">
            30-Minuten-Call, klares Zielbild & nächste Schritte. Unverbindlich, effizient, auf den
            Punkt.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/request"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-violet-600 text-white font-semibold border-2 border-violet-600 transition-transform hover:scale-[1.03]"
            >
              Termin anfragen
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-white/10 text-white border border-white/15 hover:bg-white/15"
            >
              Mehr über uns
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
