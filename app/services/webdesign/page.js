'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProofBlocks from '@/components/services/ProofBlocks';
import Link from 'next/link';
import { useEffect } from 'react';
import { LayoutTemplate, Rocket, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export default function Webdesign() {
  useEffect(() => {
    (async () => {
      const AOS = (await import('aos')).default;
      await import('aos/dist/aos.css');
      AOS.init({ duration: 600, once: true });
    })();
  }, []);

  const features = [
    'Klares UX‑Konzept & Informationsarchitektur',
    'Schnell, zugänglich & SEO‑ready',
    'CMS & Komponenten für eigenständige Pflege',
    'Saubere CTAs, Lead‑Form & CRM‑Hook',
    'Tracking & Events für echte Entscheidungen',
  ];

  const steps = [
    { step: '01', title: 'Ziele & Struktur', text: 'User‑Flows, Seitenstruktur, Kernbotschaften.' },
    { step: '02', title: 'Wireframes', text: 'Priorisierung von Inhalten & CTAs.' },
    { step: '03', title: 'Design & Build', text: 'Komponenten, Templates, Performance.' },
    { step: '04', title: 'Launch & Iterate', text: 'Tracking, Hypothesen, Optimierung.' },
  ];

  return (
    <div className="font-proxima bg-[#0B0B0F] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />
        <div className="relative px-5 md:px-16 pt-20 md:pt-28 pb-16 text-center max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
            <LayoutTemplate size={16} /> Webdesign & Build
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
            Websites, die <span className="text-indigo-300">konvertieren</span>.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-neutral-300">
            Modern, schnell, verständlich – mit Fokus auf Leads und klare nächste Schritte.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="px-5 md:px-16 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Was drin ist</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {features.map((f, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/[0.04] p-4" data-aos="fade-up" data-aos-delay={i * 80}>
              <div className="mb-2 text-indigo-300"><CheckCircle2 size={18} /></div>
              <div className="text-neutral-200">{f}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Proof */}
      <ProofBlocks />

      {/* Prozess */}
      <section className="px-5 md:px-16 pb-6 md:pb-12">
        <h2 className="text-2xl md:text-3xl font-semibold">Ablauf</h2>
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
          <h3 className="text-3xl md:text-4xl font-bold">Lass uns deine Site auf Conversion trimmen.</h3>
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
