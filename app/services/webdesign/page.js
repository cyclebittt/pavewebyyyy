// app/services/webdesign/page.js
'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import ProofBlocks from '@/components/services/ProofBlocks';
import { MonitorSmartphone, Gauge, ShieldCheck, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import 'aos/dist/aos.css';

export default function WebdesignPage() {
  useEffect(() => {
    (async () => {
      const AOS = (await import('aos')).default;
      AOS.init({ duration: 600, once: true, offset: 40 });
    })();
  }, []);

  const deliverables = [
    { icon: <MonitorSmartphone className="text-indigo-300" />, t: 'UX/Struktur', d: 'Informationsarchitektur, Wireframes, klare CTAs.' },
    { icon: <Gauge className="text-indigo-300" />, t: 'Performance', d: 'Schnell, leicht, SEO‑ready – Core Web Vitals im Blick.' },
    { icon: <ShieldCheck className="text-indigo-300" />, t: 'DSGVO & Tracking', d: 'Consent, Events, Privacy‑First Setup.' },
  ];

  return (
    <div className="font-proxima bg-[#0B0B0F] text-white">
      <Navbar />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_500px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%)]" />
        <div className="relative px-5 md:px-16 pt-20 md:pt-28 pb-14">
          <h1 className="text-4xl md:text-6xl font-extrabold">Websites, die <span className="text-indigo-300">performen</span>.</h1>
          <p className="mt-4 max-w-2xl text-neutral-300">
            Modern, schnell, konversionsstark – mit sauberer Struktur und messbarer Wirkung.
          </p>
          <div className="mt-6">
            <Link href="/request" className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center gap-2">
              Erstgespräch <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

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

      <ProofBlocks
        items={[
          { label: 'Pagespeed (mobil)', value: '90–100', desc: 'Optimiert für echte Performance, nicht nur Scores.' },
          { label: 'Ø Conversion‑Lift', value: '+22 %', desc: 'Klarere Struktur & gezielte CTAs.' },
          { label: 'Go‑Live', value: '3–6 Wochen', desc: 'Je nach Umfang & vorhandenen Inhalten.' },
        ]}
      />

      <Footer />
    </div>
  );
}
