'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { ArrowRight, Brain, BarChart3, Workflow, TrendingDown, ShieldCheck } from 'lucide-react';

function Feature({ icon, title, desc }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-indigo-200">
        {icon}
        <span>{title}</span>
      </div>
      <p className="mt-3 text-neutral-300">{desc}</p>
    </div>
  );
}
function StepCard({ step, title, desc }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="text-sm text-indigo-300 font-semibold">{step}</div>
      <h3 className="mt-2 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-neutral-300">{desc}</p>
    </div>
  );
}
function MiniCase() {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-6">
      <h3 className="text-xl font-semibold">Beispiel – KI‑gestützte Optimierung</h3>
      <ul className="mt-3 list-disc pl-5 text-neutral-300 space-y-2">
        <li>Prognose von Stoßzeiten und Personalplanung</li>
        <li>No‑Show‑Risiko‑Score für Terminerinnerungen</li>
        <li>Priorisierung von Anfragen</li>
      </ul>
      <p className="mt-3 text-neutral-200">
        Ergebnis: Entlastung im Alltag, bessere Planbarkeit und weniger Leerlauf.
      </p>
    </div>
  );
}

export default function KIPage() {
  useEffect(() => { AOS.init({ duration: 600, once: true }); }, []);
  return (
    <div className="font-proxima bg-[#0B0B0F] text-white">
      <Navbar />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />
        <div className="relative px-5 md:px-16 pt-20 md:pt-28 pb-14 md:pb-20 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">KI‑gestützte Optimierung</h1>
          <p className="mt-6 text-lg md:text-xl text-neutral-300">
            Intelligente Prognosen für Auslastung und Patientenströme, No‑Show‑Reduktion und effizientere Teamplanung.
          </p>
        </div>
      </section>

      <section className="px-5 md:px-16 py-8 md:py-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Was Sie erhalten</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Feature icon={<Brain size={16} />} title="Prognosen" desc="Auslastung, Stoßzeiten, Personalbedarf." />
          <Feature icon={<TrendingDown size={16} />} title="No‑Show‑Scores" desc="Gezielte Erinnerungen & Info‑Flows." />
          <Feature icon={<Workflow size={16} />} title="Automatisierung" desc="Workflows zur Priorisierung & Zuweisung." />
          <Feature icon={<BarChart3 size={16} />} title="KPIs & Dashboard" desc="Übersichtliche, praxisnahe Kennzahlen." />
          <Feature icon={<ShieldCheck size={16} />} title="Datenschutz" desc="DSGVO‑konforme Verarbeitung, Pseudonymisierung." />
          <Feature icon={<Brain size={16} />} title="Iteratives Feintuning" desc="Regelmäßige Anpassung an Praxisrealität." />
        </div>
      </section>

      <section className="px-5 md:px-16 py-6 md:py-10">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Ablauf</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StepCard step="01" title="Daten & Ziel" desc="Quellen, Schutz, Zweck & KPIs definieren." />
          <StepCard step="02" title="Modell & Regeln" desc="Scoring/Prognose, Grenzen & Verantwortlichkeiten." />
          <StepCard step="03" title="Integration" desc="Einbettung in Portal/Termine/Analytics." />
          <StepCard step="04" title="Review" desc="Monitoring, Feedback‑Loops, Anpassungen." />
        </div>
      </section>

      <section className="px-5 md:px-16 py-6 md:py-10">
        <MiniCase />
      </section>

      <section className="px-5 md:px-16 py-12 md:py-16 text-center">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10">
          <h3 className="text-3xl font-bold">Mit KI effizienter arbeiten</h3>
          <p className="mt-3 text-neutral-300">Pragmatisch, sicher, verständlich – ohne Hype.</p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/request" className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 font-semibold inline-flex items-center gap-2">
              Termin vereinbaren <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="px-6 py-3 rounded-full border border-white/15 bg-white/5 hover:border-white/30 font-semibold">
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
