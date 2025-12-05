'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, Sparkles, LayoutTemplate, CheckCircle2 } from 'lucide-react';

export default function LandingpagesPage() {
  return (
    <div className="font-proxima bg-[#0B0B0F] text-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />
        <div className="relative max-w-4xl mx-auto px-5 md:px-16 pt-20 md:pt-24 pb-12 md:pb-16">
          <span className="inline-flex items-center gap-2 text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
            <Sparkles size={16} /> Service · Projekt-Landingpages
          </span>
          <h1 className="mt-6 text-3xl md:text-5xl font-extrabold tracking-tight">
            Landingpages für Aktionen, Spenden & Events.
          </h1>
          <p className="mt-4 text-lg text-neutral-300">
            Eine Seite, ein klares Ziel: informieren, Vertrauen aufbauen und Menschen zu einer konkreten Handlung führen –
            z. B. spenden, sich anmelden oder Rückmeldung geben.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Badge>Spendenaktionen</Badge>
            <Badge>Events & Anmeldungen</Badge>
            <Badge>Projekt-Vorstellung</Badge>
          </div>
        </div>
      </section>

      {/* WAS ENTHÄLT DIE LEISTUNG? */}
      <section className="px-5 md:px-16 pb-10 md:pb-14">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            icon={<LayoutTemplate size={20} />}
            title="Struktur & Story"
            text="Gemeinsam klären wir, welche Inhalte wirklich wichtig sind: Hintergrund, Ziel, Ablauf, FAQ, Kontakt."
          />
          <Card
            icon={<CheckCircle2 size={20} />}
            title="Klarer Call-to-Action"
            text="Ob Spende, Anmeldung oder Anfrage – die Seite führt Schritt für Schritt zu einer konkreten Aktion."
          />
          <Card
            icon={<Sparkles size={20} />}
            title="Sauberes Design"
            text="Aufgeräumte Gestaltung, mobil nutzbar und verständlich – ohne überladen zu wirken."
          />
        </div>
      </section>

      {/* ABLAUF */}
      <section className="px-5 md:px-16 pb-16 md:pb-20">
        <div className="max-w-5xl mx-auto rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Wie läuft ein Landingpage-Projekt ab?</h2>
          <ol className="space-y-3 text-neutral-200 text-sm md:text-base list-decimal list-inside">
            <li>
              <strong>Kurzes Briefing:</strong> Worum geht es, wer soll erreicht werden, was ist das Ziel der Seite?
            </li>
            <li>
              <strong>Struktur-Vorschlag:</strong> Aufbau, Sektionen und grobe Texte werden abgestimmt.
            </li>
            <li>
              <strong>Umsetzung:</strong> Gestaltung, technische Umsetzung und Einbau von Formularen oder Zahlungswegen.
            </li>
            <li>
              <strong>Feinschliff & Übergabe:</strong> Letzte Anpassungen, Erklärung, wie ihr Inhalte später aktualisieren könnt.
            </li>
          </ol>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-neutral-300">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
              <CheckCircle2 size={16} className="text-emerald-400" /> Fokussiert auf eine Aktion
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
              <CheckCircle2 size={16} className="text-emerald-400" /> Gut mit anderen Modulen kombinierbar
            </span>
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

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs md:text-sm text-indigo-200">
      {children}
    </span>
  );
}
