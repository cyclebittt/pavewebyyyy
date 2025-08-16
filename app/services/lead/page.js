'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function LeadGeneration() {
  return (
    <div className="font-proxima bg-gradient-to-br from-violet-900 via-neutral-900 to-black text-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center text-center py-24 px-6 md:px-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Lead Generation, die <span className="text-violet-400">konvertiert</span>.
        </h1>
        <p className="text-lg md:text-xl max-w-3xl text-neutral-300">
          Wir bauen Systeme, die aus Reichweite echte Kunden machen – durch
          strukturierte Prozesse, klare Funnels und smarte Tools.
        </p>
      </div>

      {/* Packages */}
      <div className="px-6 md:px-20 py-20 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Starter */}
        <div className="bg-neutral-800 rounded-2xl p-8 flex flex-col gap-6 shadow-xl hover:scale-105 transition-transform duration-500">
          <h2 className="text-2xl font-bold">Starter</h2>
          <p className="text-neutral-400">Perfekt für den Einstieg</p>
          <p className="text-4xl font-bold">499€</p>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <CheckCircle className="text-violet-400" /> Basis Funnel
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-violet-400" /> Landing Page Setup
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-violet-400" /> E-Mail Integration
            </li>
          </ul>
          <button className="mt-auto bg-violet-600 hover:bg-violet-500 transition-colors rounded-full px-6 py-3 font-semibold">
            Paket wählen
          </button>
        </div>

        {/* Growth */}
        <div className="bg-violet-700 rounded-2xl p-8 flex flex-col gap-6 shadow-xl hover:scale-105 transition-transform duration-500">
          <h2 className="text-2xl font-bold">Growth</h2>
          <p className="text-neutral-200">Für skalierende Marken</p>
          <p className="text-4xl font-bold">999€</p>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <CheckCircle className="text-white" /> Vollständiger Funnel
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-white" /> Automatisierte E-Mail Sequenz
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-white" /> Conversion Optimierung
            </li>
          </ul>
          <button className="mt-auto bg-white text-violet-700 hover:bg-neutral-100 transition-colors rounded-full px-6 py-3 font-semibold">
            Paket wählen
          </button>
        </div>

        {/* Premium */}
        <div className="bg-neutral-800 rounded-2xl p-8 flex flex-col gap-6 shadow-xl hover:scale-105 transition-transform duration-500">
          <h2 className="text-2xl font-bold">Premium</h2>
          <p className="text-neutral-400">Maximale Wirkung</p>
          <p className="text-4xl font-bold">1499€</p>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <CheckCircle className="text-violet-400" /> Multi-Step Funnel
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-violet-400" /> CRM-Integration
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-violet-400" /> A/B Testing & Analytics
            </li>
          </ul>
          <button className="mt-auto bg-violet-600 hover:bg-violet-500 transition-colors rounded-full px-6 py-3 font-semibold">
            Paket wählen
          </button>
        </div>
      </div>

      {/* Call to Action */}
      <div className="px-6 md:px-20 py-20 text-center flex flex-col gap-6 items-center">
        <h2 className="text-3xl md:text-5xl font-bold">
          Mehr Leads. Mehr Umsatz.
        </h2>
        <p className="text-neutral-300 max-w-2xl">
          Starte jetzt mit deinem Lead-Funnel – und verwandle Besucher in Kunden.
        </p>
        <Link
          href="/request"
          className="bg-violet-600 hover:bg-violet-500 transition-colors rounded-full px-8 py-4 font-semibold"
        >
          Jetzt starten
        </Link>
      </div>

      <Footer />
    </div>
  );
}
