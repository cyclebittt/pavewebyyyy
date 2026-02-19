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
  { id: 's1', label: 'Start' },
  { id: 's2', label: 'Prinzip' },
  { id: 's3', label: 'Ablauf' },
  { id: 's4', label: 'Proof' },
  { id: 'request', label: 'Anfrage' },
];

function cx(...xs) {
  return xs.filter(Boolean).join(' ');
}

/**
 * IMPORTANT:
 * Tailwind muss arbitrary background classes "sehen", sonst compiled er sie nicht.
 * Das hier ist eine robuste Safelist (unsichtbar, aber im DOM).
 */
function TailwindBackgroundSafelist() {
  return (
    <div className="hidden">
      <div className="bg-[radial-gradient(1200px_700px_at_10%_10%,rgba(129,51,241,.55),transparent_60%),radial-gradient(900px_700px_at_90%_20%,rgba(56,189,248,.22),transparent_55%),linear-gradient(120deg,#07070B_0%,#0E0E18_55%,#07070B_100%)]" />
      <div className="bg-[radial-gradient(1200px_700px_at_15%_15%,rgba(56,189,248,.32),transparent_60%),radial-gradient(900px_700px_at_85%_15%,rgba(168,85,247,.28),transparent_55%),linear-gradient(120deg,#07070B_0%,#0B1220_55%,#07070B_100%)]" />
      <div className="bg-[radial-gradient(1200px_700px_at_20%_10%,rgba(168,85,247,.34),transparent_60%),radial-gradient(900px_700px_at_85%_30%,rgba(34,211,238,.20),transparent_55%),linear-gradient(120deg,#07070B_0%,#120A18_55%,#07070B_100%)]" />
      <div className="bg-[radial-gradient(1200px_700px_at_10%_10%,rgba(16,185,129,.20),transparent_60%),radial-gradient(900px_700px_at_90%_20%,rgba(99,102,241,.26),transparent_55%),linear-gradient(120deg,#07070B_0%,#101018_55%,#07070B_100%)]" />
      <div className="bg-[radial-gradient(1200px_700px_at_10%_0%,rgba(99,102,241,.26),transparent_60%),radial-gradient(900px_700px_at_95%_10%,rgba(56,189,248,.16),transparent_55%),linear-gradient(120deg,#050508_0%,#0A0A12_55%,#050508_100%)]" />
    </div>
  );
}

function PrimaryCTA({ label = 'Kurz anfragen' }) {
  return (
    <Link
      href="/#request"
      className="group px-6 py-3 md:px-7 md:py-3.5 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors font-semibold inline-flex items-center justify-center gap-2"
    >
      {label}
      <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
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

function SceneShell({ id, children }) {
  return (
    <section
      id={id}
      className={cx(
        'min-h-screen flex items-center px-5 md:px-16 py-16',
        'md:snap-start',
        'scroll-mt-24'
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
            <a key={s.id} href={`/#${s.id}`} className="group flex items-center gap-2">
              <span
                className={cx(
                  'w-2.5 h-2.5 rounded-full border transition-colors',
                  i === activeIndex
                    ? 'bg-indigo-300 border-indigo-200'
                    : 'bg-white/10 border-white/20 group-hover:border-white/40'
                )}
              />
              <span className={cx('text-xs', i === activeIndex ? 'text-neutral-200' : 'text-neutral-500')}>
                {s.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? 's1');
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const els = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // wir nehmen die Sektion, die am stärksten im Viewport ist
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (best?.target?.id) {
          const id = best.target.id;
          setActiveId(id);
          setActiveIndex(Math.max(0, sectionIds.indexOf(id)));
        }
      },
      {
        // Center-Bias: fühlt sich „funneliger“ an
        root: null,
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.15, 0.3, 0.45, 0.6, 0.75],
      }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sectionIds]);

  return { activeId, activeIndex };
}

function useReveal(ref) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setShown(true);
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);

  return shown;
}

