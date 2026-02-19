'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Timer,
  LineChart,
  Zap,
  Mail,
  ExternalLink,
} from 'lucide-react';

const SECTIONS = [
  { id: 's1', label: 'Outcome', title: 'Ein klares Ergebnis.' },
  { id: 's2', label: 'Problem', title: 'Warum es oft scheitert.' },
  { id: 's3', label: 'System', title: 'Wie ich arbeite.' },
  { id: 's4', label: 'Proof', title: 'Zahlen & Beispiele.' },
  { id: 'request', label: 'Request', title: 'Anfrage.' },
];

function classNames(...xs) {
  return xs.filter(Boolean).join(' ');
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

function Pill({ icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs md:text-sm text-white/80">
      <span className="text-emerald-400">{icon}</span>
      {children}
    </span>
  );
}

function BigStat({ value, label }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
      <div className="text-4xl md:text-6xl font-extrabold tracking-tight text-indigo-200">{value}</div>
      <div className="mt-2 text-sm md:text-base text-neutral-300">{label}</div>
    </div>
  );
}

function SceneShell({ id, children, className }) {
  return (
    <section
      id={id}
      data-section={id}
      className={classNames(
        'min-h-screen flex items-center px-5 md:px-16 py-16',
        // Snap nur ab Desktop-ish, damit Mobile nicht „klebt“
        'md:snap-start',
        className
      )}
    >
      <div className="max-w-6xl mx-auto w-full">{children}</div>
    </section>
  );
}

