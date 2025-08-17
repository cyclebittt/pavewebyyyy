'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CheckoutButton from '@/components/CheckoutButton';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function Webdesign() {
  return (
    <div className="font-proxima bg-gradient-to-br from-violet-900 via-neutral-900 to-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative flex flex-col items-center text-center py-24 px-6 md:px-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Webdesign, das <span className="text-violet-400">begeistert</span>.
        </h1>
        <p className="text-lg md:text-xl max-w-3xl text-neutral-300">
          Klare Strukturen, modernes Design und Performance, die konvertiert – für deine Marke.
        </p>
      </section>

      {/* Pakete */}
      <section className="px-6 md:px-20 pb-20 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Starter */}
        <div className="bg-neutral-800 rounded-2xl p-8 flex flex-col gap-6 shadow-xl hover:scale-105 transition-transform duration-500">
          <h2 className="text-2xl font-bold">Starter</h2>
          <p className="text-neutral-400">Für den Einstieg</p>
          <p className="text-4xl font-bold">499€</p>
          <ul className="flex flex-col gap-3">
            {['1 Landing Page', 'Responsive Design', 'Basis SEO'].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle className="text-violet-400" /> {t}
              </li>
            ))}
          </ul>
          <CheckoutButton
            priceId="price_WEBDESIGN_STARTER"       // echte Price-ID einsetzen
            service="webdesign"
            pkg="Starter"
            label="Paket wählen"
            className="mt-auto text-center bg-violet-600 hover:bg-violet-500 transition-colors rounded-full px-6 py-3 font-semibold"
            successPath="/success"
            cancelPath="/services/webdesign"
          />
        </div>

        {/* Business (featured) */}
        <div className="bg-violet-700 rounded-2xl p-8 flex flex-col gap-6 shadow-xl hover:scale-105 transition-transform duration-500">
          <h2 className="text-2xl font-bold">Business</h2>
          <p className="text-neutral-200">Für wachsende Unternehmen</p>
          <p className="text-4xl font-bold">999€</p>
          <ul className="flex flex-col gap-3">
            {['Bis 5 Unterseiten', 'Performance Optimierung', 'Erweiterte SEO'].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle className="text-white" /> {t}
              </li>
            ))}
          </ul>
          <CheckoutButton
            priceId="price_WEBDESIGN_BUSINESS"      // echte Price-ID einsetzen
            service="webdesign"
            pkg="Business"
            label="Paket wählen"
            className="mt-auto text-center bg-white text-violet-700 hover:bg-neutral-100 transition-colors rounded-full px-6 py-3 font-semibold"
            successPath="/success"
            cancelPath="/services/webdesign"
          />
        </div>

        {/* Premium */}
        <div className="bg-neutral-800 rounded-2xl p-8 flex flex-col gap-6 shadow-xl hover:scale-105 transition-transform duration-500">
          <h2 className="text-2xl font-bold">Premium</h2>
          <p className="text-neutral-400">Maximale Wirkung</p>
          <p className="text-4xl font-bold">1499€</p>
          <ul className="flex flex-col gap-3">
            {['Bis 10 Unterseiten', 'Individuelles Design', 'CMS Integration'].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle className="text-violet-400" /> {t}
              </li>
            ))}
          </ul>
          <CheckoutButton
            priceId="price_WEBDESIGN_PREMIUM"        // echte Price-ID einsetzen
            service="webdesign"
            pkg="Premium"
            label="Paket wählen"
            className="mt-auto text-center bg-violet-600 hover:bg-violet-500 transition-colors rounded-full px-6 py-3 font-semibold"
            successPath="/success"
            cancelPath="/services/webdesign"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-20 pb-20 text-center flex flex-col gap-6 items-center">
        <h2 className="text-3xl md:text-5xl font-bold">Bereit für deine neue Website?</h2>
        <p className="text-neutral-300 max-w-2xl">Buche dein Paket oder vereinbare direkt einen Termin mit uns.</p>
        <Link href="/request" className="bg-violet-600 hover:bg-violet-500 transition-colors rounded-full px-8 py-4 font-semibold">
          Termin vereinbaren
        </Link>
      </section>

      <Footer />
    </div>
  );
}