function useCountUp({ target, durationMs = 1200 }) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  const start = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const t0 = performance.now();
    const from = 0;
    const to = target;

    const tick = (t) => {
      const p = Math.min(1, (t - t0) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setValue(Math.round(from + (to - from) * eased));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { value, start };
}

function AnimatedStat({ label, target, display, gradientClass }) {
  const ref = useRef(null);
  const shown = useReveal(ref);
  const { value, start } = useCountUp({ target });

  useEffect(() => {
    if (shown) start();
  }, [shown, start]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8"
    >
      {/* shine */}
      <div className="pointer-events-none absolute -inset-20 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className={cx('text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r', gradientClass)}>
        {display ?? value.toLocaleString('de-DE')}
      </div>
      <div className="mt-2 text-sm md:text-base text-neutral-300">{label}</div>

      {/* subtle moving highlight */}
      <div className="pointer-events-none absolute -left-20 top-0 h-full w-40 rotate-12 bg-white/10 blur-2xl opacity-20 animate-[pulse_2.8s_ease-in-out_infinite]" />
    </div>
  );
}

export default function Home() {
  const sectionIds = useMemo(() => SECTIONS.map((s) => s.id), []);
  const { activeId, activeIndex } = useActiveSection(sectionIds);

  // Scene backgrounds (stärker unterscheidbar)
  const bg = useMemo(
    () => ({
      s1: 'bg-[radial-gradient(1200px_700px_at_10%_10%,rgba(129,51,241,.55),transparent_60%),radial-gradient(900px_700px_at_90%_20%,rgba(56,189,248,.22),transparent_55%),linear-gradient(120deg,#07070B_0%,#0E0E18_55%,#07070B_100%)]',
      s2: 'bg-[radial-gradient(1200px_700px_at_15%_15%,rgba(56,189,248,.32),transparent_60%),radial-gradient(900px_700px_at_85%_15%,rgba(168,85,247,.28),transparent_55%),linear-gradient(120deg,#07070B_0%,#0B1220_55%,#07070B_100%)]',
      s3: 'bg-[radial-gradient(1200px_700px_at_20%_10%,rgba(168,85,247,.34),transparent_60%),radial-gradient(900px_700px_at_85%_30%,rgba(34,211,238,.20),transparent_55%),linear-gradient(120deg,#07070B_0%,#120A18_55%,#07070B_100%)]',
      s4: 'bg-[radial-gradient(1200px_700px_at_10%_10%,rgba(16,185,129,.20),transparent_60%),radial-gradient(900px_700px_at_90%_20%,rgba(99,102,241,.26),transparent_55%),linear-gradient(120deg,#07070B_0%,#101018_55%,#07070B_100%)]',
      request:
        'bg-[radial-gradient(1200px_700px_at_10%_0%,rgba(99,102,241,.26),transparent_60%),radial-gradient(900px_700px_at_95%_10%,rgba(56,189,248,.16),transparent_55%),linear-gradient(120deg,#050508_0%,#0A0A12_55%,#050508_100%)]',
    }),
    []
  );

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
      <TailwindBackgroundSafelist />
      <Navbar />
      <ProgressRail activeIndex={activeIndex} />

      {/* Background: 5 Layers, Opacity animiert (funktioniert immer) */}
      <div className="fixed inset-0 -z-10">
        {Object.entries(bg).map(([key, cls]) => (
          <div
            key={key}
            className={cx('absolute inset-0 transition-opacity duration-700 will-change-opacity', cls, activeId === key ? 'opacity-100' : 'opacity-0')}
          />
        ))}

        {/* extra depth */}
        <div className="pointer-events-none absolute -top-40 -left-40 h-[34rem] w-[54rem] rounded-full bg-violet-600/18 blur-[140px]" />
        <div className="pointer-events-none absolute top-1/3 -right-40 h-[34rem] w-[54rem] rounded-full bg-cyan-500/12 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-[-10rem] left-1/4 h-[28rem] w-[48rem] rounded-full bg-emerald-500/10 blur-[140px]" />
      </div>

      <main className="md:snap-y md:snap-mandatory">
        {/* 01 START */}
        <SceneShell id="s1">
          <Hero />
        </SceneShell>

        {/* 02 PRINZIP */}
        <SceneShell id="s2">
          <Principle />
        </SceneShell>

        {/* 03 ABLAUF */}
        <SceneShell id="s3">
          <Flow />
        </SceneShell>

        {/* 04 PROOF */}
        <SceneShell id="s4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-xs uppercase tracking-wide text-neutral-400">04 — Proof</div>
              <h2 className="mt-3 text-3xl md:text-6xl font-extrabold leading-[1.05]">
                Ergebnisse,
                <span className="block text-indigo-300">die man sieht.</span>
              </h2>
              <p className="mt-5 text-neutral-300 text-base md:text-xl leading-relaxed max-w-xl">
                Projekte sollen nicht nur gut aussehen, sondern funktionieren. Und am Ende sauber übergeben sein.
              </p>

              <div className="mt-8 flex gap-3 flex-wrap">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-colors font-semibold text-sm md:text-base text-neutral-100"
                >
                  <ExternalLink size={18} /> Portfolio ansehen
                </Link>
                <PrimaryCTA label="Kurz anfragen" />
              </div>

              <p className="mt-4 text-sm text-neutral-500">
                Startseite bleibt fokussiert. Details sind im Portfolio.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <AnimatedStat
                label="Likes generiert"
                target={15000000}
                display="15+ Mio"
                gradientClass="from-indigo-200 via-violet-200 to-cyan-200"
              />
              <AnimatedStat
                label="Klicks auf Social Media erzielt"
                target={10000000}
                display="10+ Mio"
                gradientClass="from-cyan-200 via-indigo-200 to-violet-200"
              />
              <AnimatedStat
                label="Abgeschlossene Projekte"
                target={100}
                display="100+"
                gradientClass="from-emerald-200 via-cyan-200 to-indigo-200"
              />
            </div>
          </div>
        </SceneShell>

        {/* 05 REQUEST */}
        <SceneShell id="request">
          <Request />
        </SceneShell>
      </main>

      <Footer />
    </div>
  );
}

