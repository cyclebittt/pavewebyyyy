'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Timer,
  LineChart,
  LayoutTemplate,
  Zap,
  Mail,
  ExternalLink,
} from 'lucide-react';

function Pill({ icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs md:text-sm text-white/80">
      <span className="text-emerald-400">{icon}</span>
      {children}
    </span>
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

function Section({ kicker, title, subtitle, children }) {
  return (
    <section className="px-5 md:px-16 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            {kicker ? (
              <div className="text-xs uppercase tracking-wide text-neutral-400">{kicker}</div>
            ) : null}
            <h2 className="mt-1 text-2xl md:text-4xl font-semibold tracking-tight">{title}</h2>
          </div>
          {subtitle ? (
            <p className="text-sm md:text-base text-neutral-400 max-w-xl leading-relaxed">{subtitle}</p>
          ) : null}
        </div>
        <div className="mt-7">{children}</div>
      </div>
    </section>
  );
}

function PrimaryCTA({ label = 'Kurz anfragen' }) {
  return (
    <Link
      href="/#request"
      className="px-6 py-3 md:px-7 md:py-3.5 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center justify-center gap-2"
    >
      {label} <ArrowRight size={18} />
    </Link>
  );
}

function SmallCard({ icon, title, desc }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-6">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-indigo-300">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-base md:text-lg font-semibold leading-snug">{title}</div>
          <p className="mt-2 text-sm md:text-base text-neutral-300 leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function Step({ n, title, desc }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
      <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 text-indigo-200 font-bold">
        {n}
      </div>
      <div className="mt-3 text-base md:text-lg font-semibold">{title}</div>
      <p className="mt-2 text-sm md:text-base text-neutral-300 leading-relaxed">{desc}</p>
    </div>
  );
}

