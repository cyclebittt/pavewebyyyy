'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  Shield,
  Sparkles,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

/* ---------- CONFIG ---------- */

const WHATSAPP_E164 = '4916095757167';
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(
  `Hi Leon,\n\nKurz zu meinem Vorhaben:\n- Branche:\n- Ziel (mehr Anfragen / sauberer Auftritt / beides):\n- Deadline:\n- Link zur aktuellen Website (falls vorhanden):\n\nDanke!`
)}`;

const PORTFOLIO_MOTION = 'https://www.leonseitz.com/portfolio/motion-design';
const PORTFOLIO_KFA = 'https://www.leonseitz.com/portfolio/kirche-fundraising';

/* ---------- SCENE (match homepage vibe) ---------- */

const SCENE = {
  base: '#070312',
  g1: `radial-gradient(1200px 700px at 18% 18%, rgba(168,85,247,0.30), transparent 60%),
       radial-gradient(900px 700px at 82% 25%, rgba(56,189,248,0.14), transparent 55%)`,
  g2: `linear-gradient(135deg, #070312 0%, #0b0b1a 50%, #03040e 100%)`,
  blobs: [
    { cls: 'bg-violet-500/16', x: '-20%', y: '-18%', s: '56rem', blur: 140 },
    { cls: 'bg-cyan-500/10', x: '70%', y: '10%', s: '54rem', blur: 150 },
    { cls: 'bg-fuchsia-500/9', x: '20%', y: '80%', s: '46rem', blur: 150 },
  ],
  accent: 'from-violet-200 via-indigo-200 to-cyan-200',
};

/* ---------- UTIL ---------- */

function cx(...xs) {
  return xs.filter(Boolean).join(' ');
}

function TitleGradient({ children }) {
  return <span className={cx('bg-clip-text text-transparent bg-gradient-to-r', SCENE.accent)}>{children}</span>;
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
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return shown;
}

function Reveal({ children, delayMs = 0 }) {
  const ref = useRef(null);
  const shown = useReveal(ref);

  return (
    <div
      ref={ref}
      className={cx(
        'transition-all duration-700 will-change-transform',
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      )}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------- PROGRESS + HALO ---------- */

function useScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - doc.clientHeight);
      setP(doc.scrollTop / max);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return p;
}

function ScrollProgressBar() {
  const p = useScrollProgress();
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none">
      <div className="h-[2px] bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-violet-300 via-cyan-300 to-emerald-300"
          style={{ width: `${Math.round(p * 100)}%`, transition: 'width 80ms linear' }}
        />
      </div>
    </div>
  );
}

function useMousePos() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const raf = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => setPos({ x, y }));
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return pos;
}

