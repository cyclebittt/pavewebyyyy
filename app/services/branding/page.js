'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { CheckCircle, Target, Rows3, MessageSquare, Palette, Type, BadgeCheck, LayoutTemplate, Rocket, Sparkles, ArrowRight } from 'lucide-react';

export default function BrandingPage() {
  return (
    <div className="font-proxima bg-gradient-to-br from-violet-900 via-neutral-900 to-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative flex flex-col items-center text-center py-24 px-6 md:px-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Branding mit <span className="text-violet-400">Substanz</span>.
        </h1>
        <p className="text-lg md:text-xl max-w-3xl text-neutral-300">
          Klares Fundament, scharfe Botschaften und ein visuelles System, das mitwächst – psychologisch fundiert statt nur „schön“.
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/request" className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center gap-2">
            Projekt starten <ArrowRight size={18} />
          </Link>
          <Link href="/contact" className="px-6 py-3 rounded-full border border-white/15 hover:border-white/30 bg-white/5 transition-colors">
            Erstes Sparring
          </Link>
        </div>
      </section>

      {/* Säulen */}
      <section className="px-6 md:px-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Target className="text-indigo-300" />, title: 'Positionierung', desc: 'Klarer Fokus, Nutzenargumente & Zielgruppen-Schärfung für echte Relevanz.' },
            { icon: <Rows3 className="text-indigo-300" />, title: 'Visuelles System', desc: 'Logo, Farben, Typo & Komponenten – als skalierbares System statt Einzelstücke.' },
            { icon: <MessageSquare className="text-indigo-300" />, title: 'Tonalität & Story', desc: 'Wording, Claims, Narrative – damit Inhalte hängen bleiben und konvertieren.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="rounded-2xl bg-white/5 border border-white/10 p-6">
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">{icon}</div>
              <h3 className="mt-4 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-neutral-300">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Lieferumfang */}
      <section className="px-6 md:px-20 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold">Lieferumfang & Bausteine</h2>
        <p className="mt-2 text-neutral-300 max-w-3xl">Modular konfigurierbar – starte schlank und erweitere ohne Brüche.</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { icon: <Sparkles size={18} />, text: 'Brand Core (Leitbild, Werte, Nutzenversprechen)' },
            { icon: <Target size={18} />, text: 'Positionierung & Zielgruppen-Segmente' },
            { icon: <MessageSquare size={18} />, text: 'Naming, Claim & Tonalität' },
            { icon: <LayoutTemplate size={18} />, text: 'Brand-Guidelines (PDF + Figma-Bibliothek)' },
            { icon: <BadgeCheck size={18} />, text: 'Logo-System (Primär/Secondary/Monogram)' },
            { icon: <Palette size={18} />, text: 'Farbwelt, Typografie, Komponenten' },
            { icon: <Type size={18} />, text: 'Anwendungsbeispiele (Web, Print, Ads)' },
            { icon: <Rocket size={18} />, text: 'Rollout-Plan & Begleitung' },
            { icon: <LayoutTemplate size={18} />, text: 'Social-Templates (Posts/Reels/Stories)' },
          ].map(({ icon, text }) => (
            <div key={text} className="rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.06] transition-colors p-4 flex items-center gap-3">
              <span className="text-indigo-300">{icon}</span>
              <span className="text-neutral-200">{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-20 py-16">
        <div className="relative overflow-hidden rounded-3xl border border-white/10">
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold">Bereit für eine Marke mit Wirkung?</h3>
              <p className="mt-2 text-neutral-200">Wir schärfen dein Fundament – modular, skalierbar und messbar auf Conversion.</p>
            </div>
            <Link href="/request" className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center gap-2">
              Termin anfragen <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