export default function Home() {
  // Optional: smooth scroll in-page (falls nicht global gesetzt)
  useEffect(() => {
    const handle = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    handle();
    window.addEventListener('hashchange', handle);
    return () => window.removeEventListener('hashchange', handle);
  }, []);

  return (
    <div className="font-proxima bg-[#0B0B0F] text-white">
      <Navbar />

      {/* HERO (groß, wenig Text, ein CTA) */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(129,51,241,.35),transparent_60%),radial-gradient(900px_600px_at_120%_0%,rgba(56,189,248,.20),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_60%,#0B0B0F_100%)]" />
        <div className="pointer-events-none absolute -top-28 -left-24 h-[26rem] w-[40rem] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="pointer-events-none absolute top-1/3 -right-24 h-[26rem] w-[40rem] rounded-full bg-blue-500/20 blur-[120px]" />

        <div className="relative px-5 md:px-16 pt-16 md:pt-24 pb-12 md:pb-20 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center gap-6">
            <span className="inline-flex items-center gap-2 text-xs md:text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
              <Sparkles size={16} /> Planbare digitale Umsetzung
            </span>

            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.03]">
              <span className="block">Ein klares Ergebnis.</span>
              <span className="block text-indigo-300">Keine Endlosschleifen.</span>
            </h1>

            <p className="max-w-2xl text-base md:text-xl text-neutral-300 leading-relaxed">
              Websites, Funnels und digitale Abläufe, die verständlich sind und sauber übergeben werden.
            </p>

            <div className="w-full flex flex-col items-center gap-3">
              <PrimaryCTA />
              <p className="text-sm md:text-base text-neutral-400 max-w-xl">
                Ziel, Deadline, Stand. Mehr brauche ich für die erste Einschätzung nicht.
              </p>
            </div>

            <div className="mt-1 flex flex-wrap items-center justify-center gap-2">
              <Pill icon={<Timer size={14} />}>Klare Schritte</Pill>
              <Pill icon={<ShieldCheck size={14} />}>Saubere Übergabe</Pill>
              <Pill icon={<LineChart size={14} />}>Fokus auf Wirkung</Pill>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF STRIP (groß, scanbar) */}
      <Section
        kicker="Erwartungen"
        title="Kurz: So läuft’s bei mir"
        subtitle="Damit du sofort weißt, wie planbar das Ganze ist."
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat value="3–10" label="Tage bis live (typisch)" />
          <Stat value="1–2" label="Feedback-Runden" />
          <Stat value="24h" label="Antwortzeit (Mo–Fr)" />
          <Stat value="klar" label="Ablauf + Umfang vorher" />
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="shrink-0 text-emerald-400" size={18} />
            <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
              Ich arbeite projektbasiert. Wir definieren Umfang und Deliverables vorab. Dadurch bleibt es schnell,
              sauber und nachvollziehbar.
            </p>
          </div>
        </div>
      </Section>

      {/* ROADMAP / MISSION (psychologisch: warum du so arbeitest) */}
      <Section
        kicker="Mission"
        title="Warum ich das so baue"
        subtitle="Drei Prinzipien, die du im Ergebnis siehst."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <SmallCard
            icon={<Zap size={18} />}
            title="Struktur schlägt Kreativ-Chaos"
            desc="Menschen entscheiden schnell. Gute Nutzerführung und klare Hierarchie sind wichtiger als „mehr Inhalt“."
          />
          <SmallCard
            icon={<ShieldCheck size={18} />}
            title="Übergabe ist Teil der Arbeit"
            desc="Du bekommst nicht nur eine Seite, sondern ein Setup, mit dem du weiterarbeiten kannst (Texte, Assets, Zugriff)."
          />
          <SmallCard
            icon={<Timer size={18} />}
            title="Planbar statt offen-ended"
            desc="Klare Schritte, klare Runden, klarer Output. Damit du nicht abhängig bist und es nicht ausufert."
          />
        </div>

        <div className="mt-8 flex justify-center">
          <PrimaryCTA label="Passt das zu deinem Vorhaben?" />
        </div>
      </Section>

      {/* START / PROCESS (catchy, groß, wenige Wörter) */}
      <Section
        kicker="Roadmap"
        title="In 3 Schritten zum Ergebnis"
        subtitle="Ohne unnötige Meetings. Erst Klarheit, dann Umsetzung."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Step n="1" title="Kurz prüfen" desc="Ziel, Deadline, Stand. Ich sage dir, ob es passt und was sinnvoll ist." />
          <Step n="2" title="Sauber bauen" desc="Design + Umsetzung als System. Nicht „schön“, sondern verständlich." />
          <Step n="3" title="Ordentlich übergeben" desc="Zugänge, Doku, Assets. Damit du unabhängig bleibst." />
        </div>
      </Section>

      {/* OFFER (komprimiert, nicht „alles“) */}
      <Section
        kicker="Einsatz"
        title="Wofür ich meist gebucht werde"
        subtitle="Drei typische Cases. Alles andere nur, wenn es wirklich hilft."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <SmallCard
            icon={<LayoutTemplate size={18} />}
            title="Landingpage / Website"
            desc="Klarer Aufbau, starke Hierarchie, technisch sauber. Fokus: Verständnis und Conversion."
          />
          <SmallCard
            icon={<LineChart size={18} />}
            title="Funnel / Leadflow"
            desc="Eine Seite, ein Ziel. Damit Leads nicht „rumklicken“, sondern entscheiden."
          />
          <SmallCard
            icon={<ShieldCheck size={18} />}
            title="Systeme & Übergabe"
            desc="Formulare, Automationen, Tracking-Basics, Doku. Damit das Setup stabil bleibt."
          />
        </div>
      </Section>

      {/* PORTFOLIO TEASER (ein klarer Link) */}
      <Section
        kicker="Proof"
        title="Wenn du Belege willst: Portfolio"
        subtitle="Nicht als Galerie, sondern als Einblick in Struktur, Ablauf und Ergebnis."
      >
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-bold">Projekte ansehen</h3>
              <p className="mt-3 text-sm md:text-base text-neutral-300 leading-relaxed">
                Du siehst dort die Deliverables und wie ich Dinge strukturiere. Die Startseite bleibt absichtlich kurz.
              </p>
            </div>

            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-indigo-300 hover:text-indigo-200 font-semibold"
            >
              Zum Portfolio <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </Section>

      {/* REQUEST (ersetzt /contact) */}
      <section id="request" className="px-5 md:px-16 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-6 md:p-12">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
              <div className="max-w-2xl">
                <div className="text-xs uppercase tracking-wide text-neutral-400">Anfrage</div>
                <h3 className="mt-2 text-2xl md:text-4xl font-extrabold leading-tight">
                  Schreib mir kurz dein Vorhaben
                </h3>
                <p className="mt-3 text-neutral-300 leading-relaxed">
                  Wenn du mir diese drei Infos schickst, bekommst du eine klare Einschätzung:
                </p>

                <ul className="mt-4 space-y-2 text-sm md:text-base text-neutral-200">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />
                    <span>Ziel (was soll am Ende passieren?)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />
                    <span>Deadline (bis wann muss es stehen?)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />
                    <span>Stand (gibt’s schon Texte, Branding, Domain, Beispiele?)</span>
                  </li>
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  <a
                    href="mailto:info@paveconsultings.com?subject=Projektanfrage&body=Ziel:%0D%0ADeadline:%0D%0AStand:%0D%0A"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold text-sm md:text-base"
                  >
                    <Mail size={18} /> Per Mail anfragen
                  </a>

                  <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-colors font-semibold text-sm md:text-base text-neutral-100"
                  >
                    <ExternalLink size={18} /> Erst Portfolio ansehen
                  </Link>
                </div>

                <p className="mt-4 text-sm text-neutral-400">
                  Wenn es passt, kommt der Termin danach. Nicht vorher.
                </p>
              </div>

              {/* “Form” Box (optional). Wenn du HubSpot/Forms nutzt, hier einbetten. */}
              <div className="w-full lg:max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
                <div className="text-sm md:text-base font-semibold">Kurz-Template (Copy/Paste)</div>
                <div className="mt-3 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-neutral-200 whitespace-pre-wrap leading-relaxed">
{`Ziel:
Deadline:
Stand:
Budgetrahmen (optional):
Link/Beispiele (optional):`}
                </div>
                <div className="mt-4 text-sm text-neutral-400">
                  Du kannst das direkt in eine Mail oder WhatsApp kopieren.
                </div>

                {/* Optional: WhatsApp Button, falls du das willst */}
                {/
                <div className="mt-4">
                  <a
                    href="https://wa.me/4916095757167?text=Ziel:%0ADeadline:%0AStand:%0A"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-colors font-semibold text-sm md:text-base text-neutral-100"
                  >
                    WhatsApp öffnen <ArrowRight size={18} />
                  </a>
                </div>
                */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
