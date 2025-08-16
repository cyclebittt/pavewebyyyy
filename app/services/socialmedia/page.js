'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function SocialMedia() {
  return (
    <div className="font-proxima bg-gradient-to-br from-violet-900 via-neutral-900 to-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative flex flex-col items-center text-center py-24 px-6 md:px-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Social Media, das <span className="text-violet-400">performt</span>.
        </h1>
        <p className="text-lg md:text-xl max-w-3xl text-neutral-300">
          Strategie, Planung, Content-Produktion und Reporting – ready-to-post und auf Wirkung getrimmt.
        </p>
      </section>

      {/* Pakete */}
      <section className="px-6 md:px-20 pb-20 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Starter */}
        <div className="bg-neutral-800 rounded-2xl p-8 flex flex-col gap-6 shadow-xl hover:scale-105 transition-transform duration-500">
          <h2 className="text-2xl font-bold">Starter</h2>
          <p className="text-neutral-400">Solide Basis</p>
          <p className="text-4xl font-bold">399€</p>
          <ul className="flex flex-col gap-3">
            {['1 Plattform', '8 Posts/Monat', 'Grund-Reporting'].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle className="text-violet-400" /> {t}
              </li>
            ))}
          </ul>
          <Link href="/request" className="mt-auto text-center bg-violet-600 hover:bg-violet-500 transition-colors rounded-full px-6 py-3 font-semibold">
            Paket wählen
          </Link>
        </div>

        {/* Visibility+ (featured) */}
        <div className="bg-violet-700 rounded-2xl p-8 flex flex-col gap-6 shadow-xl hover:scale-105 transition-transform duration-500">
          <h2 className="text-2xl font-bold">Visibility+</h2>
          <p className="text-neutral-200">Mehr Reichweite</p>
          <p className="text-4xl font-bold">799€</p>
          <ul className="flex flex-col gap-3">
            {['2 Plattformen', '16 Posts/Monat + 4 Reels', 'Monatliche Analyse & Maßnahmen'].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle className="text-white" /> {t}
              </li>
            ))}
          </ul>
          <Link href="/request" className="mt-auto text-center bg-white text-violet-700 hover:bg-neutral-100 transition-colors rounded-full px-6 py-3 font-semibold">
            Paket wählen
          </Link>
        </div>

        {/* Growth+ */}
        <div className="bg-neutral-800 rounded-2xl p-8 flex flex-col gap-6 shadow-xl hover:scale-105 transition-transform duration-500">
          <h2 className="text-2xl font-bold">Growth+</h2>
          <p className="text-neutral-400">Skalierung & Performance</p>
          <p className="text-4xl font-bold">1299€</p>
          <ul className="flex flex-col gap-3">
            {['3 Plattformen', '20 Posts/Monat + 8 Reels', 'Paid Setup + UGC/Hook-Testing'].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle className="text-violet-400" /> {t}
              </li>
            ))}
          </ul>
          <Link href="/request" className="mt-auto text-center bg-violet-600 hover:bg-violet-500 transition-colors rounded-full px-6 py-3 font-semibold">
            Paket wählen
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-20 pb-20 text-center flex flex-col gap-6 items-center">
        <h2 className="text-3xl md:text-5xl font-bold">Sichtbar. Relevanz. Wachstum.</h2>
        <p className="text-neutral-300 max-w-2xl">Wähle dein Paket – oder buch direkt einen Termin mit uns.</p>
        <Link href="/request" className="bg-violet-600 hover:bg-violet-500 transition-colors rounded-full px-8 py-4 font-semibold">
          Termin vereinbaren
        </Link>
      </section>

      <Footer />
    </div>
  );
}

