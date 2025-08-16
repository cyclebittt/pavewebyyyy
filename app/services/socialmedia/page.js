'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Check } from 'lucide-react';

const perks = {
  starter: [
    '2 Kanäle betreut',
    '8 Posts / Monat (Mix aus Reels & Posts)',
    'Grundlegende Grafiken & Copy',
    'Monatliches Reporting',
  ],
  visibility: [
    '3 Kanäle betreut',
    '16 Posts / Monat (Reels, Posts, Stories)',
    'Professionelles Design & Editing',
    'Community Management (Basic)',
    'Zweiwöchentliches Reporting',
  ],
  growth: [
    '5 Kanäle betreut',
    '30+ Posts / Monat (Content-Engine)',
    'Premium Design, Video & Motion',
    'Community Management (intensiv)',
    'Wöchentliches Reporting + Strategie-Call',
  ],
};

function Card({ title, price, lines, highlight = false, badge }) {
  return (
    <div
      className={[
        'relative rounded-2xl p-6 md:p-8 border backdrop-blur-md',
        'transition hover:scale-[1.01]',
        highlight
          ? 'bg-[linear-gradient(140deg,#1b1630_0%,#11121a_60%)] border-white/15 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_20px_60px_-20px_rgba(124,77,255,.5)]'
          : 'bg-[linear-gradient(140deg,#151523_0%,#0f1016_60%)] border-white/10 shadow-[0_10px_40px_-18px_rgba(0,0,0,.6)]',
      ].join(' ')}
    >
      {badge && (
        <span className="absolute -top-3 left-6 px-3 py-1 text-xs font-semibold rounded-full bg-violet-600/80 text-white border border-white/10 shadow">
          {badge}
        </span>
      )}

      <div className="flex items-baseline justify-between">
        <h3 className="text-xl md:text-2xl font-bold text-white">{title}</h3>
        <div className="text-right">
          <div className="text-2xl md:text-3xl font-extrabold text-white">
            {price}
          </div>
          <div className="text-xs text-neutral-400">pro Monat, kündbar</div>
        </div>
      </div>

      <hr className="my-5 border-white/10" />

      <ul className="flex flex-col gap-3">
        {lines.map((l) => (
          <li key={l} className="flex items-start gap-3 text-neutral-200">
            <span className="mt-[2px] inline-flex items-center justify-center rounded-full bg-violet-500/20 text-violet-300 border border-violet-400/30 p-1">
              <Check size={14} />
            </span>
            <span>{l}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Link
          href="/request"
          className={[
            'inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 font-semibold',
            'transition',
            highlight
              ? 'bg-violet-600 text-white border border-violet-500 hover:brightness-110'
              : 'border border-white/15 text-neutral-100 hover:bg-white/5',
          ].join(' ')}
        >
          Paket auswählen
        </Link>
      </div>
    </div>
  );
}

export default function SocialMedia() {
  return (
    <div className="font-proxima min-h-screen text-neutral-200 bg-[radial-gradient(1000px_600px_at_10%_-10%,#1c1733_0%,#0b0c0f_55%),radial-gradient(900px_600px_at_110%_-20%,#132038_0%,transparent_60%),linear-gradient(180deg,#0b0c0f_0%,#0a0a0e_100%)]">
      <Navbar />

      {/* HERO  */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-10%] top-[-20%] h-72 w-72 rounded-full bg-violet-700/20 blur-3xl" />
          <div className="absolute right-[-10%] top-[-10%] h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl" />
        </div>

        <div className="px-5 md:px-20 py-16 md:py-24 relative">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 text-xs md:text-sm px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300">
              Social Media
            </span>

            <h1 className="mt-5 text-4xl md:text-6xl font-extrabold leading-tight text-white">
              Sichtbarkeit, die wächst.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-indigo-300 to-blue-300">
                Pakete mit System.
              </span>
            </h1>

            <p className="mt-5 text-neutral-300 max-w-2xl">
              Produziert. Geplant. Gemessen. Wir bauen dir eine schlanke Social-Engine,
              die Reichweite in Leads und Kunden verwandelt.
            </p>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="px-5 md:px-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Starter" price="299€" lines={perks.starter} />
          <Card
            title="Visibility+"
            price="499€"
            lines={perks.visibility}
            highlight
            badge="Bestseller"
          />
          <Card title="Growth+" price="799€" lines={perks.growth} />
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-center gap-4">
          <p className="text-neutral-400 text-sm">
            Alle Pakete inkl. Publishing, Captions & Hashtags. Monatlich kündbar.
          </p>
          <div className="h-px flex-1 bg-white/10 md:ml-6" />
        </div>
      </section>

      {/* CTA Foot */}
      <section className="px-5 md:px-20 pb-24">
        <div className="rounded-3xl p-8 md:p-12 border border-white/10 bg-[linear-gradient(160deg,rgba(40,32,72,.6),rgba(18,18,26,.6))] backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Bereit, loszulegen?
            </h2>
            <p className="text-neutral-300 mt-2">
              Kurzer Kennenlern-Call, klare Ziele, nächster Schritt — unkompliziert & verbindlich.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/request"
              className="px-5 py-2.5 rounded-full bg-violet-600 text-white font-semibold border border-violet-500 hover:brightness-110 transition"
            >
              Termin anfragen
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-full border border-white/15 text-neutral-100 hover:bg-white/5 transition"
            >
              Kontakt
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
