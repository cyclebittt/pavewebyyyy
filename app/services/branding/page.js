'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProofBlocks from '@/components/services/ProofBlocks';

export default function BrandingPage() {
  return (
    <div className="font-proxima bg-[#0B0B0F] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />
        <div className="relative px-5 md:px-16 pt-16 md:pt-24 pb-14">
          <span className="inline-flex items-center gap-2 text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
            Branding & Positionierung
          </span>
          <h1 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight">
            Marke mit Substanz – klar, merkfähig, skalierbar.
          </h1>
          <p className="mt-4 max-w-2xl text-neutral-300">
            Wir zeigen keine Logos, sondern Systeme. Weil Systeme Wirkung tragen.
          </p>
        </div>
      </section>

      {/* Proof */}
      <ProofBlocks variant="branding" />

      <Footer />
    </div>
  );
}