function Hero() {
  const ref = useRef(null);
  const shown = useReveal(ref);

  return (
    <div ref={ref} className={cx('flex flex-col items-center text-center gap-6 transition-all duration-700', shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
      <span className="inline-flex items-center gap-2 text-xs md:text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
        <Sparkles size={16} /> Klar strukturierte digitale Projekte
      </span>

      <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.03]">
        <span className="block">Digitale Umsetzung,</span>
        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-violet-200 to-cyan-200">
          auf die du dich verlassen kannst.
        </span>
      </h1>

      <p className="max-w-2xl text-base md:text-xl text-neutral-300 leading-relaxed">
        Wenig Textwände. Mehr Fokus. Du scrollst – und bekommst Punkt für Punkt das, was du wirklich wissen musst.
      </p>

      <div className="w-full flex flex-col items-center gap-3">
        <PrimaryCTA />
        <p className="text-sm md:text-base text-neutral-400 max-w-xl">
          Ziel, Deadline, Stand. Dann sage ich dir, ob es passt und wie wir starten.
        </p>
      </div>

      <div className="mt-1 flex flex-wrap items-center justify-center gap-2">
        <Pill icon={<Timer size={14} />}>Klare Schritte</Pill>
        <Pill icon={<ShieldCheck size={14} />}>Saubere Übergabe</Pill>
        <Pill icon={<LineChart size={14} />}>Fokus auf Wirkung</Pill>
      </div>

      <div className="mt-6 text-xs uppercase tracking-wide text-neutral-500">Scroll</div>
    </div>
  );
}

function Principle() {
  const ref = useRef(null);
  const shown = useReveal(ref);

  return (
    <div ref={ref} className={cx('grid grid-cols-1 lg:grid-cols-2 gap-10 items-center transition-all duration-700', shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
      <div>
        <div className="text-xs uppercase tracking-wide text-neutral-400">02 — Prinzip</div>
        <h2 className="mt-3 text-3xl md:text-6xl font-extrabold leading-[1.05]">
          Eine Seite.
          <span className="block text-indigo-300">Ein Ziel.</span>
        </h2>
        <p className="mt-5 text-neutral-300 text-base md:text-xl leading-relaxed max-w-xl">
          Je weniger Ablenkung, desto schneller die Entscheidung. Deshalb: ein klarer Scroll-Funnel.
        </p>

        <div className="mt-6 space-y-3">
          {[
            'Jede Sektion beantwortet eine Frage',
            'Nur das, was wirklich relevant ist',
            'Am Ende ein klarer nächster Schritt',
          ].map((t) => (
            <div key={t} className="flex items-start gap-2">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />
              <span className="text-sm md:text-base text-neutral-200">{t}</span>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <PrimaryCTA label="Wenn du das so willst" />
        </div>
      </div>

      {/* Visual: “Swipe-like” panel */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="text-xs uppercase tracking-wide text-neutral-500">Wie sich das anfühlt</div>
          <div className="mt-3 text-xl md:text-3xl font-bold text-neutral-200">
            Screen für Screen überzeugt.
          </div>
          <p className="mt-3 text-sm md:text-base text-neutral-400 leading-relaxed">
            Du musst nicht suchen. Du wirst geführt. Und du merkst sofort, ob es passt.
          </p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-5">
            <div className="text-sm font-semibold text-neutral-200">Gedanke im Kopf des Kunden</div>
            <div className="mt-3 space-y-2 text-sm text-neutral-400">
              <div className="flex items-center justify-between">
                <span>Worum geht’s?</span><span className="text-neutral-300">Sektion 1</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Warum du?</span><span className="text-neutral-300">Sektion 2–4</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Wie starte ich?</span><span className="text-neutral-300">Sektion 5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Flow() {
  const ref = useRef(null);
  const shown = useReveal(ref);

  const steps = [
    { n: '01', t: 'Kurz schildern', d: 'Ziel, Deadline, Stand. Mehr brauche ich am Anfang nicht.' },
    { n: '02', t: 'Sauber umsetzen', d: 'Struktur + Umsetzung so, dass man es sofort versteht.' },
    { n: '03', t: 'Ordentlich übergeben', d: 'Zugänge, Assets, kurze Doku. Damit du weiterarbeiten kannst.' },
  ];

  return (
    <div ref={ref} className={cx('grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 items-start transition-all duration-700', shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
      <div className="lg:sticky lg:top-24">
        <div className="text-xs uppercase tracking-wide text-neutral-400">03 — Ablauf</div>
        <h2 className="mt-3 text-3xl md:text-6xl font-extrabold leading-[1.05]">
          Schnell starten,
          <span className="block text-indigo-300">sauber abschließen.</span>
        </h2>
        <p className="mt-5 text-neutral-300 text-base md:text-xl leading-relaxed">
          Keine langen Runden. Klare Schritte. Am Ende steht ein Ergebnis, das bleibt.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          <Pill icon={<Zap size={14} />}>Klarer Umfang</Pill>
          <Pill icon={<Timer size={14} />}>Tempo</Pill>
          <Pill icon={<ShieldCheck size={14} />}>Übergabe</Pill>
        </div>

        <div className="mt-8">
          <PrimaryCTA label="Kurz checken lassen" />
        </div>
      </div>

      <div className="space-y-4">
        {steps.map((s, idx) => (
          <div
            key={s.n}
            className={cx(
              'rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8',
              'transition-transform duration-500',
              shown ? 'translate-y-0' : 'translate-y-2'
            )}
            style={{ transitionDelay: `${idx * 90}ms` }}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="text-xs uppercase tracking-wide text-neutral-500">Schritt {s.n}</div>
              <div className="h-px flex-1 bg-white/10" />
              <Zap size={16} className="text-indigo-300" />
            </div>

            <div className="mt-4 text-2xl md:text-3xl font-bold text-neutral-200">{s.t}</div>
            <p className="mt-3 text-sm md:text-base text-neutral-400 leading-relaxed">{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Request() {
  const ref = useRef(null);
  const shown = useReveal(ref);

  return (
    <div ref={ref} className={cx('transition-all duration-700', shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <div>
            <div className="text-xs uppercase tracking-wide text-neutral-400">05 — Anfrage</div>
            <h3 className="mt-2 text-2xl md:text-4xl font-extrabold leading-tight">
              Schick mir kurz dein Vorhaben
            </h3>
            <p className="mt-4 text-neutral-300 leading-relaxed max-w-2xl">
              Drei Infos reichen. Ich sage dir, ob es passt und wie wir starten.
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
              Wenn es passt, kommt der Termin danach. Nicht vorher.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/25 backdrop-blur-sm p-5 md:p-6">
            <div className="text-sm md:text-base font-semibold">Copy/Paste</div>
            <div className="mt-3 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-neutral-200 whitespace-pre-wrap leading-relaxed">
{`Ziel:
Deadline:
Stand:
Budgetrahmen (optional):
Link/Beispiele (optional):`}
            </div>
            <div className="mt-4 text-sm text-neutral-400">
              Damit kann ich sofort sauber einschätzen.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
