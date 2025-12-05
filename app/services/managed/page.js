'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, Settings2, Wrench, CheckCircle2 } from 'lucide-react';

export default function ManagedPage() {
  return (
    <div className="font-proxima bg-[#0B0B0F] text-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />
        <div className="relative max-w-4xl mx-auto px-5 md:px-16 pt-20 md:pt-24 pb-12 md:pb-16">
          <span className="inline-flex items-center gap-2 text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
            <Settings2 size={16} /> Service · Digitales Setup & Betreuung
          </span>
          <h1 className="mt-6 text-3xl md:text-5xl font-extrabold tracking-tight">
            Technik, die läuft – ohne Daueragentur.
          </h1>
          <p className="mt-4 text-lg text-neutral-300">
            Manchmal braucht es jemanden, der das Grundsetup übernimmt, Dinge sauber einrichtet und später bei Bedarf
            kleinere Anpassungen macht – ohne dass daraus direkt ein großes, laufendes Retainer-Modell wird.
          </p>
        </div>
      </section>

      {/* INHALT */}
      <section className="px-5 md:px-16 pb-16 md:pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            icon={<Settings2 size={20} />}
            title="Grundsetup"
            text="Technische Basis für Landingpages, Formulare und Medien – inklusive Verknüpfungen zu euren bestehenden Tools, wo sinnvoll."
          />
          <Card
            icon={<Wrench size={20} />}
            title="Kleine Anpassungen"
            text="Bei Bedarf später nachjustieren: Texte anpassen, Felder ergänzen oder Abläufe leicht verändern."
          />
          <Card
            icon={<CheckCircle2 size={20} />}
            title="Klarer Rahmen"
            text="Transparent, was dazugehört – und was nicht. So bleibt es überschaubar für beide Seiten."
          />
        </div>

        <div className="max-w-5xl mx-auto mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Für wen eignet sich das?</h2>
          <p className="text-neutral-200 text-sm md:text-base">
            Für Teams, die kein eigenes Web-/Tech-Team haben, aber trotzdem eine stabile, verständliche Lösung wollen –
            ohne sich tief in Tools einarbeiten zu müssen. Der Fokus liegt auf wenigen, gut betreuten Setups statt auf
            vielen parallelen Baustellen.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-neutral-300">
            <Badge>
              <CheckCircle2 size={16} className="text-emerald-400" /> Ergänzt die anderen Module
            </Badge>
            <Badge>
              <CheckCircle2 size={16} className="text-emerald-400" /> Keine schwere Dauerverpflichtung
            </Badge>
          </div>

          <div className="mt-8">
            <Link
              href="/request"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold"
            >
              Setup besprechen <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Card({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-violet-300">
        {icon}
      </div>
      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-neutral-300 text-sm md:text-base">{text}</p>
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
      {children}
    </span>
  );
}

