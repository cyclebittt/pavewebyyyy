'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

const packages = [
  {
    name: 'Starter',
    subtitle: 'Zum reinschnuppern',
    reels: '2 Reels',
    posts: '1 Post',
    extras: [],
    price: '59€/Woche',
    highlight: false,
  },
  {
    name: 'Impact',
    subtitle: 'Ideal für konstante Präsenz',
    reels: '3 Reels',
    posts: '3 Posts',
    extras: ['Content Production', 'Redaktionsplanung'],
    price: '109€/Woche',
    highlight: false,
  },
  {
    name: 'Visibility+',
    subtitle: 'Unser Bestseller',
    reels: '5 Reels',
    posts: '3 Posts',
    extras: [],
    price: 'nur 155€/Woche',
    note: 'Spare über 40%',
    highlight: true,
  },
  {
    name: 'Growth+',
    subtitle: 'Für klare Wachstumsvision',
    reels: '7 Reels',
    posts: '6 Posts',
    extras: [],
    price: 'nur 259€/Woche',
    highlight: false,
  },
];

export default function SocialMediaPage() {
  return (
    <div className="font-proxima bg-gradient-to-b from-neutral-900 via-neutral-950 to-black text-white min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="px-6 md:px-20 py-16 md:py-24 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          Maximiere deine Sichtbarkeit – Mit dem Paket, das zu dir passt
        </h1>
        <p className="text-neutral-300 max-w-2xl mx-auto">
          Wähle das passende Paket für deine Social Media Präsenz. Alle Pakete
          beinhalten Publishing, Captions & Hashtags – monatlich optimiert.
        </p>
      </section>

      {/* Pakete */}
      <section className="px-6 md:px-20 pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`rounded-3xl p-8 flex flex-col items-center gap-6 text-center shadow-xl transition-transform duration-300 hover:scale-105 ${
              pkg.highlight
                ? 'bg-gradient-to-b from-violet-600 to-violet-800 border-2 border-violet-400'
                : 'bg-neutral-800 border border-neutral-700'
            }`}
          >
            <h2 className="text-2xl font-bold">{pkg.name}</h2>
            <p className="text-sm text-neutral-300">{pkg.subtitle}</p>

            <div className="flex flex-col gap-2 mt-4">
              <span>{pkg.reels}</span>
              <span>{pkg.posts}</span>
              {pkg.extras.map((extra, i) => (
                <span key={i}>{extra}</span>
              ))}
            </div>

            <div className="flex flex-col items-center gap-1 mt-6">
              <p className="text-xl font-semibold">{pkg.price}</p>
              {pkg.note && (
                <p className="text-sm font-medium text-yellow-300">{pkg.note}</p>
              )}
            </div>

            <Link href="/request" className="mt-6">
              <button className="px-6 py-3 bg-white text-neutral-900 rounded-full font-semibold transition-all hover:bg-neutral-200">
                Paket auswählen
              </button>
            </Link>
          </div>
        ))}
      </section>

      {/* Calendly CTA */}
      <section className="px-6 md:px-20 py-16 text-center bg-neutral-900">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Bereit für den nächsten Schritt?
        </h2>
        <p className="text-neutral-300 mb-8">
          Buche direkt ein Gespräch mit uns und starte durch mit deiner
          Social-Media-Strategie.
        </p>
        <div className="flex justify-center">
          <iframe
            src="https://calendly.com/YOUR-CALENDLY-LINK"
            width="100%"
            height="600"
            frameBorder="0"
            className="rounded-xl shadow-lg max-w-3xl w-full"
          ></iframe>
        </div>
      </section>

      <Footer />
    </div>
  );
}
