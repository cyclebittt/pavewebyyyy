'use client';

import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  LayoutTemplate,
  FormInput,
  CreditCard,
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
          <p className="mt-2 text-sm md:text-base text-neutral-300 leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function MiniCard({ title, desc }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
      <h3 className="text-base md:text-lg font-semibold leading-snug">{title}</h3>
      <p className="mt-2 text-sm md:text-base text-neutral-300 leading-relaxed">{desc}</p>
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

function Section({ title, subtitle, children }) {
  return (
    <section className="px-5 md:px-16 py-10 md:py-14">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
          {subtitle ? (
            <p className="text-sm md:text-base text-neutral-400 max-w-xl leading-relaxed">{subtitle}</p>
          ) : null}
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}

function PrimaryCTA() {
  return (
    <Link
      href="/contact"
      className="px-6 py-3 md:px-7 md:py-3.5 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center justify-center gap-2"
    >
      Kurz anfragen <ArrowRight size={18} />
    </Link>
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
              <span className="block">Digitale Umsetzung,</span>
              <span className="block text-indigo-300">auf die du dich verlassen kannst.</span>
            </h1>

            {/* 1 Satz, scanbar, keine Leistungsliste */}
            <p className="max-w-2xl text-base md:text-xl text-neutral-300 leading-relaxed">
              Ich setze Websites und digitale Abläufe so um, dass du am Ende etwas hast, das steht. Ziel, Umfang und
              Ablauf sind von Anfang an klar.
            </p>

            {/* Single CTA */}
            <div className="w-full flex flex-col items-center gap-3">
              <PrimaryCTA />
              <p className="text-sm md:text-base text-neutral-400 max-w-xl">
                Wenn du mir Ziel, Deadline und Stand schickst, bekommst du eine klare Einschätzung, ob es passt und wie
                wir starten.
              </p>
            </div>

            {/* Trust pills */}
            <div className="mt-1 flex flex-wrap items-center justify-center gap-2">
              <Pill icon={<Timer size={14} />}>Klare Schritte</Pill>
              <Pill icon={<ShieldCheck size={14} />}>Saubere Übergabe</Pill>
              <Pill icon={<LineChart size={14} />}>Übersichtlich statt kompliziert</Pill>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF FIRST (weil Leute erst vertrauen, dann lesen sie mehr) */}
      <Section
        title="Was du erwarten kannst"
        subtitle="Kurz und realistisch. Damit du nicht raten musst, wie der Ablauf aussieht."
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat value="3–10" label="Tage bis live (typisch)" />
          <Stat value="1–2" label="Feedback-Runden" />
          <Stat value="24h" label="Antwortzeit (Mo–Fr)" />
          <Stat value="20–30" label="Min. für Einschätzung" />
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="shrink-0 text-emerald-400" size={18} />
            <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
              Ich arbeite projektbasiert. Umfang und Ablauf werden vorab festgelegt. So bleibt es planbar und du landest
              nicht in Endlosschleifen.
            </p>
          </div>
        </div>
      </Section>

      {/* HOW IT WORKS (3 steps, super scanbar) */}
      <Section
        title="So starten wir"
        subtitle="Drei Schritte. Keine langen Calls, kein unnötiges Hin und Her."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <MiniCard
            title="1. Kurz schildern"
            desc="Du schickst mir Ziel, Deadline und Stand. Mehr brauche ich am Anfang nicht."
          />
          <MiniCard
            title="2. Klare Einschätzung"
            desc="Ich sage dir, ob es passt und was sinnvoll ist. Falls es passt, bekommst du einen klaren Ablauf."
          />
          <MiniCard
            title="3. Umsetzung & Übergabe"
            desc="Ich setze es sauber um und übergebe es ordentlich, damit du damit weiterarbeiten kannst."
          />
        </div>

        <div className="mt-6 flex justify-center">
          <PrimaryCTA />
        </div>

        <p className="mt-3 text-center text-sm md:text-base text-neutral-400">
          Termin kommt danach, wenn klar ist, dass es Sinn ergibt.
        </p>
      </Section>

      {/* OFFER (keep short, not “I can do everything”) */}
      <Section
        title="Wobei ich helfen kann"
        subtitle="Das sind die häufigsten Dinge, für die Leute bei mir anfragen."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
            desc="Einfache und nachvollziehbare Wege für Spenden, Buchungen oder Zahlungen."
          />
          <Card
            icon={<ImageIcon size={18} />}
            title="Medien (optional)"
            desc="Wenn sinnvoll ergänze ich die Umsetzung durch Design, Foto oder Video, damit alles zusammenpasst."
          />
        </div>
      </Section>

      {/* PORTFOLIO TEASER (one decision, not a list of many) */}
      <Section
        title="Beispiele"
        subtitle="Wenn du kurz sehen willst, wie ich arbeite, findest du hier Projekte."
      >
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6 md:p-8">
          <h3 className="text-xl md:text-2xl font-semibold leading-tight">Portfolio öffnen</h3>
          <p className="mt-3 text-sm md:text-base text-neutral-300 leading-relaxed max-w-2xl">
            Ich halte die Seite bewusst übersichtlich. Du sollst schnell sehen, wie Struktur, Design und Umsetzung bei
            mir aussehen.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-indigo-300 hover:text-indigo-200 font-semibold"
            >
              Zu den Projekten <ArrowRight size={16} />
            </Link>
            <div className="text-sm text-neutral-400">
              Wenn du direkt starten willst: <Link href="/contact" className="underline hover:text-white">Kurz anfragen</Link>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ (only 4, no essay) */}
      <Section title="Kurz beantwortet" subtitle="Die wichtigsten Fragen, ohne Roman.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <MiniCard
            title="Wie schnell geht das?"
            desc="Je nach Umfang meist innerhalb weniger Tage. Wenn es dringend ist, sag das direkt in der Anfrage."
          />
          <MiniCard
            title="Was brauchst du von mir?"
            desc="Am Anfang reichen Ziel, Deadline und Stand. Inhalte können wir Schritt für Schritt klären."
          />
          <MiniCard
            title="Wie läuft Feedback?"
            desc="Mit klaren Feedback-Runden. So bleibt es planbar und das Projekt zieht sich nicht."
          />
          <MiniCard
            title="Kann ich erst unverbindlich fragen?"
            desc="Ja. Genau dafür ist die Anfrage da. Ich sage dir ehrlich, ob es passt."
          />
        </div>

        <div className="mt-6 flex justify-center">
          <PrimaryCTA />
        </div>
      </Section>

      {/* FINAL CTA */}
      <section className="px-5 md:px-16 pb-14 md:pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-6 md:p-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold">Kurz anfragen</h3>
            <p className="mt-3 text-neutral-300 max-w-2xl mx-auto">
              Schick mir Ziel, Deadline und Stand. Dann bekommst du eine klare Einschätzung, ob es passt und wie wir
              starten.
            </p>
            <div className="mt-6 flex justify-center">
              <PrimaryCTA />
            </div>
            <p className="mt-3 text-sm text-neutral-400">
              Termin kommt danach, wenn klar ist, dass es Sinn ergibt.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
