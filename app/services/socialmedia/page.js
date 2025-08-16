'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Check } from 'lucide-react'

export default function SocialMediaPage() {
  const packages = [
    {
      name: 'Starter',
      price: '299€',
      description: 'Ideal für kleine Unternehmen oder Einsteiger im Social Media Marketing.',
      features: [
        '2 Social Media Kanäle',
        '8 Posts pro Monat',
        'Grundlegende Grafiken',
        'Monatliches Reporting'
      ],
      highlight: false,
    },
    {
      name: 'Visibility+',
      price: '499€',
      description: 'Unser Bestseller: Mehr Reichweite, mehr Engagement, mehr Sichtbarkeit.',
      features: [
        '3 Social Media Kanäle',
        '16 Posts pro Monat',
        'Professionelles Design',
        'Community Management (Basis)',
        'Zweiwöchentliches Reporting'
      ],
      highlight: true,
    },
    {
      name: 'Growth+',
      price: '799€',
      description: 'Perfekt für Marken, die Social Media als Wachstumsmotor nutzen wollen.',
      features: [
        '5 Social Media Kanäle',
        '30+ Posts pro Monat',
        'Premium Design & Videos',
        'Community Management (Intensiv)',
        'Wöchentliches Reporting & Strategie-Calls'
      ],
      highlight: false,
    },
  ]

  return (
    <div className="font-proxima">
      <Navbar />

      {/* Hero */}
      <div className="px-5 py-16 md:py-24 bg-gradient-to-br from-violet-800 via-violet-600 to-indigo-700 text-white text-center">
        <h1 className="text-3xl md:text-5xl font-bold">Social Media Management</h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
          Wähle dein passendes Paket und lass uns deine Reichweite und Sichtbarkeit maximieren.
        </p>
      </div>

      {/* Packages */}
      <div className="px-5 md:px-20 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        {packages.map((pkg, idx) => (
          <div
            key={idx}
            className={`relative rounded-3xl border transition-transform hover:scale-[1.02] shadow-lg flex flex-col p-8 ${
              pkg.highlight
                ? 'bg-violet-700 text-white border-violet-700 scale-[1.05]'
                : 'bg-white text-neutral-800 border-neutral-200'
            }`}
          >
            {pkg.highlight && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold shadow-md">
                Bestseller
              </span>
            )}
            <h3 className="text-2xl font-bold">{pkg.name}</h3>
            <p className="mt-2 text-lg">{pkg.price} / Monat</p>
            <p className={`mt-4 text-sm ${pkg.highlight ? 'text-violet-100' : 'text-neutral-600'}`}>
              {pkg.description}
            </p>

            <ul className="mt-6 flex-1 flex flex-col gap-3">
              {pkg.features.map((feature, fidx) => (
                <li key={fidx} className="flex items-start gap-2">
                  <Check
                    className={`min-w-[20px] ${
                      pkg.highlight ? 'text-green-300' : 'text-violet-600'
                    }`}
                    size={20}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`mt-8 w-full px-4 py-3 rounded-full font-semibold border-2 relative overflow-hidden group transition-all duration-500 ${
                pkg.highlight
                  ? 'bg-white text-violet-700 border-white hover:bg-violet-100'
                  : 'bg-violet-700 text-white border-violet-700 hover:bg-violet-800'
              }`}
            >
              Paket auswählen
            </button>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  )
}

