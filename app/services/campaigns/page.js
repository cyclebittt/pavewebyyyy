'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, Sparkles, CalendarDays, CheckCircle2 } from 'lucide-react';

export default function CampaignsPage() {
  return (
    <div className="font-proxima bg-[#0B0B0F] text-white min-h-screen">
      <Navbar />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />
        <div className="relative max-w-4xl mx-auto px-5 md:px-16 pt-20 md:pt-24 pb-12 md:pb-16">
          <span className="inline-flex items-center gap-2 text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
            <Sparkles size={16} /> Service · Aktionen & Kampagnen
          </span>
          <h1 className="mt-6 text-3xl md:text-5xl font-extrabold tracking-tight">
            Digitale Kampagnen, die ein klares Zeitfenster haben.
          </h1>
          <p className="mt-4 text-lg text-neutral-300">
            Ob Spendenzeitraum, besondere Aktion oder einmaliges Event – ich helfe dabei, das Ganze digital so
            aufzusetzen, dass Informationen, Abläufe und Kommunikation zusammenpassen.
          </p>
        </div>
      </section>

      <section className="px-5 md:px-16 pb-16 md:pb-20">
        <div className="max-w-5xl mx-auto rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Was gehört typischerweise dazu?</h2>
          <ul className="space-y-2 text-neutral-200 text-sm md:text-base list-disc list-inside">
            <li>Landingpage oder Aktionsseite mit Ziel, Ablauf und Hintergründen</li>
            <li>Klare Wege für Rückmeldungen, Anmeldungen oder Spenden</li>
            <li>Einfach teilbare Links und ggf. QR-Codes für Flyer oder Präsentationen</li>
            <li>Optional: kurze Texte oder Visuals für Newsletter, Aushänge oder interne Kommunikation</li>
          </ul>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-neutral-300">
            <Tag icon={<CalendarDays size={14} />}>Klarer Zeitraum</Tag>
            <Tag icon={<CheckCircle2 size={14} />}>Fokus auf Umsetzbarkeit</Tag>
          </div>

          <div className="mt-8">
            <Link
              href="/request"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold"
            >
              Kampagne besprechen <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Tag({ icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
      <span className="text-indigo-200">{icon}</span>
      {children}
    </span>
  );
}
