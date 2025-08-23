'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProofBlocks from '@/components/services/ProofBlocks';
import Link from 'next/link';
import { useEffect } from 'react';
import {
  Sparkles, Target, MessageSquare, LayoutTemplate, BadgeCheck, Palette, Type, Rocket, ArrowRight,
} from 'lucide-react';

export default function Branding() {
  useEffect(() => {
    (async () => {
      const AOS = (await import('aos')).default;
      await import('aos/dist/aos.css');
      AOS.init({ duration: 600, once: true });
    })();
  }, []);

  const items = [
    { icon: <Target />, title: 'Positionierung', desc: 'Zielgruppen, Nutzen, Gründe – messerscharf formuliert.' },
    { icon: <MessageSquare />, title: 'Tonalität & Story', desc: 'Wording, Claims, Narrative, die verkaufen.' },
    { icon: <BadgeCheck />, title: 'Logo-System', desc: 'Primär/Secondary/Monogramm inkl. Varianten.' },
    { icon: <Palette />, title: 'Farbwelt & Typo', desc: 'Skalierbares System statt Einzelgrafik.' },
    { icon: <LayoutTemplate />, title: 'Brand Guidelines', desc: 'PDF + Figma-Komponenten für Team & Partner.' },
    { icon: <Type />, title: 'Anwendung', desc: 'Web, Social, Print – mit Beispielen und Templates.' },
  ];

  const steps = [
    { step: '01', title: 'Kickoff & Research', text: 'Ziele, Wettbewerb & Audience schärfen.' },
    { step: '02', title: 'Strategie & Core', text: 'Positionierung & Messaging fixieren.' },
    { step: '03', title: 'Design-System', text: 'Logo, Farben, Typo, Komponenten.' },
    { step: '04', title: 'Guides & Rollout', text: 'Brand-Guides + Rollout-Plan, optional Begleitung.' },
  ];

  return (
    <div className="font-proxima bg-[#0B0B0F] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />
        <div className="relative px-5 md:px-16 pt-20 md:pt-28 pb-16 text-center max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
            <Sparkles size={16} /> Branding & Positionierung
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
            Marke mit Substanz. <span className="text-indigo-300">Klar. Merkfähig. Skalierbar.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-neutral-300">
            Wir schärfen Fundament & Story – damit Website, Content & Ads endlich zusammen wirken.
          </p>
        </div>
      </section>

      {/* Deliverables */}
      <section className="px-5 md:px-16 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Was du bekommst</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map(({ icon, title, desc }, i) => (
            <div
              key={title}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 grid place-items-center text-indigo-300">
                {icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-neutral-300">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Proof */}
      <ProofBlocks />

      {/* Prozess */}
      <section className="px-5 md:px-16 pb-6 md:pb-12">
        <h2 className="text-2xl md:text-3xl font-semibold">Ablauf – kollaborativ & schnell</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <div key={s.step} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6" data-aos="fade-up" data-aos-delay={i * 100}>
              <div className="text-sm text-indigo-300 font-semibold">{s.step}</div>
              <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-neutral-300">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 md:px-16 py-10 md:py-16 text-center">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-10">
          <h3 className="text-3xl md:text-4xl font-bold">Bereit für eine Marke mit Wirkung?</h3>
          <p className="mt-3 text-neutral-300">Sparring, Roadmap & saubere Umsetzung – modular und messbar.</p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/request" className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center gap-2">
              Termin anfragen <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="px-6 py-3 rounded-full border border-white/15 hover:border-white/30 bg-white/5 transition-colors font-semibold">
              Kontakt
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
