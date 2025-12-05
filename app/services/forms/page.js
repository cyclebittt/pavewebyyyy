'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, CreditCard, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function FormsPage() {
  return (
    <div className="font-proxima bg-[#0B0B0F] text-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />
        <div className="relative max-w-4xl mx-auto px-5 md:px-16 pt-20 md:pt-24 pb-12 md:pb-16">
          <span className="inline-flex items-center gap-2 text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
            <FileText size={16} /> Service · Formulare & Zahlungswege
          </span>
          <h1 className="mt-6 text-3xl md:text-5xl font-extrabold tracking-tight">
            Formulare & Zahlungswege, die wirklich nutzbar sind.
          </h1>
          <p className="mt-4 text-lg text-neutral-300">
            Anmeldungen, Rückmeldungen oder Spenden sollen nicht im Chaos landen. Ich helfe dabei, Formulare und einfache
            Zahlungswege so aufzusetzen, dass sie zu euren Abläufen passen – technisch stabil und verständlich für alle.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Tag icon={<FileText size={14} />}>Anmelde- & Kontaktformulare</Tag>
            <Tag icon={<CreditCard size={14} />}>Spenden & einfache Payments</Tag>
          </div>
        </div>
      </section>

      {/* DETAILS */}
      <section className="px-5 md:px-16 pb-16 md:pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            icon={<FileText size={20} />}
            title="Klare Formulare"
            text="Felder, die wirklich gebraucht werden, sinnvoll gruppiert. So wenig Pflichtfelder wie möglich, so viel Kontext wie nötig."
          />
          <Card
            icon={<CreditCard size={20} />}
            title="Zahlungswege einbinden"
            text="Anbindung von einfachen Zahlungsoptionen wie z. B. Paypal-Links, SEPA-Infos oder externen Spenden-Tools – passend zu eurer Lösung."
          />
          <Card
            icon={<ShieldCheck size={20} />}
            title="Sorgfältiger Umgang mit Daten"
            text="Formulare werden so geplant, dass klar ist, wer die Daten erhält, wie sie genutzt werden und wo sie gespeichert werden."
          />
        </div>

        {/* Ablauf */}
        <div className="max-w-5xl mx-auto mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Wie läuft ein Formular-/Payment-Projekt ab?</h2>
          <ol className="space-y-3 text-neutral-200 text-sm md:text-base list-decimal list-inside">
            <li>
              <strong>Ist-Stand klären:</strong> Welche Infos braucht ihr wirklich? Wie wird aktuell gesammelt,
              ausgewertet und zurückgemeldet?
            </li>
            <li>
              <strong>Struktur & Tool-Auswahl:</strong> Wir legen gemeinsam fest, wie das Formular aufgebaut wird
              und welche Zahlungs- oder Versandwege sinnvoll sind.
            </li>
            <li>
              <strong>Umsetzung & Tests:</strong> Technische Einrichtung, Einbettung auf der Seite und Test mit
              echten Szenarien, bevor etwas live geht.
            </li>
            <li>
              <strong>Übergabe & Erklärung:</strong> Kurze Einführung, wie ihr Einträge einsehen und bei Bedarf anpassen
              oder ergänzen könnt.
            </li>
          </ol>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-neutral-300">
            <Badge>
              <CheckCircle2 size={16} className="text-emerald-400" /> Fokussiert auf Alltagstauglichkeit
            </Badge>
            <Badge>
              <CheckCircle2 size={16} className="text-emerald-400" /> Gut kombinierbar mit Landingpages & Kampagnen
            </Badge>
          </div>

          <div className="mt-8">
            <Link
              href="/request"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold"
            >
              Projekt besprechen <ArrowRight size={18} />
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

function Tag({ icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs md:text-sm text-indigo-200">
      {icon}
      {children}
    </span>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
      {children}
    </span>
  );
}