function ProgressRail({ activeIndex }) {
  return (
    <div className="hidden md:block fixed left-6 top-1/2 -translate-y-1/2 z-40">
      <div className="rounded-2xl border border-white/10 bg-black/25 backdrop-blur-md px-3 py-4">
        <div className="text-xs uppercase tracking-wide text-neutral-400">
          {String(activeIndex + 1).padStart(2, '0')} / {String(SECTIONS.length).padStart(2, '0')}
        </div>

        <div className="mt-3 flex flex-col gap-2">
          {SECTIONS.map((s, i) => (
            <a
              key={s.id}
              href={`/#${s.id}`}
              className="group flex items-center gap-2"
              aria-label={`Zu ${s.label} springen`}
            >
              <span
                className={classNames(
                  'w-2.5 h-2.5 rounded-full border transition-colors',
                  i === activeIndex ? 'bg-indigo-300 border-indigo-200' : 'bg-white/10 border-white/20 group-hover:border-white/40'
                )}
              />
              <span className={classNames('text-xs', i === activeIndex ? 'text-neutral-200' : 'text-neutral-500')}>
                {s.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const sectionIds = useMemo(() => SECTIONS.map((s) => s.id), []);
  const [activeId, setActiveId] = useState('s1');
  const [activeIndex, setActiveIndex] = useState(0);

  // Background scenes (weich, aber klar unterscheidbar)
  const bgBySection = useMemo(
    () => ({
      s1: 'bg-[radial-gradient(1200px_600px_at_10%_10%,rgba(129,51,241,.38),transparent_60%),radial-gradient(900px_650px_at_95%_15%,rgba(56,189,248,.16),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_55%,#0B0B0F_100%)]',
      s2: 'bg-[radial-gradient(1200px_600px_at_20%_20%,rgba(56,189,248,.18),transparent_60%),radial-gradient(900px_650px_at_85%_0%,rgba(129,51,241,.28),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0C0F18_55%,#0B0B0F_100%)]',
      s3: 'bg-[radial-gradient(1200px_700px_at_15%_15%,rgba(129,51,241,.22),transparent_60%),radial-gradient(1100px_650px_at_85%_25%,rgba(34,211,238,.14),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0F0B14_55%,#0B0B0F_100%)]',
      s4: 'bg-[radial-gradient(1200px_650px_at_20%_10%,rgba(16,185,129,.14),transparent_60%),radial-gradient(900px_650px_at_90%_25%,rgba(129,51,241,.22),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#101018_55%,#0B0B0F_100%)]',
      request:
        'bg-[radial-gradient(1200px_700px_at_10%_0%,rgba(129,51,241,.20),transparent_60%),radial-gradient(900px_650px_at_95%_15%,rgba(56,189,248,.12),transparent_55%),linear-gradient(120deg,#07070B_0%,#0B0B10_55%,#07070B_100%)]',
    }),
    []
  );

  // Active section detection
  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) {
          const id = visible.target.id;
          setActiveId(id);
          setActiveIndex(Math.max(0, sectionIds.indexOf(id)));
        }
      },
      {
        // „Center bias“: section gilt aktiv, wenn sie gut im Viewport steht
        root: null,
        threshold: [0.25, 0.4, 0.55, 0.7],
      }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sectionIds]);

  // Smooth hash scrolling
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
      <ProgressRail activeIndex={activeIndex} />

      {/* Global background layer with soft transitions */}
      <div className="fixed inset-0 -z-10">
        <div
          className={classNames(
            'absolute inset-0 transition-opacity duration-700',
            bgBySection[activeId] ?? bgBySection.s1
          )}
        />
        {/* subtle glow blobs to keep “premium” depth */}
        <div className="pointer-events-none absolute -top-32 -left-28 h-[28rem] w-[44rem] rounded-full bg-violet-600/12 blur-[130px]" />
        <div className="pointer-events-none absolute top-1/3 -right-28 h-[28rem] w-[44rem] rounded-full bg-blue-500/10 blur-[130px]" />
      </div>

      {/* Scroll container: snap on md+ */}
      <main className="md:snap-y md:snap-mandatory">
        {/* 01 OUTCOME */}
        <SceneShell id="s1">
          <div className="flex flex-col items-center text-center gap-6">
            <span className="inline-flex items-center gap-2 text-xs md:text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
              <Sparkles size={16} /> Planbare digitale Umsetzung
            </span>

            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.03]">
              Ein klares Ergebnis.
              <span className="block text-indigo-300">Keine Endlosschleifen.</span>
            </h1>

            <p className="max-w-2xl text-base md:text-xl text-neutral-300 leading-relaxed">
              Websites, Funnels und Social-Assets, die schnell verständlich sind und sauber übergeben werden.
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

            <div className="mt-6 text-xs uppercase tracking-wide text-neutral-500">
              Scroll
            </div>
          </div>
        </SceneShell>

        {/* 02 PROBLEM */}
        <SceneShell id="s2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-xs uppercase tracking-wide text-neutral-400">02 — Warum das oft ausufert</div>
              <h2 className="mt-3 text-3xl md:text-5xl font-extrabold leading-tight">
                Nicht das Design ist das Problem.
                <span className="block text-indigo-300">Der Ablauf ist es.</span>
              </h2>
              <p className="mt-5 text-neutral-300 text-base md:text-xl leading-relaxed max-w-xl">
                Viele Projekte verlieren Tempo, weil niemand entscheidet, was „fertig“ bedeutet.
                Ich arbeite so, dass du planbar ans Ziel kommst.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  'Ein Ziel pro Seite / pro Flow',
                  'Klare Runden statt Dauer-Feedback',
                  'Übergabe als Deliverable, nicht als „Bonus“',
                ].map((t) => (
                  <div key={t} className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />
                    <span className="text-sm md:text-base text-neutral-200">{t}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <PrimaryCTA label="Wenn das zu dir passt" />
              </div>
            </div>

            {/* Visual split: chaos vs system (kein Kachel-Look) */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] overflow-hidden">
              <div className="grid grid-cols-2">
                <div className="p-6 md:p-8 border-r border-white/10">
                  <div className="text-xs uppercase tracking-wide text-neutral-500">Chaos</div>
                  <div className="mt-3 text-lg md:text-2xl font-bold text-neutral-200">Zu viele Optionen</div>
                  <div className="mt-2 text-sm md:text-base text-neutral-400 leading-relaxed">
                    Mehr Text, mehr Unterseiten, mehr Ablenkung. Klingt informativ, konvertiert aber oft schlechter.
                  </div>
                  <div className="mt-6 h-px bg-white/10" />
                  <div className="mt-6 text-sm text-neutral-500">Symptom: keiner liest es wirklich.</div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="text-xs uppercase tracking-wide text-neutral-500">System</div>
                  <div className="mt-3 text-lg md:text-2xl font-bold text-neutral-200">Ein Scroll-Funnel</div>
                  <div className="mt-2 text-sm md:text-base text-neutral-400 leading-relaxed">
                    Ein Punkt pro Screen. Eine Botschaft. Ein nächster Schritt. Der Nutzer wird geführt, nicht verloren.
                  </div>
                  <div className="mt-6 h-px bg-white/10" />
                  <div className="mt-6 text-sm text-neutral-500">Ergebnis: mehr Fokus, mehr Entscheidung.</div>
                </div>
              </div>
            </div>
          </div>
        </SceneShell>

        {/* 03 SYSTEM (Sticky Stepper feeling without heavy JS) */}
        <SceneShell id="s3">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            <div className="lg:sticky lg:top-24">
              <div className="text-xs uppercase tracking-wide text-neutral-400">03 — System</div>
              <h2 className="mt-3 text-3xl md:text-5xl font-extrabold leading-tight">
                Klarheit zuerst.
                <span className="block text-indigo-300">Dann Umsetzung.</span>
              </h2>
              <p className="mt-5 text-neutral-300 text-base md:text-xl leading-relaxed">
                Keine Buzzwords. Ein Framework, das Projekte schnell macht und sauber abschließt.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                <Pill icon={<Zap size={14} />}>Scope fix</Pill>
                <Pill icon={<Timer size={14} />}>Tempo</Pill>
                <Pill icon={<ShieldCheck size={14} />}>Übergabe</Pill>
              </div>

              <div className="mt-8">
                <PrimaryCTA label="So würde ich starten" />
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: '1) Define',
                  desc: 'Ziel, Nutzerweg, Inhalte, Constraints. Was ist “fertig”? Was ist optional? Das fixieren wir.',
                },
                {
                  title: '2) Build',
                  desc: 'Design und Umsetzung als ein System. Große, klare Sektionen. Keine Textwände.',
                },
                {
                  title: '3) Polish',
                  desc: 'Feinschliff in 1–2 klaren Runden. Danach ist es nicht „in Arbeit“, sondern live.',
                },
                {
                  title: '4) Handover',
                  desc: 'Zugänge, Assets, kurze Doku. Du kannst weiterarbeiten, ohne dass du mich brauchst.',
                },
              ].map((s) => (
                <div key={s.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
                  <div className="text-xs uppercase tracking-wide text-neutral-500">{s.title}</div>
                  <div className="mt-3 text-xl md:text-2xl font-bold text-neutral-200">
                    {s.desc.split('. ')[0]}.
                  </div>
                  <p className="mt-3 text-sm md:text-base text-neutral-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SceneShell>

        {/* 04 PROOF */}
        <SceneShell id="s4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-xs uppercase tracking-wide text-neutral-400">04 — Proof</div>
              <h2 className="mt-3 text-3xl md:text-5xl font-extrabold leading-tight">
                Reichweite ist kein Ziel.
                <span className="block text-indigo-300">Aber ein Beleg.</span>
              </h2>
              <p className="mt-5 text-neutral-300 text-base md:text-xl leading-relaxed max-w-xl">
                Ich baue Dinge, die im Feed funktionieren und im Ergebnis halten: klare Hooks, klare Struktur, klare Übergabe.
              </p>

              <div className="mt-8 flex gap-3 flex-wrap">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-colors font-semibold text-sm md:text-base text-neutral-100"
                >
                  <ExternalLink size={18} /> Portfolio ansehen
                </Link>
                <PrimaryCTA label="Anfrage (2 Minuten)" />
              </div>

              <p className="mt-4 text-sm text-neutral-500">
                Portfolio ist bewusst separat: Proof im Detail, ohne den Onepager zu überladen.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <BigStat value="15+ Mio" label="Likes generiert" />
              <BigStat value="10+ Mio" label="Klicks auf Social Media erzielt" />
              <BigStat value="100+" label="Abgeschlossene Projekte" />
            </div>
          </div>
        </SceneShell>

        {/* 05 REQUEST */}
        <SceneShell id="request" className="pb-24">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
              <div>
                <div className="text-xs uppercase tracking-wide text-neutral-400">05 — Anfrage</div>
                <h3 className="mt-2 text-2xl md:text-4xl font-extrabold leading-tight">
                  Schick mir kurz dein Vorhaben
                </h3>
                <p className="mt-4 text-neutral-300 leading-relaxed max-w-2xl">
                  Drei Infos reichen für eine klare Einschätzung. Wenn es passt, kommt der Termin danach.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    'Ziel (was soll am Ende passieren?)',
                    'Deadline (bis wann muss es stehen?)',
                    'Stand (Texte, Branding, Domain, Beispiele?)',
                  ].map((t) => (
                    <div key={t} className="flex items-start gap-2">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />
                      <span className="text-sm md:text-base text-neutral-200">{t}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
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

                <p className="mt-4 text-sm text-neutral-500">
                  Du bekommst von mir eine ehrliche Einschätzung (passt / passt nicht) und einen klaren nächsten Schritt.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/25 backdrop-blur-sm p-5 md:p-6">
                <div className="text-sm md:text-base font-semibold">Copy/Paste Template</div>
                <div className="mt-3 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-neutral-200 whitespace-pre-wrap leading-relaxed">
{`Ziel:
Deadline:
Stand:
Budgetrahmen (optional):
Link/Beispiele (optional):`}
                </div>
                <div className="mt-4 text-sm text-neutral-400">
                  Wenn du nur das schickst, kann ich schon sauber einschätzen.
                </div>
              </div>
            </div>
          </div>
        </SceneShell>
      </main>

      <Footer />
    </div>
  );
}
