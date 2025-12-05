'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, BarChart3, Activity, CheckCircle2 } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="font-proxima bg-[#0B0B0F] text-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />
        <div className="relative max-w-4xl mx-auto px-5 md:px-16 pt-20 md:pt-24 pb-12 md:pb-16">
          <span className="inline-flex items-center gap-2 text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
            <BarChart3 size={16} /> Service · Struktur & Auswertung
          </span>
          <h1 className="mt-6 text-3xl md:text-5xl font-extrabold tracking-tight">
            Verstehen, was eure Seite wirklich bringt.
          </h1>
          <p className="mt-4 text-lg text-neutral-300">
            Nicht jedes Projekt braucht ein riesiges Dashboard – aber ein paar klare Zahlen helfen, Entscheidungen zu
            treffen. Ich unterstütze dabei, einfach sichtbar zu machen, was gut funktioniert und wo man nachschärfen kann.
          </p>
        </div>
      </section>

      {/* INHALT */}
      <section className="px-5 md:px-16 pb-16 md:pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            icon={<BarChart3 size={20} />}
            title="Einfache Kennzahlen"
            text="Wie viele Menschen landen auf der Seite? Woher kommen sie? Wie viele führen die gewünschte Aktion aus?"
          />
          <Card
            icon={<Activity size={20} />}
            title="Pragmatische Auswertung"
            text="Fokus auf ein paar zentrale Fragen – statt sich in Details zu verlieren, die niemand nutzt."
          />
          <Card
            icon={<CheckCircle2 size={20} />}
            title="Konkrete Konsequenzen"
            text="Gemeinsam schauen wir, was sich aus den Zahlen ableiten lässt: Inhalte anpassen, Wege verkürzen oder Formulare vereinfachen."
          />
        </div>

        <div className="max-w-5xl mx-auto mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Wie läuft das ab?</h2>
          <ol className="space-y-3 text-neutral-200 text-sm md:text-base list-decimal list-inside">
            <li>
              <strong>Fragen definieren:</strong> Was wollt ihr eigentlich wissen? Worin wollt ihr euch verbessern?
            </li>
            <li>
              <strong>Technik einrichten:</strong> Auswahl und Einrichtung der passenden, schlanken Tracking-Lösung.
            </li>
            <li>
              <strong>Beobachten & auswerten:</strong> Nach einem definierten Zeitraum schauen wir gemeinsam auf die Zahlen.
            </li>
            <li>
              <strong>Änderungen ableiten:</strong> Kleine Anpassungen, die direkt spürbar etwas verbessern können.
            </li>
          </ol>

          <div className="mt-8">
            <Link
              href="/request"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold"
            >
              Möglichkeiten besprechen <ArrowRight size={18} />
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

