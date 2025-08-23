// app/services/branding/page.js
'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import ProofBlocks from '@/components/services/ProofBlocks';
import { Sparkles, Target, MessageSquare, LayoutTemplate, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import 'aos/dist/aos.css';

export default function BrandingPage() {
  useEffect(() => {
    (async () => {
      const AOS = (await import('aos')).default;
      AOS.init({ duration: 600, once: true, offset: 40 });
    })();
  }, []);

  const deliverables = [
    { icon: <Target className="text-indigo-300" />, t: 'Positionierung', d: 'Nutzen, Segmente, Botschaften.' },
    { icon: <MessageSquare className="text-indigo-300" />, t: 'Tonalität & Story', d: 'Claim, Wording, Narrative.' },
    { icon: <LayoutTemplate className="text-indigo-300" />, t: 'Visuelles System', d: 'Logo‑System, Farben, Typo, Komponenten.' },
    { icon: <Sparkles className="text-indigo-300" />, t: 'Brand‑Guides', d: 'PDF + Figma‑Bibliothek, Beispiele & Do’s/Don’ts.' },
  ];

  return (
    <div className="font-proxima bg-[#0B0B0F] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%)]" />
        <div className="relative px-5 md:px-16 pt-20 md:pt-28 pb-14">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Branding, das <span className="text-indigo-300">greift</span> und konvertiert.
          </h1>
          <p className="mt-4 max-w-2xl text-neutral-300">
            Klare Kernbotschaft, psychologisch fundierte Sprache und ein skalierbares, visuelles System – damit alles danach sitzt.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/request" className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center gap-2">
              Projekt starten <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="px-6 py-3 rounded-full border border-white/15 bg-white/5 hover:border-white/30 transition-colors">
              Kontakt
            </Link>
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="px-5 md:px-16 py-10 md:py-14">
        <h2 className="text-2xl md:text-3xl font-semibold">Lieferumfang</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {deliverables.map(({ icon, t, d }, i) => (
            <div key={t} data-aos="fade-up" data-aos-delay={i * 80}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 flex gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">{icon}</div>
              <div>
                <div className="font-semibold">{t}</div>
                <div className="text-neutral-300 text-sm">{d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROOF */}
      <ProofBlocks
        items={[
          { label: 'Ø Conversion‑Lift', value: '27 %', desc: 'Durch sauber geschärfte Botschaften & Struktur.' },
          { label: 'Zeit bis Style‑Guide', value: '14–21 T', desc: 'Schnell startklar – modular erweiterbar.' },
          { label: 'Erstellte Komponenten', value: '120+', desc: 'Buttons, Cards, Templates, Ad‑Snippets.' },
        ]}
      />

      <Footer />
    </div>
  );
}

