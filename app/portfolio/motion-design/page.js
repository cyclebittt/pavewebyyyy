'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function MotionDesignPage() {
  return (
    <div className="font-proxima bg-[#0B0B0F] text-white min-h-screen">
      <Navbar />

      <section className="px-5 md:px-16 pt-20 md:pt-24 pb-14">
        <div className="max-w-5xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs text-indigo-300/80 bg-white/5 px-3 py-1 rounded-full">
            <Sparkles size={14} /> Motion Design
          </span>

          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight">
            Aufmerksamkeit entscheidet.
          </h1>

          <p className="mt-4 max-w-xl text-neutral-300">
            91 % der Top-Unternehmen nutzen bereits KI.  
            In den nächsten Jahren werden bis zu 60 % der Jobs automatisiert oder ersetzt.
          </p>

          <p className="mt-4 max-w-xl text-neutral-300">
            <strong>PAVEO</strong> hilft dir, nicht abgehängt zu werden – mit Webdesign, Motion Design,
            Social Media und KI-Automatisierungen.
          </p>
        </div>
      </section>

      <section className="px-5 md:px-16 pb-16">
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/10">
          <video
            src="/videos/showcase.mp4"
            poster="/img/portfolio/motion-poster.jpg"
            controls
            preload="metadata"
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-5xl mx-auto mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="/contact"
            className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 font-semibold inline-flex items-center gap-2"
          >
            Projekt anfragen <ArrowRight size={18} />
          </Link>

          <Link
            href="/portfolio"
            className="px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:border-white/40 font-semibold"
          >
            Zurück zum Portfolio
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
