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

function SceneShell({ id, children, className }) {
  return (
    <section
      id={id}
      className={cx(
        'min-h-screen flex items-center px-5 md:px-16 py-16',
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
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) {
          const id = visible.target.id;
          setActiveId(id);
          setActiveIndex(Math.max(0, sectionIds.indexOf(id)));
        }
      },
      { threshold: [0.25, 0.4, 0.55, 0.7] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sectionIds]);

  return { activeId, activeIndex };
}

function useCountUp({ target, start, durationMs }) {
  const [value, setValue] = useState(start);
  const rafRef = useRef(null);

  const startAnim = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const t0 = performance.now();
    const from = start;
    const to = target;

    const tick = (t) => {
      const p = Math.min(1, (t - t0) / durationMs);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      const next = Math.round(from + (to - from) * eased);
      setValue(next);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { value, startAnim };
}

function AnimatedStat({ label, target, suffix, accent = 'indigo' }) {
  const { value, startAnim } = useCountUp({ target, start: 0, durationMs: 1100 });
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const v = entries.some((e) => e.isIntersecting);
        if (v && !started) {
          setStarted(true);
          startAnim();
        }
      },
      { threshold: 0.35 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [startAnim, started]);

  const accentClass =
    accent === 'emerald'
      ? 'from-emerald-200 via-emerald-300 to-indigo-200'
      : accent === 'cyan'
      ? 'from-cyan-200 via-indigo-200 to-violet-200'
      : 'from-indigo-200 via-violet-200 to-cyan-200';

  return (
    <div ref={ref} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
      <div className={cx('text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r', accentClass)}>
        {value.toLocaleString('de-DE')}
        {suffix ? <span className="ml-1">{suffix}</span> : null}
      </div>
      <div className="mt-2 text-sm md:text-base text-neutral-300">{label}</div>
    </div>
  );
}

