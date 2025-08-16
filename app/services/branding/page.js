+'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Sparkles,
  Target,
  Rows3,
  MessageSquare,
  LayoutTemplate,
  Palette,
  Type,
  BadgeCheck,
  Rocket,
  ArrowRight,
} from 'lucide-react';

export default function BrandingPage() {
  const [fadeDir, setFadeDir] = useState<'fade-right' | 'fade-down'>('fade-right');

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
    const onResize = () => setFadeDir(window.innerWidth < 768 ? 'fade-down' : 'fade-right');
    onResize();
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="font-proxima bg-[#0B0B0F] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />
        <div className="relative px-5 md:px-16 pt-16 md:pt-24 pb-20 md:pb-28">
          <div className="max-w-5xl">
            <span className="inline-flex items-center gap-2 text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
              <Sparkles size={16} /> Branding & Positionierung
            </span>
            <h1 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight">
              Marke mit Substanz.
              <span className="block text-indigo-300">Klar. Merkfähig. Skalierbar.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-neutral-300">
              Klares Fundament, scharfe Botschaften und ein visuelles System, das mitwächst.
              Psychologisch fundiert statt nur „schön“ – für Wirkung, die hängen bleibt.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/request"
                className="px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center gap-2"
              >
                Termin anfragen <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-full border border-white/15 hover:border-white/30 bg-white/5 transition-colors"
              >
                Kontakt aufnehmen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="px-5 md:px-16 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">Was deine Marke trägt</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Target className="text-indigo-300" />,
              title: 'Positionierung, die trägt',
              desc:
                'Klarer Fokus, scharfe Botschaften, konkrete Nutzenargumente – für Relevanz bei deiner Zielgruppe.',
            },
            {
              icon: <Rows3 className="text-indigo-300" />,
              title: 'Visuelle Systeme',
              desc:
                'Logo, Farbwelt, Typo & Komponenten – als skalierbares System gedacht, nicht nur als Einzelstück.',
            },
            {
              icon: <MessageSquare className="text-indigo-300" />,
              title: 'Tonalität & Story',
              desc:
                'Wording, Claims, Narrative – psychologisch fundiert, damit Inhalte hängenbleiben und konvertieren.',
            },
          ].map(({ icon, title, desc }, i) => (
            <div
              key={title}
              data-aos={fadeDir}
              data-aos-delay={i * 120}
              className="rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.03] border border-white/10 p-6 md:p-7 backdrop-blur-sm"
            >
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">{icon}</div>
              <h3 className="mt-4 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-neutral-300">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="px-5 md:px-16 py-10 md:py-14">
        <h2 className="text-2xl md:text-3xl font-semibold">Lieferumfang & Bausteine</h2>
        <p className="mt-2 text-neutral-300 max-w-3xl">
          Modulbasiert konfigurierbar – starte schlank und erweitere ohne Brüche.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              icon: <Sparkles size={18} />,
              title: 'Brand Core (Leitbild, Werte, Nutzenversprechen)',
            },
            { icon: <Target size={18} />, title: 'Positionierung & Zielgruppen-Segmente' },
            { icon: <MessageSquare size={18} />, title: 'Naming, Claim & Tonalität' },
            { icon: <LayoutTemplate size={18} />, title: 'Brand-Guidelines (PDF + Figma-Bibliothek)' },
            { icon: <BadgeCheck size={18} />, title: 'Logo-System (Primär/Secondary/Monogram)' },
            { icon: <Palette size={18} />, title: 'Farbwelt, Typografie, Komponenten' },
            { icon: <Type size={18} />, title: 'Anwendungs-Beispiele (Web, Print, Ads)' },
            { icon: <Rocket size={18} />, title: 'Rollout-Plan & Begleitung' },
            { icon: <LayoutTemplate size={18} />, title: 'Social-Templates (Posts/Reels/Stories)' },
          ].map(({ icon, title }) => (
            <div
              key={title}
              className="rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.06] transition-colors p-4 flex items-center gap-3"
            >
              <span className="text-indigo-300">{icon}</span>
              <span className="text-neutral-200">{title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-5 md:px-16 py-12 md:py-16">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-semibold">Ablauf – klar & kollaborativ</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Kickoff & Research',
                desc: 'Ziele, Kontext, Wettbewerb & Zielgruppe schärfen. Hypothesen bilden.',
              },
              {
                step: '02',
                title: 'Strategie & Core',
                desc: 'Positionierung, Brand Core, Botschaften & Tonalität festziehen.',
              },
              {
                step: '03',
                title: 'Design-System',
                desc: 'Logo-System, Farbwelt, Typo, Komponenten & Beispiele ausarbeiten.',
              },
              {
                step: '04',
                title: 'Guides & Rollout',
                desc: 'Brand-Guides (PDF/Figma) + Rollout-Plan. Optional: Begleitung.',
              },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 md:p-6"
              >
                <div className="text-sm text-indigo-300 font-semibold">{step}</div>
                <h3 className="mt-2 text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-neutral-300">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/request"
              className="px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center gap-2"
            >
              Projekt starten <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-full border border-white/15 hover:border-white/30 bg-white/5 transition-colors"
            >
              Erstes Sparring buchen
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 md:px-16 py-14 md:py-20">
        <div className="relative overflow-hidden rounded-3xl border border-white/10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_400px_at_10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_400px_at_90%_120%,rgba(56,189,248,.18),transparent_55%)]" />
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold">Bereit für eine Marke mit Wirkung?</h3>
              <p className="mt-2 text-neutral-200">
                Wir schärfen dein Fundament – modular, skalierbar und messbar auf Conversion.
              </p>
            </div>
            <Link
              href="/request"
              className="px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center gap-2"
            >
              Termin anfragen <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