function CursorHalo() {
  const { x, y } = useMousePos();

  return (
    <div className="hidden md:block fixed inset-0 z-[6] pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(800px 600px at ${x}px ${y}px, rgba(255,255,255,0.045), transparent 70%)`,
          filter: 'blur(18px)',
          opacity: 0.6,
          mixBlendMode: 'screen',
          transition: 'background 80ms linear',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(1400px 1050px at ${x}px ${y}px, rgba(99,102,241,0.035), transparent 78%)`,
          filter: 'blur(34px)',
          opacity: 0.55,
          mixBlendMode: 'screen',
          transition: 'background 80ms linear',
        }}
      />
    </div>
  );
}

/* ---------- GLOBAL BG ---------- */

function GlobalBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: SCENE.base,
          backgroundImage: `${SCENE.g1}, ${SCENE.g2}`,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27320%27 height=%27320%27 viewBox=%270 0 320 320%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27320%27 height=%27320%27 filter=%27url(%23n)%27 opacity=%270.35%27/%3E%3C/svg%3E")',
          backgroundSize: '220px 220px',
          animation: 'noiseMove 7s linear infinite',
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_35%,transparent_0%,rgba(0,0,0,0.40)_65%,rgba(0,0,0,0.72)_100%)]" />
    </div>
  );
}

function GlobalLightLeaks() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {SCENE.blobs.map((b, i) => (
        <div
          key={i}
          className={cx(
            'absolute rounded-full',
            b.cls,
            i === 0
              ? 'animate-[blob_10s_ease-in-out_infinite]'
              : i === 1
                ? 'animate-[blob2_12s_ease-in-out_infinite]'
                : 'animate-[blob3_14s_ease-in-out_infinite]'
          )}
          style={{
            left: b.x,
            top: b.y,
            width: b.s,
            height: b.s,
            filter: `blur(${b.blur}px)`,
          }}
        />
      ))}
    </div>
  );
}

/* ---------- UI ---------- */

function SectionShell({ id, children, tight = false }) {
  return (
    <section id={id} className={cx('relative px-5 md:px-16', tight ? 'py-10 md:py-12' : 'py-12 md:py-16')}>
      <div className="relative max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

function Card({ children, className = '' }) {
  return <div className={cx('rounded-3xl border border-white/15 bg-black/20 backdrop-blur-md', className)}>{children}</div>;
}

function Pill({ children, tone = 'neutral' }) {
  const toneCls =
    tone === 'free'
      ? 'border-emerald-300/25 bg-emerald-500/10 text-emerald-100'
      : 'border-white/15 bg-white/10 text-white/85';
  return <span className={cx('inline-flex items-center rounded-full px-3 py-1 text-xs md:text-sm border', toneCls)}>{children}</span>;
}

function PackageMetaLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 underline underline-offset-4 text-white/70 hover:text-white transition-colors"
    >
      {children} <ExternalLink size={14} className="text-white/55" />
    </a>
  );
}

/* ---------- ROADMAP (simple, like before; no side boxes) ---------- */

function useRoadmapProgress(initialDoneIds = []) {
  const [activeStep, setActiveStep] = useState(null);
  const [doneSteps, setDoneSteps] = useState(() => new Set(initialDoneIds));

  useEffect(() => {
    setDoneSteps(new Set(initialDoneIds));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('[data-roadmap-step]'));
    if (!nodes.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        const top = visible[0]?.target?.getAttribute('data-roadmap-step') ?? null;
        if (top) setActiveStep(top);

        entries.forEach((e) => {
          if (e.isIntersecting && (e.intersectionRatio ?? 0) > 0.35) {
            const id = e.target.getAttribute('data-roadmap-step');
            if (!id) return;
            setDoneSteps((prev) => new Set(prev).add(id));
          }
        });
      },
      { threshold: [0.2, 0.35, 0.55, 0.75] }
    );

    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return { activeStep, doneSteps };
}

function RoadmapItem({ id, title, desc, tag, tagTone = 'neutral', state }) {
  const isActive = state.activeStep === id;
  const isDone = state.doneSteps.has(id);

  return (
    <div
      data-roadmap-step={id}
      className={cx(
        'rounded-2xl border px-4 py-4 md:px-5 md:py-5 transition-colors',
        isActive ? 'border-white/25 bg-white/10' : 'border-white/12 bg-white/5'
      )}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 pt-0.5">
          <div
            className={cx(
              'w-9 h-9 rounded-2xl border flex items-center justify-center',
              isDone ? 'border-emerald-300/30 bg-emerald-500/10' : 'border-white/15 bg-white/10'
            )}
          >
            <CheckCircle2 size={18} className={cx(isDone ? 'text-emerald-300' : 'text-white/30')} />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="text-sm md:text-base font-semibold text-white/90">{title}</div>
            {tag ? <Pill tone={tagTone}>{tag}</Pill> : null}
          </div>
          <div className="mt-2 text-sm text-white/70 leading-relaxed">{desc}</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- CALC ---------- */

function money(n) {
  const v = Number.isFinite(n) ? n : 0;
  return Math.round(v);
}

function calcPayments(total) {
  const t = Math.max(0, Number(total) || 0);
  return {
    p1: money(t * 0.3),
    p2: money(t * 0.5),
    p3: money(t * 0.2),
  };
}

function getRecommendation(amount) {
  const a = Number(amount) || 0;
  if (a <= 550) return { key: 'einstieg', text: 'Für diesen Rahmen passt der Einstieg.' };
  if (a <= 900) return { key: 'standard', text: 'Für diesen Rahmen passt der Standard.' };
  return { key: 'komplett', text: 'Für diesen Rahmen passt das Komplett-Paket.' };
}

/* ---------- PAGE ---------- */

export default function ProzessPage() {
  // Slider per request:
  // Range 400–1500, step 50, start 700
  const [amount, setAmount] = useState(700);

  const payments = useMemo(() => calcPayments(amount), [amount]);
  const rec = useMemo(() => getRecommendation(amount), [amount]);

  // first two steps are "done" (Kostenlos)
  const roadmapState = useRoadmapProgress(['sprint0', 'sprint1']);

  return (
    <div className="font-proxima text-white min-h-screen">
      <style>{globalKeyframes}</style>

      <GlobalBackground />
      <GlobalLightLeaks />
      <ScrollProgressBar />
      <CursorHalo />

      <Navbar />

      {/* 1) HERO */}
      <section className="relative px-5 md:px-16 pt-28 md:pt-36 pb-8 md:pb-10">
        <div className="relative max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center gap-5">
            <Reveal>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Pill tone="free">Start: Kostenlos (Analyse + Entwurf)</Pill>
                <Pill>
                  <span className="inline-flex items-center gap-2">
                    <Sparkles size={16} /> Sprint-Reviews statt Bauchgefühl
                  </span>
                </Pill>
              </div>
            </Reveal>

            <Reveal delayMs={90}>
              <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.03]">
                Du siehst erst
                <span className="block">
                  <TitleGradient>– dann geht’s weiter.</TitleGradient>
                </span>
              </h1>
            </Reveal>

            <Reveal delayMs={160}>
              <p className="max-w-2xl text-base md:text-xl text-white/80 leading-relaxed">
                Ein klarer Ablauf in Sprints: Nach jedem Sprint gibt’s ein Review. Danach kommt erst das nächste Zahlungsziel.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2) ROADMAP (clean, no side boxes) */}
      <SectionShell id="roadmap" tight>
        <Reveal>
          <div className="text-xs uppercase tracking-wide text-white/55">Roadmap</div>
        </Reveal>

        <Reveal delayMs={90}>
          <h2 className="mt-3 text-2xl md:text-5xl font-extrabold leading-tight">
            Ein Ablauf.
            <span className="block">
              <TitleGradient>Sprint → Review → nächster Schritt.</TitleGradient>
            </span>
          </h2>
        </Reveal>

        <div className="mt-8">
          <Card className="p-5 md:p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <Pill tone="free">Sprint 0: Kostenlos</Pill>
              <Pill tone="free">Sprint 1: Kostenlos</Pill>
              <Pill>Danach: Zahlungsziele</Pill>
            </div>

            <div className="grid grid-cols-1 gap-3 md:gap-4">
              <RoadmapItem
                id="sprint0"
                title="Sprint 0 — Analyse"
                desc="Klarheit, Vertrauen, Mobile, Anfrageweg. Du bekommst 3–5 konkrete Punkte."
                tag="Kostenlos"
                tagTone="free"
                state={roadmapState}
              />
              <RoadmapItem
                id="sprint1"
                title="Sprint 1 — Erster Entwurf"
                desc="Du siehst einen konkreten Aufbau für eine Seite. Danach entscheiden wir, ob wir weitergehen."
                tag="Kostenlos"
                tagTone="free"
                state={roadmapState}
              />
              <RoadmapItem
                id="sprint2"
                title="Sprint 2 — Erste Version"
                desc="Lauffähige Version zum Testen + Feedback. Danach: Zahlungsziel 1 (30%)."
                tag="Ziel 1 nach Review"
                state={roadmapState}
              />
              <RoadmapItem
                id="sprint3"
                title="Sprint 3 — Feinschliff"
                desc="Änderungen aus dem Review werden umgesetzt. Danach: Zahlungsziel 2 (50%)."
                tag="Ziel 2 nach Review"
                state={roadmapState}
              />
              <RoadmapItem
                id="sprint4"
                title="Sprint 4 — Go-Live & Übergabe"
                desc="Live stellen, Zugänge & Dateien. Danach: Zahlungsziel 3 (20%)."
                tag="Ziel 3 nach Übergabe"
                state={roadmapState}
              />
            </div>
          </Card>
        </div>
      </SectionShell>

      {/* 3) RECHNER WITH SLIDER */}
      <SectionShell id="rechner">
        <Reveal>
          <div className="text-xs uppercase tracking-wide text-white/55">Rahmen wählen</div>
        </Reveal>

        <Reveal delayMs={90}>
          <h2 className="mt-3 text-2xl md:text-5xl font-extrabold leading-tight">
            Slider bewegen.
            <span className="block">
              <TitleGradient>Du siehst sofort die Zahlungsziele.</TitleGradient>
            </span>
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 md:gap-6">
          <Card className="p-6 md:p-7">
            <div className="text-xs uppercase tracking-wide text-white/55">Betrag</div>

            <div className="mt-4">
              <input
                type="range"
                min={400}
                max={1500}
                step={50}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full accent-white"
              />
              <div className="mt-2 flex items-center justify-between text-xs text-white/45">
                <span>400 €</span>
                <span>1.500 €</span>
              </div>
            </div>

            <div className="mt-5">
              <div className="text-[76px] md:text-[92px] font-extrabold tracking-tight leading-none">
                {amount} <span className="text-white/55">€</span>
              </div>
              <div className="mt-2 text-base md:text-lg text-white/80 font-semibold">{rec.text}</div>
            </div>

            <div className="mt-6 rounded-2xl border border-emerald-300/20 bg-emerald-500/10 p-4">
              <div className="text-xs uppercase tracking-wide text-emerald-100/90">Start ist kostenlos</div>
              <div className="mt-2 text-sm text-white/75 leading-relaxed">
                Sprint 0 (Analyse) und Sprint 1 (Entwurf) sind kostenlos. Danach geht es Sprint für Sprint weiter.
              </div>
            </div>
          </Card>

          <Card className="p-6 md:p-7">
            <div className="text-xs uppercase tracking-wide text-white/55">Zahlungsziel 1 — nach Sprint-Review (30%)</div>
            <div className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight leading-none">
              {payments.p1} <span className="text-white/55">€</span>
            </div>
            <div className="mt-1 text-sm text-white/70">Nach Sprint 2 (erste Version gesehen).</div>

            <div className="mt-6 space-y-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-white/55">Zahlungsziel 2 — nach Sprint-Review (50%)</div>
                <div className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight">
                  {payments.p2} <span className="text-white/55">€</span>
                </div>
                <div className="mt-1 text-sm text-white/70">Nach Sprint 3 (Feinschliff freigegeben).</div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wide text-white/55">Zahlungsziel 3 — nach Übergabe (20%)</div>
                <div className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight">
                  {payments.p3} <span className="text-white/55">€</span>
                </div>
                <div className="mt-1 text-sm text-white/70">Nach Sprint 4 (Go-Live + Übergabe).</div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/12 bg-white/5 p-4 text-sm text-white/75">
              Sprint → Review → nächstes Zahlungsziel. Transparent und Schritt für Schritt.
            </div>
          </Card>
        </div>
      </SectionShell>

      {/* 4) PAKETE WITH RECOMMENDATION (highlight card) */}
      <SectionShell id="pakete">
        <Reveal>
          <div className="text-xs uppercase tracking-wide text-white/55">Pakete</div>
        </Reveal>

        <Reveal delayMs={90}>
          <h2 className="mt-3 text-2xl md:text-5xl font-extrabold leading-tight">
            Umfang wählen.
            <span className="block">
              <TitleGradient>Empfehlung ist schon gesetzt.</TitleGradient>
            </span>
          </h2>
        </Reveal>

        <div className="mt-6 rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white/75">
          Der Ablauf ist in allen Paketen identisch (Sprints + Reviews). Unterschiede sind nur Umfang und Extras.
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {/* KOMPLETT */}
          <Reveal>
            <Card
              className={cx(
                'p-6 md:p-7 transition-all',
                rec.key === 'komplett' ? 'ring-1 ring-inset ring-violet-300/35 border-white/20 opacity-100' : 'opacity-55'
              )}
            >
              <div className="text-xs uppercase tracking-wide text-white/55">Komplett</div>
              <div className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                ab 1.100 <span className="text-white/55">€</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" />
                  <span>Website bis 5 Seiten</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" />
                  <span>Brandbook (Farben, Typo, Layoutregeln)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" />
                  <span>
                    1 Motion-Element <span className="ml-1"><PackageMetaLink href={PORTFOLIO_MOTION}>Beispiel</PackageMetaLink></span>
                  </span>
                </li>
              </ul>
              <div className="mt-5 text-sm text-white/70 flex items-center gap-2">
                <Clock size={16} className="text-white/60" /> ca. 3 Wochen
              </div>
            </Card>
          </Reveal>

          {/* STANDARD */}
          <Reveal delayMs={80}>
            <Card
              className={cx(
                'p-6 md:p-7 transition-all',
                rec.key === 'standard' ? 'ring-1 ring-inset ring-violet-300/35 border-white/20 opacity-100' : 'opacity-55'
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-xs uppercase tracking-wide text-white/55">Standard</div>
                <Pill>Wird am häufigsten gewählt</Pill>
              </div>
              <div className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                ab 700 <span className="text-white/55">€</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" />
                  <span>Website bis 5 Seiten</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" />
                  <span>Branding-Grundlage (Farben, Schrift, Logo)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" />
                  <span>
                    Aufbau wie im Case <span className="ml-1"><PackageMetaLink href={PORTFOLIO_KFA}>Beispiel</PackageMetaLink></span>
                  </span>
                </li>
              </ul>
              <div className="mt-5 text-sm text-white/70 flex items-center gap-2">
                <Clock size={16} className="text-white/60" /> 10–14 Tage
              </div>
            </Card>
          </Reveal>

          {/* EINSTIEG */}
          <Reveal delayMs={120}>
            <Card
              className={cx(
                'p-6 md:p-7 transition-all',
                rec.key === 'einstieg' ? 'ring-1 ring-inset ring-violet-300/35 border-white/20 opacity-100' : 'opacity-55'
              )}
            >
              <div className="text-xs uppercase tracking-wide text-white/55">Einstieg</div>
              <div className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                ab 400 <span className="text-white/55">€</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" />
                  <span>Eine Landingpage</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" />
                  <span>Klare Struktur + ein CTA</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" />
                  <span>Mobil optimiert</span>
                </li>
              </ul>
              <div className="mt-5 text-sm text-white/70 flex items-center gap-2">
                <Clock size={16} className="text-white/60" /> ~ 7 Tage
              </div>
            </Card>
          </Reveal>
        </div>
      </SectionShell>

      {/* 5) EINWÄNDE */}
      <SectionShell id="einwaende" tight>
        <Reveal>
          <div className="text-xs uppercase tracking-wide text-white/55">Sicherheit</div>
        </Reveal>

        <Reveal delayMs={90}>
          <h2 className="mt-3 text-2xl md:text-4xl font-extrabold leading-tight">
            Typische Fragen.
            <span className="block">
              <TitleGradient>Kurze Antworten.</TitleGradient>
            </span>
          </h2>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <Shield size={18} className="text-white/70 mt-0.5" />
              <div>
                <div className="text-white/90 font-semibold">Was, wenn es mir nicht gefällt?</div>
                <div className="mt-2 text-sm text-white/70">Du siehst Entwurf und Versionen Sprint für Sprint – danach entscheidest du weiter.</div>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start gap-3">
              <Shield size={18} className="text-white/70 mt-0.5" />
              <div>
                <div className="text-white/90 font-semibold">Was, wenn ich später etwas ändern will?</div>
                <div className="mt-2 text-sm text-white/70">Dann entweder Betreuung ab 150 €/Monat oder ein kleines Extra-Projekt.</div>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start gap-3">
              <Shield size={18} className="text-white/70 mt-0.5" />
              <div>
                <div className="text-white/90 font-semibold">Was, wenn mein Budget knapp ist?</div>
                <div className="mt-2 text-sm text-white/70">Wir starten mit zwei kostenlosen Sprints und entscheiden dann passend.</div>
              </div>
            </div>
          </Card>
        </div>
      </SectionShell>

      {/* 6) CTA (only CTA) */}
      <SectionShell id="cta">
        <Reveal>
          <Card className="p-6 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="text-xs uppercase tracking-wide text-white/55">Fallback</div>
                <div className="mt-3 text-2xl md:text-4xl font-extrabold leading-tight">
                  Passt das?
                  <span className="block">
                    <TitleGradient>Schick mir nur die Basics.</TitleGradient>
                  </span>
                </div>
                <div className="mt-3 text-sm md:text-base text-white/70 max-w-xl">
                  Branche, Ziel, Deadline, Link zur Website (falls vorhanden). Ich melde mich innerhalb von 24 Stunden.
                </div>
              </div>

              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-black hover:bg-white/90 transition-colors font-semibold"
              >
                Per WhatsApp schreiben <ArrowRight size={18} />
              </a>
            </div>
          </Card>
        </Reveal>
      </SectionShell>

      <Footer />
    </div>
  );
}

/* ---------- KEYFRAMES ---------- */

const globalKeyframes = `
@keyframes blob {
  0% { transform: translate3d(0px, 0px, 0) scale(1); }
  35% { transform: translate3d(40px, -30px, 0) scale(1.08); }
  70% { transform: translate3d(-30px, 20px, 0) scale(0.96); }
  100% { transform: translate3d(0px, 0px, 0) scale(1); }
}
@keyframes blob2 {
  0% { transform: translate3d(0px, 0px, 0) scale(1); }
  40% { transform: translate3d(-45px, 35px, 0) scale(1.06); }
  80% { transform: translate3d(25px, -20px, 0) scale(0.96); }
  100% { transform: translate3d(0px, 0px, 0) scale(1); }
}
@keyframes blob3 {
  0% { transform: translate3d(0px, 0px, 0) scale(1.10); }
  45% { transform: translate3d(35px, 25px, 0) scale(1.10); }
  85% { transform: translate3d(-30px, -18px, 0) scale(0.94); }
  100% { transform: translate3d(0px, 0px, 0) scale(1); }
}
@keyframes noiseMove {
  0% { transform: translate3d(0,0,0); }
  100% { transform: translate3d(90px,60px,0); }
}
`;