export default function Home() {
  const sectionIds = useMemo(() => SECTIONS.map((s) => s.id), []);
  const { activeId, activeIndex } = useActiveSection(sectionIds);

  // 5 Background-Layer, Opacity wechselt (saubere Animation)
  const bgLayers = useMemo(
    () => ({
      s1: 'bg-[radial-gradient(1200px_600px_at_10%_10%,rgba(129,51,241,.40),transparent_60%),radial-gradient(900px_650px_at_95%_15%,rgba(56,189,248,.16),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0E0E15_55%,#0B0B0F_100%)]',
      s2: 'bg-[radial-gradient(1200px_600px_at_20%_20%,rgba(56,189,248,.18),transparent_60%),radial-gradient(900px_650px_at_85%_0%,rgba(129,51,241,.26),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0C0F18_55%,#0B0B0F_100%)]',
      s3: 'bg-[radial-gradient(1200px_700px_at_15%_15%,rgba(129,51,241,.22),transparent_60%),radial-gradient(1100px_650px_at_85%_25%,rgba(34,211,238,.14),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#0F0B14_55%,#0B0B0F_100%)]',
      s4: 'bg-[radial-gradient(1200px_650px_at_20%_10%,rgba(16,185,129,.14),transparent_60%),radial-gradient(900px_650px_at_90%_25%,rgba(129,51,241,.22),transparent_55%),linear-gradient(120deg,#0B0B0F_0%,#101018_55%,#0B0B0F_100%)]',
      request:
        'bg-[radial-gradient(1200px_700px_at_10%_0%,rgba(129,51,241,.20),transparent_60%),radial-gradient(900px_650px_at_95%_15%,rgba(56,189,248,.12),transparent_55%),linear-gradient(120deg,#07070B_0%,#0B0B10_55%,#07070B_100%)]',
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
      <Navbar />
      <ProgressRail activeIndex={activeIndex} />

      {/* Background: 5 Layers, Opacity transition */}
      <div className="fixed inset-0 -z-10">
        {Object.entries(bgLayers).map(([key, cls]) => (
          <div
            key={key}
            className={cx('absolute inset-0 transition-opacity duration-700', cls, activeId === key ? 'opacity-100' : 'opacity-0')}
          />
        ))}
        <div className="pointer-events-none absolute -top-32 -left-28 h-[28rem] w-[44rem] rounded-full bg-violet-600/12 blur-[130px]" />
        <div className="pointer-events-none absolute top-1/3 -right-28 h-[28rem] w-[44rem] rounded-full bg-blue-500/10 blur-[130px]" />
      </div>

      <main className="md:snap-y md:snap-mandatory">
        {/* 01 */}
        <SceneShell id="s1">
          <div className="flex flex-col items-center text-center gap-6">
            <span className="inline-flex items-center gap-2 text-xs md:text-sm text-indigo-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
              <Sparkles size={16} /> Klar strukturierte digitale Projekte
            </span>

            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.03]">
              <span className="block">Digitale Umsetzung,</span>
              <span className="block text-indigo-300">auf die du dich verlassen kannst.</span>
            </h1>

            <p className="max-w-2xl text-base md:text-xl text-neutral-300 leading-relaxed">
              Wenig Gelaber, klare Schritte, saubere Übergabe. Am Ende steht etwas, das wirklich genutzt wird.
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
              <Pill icon={<LineChart size={14} />}>Übersichtlich</Pill>
            </div>

            <div className="mt-6 text-xs uppercase tracking-wide text-neutral-500">Scroll</div>
          </div>
        </SceneShell>

        {/* 02 */}
        <SceneShell id="s2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-xs uppercase tracking-wide text-neutral-400">02 — Prinzip</div>
              <h2 className="mt-3 text-3xl md:text-5xl font-extrabold leading-tight">
                Eine Seite.
                <span className="block text-indigo-300">Ein Ziel.</span>
              </h2>
              <p className="mt-5 text-neutral-300 text-base md:text-xl leading-relaxed max-w-xl">
                Wenn Besucher zehn Optionen haben, entscheiden sie oft gar nicht. Deshalb führe ich Schritt für Schritt.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  'Weniger Text, mehr Fokus',
                  'Jede Sektion beantwortet eine Frage',
                  'Am Ende ein klarer nächster Schritt',
                ].map((t) => (
                  <div key={t} className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />
                    <span className="text-sm md:text-base text-neutral-200">{t}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <PrimaryCTA label="Wenn du so arbeiten willst" />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="text-xs uppercase tracking-wide text-neutral-500">Was du hier siehst</div>
                <div className="mt-3 text-xl md:text-2xl font-bold text-neutral-200">
                  Jeder Screen ein Argument.
                </div>
                <p className="mt-3 text-sm md:text-base text-neutral-400 leading-relaxed">
                  Keine “Unterseiten-Rallye”. Du scrollst und bekommst Punkt für Punkt die Infos, die man wirklich braucht.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <div className="text-sm font-semibold text-neutral-200">1) Verstehen</div>
                    <div className="text-sm text-neutral-400">Worum geht’s und was soll passieren?</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <div className="text-sm font-semibold text-neutral-200">2) Vertrauen</div>
                    <div className="text-sm text-neutral-400">Warum du mir das geben kannst.</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <div className="text-sm font-semibold text-neutral-200">3) Handeln</div>
                    <div className="text-sm text-neutral-400">Ein klarer nächster Schritt.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SceneShell>

        {/* 03 */}
        <SceneShell id="s3">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            <div className="lg:sticky lg:top-24">
              <div className="text-xs uppercase tracking-wide text-neutral-400">03 — Ablauf</div>
              <h2 className="mt-3 text-3xl md:text-5xl font-extrabold leading-tight">
                Schnell starten,
                <span className="block text-indigo-300">sauber abschließen.</span>
              </h2>
              <p className="mt-5 text-neutral-300 text-base md:text-xl leading-relaxed">
                Drei klare Schritte. Keine Endlosschleifen.
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
              {[
                { k: '1', t: 'Kurz schildern', d: 'Ziel, Deadline, Stand. Mehr brauche ich am Anfang nicht.' },
                { k: '2', t: 'Umsetzen', d: 'Struktur, Design, Umsetzung. So, dass man es sofort versteht.' },
                { k: '3', t: 'Übergeben', d: 'Zugänge, Assets, kurze Doku. Damit du weiterarbeiten kannst.' },
              ].map((s) => (
                <div key={s.k} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
                  <div className="text-xs uppercase tracking-wide text-neutral-500">
                    Schritt {s.k}
                  </div>
                  <div className="mt-3 text-2xl md:text-3xl font-bold text-neutral-200">{s.t}</div>
                  <p className="mt-3 text-sm md:text-base text-neutral-400 leading-relaxed">{s.d}</p>
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
                Ergebnisse,
                <span className="block text-indigo-300">die man einordnen kann.</span>
              </h2>
              <p className="mt-5 text-neutral-300 text-base md:text-xl leading-relaxed max-w-xl">
                Ich mache Content und digitale Umsetzung so, dass es funktioniert. Und so, dass du am Ende ein sauberes Setup hast.
              </p>

              <div className="mt-8 flex gap-3 flex-wrap">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-colors font-semibold text-sm md:text-base text-neutral-100"
                >
                  <ExternalLink size={18} /> Portfolio ansehen
                </Link>
                <PrimaryCTA label="Jetzt anfragen" />
              </div>

              <p className="mt-4 text-sm text-neutral-500">
                Details und Projekte findest du im Portfolio. Die Startseite bleibt bewusst fokussiert.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <AnimatedStat target={15_000_000} suffix="+" label="Likes generiert" accent="indigo" />
              <AnimatedStat target={10_000_000} suffix="+" label="Klicks auf Social Media erzielt" accent="cyan" />
              <AnimatedStat target={100} suffix="+" label="Abgeschlossene Projekte" accent="emerald" />
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
                  Drei Infos reichen für eine klare Einschätzung.
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
                <div className="text-sm md:text-base font-semibold">Copy/Paste Template</div>
                <div className="mt-3 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-neutral-200 whitespace-pre-wrap leading-relaxed">
{`Ziel:
Deadline:
Stand:
Budgetrahmen (optional):
Link/Beispiele (optional):`}
                </div>
                <div className="mt-4 text-sm text-neutral-400">
                  Damit kann ich schon sauber einschätzen.
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
