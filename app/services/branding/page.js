'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CheckCircle2, Sparkles, Palette, BookOpenText, Target, Shapes } from 'lucide-react';
import Link from 'next/link';

export default function BrandingPage() {
  const pillars = [
    {
      icon: <Target className="size-5" />,
      title: 'Positionierung, die trägt',
      text: 'Klarer Fokus, scharfe Botschaften, konkrete Nutzenargumente – für Relevanz bei deiner Zielgruppe.',
    },
    {
      icon: <Shapes className="size-5" />,
      title: 'Visuelle Systeme',
      text: 'Logo, Farbwelt, Typo & Komponenten – als skalierbares System gedacht, nicht nur als Einzelstück.',
    },
    {
      icon: <BookOpenText className="size-5" />,
      title: 'Wording & Story',
      text: 'Wording, Claims, Narrative – psychologisch fundiert, damit Inhalte hängenbleiben und konvertieren.',
    },
  ];

  const deliverables = [
    'Brand Core (Leitbild, Werte, Nutzenversprechen)',
    'Positionierung & Zielgruppen-Segmente',
    'Naming, Claim & Tonalität',
    'Logo-System (Primär/Secondary/Monogramm)',
    'Farbwelt, Typografie, Komponenten',
    'Brand-Guidelines (PDF + Figma-Bibliothek)',
    'Social-Templates (Posts/Reels/Stories)',
    'Anwendungs-Beispiele (Web, Print, Ads)',
    'Rollout-Plan & Begleitung',
  ];

  const packages = [
    {
      name: 'Starter',
      note: 'für Solo & frühe Phasen',
      items: [
        'Brand Core Mini',
        'Logo Basic (1 Variante)',
        'Farbwelt & Typo Light',
        '1 Social-Template',
      ],
      tint: 'from-[#1c1a2a] to-[#121019]',
      badge: null,
    },
    {
      name: 'Markensystem',
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
      highlight: true, // visuelles Highlight ohne Preis
    },
    {
      name: 'Brand System+',
      note: 'für KMU mit Skalierungsziel',
      items: [
        'Erweiterte Positionierung & Botschaften',
        'Logo-System + Pattern/Assets',
        'Komponenten-Lib (Figma)',
        'Social-Kit (12 Templates)',
        'Brand-Guidelines (PDF + Figma)',
        'Launch-Support',
      ],
      tint: 'from-[#253260] to-[#141626]',
      badge: null,
    },
  ];

  return (
    <div className="font-proxima bg-[radial-gradient(1200px_800px_at_-10%_-10%,#1d1b2f_0%,#0e0f12_55%),linear-gradient(135deg,#0e0f12_0%,#0b0b0e_40%,#0a0a0e_100%)] text-neutral-200 min-h-screen">
      <Navbar />

      {/* HERO (unverändert, dunkler Look) */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full blur-3xl bg-violet-700/20" />
          <div className="absolute right-0 top-24 h-96 w-[32rem] rounded-full blur-3xl bg-blue-600/20" />
        </div>

        <div className="px-5 md:px-20 py-16 md:py-24 relative">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 text-xs md:text-sm px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300">
              <Sparkles className="size-4 text-violet-400" />
              Branding & Positionierung
            </span>

            <h1 className="mt-5 text-4xl md:text-6xl font-extrabold leading-tight">
              Marke mit System.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-indigo-300 to-blue-300">
                Wirkung ohne Zufall.
              </span>
            </h1>

            <p className="mt-5 text-neutral-300 max-w-2xl">
              Wir bauen dein Branding modular – strategisch, visuell und sprachlich.
              Konsistent über alle Touchpoints, skalierbar für Wachstum und messbar auf Conversion.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/request"
                className="px-5 py-2.5 rounded-full bg-violet-600 text-white font-semibold hover:scale-[1.02] transition"
              >
                Termin anfragen
              </Link>
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-full border border-white/15 text-neutral-200 hover:bg-white/5 transition"
              >
                Kontakt aufnehmen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS (bleiben) */}
      <section className="px-5 md:px-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map(({ icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 md:p-7 backdrop-blur-sm hover:bg-white/[0.06] transition"
            >
              <div className="inline-flex items-center justify-center size-10 rounded-full bg-violet-500/15 text-violet-300">
                {icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-2 text-neutral-300

