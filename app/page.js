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
              <Sparkles size={16} /> Klar strukturierte digitale Projekte
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
              <span className="block">Digitale Projekte,</span>
              <span className="block text-indigo-300">die zuverlässig umgesetzt werden.</span>
            </h1>

            <p className="max-w-2xl text-base md:text-xl text-neutral-300 leading-relaxed">
              Ich unterstütze bei Websites, Automatisierungen und digitalen Abläufen. Mir ist wichtig, dass Ziel, Umfang
              und Ablauf von Anfang an klar sind und dass du dich auf die Umsetzung verlassen kannst.
            </p>

            {/* CTA */}
            <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <Link
                href="/request"
                className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center justify-center gap-2"
              >
                Projekt anfragen <ArrowRight size={18} />
              </Link>

              <Link
                href="/contact"
                className="px-6 py-3 rounded-full border border-white/15 hover:border-white/30 bg-white/5 transition-colors font-semibold inline-flex items-center justify-center gap-2"
              >
                Kurz schildern, worum es geht <ArrowRight size={18} />
              </Link>
            </div>

            {/* Trust pills */}
            <div className="mt-1 flex flex-wrap items-center justify-center gap-2">
              <Pill icon={<Timer size={14} />}>Klare Struktur</Pill>
              <Pill icon={<ShieldCheck size={14} />}>Verlässlicher Ablauf</Pill>
              <Pill icon={<LineChart size={14} />}>Saubere Übergabe</Pill>
            </div>
          </div>
        </div>
      </section>

      {/* WAS DU BEKOMMST */}
      <section className="px-5 md:px-16 pb-10 md:pb-14">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Was du bekommst</h2>
            <p className="text-sm md:text-base text-neutral-400 max-w-xl">
              Keine Textwände. Ein klarer Überblick, was möglich ist und wie es am Ende aussieht.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Card
              icon={<LayoutTemplate size={18} />}
              title="Landingpage / Website"
              desc="Übersichtlich aufgebaut, technisch sauber umgesetzt und so strukturiert, dass Besucher schnell verstehen, worum es geht."
            />
            <Card
              icon={<FormInput size={18} />}
              title="Formulare & Automatisierungen"
              desc="Digitale Abläufe, die im Alltag funktionieren und nicht ständig nachgebessert werden müssen."
            />
            <Card
              icon={<CreditCard size={18} />}
              title="Zahlungswege & QR-Codes"
              desc="Einfache und nachvollziehbare Wege für Spenden, Buchungen oder Zahlungen, passend zu deinem Ablauf."
            />
            <Card
              icon={<ImageIcon size={18} />}
              title="Medien"
              desc="Wenn sinnvoll ergänze ich die Umsetzung durch Design, Foto oder Video, damit alles zusammenpasst."
            />
          </div>

          <div className="mt-6 flex items-start gap-2 text-sm text-neutral-400">
            <CheckCircle2 className="shrink-0 text-emerald-400" size={18} />
            <p>
              Ich arbeite projektbasiert. Umfang und Ablauf werden vorab festgelegt. So bleibt es übersichtlich und
              planbar.
            </p>
          </div>
        </div>
      </section>

      {/* REALISTISCHE ERWARTUNGEN */}
      <section className="px-5 md:px-16 pb-10 md:pb-14">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <h2 className="text-xl md:text-2xl font-semibold">So läuft es normalerweise</h2>
              <p className="text-sm md:text-base text-neutral-400 max-w-xl">
                Damit du planen kannst und weißt, was dich erwartet.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
              <Stat value="3–10" label="Tage bis live" />
              <Stat value="1–2" label="Feedback-Runden" />
              <Stat value="24h" label="Antwortzeit (Mo–Fr)" />
              <Stat value="20–30" label="Minuten für Einschätzung" />
            </div>
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section className="px-5 md:px-16 pb-14 md:pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Beispiele aus Projekten</h2>
            <p className="text-sm md:text-base text-neutral-400 max-w-xl">
              Du kannst dir anschauen, wie ich arbeite, bevor du entscheidest.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <VisualCard
              eyebrow="Portfolio"
              title="So sieht der Standard aus"
              desc="Struktur, Tempo und Übergabe sind mir wichtig. Du sollst vorher wissen, woran du bist."
              bullets={[
                'Klare Nutzerführung und saubere Struktur',
                'Mobile-first umgesetzt',
                'Übergabe nachvollziehbar und ordentlich',
              ]}
              ctaHref="/portfolio"
              ctaLabel="Portfolio öffnen"
            />

            <VisualCard
              eyebrow="Kurz starten"
              title="Drei Infos reichen"
              desc="Schick mir kurz Ziel, Deadline und Stand. Dann kann ich dir sagen, ob es passt und wie wir sinnvoll starten."
              bullets={[
                'Ziel: Was soll am Ende passieren?',
                'Deadline: Bis wann muss es stehen?',
                'Stand: Was gibt es schon?',
              ]}
              ctaHref="/contact"
              ctaLabel="Kurz anfragen"
            />
          </div>

          {/* Final CTA */}
          <div className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-6 md:p-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold">Wenn du Klarheit willst</h3>
            <p className="mt-3 text-neutral-300 max-w-2xl mx-auto">
              Ich sage dir ehrlich, ob es passt. Wenn ja, bekommst du eine klare Einschätzung, wie der Ablauf aussieht
              und was der nächste Schritt ist.
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
