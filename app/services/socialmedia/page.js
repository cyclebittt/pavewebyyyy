'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Crown,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';

const PACKS = [
  {
    id: 'starter',
    title: 'Starter',
    subtitle: 'Zum reinschnuppern',
    reels: 2,
    posts: 1,
    extras: [
      { label: 'Content Production', included: false },
      { label: 'Redaktionsplanung', included: false },
    ],
    price: '59€ / Woche',
    highlight: null,
  },
  {
    id: 'impact',
    title: 'Impact',
    subtitle: 'Ideal für konstante Präsenz',
    reels: 3,
    posts: 3,
    extras: [
      { label: 'Content Production', included: true },
      { label: 'Redaktionsplanung', included: true },
    ],
    price: '109€ / Woche',
    highlight: null,
  },
  {
    id: 'visibility-plus',
    title: 'Visibility+',
    subtitle: 'Unser Bestseller',
    reels: 5,
    posts: 3,
    extras: [
      { label: 'Content Production', included: true },
      { label: 'Redaktionsplanung', included: true },
    ],
    price: 'nur 155€ / Woche',
    badge: 'Spare über 40%',
    highlight: 'bestseller',
  },
  {
    id: 'growth-plus',
    title: 'Growth+',
    subtitle: 'Für klare Wachstumsversion',
    reels: 7,
    posts: 6,
    extras: [
      { label: 'Content Production', included: true },
      { label: 'Redaktionsplanung', included: true },
    ],
    price: 'nur 259€ / Woche',
    highlight: null,
  },
];

const calendlyBase =
  'https://calendly.com/leonseitz-paveconsultings/30min?hide_gdpr_banner=1&primary_color=8133f1';

export default function SocialMediaPackages() {
  const [selected, setSelected] = useState('visibility-plus');

  return (
    <div className="font-proxima min-h-screen bg-[#0b0c10] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(94,60,255,0.35),transparent_60%),radial-gradient(1000px_600px_at_110%_10%,rgba(16,132,255,0.25),transparent_55%),linear-gradient(135deg,#0b0c10, #0b0c10_40%)]"></div>

        <div className="px-5 md:px-20 pt-16 pb-10 md:pt-24 md:pb-16">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-sm text-violet-300/90 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full mb-5">
              <Sparkles size={16} />
              Social Media Management
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Maximiere deine <span className="text-violet-300">Sichtbarkeit</span> –  
              mit dem Paket, das zu dir passt.
            </h1>
            <p className="mt-5 text-neutral-300 max-w-2xl">
              Klare Pakete, echte Ergebnisse: Reels, Posts, Produktion und Planung – modular und
              skalierbar. Wähle dein Level und leg los.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a
                href={`${calendlyBase}&utm_content=paket_unklar`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors"
              >
                Termin vereinbaren <ArrowRight size={18} />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-700 hover:border-neutral-500 text-neutral-200"
              >
                Frage stellen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pakete */}
      <section className="px-5 md:px-20 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {PACKS.map((p) => {
            const active = selected === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelected(p.id)}
                className={[
                  'group relative text-left rounded-3xl p-6 md:p-7',
                  'bg-gradient-to-b from-[#171923] to-[#0e1016] border',
                  active
                    ? 'border-violet-400/40 ring-2 ring-violet-500/30'
                    : 'border-white/10 hover:border-white/20',
                  'transition-all'
                ].join(' ')}
              >
                {/* Highlight */}
                {p.highlight === 'bestseller' && (
                  <div className="absolute -top-3 left-6 inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-400 text-neutral-900 shadow">
                    <Crown size={14} /> Bestseller
                  </div>
                )}

                <div className="mb-4">
                  <p className="text-neutral-400">{p.subtitle}</p>
                  <h3 className="text-2xl font-bold">{p.title}</h3>
                </div>

                <div className="space-y-3">
                  <Row label="Reels" value={`${p.reels} Reels`} />
                  <Row label="Posts" value={`${p.posts} Posts`} />
                  {p.extras.map((e) => (
                    <div key={e.label} className="flex items-center gap-2">
                      {e.included ? (
                        <CheckCircle2 className="text-emerald-400" size={18} />
                      ) : (
                        <XCircle className="text-rose-400/80" size={18} />
                      )}
                      <span className={e.included ? 'text-neutral-200' : 'text-neutral-400'}>
                        {e.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="mt-6">
                  <div
                    className={[
                      'inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold',
                      p.highlight === 'bestseller'
                        ? 'bg-amber-400 text-neutral-900'
                        : 'bg-white/10 text-white'
                    ].join(' ')}
                  >
                    {p.price}
                  </div>
                  {p.badge && (
                    <div className="mt-1 text-xs text-neutral-400">{p.badge}</div>
                  )}
                </div>

                {/* CTA */}
                <a
                  href={`${calendlyBase}&utm_content=${encodeURIComponent(p.id)}`}
                  className={[
                    'mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-medium',
                    active
                      ? 'bg-violet-600 hover:bg-violet-500'
                      : 'bg-neutral-800 hover:bg-neutral-700',
                    'transition-colors'
                  ].join(' ')}
                >
                  Paket auswählen <ArrowRight size={18} />
                </a>

                {/* Glow */}
                <div
                  className={[
                    'pointer-events-none absolute -inset-px rounded-3xl',
                    'opacity-0 group-hover:opacity-100 transition-opacity',
                    'bg-[radial-gradient(240px_120px_at_50%_0%,rgba(129,51,241,0.25),transparent)]'
                  ].join(' ')}
                />
              </button>
            );
          })}
        </div>

        {/* Hinweis */}
        <p className="mt-6 text-center text-sm text-neutral-400">
          *Alle Pakete inkl. Publishing, Captions & Hashtags monatlich.
        </p>
      </section>

      {/* CTA Section */}
      <section className="px-5 md:px-20 pb-20">
        <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 bg-[radial-gradient(600px_300px_at_10%_-20%,rgba(129,51,241,0.25),transparent),radial-gradient(500px_300px_at_110%_120%,rgba(56,189,248,0.18),transparent),linear-gradient(135deg,#12131a,#0b0c10)] border border-white/10">
          <div className="max-w-3xl">
            <h3 className="text-2xl md:text-3xl font-semibold">
              Bereit, loszulegen?
            </h3>
            <p className="mt-2 text-neutral-300">
              Kurzer Kennenlern-Call, klare Ziele, nächster Schritt – unkompliziert & verbindlich.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={`${calendlyBase}&utm_content=cta_unten`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors"
              >
                Termin anfragen <ArrowRight size={18} />
              </a>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-700 hover:border-neutral-500 text-neutral-200"
              >
                Mehr über paveo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between text-neutral-300 border-b border-white/5 pb-2">
      <span className="text-neutral-400">{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );
}
