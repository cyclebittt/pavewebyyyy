'use client';

import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  LayoutTemplate,
  CreditCard,
  FormInput,
  Image as ImageIcon,
  ShieldCheck,
  Timer,
  LineChart,
  Zap,
} from 'lucide-react';

function Pill({ icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs md:text-sm text-white/80">
      <span className="text-emerald-400">{icon}</span>
      {children}
    </span>
  );
}

function Card({ icon, title, desc }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-6">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-indigo-300">
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="text-base md:text-lg font-semibold leading-snug">{title}</h3>
          <p className="mt-1 text-sm md:text-base text-neutral-300 leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-6">
      <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-indigo-200">{value}</div>
      <div className="mt-1 text-sm md:text-base text-neutral-300">{label}</div>
    </div>
  );
}

function VisualCard({ eyebrow, title, desc, bullets, ctaHref, ctaLabel }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6 md:p-8">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
        <Zap size={14} className="text-indigo-300" />
        {eyebrow}
      </div>

      <h3 className="mt-4 text-xl md:text-2xl font-semibold leading-tight">{title}</h3>
      <p className="mt-3 text-sm md:text-base text-neutral-300 leading-relaxed">{desc}</p>

      <ul className="mt-5 space-y-2 text-sm md:text-base text-neutral-200">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />
            <span className="text-neutral-200">{b}</span>
          </li>
        ))}
      </ul>

      {ctaHref && ctaLabel && (
        <div className="mt-6">
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 text-indigo-300 hover:text-indigo-200 font-semibold"
          >
            {ctaLabel} <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className="font-proxima bg-[#0B0B0F] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />
        <div className="pointer-events-none absolute -top-28 -left-24 h-[26rem] w-[40rem] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="pointer-events-none absolute top-1/3 -right-24 h-[26rem] w-[40rem] rounded-full bg-blue-500/20 blur-[120px]" />

        <div className="relative px-5 md:px-16 pt-16 md:pt-24 pb-10 md:pb-16 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center gap-6">
            <span className="inline-flex items-center gap-2 text-xs md:text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
              <Sparkles size={16} /> Klar begrenzte digitale Projekte
            </span>

            {/* 2 Zeilen */}
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
              <span className="block">Ein digitales Projekt?</span>
              <span className="block text-indigo-300">Dann bist du hier richtig.</span>
            </h1>

            {/* Ultra-klar, scanbar */}
            <p className="max-w-2xl text-base md:text-xl text-neutral-300 leading-relaxed">
              Websites, (Motion-) Designs, Video- & Fotobearbeitung, qualitative Preproduction (auch mit Drohnenaufnahmen)
              Sauber, schnell, verständlich.
            </p>

            {/* CTA */}
            <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <Link
                href="/request"
                className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center justify-center gap-2"
              >
                Termin vereinbaren <ArrowRight size={18} />
              </Link>

              <Link
                href="/contact"
                className="px-6 py-3 rounded-full border border-white/15 hover:border-white/30 bg-white/5 transition-colors font-semibold inline-flex items-center justify-center gap-2"
              >
                Kurz anfragen <ArrowRight size={18} />
              </Link>
            </div>

            {/* Trust pills */}
            <div className="mt-1 flex flex-wrap items-center justify-center gap-2">
              <Pill icon={<Timer size={14} />}>Klarer Zeitrahmen</Pill>
              <Pill icon={<ShieldCheck size={14} />}>Saubere Übergabe</Pill>
              <Pill icon={<LineChart size={14} />}>Fokus auf Wirkung</Pill>
            </div>
          </div>
        </div>
      </section>

      {/* WAS DU BEKOMMST (nicht klickbar) */}
      <section className="px-5 md:px-16 pb-10 md:pb-14">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Was du bekommst</h2>
            <p className="text-sm md:text-base text-neutral-400 max-w-xl">
              Kurz erklärt, schnell verstanden. Keine Textwände.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Card
              icon={<LayoutTemplate size={18} />}
              title="Landingpage / Website"
              desc="Klare Struktur, schneller Überblick: Ready innerhalb weniger Tage"
            />
            <Card
              icon={<FormInput size={18} />}
              title="Formulare & Automatisierungen"
              desc="Wiederkehrende Prozesse automatisiert und digitalisiert: Simpel, zuverlässig, sauber umgesetzt."
            />
            <Card
              icon={<CreditCard size={18} />}
              title="Zahlungswege & QR-Codes"
              desc="QR-Codes, CTAs, clevere Verlinkungen: Damit Menschen es einfacher haben, deinen Service zu bezahlen"
            />
            <Card
              icon={<ImageIcon size={18} />}
              title="Medien"
              desc="Fotos, Videos, Designs: Um deiner Vision ein Gesicht und Aufmerksamkeit auf Social Media zu schenken"
            />
          </div>

          <div className="mt-6 flex items-start gap-2 text-sm text-neutral-400">
            <CheckCircle2 className="shrink-0 text-emerald-400" size={18} />
            <p>
              Fokus auf Projekte mit Anfang & Ende – keine laufenden Pakete, kein „immer wieder kurz was ändern“ ohne Rahmen.
            </p>
          </div>
        </div>
      </section>

      {/* STATISTIKEN (realistisch, ohne „Fake-Claims“) */}
      <section className="px-5 md:px-16 pb-10 md:pb-14">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <h2 className="text-xl md:text-2xl font-semibold">Was realistisch ist</h2>
              <p className="text-sm md:text-base text-neutral-400 max-w-xl">
                Damit Erwartungen sauber bleiben.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
              <Stat value="3–10" label="Tage: starke Landingpage" />
              <Stat value="1–2" label="Feedback-Runden (max.)" />
              <Stat value="24h" label="Antwort innerhalb" />
              <Stat value="20–30" label="Min. für Einschätzung" />
            </div>
          </div>
        </div>
      </section>

      {/* PROOF (ohne Bilder) */}
      <section className="px-5 md:px-16 pb-14 md:pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Proof statt Versprechen</h2>
            <p className="text-sm md:text-base text-neutral-400 max-w-xl">
              Du willst Klarheit? Dann zeig mir Ziel + Deadline + Stand.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <VisualCard
              eyebrow="Portfolio"
              title="Ein Projekt – sauber umgesetzt"
              desc="Ich zeige lieber, wie ich arbeite, als es auszuschmücken."
              bullets={[
                'Klare Story: worum geht’s, warum zählt’s, was ist der nächste Schritt?',
                'Zahlungsweg / Formular so einfach wie möglich',
                'Mobile-first Struktur, damit’s auf dem Handy sofort funktioniert',
              ]}
              ctaHref="/portfolio"
              ctaLabel="Portfolio öffnen"
            />

            <VisualCard
              eyebrow="Start in 3 Sätzen"
              title="Schick mir 3 Stichpunkte"
              desc="Wenn du mir das schickst, kann ich dir meist sofort sagen, ob es realistisch ist und wie wir starten."
              bullets={[
                'Ziel (was soll passieren?)',
                'Deadline (bis wann?)',
                'Stand (was gibt’s schon?)',
              ]}
              ctaHref="/contact"
              ctaLabel="Kurz anfragen"
            />
          </div>

          {/* Final CTA */}
          <div className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-6 md:p-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold">Bereit für Klarheit?</h3>
            <p className="mt-3 text-neutral-300 max-w-2xl mx-auto">
              Ich sag dir ehrlich, ob es passt. Wenn ja, auch wie wir’s sauber umsetzen.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/request"
                className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center justify-center gap-2"
              >
                Termin vereinbaren <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full border border-white/15 hover:border-white/30 bg-white/5 transition-colors font-semibold inline-flex items-center justify-center gap-2"
              >
                Kontakt <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
