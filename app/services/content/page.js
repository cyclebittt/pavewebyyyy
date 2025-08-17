'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CheckoutButton from '@/components/CheckoutButton'; // neu importiert
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function ContentCreation() {
  return (
    <div className="font-proxima bg-gradient-to-br from-violet-900 via-neutral-900 to-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative flex flex-col items-center text-center py-24 px-6 md:px-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Content, der <span className="text-violet-400">bewegt</span>.
        </h1>
        <p className="text-lg md:text-xl max-w-3xl text-neutral-300">
          Foto, Video, Copy & Motion – konsistent zur Markenwelt und auf Conversion getrimmt.
        </p>
      </section>

      {/* Pakete */}
      <section className="px-6 md:px-20 pb-20 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Essentials */}
        <div className="bg-neutral-800 rounded-2xl p-8 flex flex-col gap-6 shadow-xl hover:scale-105 transition-transform duration-500">
          <h2 className="text-2xl font-bold">Essentials</h2>
          <p className="text-neutral-400">Content-Basis</p>
          <p className="text-4xl font-bold">499€</p>
          <ul className="flex flex-col gap-3">
            {['4 Grafiken + 2 Kurztexte', 'Bildbearbeitung', 'Posting-Vorlagen'].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle className="text-violet-400" /> {t}
              </li>
            ))}
          </ul>
          <CheckoutButton
            priceId="price_CONTENT_ESSENTIALS"        // echte Price-ID einsetzen
            service="content"
            pkg="Essentials"
            label="Paket wählen"
            className="mt-auto text-center bg-violet-600 hover:bg-violet-500 transition-colors rounded-full px-6 py-3 font-semibold"
            successPath="/success"
            cancelPath="/services/content"
          />
        </div>

        {/* Creator (featured) */}
        <div className="bg-violet-700 rounded-2xl p-8 flex flex-col gap-6 shadow-xl hover:scale-105 transition-transform duration-500">
          <h2 className="text-2xl font-bold">Creator</h2>
          <p className="text-neutral-200">Mixed Media</p>
          <p className="text-4xl font-bold">899€</p>
          <ul className="flex flex-col gap-3">
            {['8 Grafiken + 4 Kurzvideos', 'Copywriting (Hooks/CTAs)', 'Brand-Guided Look'].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle className="text-white" /> {t}
              </li>
            ))}
          </ul>
          <CheckoutButton
            priceId="price_CONTENT_CREATOR"            // echte Price-ID einsetzen
            service="content"
            pkg="Creator"
            label="Paket wählen"
            className="mt-auto text-center bg-white text-violet-700 hover:bg-neutral-100 transition-colors rounded-full px-6 py-3 font-semibold"
            successPath="/success"
            cancelPath="/services/content"
          />
        </div>

        {/* Pro Studio */}
        <div className="bg-neutral-800 rounded-2xl p-8 flex flex-col gap-6 shadow-xl hover:scale-105 transition-transform duration-500">
          <h2 className="text-2xl font-bold">Pro Studio</h2>
          <p className="text-neutral-400">Maximaler Output</p>
          <p className="text-4xl font-bold">1499€</p>
          <ul className="flex flex-col gap-3">
            {['12 Grafiken + 8 Reels', 'Motion Design + Subtitles', 'Content-Plan & Übergabe'].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle className="text-violet-400" /> {t}
              </li>
            ))}
          </ul>
          <CheckoutButton
            priceId="price_CONTENT_PRO_STUDIO"        // echte Price-ID einsetzen
            service="content"
            pkg="Pro Studio"
            label="Paket wählen"
            className="mt-auto text-center bg-violet-600 hover:bg-violet-500 transition-colors rounded-full px-6 py-3 font-semibold"
            successPath="/success"
            cancelPath="/services/content"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-20 pb-20 text-center flex flex-col gap-6 items-center">
        <h2 className="text-3xl md:text-5xl font-bold">Bereit für Content, der performt?</h2>
        <p className="text-neutral-300 max-w-2xl">Wähle dein Paket – oder sprich mit uns über eine individuelle Produktion.</p>
        <Link href="/request" className="bg-violet-600 hover:bg-violet-500 transition-colors rounded-full px-8 py-4 font-semibold">
          Termin vereinbaren
        </Link>
      </section>

      <Footer />
    </div>
  );
}
